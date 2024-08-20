import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `https://zupay-server-hhxd.onrender.com/api/posts/${id}`
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Failed to load post.");
      }
    };
    fetchPost();
  }, [id]);

  if (error)
    return (
      <div className="text-center h-[20vh] w-screen flex items-center justify-center font-bold text-3xl">
        {error}
      </div>
    );

  if (!post)
    return (
      <div className="text-center h-[20vh] w-screen flex items-center justify-center font-bold text-3xl animate-pulse">
        Loading...
      </div>
    );

  const postDate = new Date(post.createdAt);

  return (
    <div className="md:max-w-4xl w-[80vw] mx-auto px-4 py-6">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-4">
        Published At: {postDate.toLocaleDateString()}
      </p>
      <img
        src={post.bannerImage}
        alt={post.title}
        className="w-full h-64 md:h-fit object-cover rounded-lg mb-6"
      />
      <p className="text-gray-900 bg-gray-100 p-6 rounded-md text-base sm:text-lg mb-4">
        {post.content}
      </p>
      <p className="text-gray-500 text-sm sm:text-base">By {post.author}</p>
    </div>
  );
};

export default PostDetail;
