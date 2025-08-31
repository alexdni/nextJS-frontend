import Link from 'next/link';

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-container">
          <Link href="/" className="nav-logo">
            Divergence Blog
          </Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">
              Articles
            </Link>
            <Link href="/authors" className="nav-link">
              Authors
            </Link>
            <Link href="/categories" className="nav-link">
              Categories
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
