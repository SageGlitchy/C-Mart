const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { receiver, item, content } = req.body;
    const newMessage = new Message({
      sender: req.user.id,
      receiver,
      item,
      content,
    });
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { withUser, item } = req.query;
    if (!withUser || !item) {
      return res.status(400).json({ message: 'Missing query parameters' });
    }
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: withUser, item },
        { sender: withUser, receiver: req.user.id, item },
      ],
    })
      .sort({ createdAt: 1 })
      .populate('sender', 'name email')
      .populate('receiver', 'name email');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
