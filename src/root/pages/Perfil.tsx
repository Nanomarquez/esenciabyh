import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { UpdateProfileValidation } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/shared";
import { useEffect, useState } from "react";
import Velas from "../../assets/Velas.webp";
import { useUserContext } from "@/context/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { useUpdateUser } from "@/lib/react-query/queriesAndMutations";
import ProfileUploader from "@/components/shared/ProfileUploader";
import { AppwriteException } from "appwrite";

function Perfil() {
  const { toast } = useToast();
  const { user, checkAuthUser , isLoading } = useUserContext();
  // const { data: currentUser } = useGetUserById(id || "");
  const { mutateAsync: updateUser, isPending: isLoadingUpdate } =
    useUpdateUser();

  const form = useForm<z.infer<typeof UpdateProfileValidation>>({
    resolver: zodResolver(UpdateProfileValidation),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
      file: [],
      password: "",
      newPassword: "",
    },
  });

  const handleUpdate = async (
    value: z.infer<typeof UpdateProfileValidation>
  ) => {
    try {
      const emailChange = value.email !== user.email;
      const updatedUser = await updateUser({
        userId: user.id,
        name: value.name,
        file: value.file,
        lastname: value.lastname,
        email: value.email,
        phone: value.phone,
        imageUrl: user.imageUrl,
        imageId: user.imageId,
        password: value.password,
        newPassword: value.newPassword,
        emailChange,
      });

      if (!updatedUser) {
        toast({
          title: `Algo ah salido mal, intente nuevamente.`,
          variant: "destructive",
        });
        return;
      } else {
        toast({
          title: `¡Perfil actualizado con éxito!`,
          variant: "success",
        });
      }

      checkAuthUser();
    } catch (error) {
      if (error instanceof Error || error instanceof AppwriteException) {
        return toast({
          title: error.message,
          variant: "destructive",
        });
      }
    }
  };

  const [viewportHeight] = useState(window.innerHeight);
  const Required = () => <span className="text-destructive text-xl">*</span>;

  useEffect(() => {
    form.setValue("name", user?.name);
    form.setValue("lastname", user?.lastname);
    form.setValue("email", user?.email);
    form.setValue("phone", user?.phone);
  }, []);

  const [seePassword, setSeePassword] = useState(false);
  const [seeNewPassword, setSeeNewPassword] = useState(false);

  return (
    <Form {...form}>
      <div className="flex justify-center items-center mt-12">
        <div
          style={{
            backgroundImage: `url(${Velas})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: viewportHeight + 170,
            width: "100%",
            position: "absolute",
          }}
        ></div>
        <form
          onSubmit={form.handleSubmit(handleUpdate)}
          className={`flex flex-col gap-2 h-min w-4/5 mt-16 mx-auto p-5 rounded-md z-40 bg-white/60`}
        >
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem className="flex">
                <FormControl>
                  <ProfileUploader
                    fieldChange={field.onChange}
                    mediaUrl={user.imageUrl}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nombre <Required />
                </FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Apellido <Required />
                </FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefono</FormLabel>
                <div className="flex">
                  <Input
                    value={"+54"}
                    className="shad-input w-[50px] mr-2"
                    disabled
                  />
                  <FormControl>
                    <Input
                      type="number"
                      className="shad-input"
                      {...field}
                      placeholder="11-12345678"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email <Required />
                </FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nueva Contraseña</FormLabel>
                <div className="flex items-center">
                  <FormControl>
                    <Input
                      type={seeNewPassword ? "text" : "password"}
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setSeeNewPassword(!seeNewPassword)}
                  >
                    <img
                      src={`/icons/${
                        seeNewPassword ? "eye-out-white" : "eye-white"
                      }.svg`}
                      className="w-6 h-6 ml-2 cursor-pointer"
                      alt="eye"
                    />
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <p className="text-sm text-light-4">
                  Para modificar tu perfil, por favor ingresa tu contraseña
                  debajo.
                </p>
                <FormLabel>Contraseña</FormLabel>
                <div className="flex items-center">
                  <FormControl>
                    <Input
                      type={seePassword ? "text" : "password"}
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setSeePassword(!seePassword)}
                  >
                    <img
                      src={`/icons/${
                        seePassword ? "eye-out-white" : "eye-white"
                      }.svg`}
                      className="w-6 h-6 ml-2 cursor-pointer"
                      alt="eye"
                    />
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary mt-2">
            {isLoadingUpdate || isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Cargando...
              </div>
            ) : (
            "Modificar Perfil"
            )}
          </Button>
        </form>
      </div>
    </Form>
  );
}

export default Perfil;
