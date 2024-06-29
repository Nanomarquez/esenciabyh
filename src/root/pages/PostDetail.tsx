import { useParams } from 'react-router-dom';
import BlogPost from '@/components/shared/BlogPost';
import { useGetPostById } from '@/lib/react-query/queriesAndMutations'; // Asumiendo que has creado esta función

const PostDetail = () => {
  const { id } = useParams();
  const { data: post, isLoading, isError, error } = useGetPostById(id);

  if (isLoading) {
    return <div className="text-center py-8">Cargando...</div>;
  }

  if (isError) {
    return <div className="text-center py-8">Error: {error.message}</div>;
  }

  if (!post) {
    return <div className="text-center py-8">No se encontró el post.</div>;
  }

  const { title, description, coverImageUrl, categories, created_at, creator } = post;
  
  return (
    <div className="common-container">
      <BlogPost
        title={title}
        description={description}
        coverImageUrl={coverImageUrl}
        categories={categories}
        created_at={created_at}
        creator={{
          name: creator?.name || "Nombre desconocido",
          lastname: creator?.lastName || "Apellido desconocido",
        }}
      />
    </div>
  );
};

export default PostDetail;
