const Item = require('../models/Item');

exports.createItem = async (req, res) => {
  try {
    const { title, description, imageUrl, price, category } = req.body;
    const newItem = new Item({
      seller: req.user.id,
      title,
      description,
      imageUrl,
      price,
      category,
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getItems = async (req, res) => {
  try {
    const { keyword, category, minPrice, maxPrice, sortBy } = req.query;
    let filter = { isSold: false };

    if (keyword) {
      filter.title = { $regex: keyword, $options: 'i' };
    }
    if (category) {
      filter.category = category;
    }
    if (minPrice) {
      filter.price = { ...filter.price, $gte: Number(minPrice) };
    }
    if (maxPrice) {
      filter.price = { ...filter.price, $lte: Number(maxPrice) };
    }

    let query = Item.find(filter).populate('seller', 'name email collegeId');

    if (sortBy === 'date') {
      query = query.sort({ createdAt: -1 });
    } else if (sortBy === 'priceAsc') {
      query = query.sort({ price: 1 });
    } else if (sortBy === 'priceDesc') {
      query = query.sort({ price: -1 });
    }

    const items = await query.exec();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('seller', 'name email collegeId');
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    if (item.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    const { title, description, imageUrl, price, category, isSold } = req.body;
    item.title = title || item.title;
    item.description = description || item.description;
    item.imageUrl = imageUrl || item.imageUrl;
    item.price = price || item.price;
    item.category = category || item.category;
    if (typeof isSold === 'boolean') {
      item.isSold = isSold;
    }
    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    if (item.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await item.remove();
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
