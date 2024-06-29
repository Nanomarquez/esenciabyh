import * as z from "zod";
import { Models } from "appwrite";
import { useState, useEffect, useRef, FormEvent } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import "dropzone/dist/dropzone.css";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PostValidation } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import Loader from "@/components/shared/Loader";
import Select from 'react-select';

import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations";
import Dropzone from "dropzone";

type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

const formatDateToDDMMYYYY = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const CATEGORIES = [
  { value: "categoria1", label: "Categoria 1" },
  { value: "categoria2", label: "Categoria 2" },
  { value: "categoria3", label: "Categoria 3" },
];


const PostForm = ({ post, action }: PostFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUserContext();
  const [selectedCategories, setSelectedCategories] = useState(
    post ? post.categories.map((cat:string) => ({ value: cat, label: cat })) : []
  );

   const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      title: post ? post?.title : "",
      file: [],
      description: post ? post.description : "",
      categories: post ? post.categories : [],
    },
  });

  const { mutateAsync: createPost, isLoading: isLoadingCreate } = useCreatePost();
  const { mutateAsync: updatePost, isLoading: isLoadingUpdate } = useUpdatePost();

  const [postImages, setPostImages] = useState([]);
  const [coverImage, setCoverImage] = useState();

  const coverDropzoneRef = useRef(null);
  const postDropzoneRef = useRef(null);

  useEffect(() => {
    const coverDropzone = new Dropzone(coverDropzoneRef.current, {
      url: '/',
      autoProcessQueue: false,
      addRemoveLinks: true,
      maxFiles: 1,
      acceptedFiles: 'image/*', 
    });
  
    coverDropzone.on('addedfile', file => {
      console.log("New cover image added:", file);
      setCoverImage(file);
    });
  
    coverDropzone.on('removedfile', () => {
      console.log("Cover image removed");
      setCoverImage(null);
    });
  
    const postDropzone = new Dropzone(postDropzoneRef.current, {
      url: '/',
      autoProcessQueue: false,
      addRemoveLinks: true,
      maxFiles: 10,
      acceptedFiles: 'image/*',
    });
  
    postDropzone.on('addedfile', file => {
      console.log("New post image added:", file);
      setPostImages(prev => [...prev, file]);
    });
  
    postDropzone.on('removedfile', file => {
      console.log("Post image removed:", file.name);
      setPostImages(prev => prev.filter(f => f.name !== file.name));
    });
  
    return () => {
      coverDropzone.destroy();
      postDropzone.destroy();
    };
  }, []);
  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = form.getValues();
  
    const newPost = {
      userId: user.id,
      ...formData,
      postImages: postImages,  
      coverImage: coverImage,  
      created_at: formatDateToDDMMYYYY(new Date()),
      updated_at: formatDateToDDMMYYYY(new Date()),
    };
  
    
    if (!coverImage || postImages.length === 0) {
      toast({ title: "Error", description: "No files selected.", variant: "destructive" });
      return;
    }
  
    try {
      const result = await (action === "Create" ? createPost : updatePost)(newPost);
      console.log("Post created successfully:", result);
      toast({ title: "Post created successfully", variant: "success" });
      navigate("/");
    } catch (error) {
      console.error("Failed to create post:", error);
      toast({ title: "Failed to create post", description: error.message, variant: "destructive" });
    }
  };
  

  const handleCategorySelect = (selectedOptions: Array<{ value: string; label: string }>) => {
    if (selectedOptions.length <= 3) {
      setSelectedCategories(selectedOptions);
      form.setValue("categories", selectedOptions.map(cat => cat.value)); 
    }
  };

  useEffect(() => {
    form.setValue("categories", selectedCategories.map((cat: { value: string; }) => cat.value));
  }, [selectedCategories, form]);

  console.log(form.getValues("description"))
  console.log(form)

  return (
    <Form {...form}>
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="flex flex-col gap-4 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Título del artículo</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Agregue una descripción</FormLabel>
              <FormControl>
                <Textarea className="custom-scrollbar shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Agregar imágenes  </FormLabel>
              <FormControl>
              <div ref={coverDropzoneRef} className="dropzone" />
              </FormControl>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Agregar imágenes</FormLabel>
              <FormControl>
              <div ref={postDropzoneRef} className="dropzone" />
              </FormControl>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categories"
          render={() => (
            <FormItem>
              <FormLabel className="shad-form_label">Agregue categorías a su artículo</FormLabel>
              <FormControl>
                <Select
                  isMulti
                  value={selectedCategories}
                  onChange={handleCategorySelect}
                  options={CATEGORIES}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex flex-wrap gap-2 mt-2">
        </div>
        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            {(isLoadingCreate || isLoadingUpdate) && <Loader />}
            {action} Post
          </Button>
        </div>
      </form>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Form>
  );
};

export default PostForm;
