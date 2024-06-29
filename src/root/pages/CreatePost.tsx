// CreatePost.jsx
import PostForm from "@/components/shared/PostForm";

const CreatePost = () => {
  return (
    <div className="container mx-auto my-20">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      <PostForm action="Create" />
    </div>
  );
};

export default CreatePost;
