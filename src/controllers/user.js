const { User, Teacher } = require('../models/user');

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
    const {
      firstName,
      lastName,
      phone,
      address,
      city,
      state,
      zip,
      acceptTerms,
      ...otherFields
    } = req.body;

    const user = new User({
      firstName,
      lastName,
      phone,
      address,
      city,
      state,
      zip,
      acceptTerms,
      ...otherFields,
    });

    // Validate user data:
    const validationError = user.validateSync();
    if (validationError) {
      const errors = Object.keys(validationError.errors).map(
        (key) => validationError.errors[key].message
      );
      return res.status(400).json({ errors });
    }

    await user.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Internal server error!' });
  }
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
