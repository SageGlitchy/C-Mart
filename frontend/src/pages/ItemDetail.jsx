import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchItemById } from '../services/api';
import Messages from '../components/Messages';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMessages, setShowMessages] = useState(false);

  useEffect(() => {
    const loadItem = async () => {
      try {
        const res = await fetchItemById(id);
        setItem(res.data);
      } catch (error) {
        console.error('Failed to fetch item:', error);
      } finally {
        setLoading(false);
      }
    };
    loadItem();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Item not found.</p>;

  const userId = localStorage.getItem('userId');

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <img
            src={item.imageUrl || 'https://via.placeholder.com/400'}
            alt={item.title}
            className="w-full rounded"
          />
          <h2 className="text-2xl font-semibold mt-4">{item.title}</h2>
          <p className="text-gray-700 mt-2">{item.description}</p>
          <p className="text-xl font-bold mt-2">${item.price.toFixed(2)}</p>
          <p className="mt-1 text-gray-600">Category: {item.category}</p>
          <p className="mt-1 text-gray-600">Seller: {item.seller.name}</p>
          <button
            onClick={() => setShowMessages(!showMessages)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {showMessages ? 'Hide' : 'Contact Seller'}
          </button>
        </div>
        <div className="md:w-1/2">
          {showMessages && userId && (
            <Messages withUserId={item.seller._id} itemId={item._id} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
