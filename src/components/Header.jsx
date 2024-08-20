import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 hover:text-gray-900"
        >
          My Blog
        </Link>
        <nav className="mt-2 md:mt-0">
          <ul className="flex flex-wrap items-center space-x-4">
            <li>
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/new"
                className="text-gray-600 hover:text-gray-900 transition duration-300"
              >
                New Post
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
