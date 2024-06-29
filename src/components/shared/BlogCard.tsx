import { Link } from 'react-router-dom';

interface BlogCardProps {
  id: string; 
  date: string; 
  coverImageUrl: string;
  title: string;
  creator: {
    name: string; 
    lastname?: string; 
  };
  excerpt: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ id, date, coverImageUrl, title, creator, excerpt }) => {
  
  return (
    <div className="w-full md:w-1/3 p-4">
      <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
        <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url(${coverImageUrl})` }}>
          <div className="absolute top-0 left-0 bg-white text-black p-2 rounded-br-lg">
            <span className="text-sm">{date}</span>
          </div>
        </div>
        <div className="p-4">
          <div className="text-pink-500 text-sm font-semibold mb-2">BLOG</div>
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 text-sm mb-4">Por {creator.name}</p>
          <p className="text-gray-700 mb-4">{excerpt}</p>
          <Link 
            to={`/blog/post/${id}`} 
            className="bg-red-500 py-2 px-4 rounded hover:bg-red-600 transition duration-300"
          >
            CONTINUAR LEYENDO
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
