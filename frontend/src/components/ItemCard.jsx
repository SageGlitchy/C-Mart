import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
  return (
    <div className="border rounded shadow p-4 hover:shadow-lg transition">
      <Link to={`/item/${item._id}`}>
        <img
          src={item.imageUrl || 'https://via.placeholder.com/150'}
          alt={item.title}
          className="w-full h-48 object-cover rounded"
        />
        <h3 className="mt-2 font-semibold text-lg">{item.title}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
      </Link>
    </div>
  );
};

export default ItemCard;
