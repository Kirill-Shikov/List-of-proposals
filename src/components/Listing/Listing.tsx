import React from 'react';
import { EtsyItem, ListingProps } from './Listing.types';

const formatPrice = (price: string, currencyCode: string): string => {
  const priceNum = parseFloat(price);
  if (isNaN(priceNum)) {
    return `${currencyCode} 0.00`;
  }
  switch (currencyCode) {
    case 'USD': return `$${priceNum.toFixed(2)}`;
    case 'EUR': return `€${priceNum.toFixed(2)}`;
    case 'GBP': return `£${priceNum.toFixed(2)}`;
    default: return `${currencyCode} ${priceNum.toFixed(2)}`;
  }
};

const getStockClass = (quantity: number): string => {
  if (quantity <= 10) return 'stock-low';
  if (quantity <= 20) return 'stock-medium';
  return 'stock-high';
};

const truncateTitle = (title: string | null | undefined): string => {
  if (title == null || title === '') return 'Untitled';
  if (title.length <= 50) return title;
  return title.slice(0, 50) + '…';
};

const Listing: React.FC<ListingProps> = ({ items = [] }) => {
  // Фильтрация внутри компонента
  const validItems = items.filter(item => item.MainImage?.url_570xN);

  if (validItems.length === 0) {
    return <div className="listing">No items available</div>;
  }

  return (
    <div className="listing">
      {validItems.map((item) => (
        <div key={item.listing_id} className="product-card">
          <img
            src={item.MainImage?.url_570xN || '/default-image.png'}
            alt={item.title || 'Product image'}
            className="product-image"
          />
          <div className="product-info">
            <h3 className="product-title">{truncateTitle(item.title)}</h3>
            <div className="price-container">
              <div className="product-price">
                {formatPrice(item.price, item.currency_code)}
              </div>
              <span className={`stock-badge ${getStockClass(item.quantity)}`}>
                {item.quantity} left
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Listing;
