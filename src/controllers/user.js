const User = require('../models/user');

const handleGetAllUsers = async (req, res) => {
  try {
    const allDBUsers = await User?.find({});
    console.log(allDBUsers);
    return res.json(allDBUsers);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const handleGetUserById = async (req, res) => {
  try {
    const user = await User?.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found!' });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const handleUpdateUserById = async (req, res) => {
  try {
    await User?.findByIdAndUpdate(req.params.id, {
      email: ' ',
    });
    return res.json({ status: 'Success' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const handleDeleteUserById = async (req, res) => {
  try {
    await User?.findByIdAndDelete(req.params.id);
    return res.json({ status: 'Success' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const handleCreateNewUser = async (req, res) => {
  try {
    const user = new User(req.body);

    if (!user?.email) {
      return res.status(400).json({ errors: ['Email is required'] });
    }

    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ errors: ['Email already used in another account!'] });
    }

    const validationError = user.validateSync();
    if (validationError) {
      const errors = Object.keys(validationError.errors).map(
        (key) => validationError.errors[key].message
      );
      return res.status(400).json({ errors });
    }

    await user.save();
    return res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ errors: ['Server error'] });
  }
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
