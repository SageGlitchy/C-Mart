import React, { useEffect, useState } from 'react';
import { fetchItems } from '../services/api';
import ItemCard from '../components/ItemCard';

const Profile = () => {
  const [userItems, setUserItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const loadUserItems = async () => {
      try {
        const res = await fetchItems({ seller: userId });
        setUserItems(res.data);
      } catch (error) {
        console.error('Failed to fetch user items:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUserItems();
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">My Listings</h2>
      {loading ? (
        <p>Loading your items...</p>
      ) : userItems.length === 0 ? (
        <p>You have no listings.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {userItems.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
