import React, { useEffect, useState } from 'react';
import { fetchItems } from '../services/api';
import ItemCard from './ItemCard';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchItems();
        setItems(data.data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Marketplace Items</h2>
      {loading ? (
        <p>Loading items...</p>
      ) : items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
