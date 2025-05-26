import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  featured?: boolean; // Support list view layout
}

const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { addToCart } = useCart();
  const { id, name, price, images, type, origin, discount } = product;

  const discountedPrice = discount ? price - (price * discount / 100) : price;

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
      <div
          className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${
              featured ? 'flex gap-4 items-start p-4' : ''
          }`}
      >
        <Link
            to={`/product/${id}`}
            className={`block relative ${featured ? 'w-40 aspect-square' : 'aspect-square'} overflow-hidden`}
        >
          <img
              src={images[0]}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          {discount && (
              <div className="absolute top-2 left-2 bg-honey-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                {discount}% OFF
              </div>
          )}
        </Link>

        <div className={`${featured ? 'flex-1' : 'p-4'}`}>
          <div className="text-sm text-gray-600 mb-1">
            {type} • {origin}
          </div>
          <Link to={`/product/${id}`}>
            <h3 className="font-medium text-lg text-forest-900 hover:text-honey-600 transition-colors">
              {name}
            </h3>
          </Link>

          <div className="flex items-center mt-2 mb-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                      key={star}
                      size={16}
                      className={star <= 4 ? 'text-honey-500 fill-honey-500' : 'text-gray-300'}
                  />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">4.0</span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-baseline">
              {discount ? (
                  <>
                <span className="text-lg font-bold text-forest-800">
                  ${discountedPrice.toFixed(2)}
                </span>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                  ${price.toFixed(2)}
                </span>
                  </>
              ) : (
                  <span className="text-lg font-bold text-forest-800">${price.toFixed(2)}</span>
              )}
            </div>

            <button
                onClick={handleAddToCart}
                className="p-2 rounded-full bg-honey-50 hover:bg-honey-100 text-honey-600 transition-colors"
                aria-label="Add to cart"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
  );
};

export default ProductCard;
