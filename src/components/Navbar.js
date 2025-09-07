import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <header className="p-4 border-b border-dark-border flex items-center justify-between bg-dark-card">
  <Link to="/" className="text-2xl font-bold text-dark-accent hover:underline">Reel Manager</Link>
    <nav className="space-x-4">
      <Link to="/" className="text-dark-muted hover:text-dark-accent">Categories</Link>
      <Link to="/movies" className="text-dark-muted hover:text-dark-accent">Movies</Link>
  {/* Reels link removed */}
    </nav>
  </header>
);

export default Navbar;
