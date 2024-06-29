

interface BlogPostProps {
  title: string;
  description: string;
  coverImageUrl: string; 
  categories: string[];
  created_at: string;
  creator: { 
    name: string;
    lastname: string;
  };
}

const BlogPost: React.FC<BlogPostProps> = ({ title, description, coverImageUrl, categories, created_at, creator }) => {
  const formattedDescription = description.replace(/\n/g, '<br />');
  return (
    <div className="max-w-4xl  mt-20 flex flex-col ">
      <div className="relative">
        <img src={coverImageUrl} alt={`Cover for ${title}`} className="w-full object-cover rounded-lg shadow-lg" style={{ height: '250px', width: "1800px" }} />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center" style={{ background: 'rgba(0, 0, 0, 0.5)' }}> {/* Añadir un fondo oscuro para mejorar la legibilidad */}
          <h1 className="text-4xl font-bold text-white text-center">{title}</h1>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between text-gray-400">
          <span>{new Date(created_at).toLocaleDateString()}</span>
          {creator && (
            <span>by {creator.name} {creator.lastname}</span>
          )}
        </div>
        <div dangerouslySetInnerHTML={{ __html: formattedDescription }} className="text-gray-800 mt-4" />
        <div className="mt-4">
          {categories && categories.map((category, index) => (
            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{category}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
