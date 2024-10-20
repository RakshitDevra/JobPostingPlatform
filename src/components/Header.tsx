import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">Cuvette</Link>
        <nav>
          <Link to="/login" className="flex items-center text-gray-600 hover:text-blue-600">
            <User className="mr-2" size={20} />
            <span>Login</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;