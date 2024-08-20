import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white max-w-xs sm:max-w-2xl md:w-[500px] mx-auto shadow-md rounded-lg overflow-hidden mb-6">
      <img
        src={post.bannerImage}
        alt={post.title}
        className="w-full h-52 object-cover"
      />
      <div className="p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-4">{post.content.slice(0, 100)}...</p>
        <Link
          to={`/posts/${post._id}`}
          className="text-blue-500 hover:underline"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
