import { useEffect, useState, useCallback } from "react";
import PostCard from "./PostCard";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
    return debouncedValue;
  };

  const debouncedSearch = useDebounce(search, 300);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://zupay-server-hhxd.onrender.com/api/posts?search=${encodeURIComponent(
          debouncedSearch
        )}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="mx-auto mt-10 px-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search posts..."
        className="w-full p-2 border border-gray-300 rounded-lg mb-6"
      />
      {loading && (
        <div className="text-center text-gray-500 mb-6">Loading...</div>
      )}
      {error && (
        <div className="text-center text-red-500 mb-6">Error: {error}</div>
      )}
      <div className="flex flex-wrap gap-5">
        {posts.length > 0
          ? posts.map((post) => <PostCard key={post._id} post={post} />)
          : !loading && <p className="text-center">No posts found.</p>}
      </div>
    </div>
  );
};

export default PostList;
