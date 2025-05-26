import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const { isAuthenticated, user, logout } = useAuth();
  const { cart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle click effect
  const handleNavClick = (item: string) => {
    setClickedItem(item);
    setTimeout(() => {
      setClickedItem(null);
    }, 300); // Reset after 300ms
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
      <header
          className={`fixed w-full z-50 transition-all duration-500 ${
              isScrolled
                  ? 'bg-white/10 backdrop-blur-lg shadow-md py-3'
                  : 'bg-transparent backdrop-blur-md py-4'
          }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <NavLink
              to="/"
              className="flex items-center transform hover:scale-105 transition-transform duration-300"
              onClick={() => handleNavClick('Home')}
          >
            <img
                src="/images/Logo.png"
                alt="Site Logo"
                className="h-12 w-auto object-contain drop-shadow-md" // Changed h-10 to h-12
            />
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Home', 'Shop', 'Our Story', 'Contact'].map((item) => (
                <NavLink
                    key={item}
                    to={item === 'Home' ? '/' : item === 'Shop' ? '/shop' : `#${item.toLowerCase().replace(' ', '-')}`}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${isScrolled ? 'text-gray-900 hover:bg-honey-500' : 'text-white hover:bg-honey-500'}
                group hover:scale-105 hover:shadow-md
                ${clickedItem === item ? 'bg-honey-500 text-white animate-pop' : ''}`}
                    onClick={() => handleNavClick(item)}
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute inset-0 rounded-full bg-gray-200 opacity-0 group-hover:opacity-20 transition-opacity" />
                </NavLink>
            ))}
          </nav>

          {/* User actions */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
                <div className="relative group">
                  <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className={`flex items-center space-x-2 p-2 rounded-full transition-all duration-300
                  ${isScrolled ? 'text-gray-900 hover:bg-gray-100/30' : 'text-white hover:bg-white/20'}`}
                  >
                    <div className="relative">
                      <User size={22} className="transform group-hover:scale-110 transition-transform" />
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-honey-500 rounded-full animate-pulse" />
                    </div>
                    <span className="hidden sm:inline font-medium">{user?.name}</span>
                  </button>

                  {isUserMenuOpen && (
                      <div className="absolute right-0 mt-3 w-56 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl py-2 z-50 animate-fade-in">
                        {user?.role === 'vendor' && (
                            <NavLink
                                to="/vendor/dashboard"
                                className="flex items-center px-4 py-3 text-gray-900 hover:bg-honey-100/50 rounded-t-2xl transition-colors"
                                onClick={() => handleNavClick('Vendor Dashboard')}
                            >
                              <span className="text-sm font-medium">Vendor Dashboard</span>
                            </NavLink>
                        )}
                        <NavLink
                            to="/order-tracking"
                            className="flex items-center px-4 py-3 text-gray-900 hover:bg-honey-100/50 transition-colors"
                            onClick={() => handleNavClick('Order Tracking')}
                        >
                          <span className="text-sm font-medium">My Orders</span>
                        </NavLink>
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-3 text-gray-900 hover:bg-honey-100/50 rounded-b-2xl transition-colors"
                        >
                          <LogOut size={16} className="mr-2" />
                          <span className="text-sm font-medium">Sign Out</span>
                        </button>
                      </div>
                  )}
                </div>
            ) : (
                <NavLink
                    to="/login"
                    className={`flex items-center space-x-1 p-2 rounded-full transition-all duration-300
                ${isScrolled ? 'text-gray-900 hover:bg-gray-100/30' : 'text-white hover:bg-white/20'}
                ${clickedItem === 'Login' ? 'bg-honey-500 text-white animate-pop' : ''}`}
                    onClick={() => handleNavClick('Login')}
                >
                  <User size={22} className="transform hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline font-medium">Sign In</span>
                </NavLink>
            )}

            <NavLink
                to="/checkout"
                className={`relative p-2 rounded-full transition-all duration-300 hover:scale-110
              ${clickedItem === 'Checkout' ? 'bg-honey-500 text-white animate-pop' : ''}`}
                onClick={() => handleNavClick('Checkout')}
            >
              <ShoppingCart
                  size={22}
                  className={`${isScrolled ? 'text-gray-900' : 'text-white'} group-hover:text-gray-700`}
              />
              {cart.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-honey-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {cart.totalItems}
              </span>
              )}
            </NavLink>

            {/* Mobile menu button */}
            <button
                className="md:hidden p-2 rounded-full transition-all duration-300 hover:bg-white/20"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                  <X size={24} className={`${isScrolled ? 'text-gray-900' : 'text-white'}`} />
              ) : (
                  <Menu size={24} className={`${isScrolled ? 'text-gray-900' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl py-6 px-6 z-50 animate-slide-down">
              <nav className="flex flex-col space-y-6">
                {['Home', 'Shop', 'Our Story', 'Contact'].map((item) => (
                    <NavLink
                        key={item}
                        to={item === 'Home' ? '/' : item === 'Shop' ? '/shop' : `#${item.toLowerCase().replace(' ', '-')}`}
                        className={`relative text-gray-900 text-lg font-medium py-3 px-4 rounded-lg hover:bg-honey-500 transition-all duration-300 group
                  ${clickedItem === item ? 'bg-honey-500 text-white animate-pop' : ''}`}
                        onClick={() => handleNavClick(item)}
                    >
                      <span className="relative z-10">{item}</span>
                      <span className="absolute inset-0 rounded-lg bg-gray-200 opacity-0 group-hover:opacity-10 transition-opacity" />
                    </NavLink>
                ))}
              </nav>
            </div>
        )}
      </header>
  );
};

export default Header;