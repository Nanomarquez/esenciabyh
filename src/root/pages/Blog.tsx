import { useState, useMemo } from 'react';
import { useGetPosts } from '@/lib/react-query/queriesAndMutations';
import BlogCard from "@/components/shared/BlogCard";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectViewport, SelectItem, SelectItemText, SelectIcon, SelectScrollUpButton, SelectItemIndicator, SelectScrollDownButton } from '@radix-ui/react-select';
import { CheckIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/shared';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState(""); 

  const toggleSortDate = () => {
    setSortOrder(prevOrder => prevOrder === "asc" ? "desc" : "asc");
  };

  const { data, isLoading, isError, error } = useGetPosts();

  const filteredPosts = useMemo(() => {
    if (!data) return [];
    
    // Concatenar todas las páginas en un solo array
    const allPosts = data.pages.reduce((acc, page) => acc.concat(page.documents), []);

    return allPosts.filter(post =>
      post.title.toLowerCase().includes(searchQuery) &&
      (selectedCategory === "all" || post.category === selectedCategory)
    ).sort((a, b) => {
      if (!sortOrder) return 0;
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }, [data, searchQuery, selectedCategory, sortOrder]);

  if (isLoading) return  <div className="flex-center gap-2"><Loader /> Cargando...</div>;
  if (isError) return <div>Error al cargar posts: {error.message}</div>;

  return (
    <div className="common-container mt-12">
      <div className="mb-4 flex items-center justify-between">
        <Input
          type="text"
          className="shad-input"
          onChange={e => setSearchQuery(e.target.value.toLowerCase())}
          value={searchQuery}
        />
        <div className="relative w-full max-w-xs mt-2">
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="select-trigger border border-gray-300 rounded-lg p-2 flex justify-between items-center">
              <SelectValue placeholder="Seleccione una categoría" />
              <SelectIcon />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg mt-1">
              <SelectScrollUpButton />
              <SelectViewport>
                {["all", "Ceras", "Emprendimiento", "Productos"].map(category => (
                  <SelectItem key={category} value={category} className="p-2 hover:bg-gray-100 cursor-pointer select-none">
                    <SelectItemText>{category}</SelectItemText>
                    <SelectItemIndicator className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <CheckIcon />
                    </SelectItemIndicator>
                  </SelectItem>
                ))}
              </SelectViewport>
              <SelectScrollDownButton />
            </SelectContent>
          </Select>
        </div>

        <button onClick={toggleSortDate} className="btn btn-primary mt-2">
          Ordenar por fecha {sortOrder === "asc" ? "ascendente" : "descendente"}
        </button>
      </div>

      <div className="flex flex-wrap -mx-4">
        {filteredPosts.map(post => (
          <BlogCard
            key={post.$id}
            id={post.$id}
            date={post.date}
            coverImageUrl={post.coverImageUrl}
            title={post.title}
            creator={post.creator}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </div>
  );
};

export default Blog;
