import React, { useEffect, useState, useRef } from 'react';
import { getMessages, sendMessage } from '../services/api';
import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');

const Messages = ({ withUserId, itemId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!withUserId || !itemId) return;

    const fetchMessages = async () => {
      try {
        const res = await getMessages({ withUser: withUserId, item: itemId });
        setMessages(res.data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();

    socket.emit('joinRoom', `${withUserId}-${itemId}`);

    socket.on('receiveMessage', (message) => {
      if (
        (message.sender === withUserId && message.receiver === localStorage.getItem('userId')) ||
        (message.sender === localStorage.getItem('userId') && message.receiver === withUserId)
      ) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [withUserId, itemId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    const messageData = {
      receiver: withUserId,
      item: itemId,
      content: newMessage.trim(),
      sender: localStorage.getItem('userId'),
      room: `${withUserId}-${itemId}`,
    };
    try {
      await sendMessage(messageData);
      socket.emit('sendMessage', messageData);
      setMessages((prev) => [...prev, messageData]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-md border rounded p-4">
      <div className="flex-grow overflow-auto mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 p-2 rounded ${
              msg.sender === localStorage.getItem('userId') ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 self-start'
            } max-w-xs`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-grow border rounded px-3 py-2 mr-2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Messages;
