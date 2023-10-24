const { User } = require('../models/user');

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
  const body = req.body;
  console.log('New user:', body);

  if (!body || !body?.name || !body?.email || !body?.jobTitle) {
    return res.status(400).json({ msg: 'All fields are required!' });
  }

  try {
    const result = await User?.create({
      name: body?.name,
      email: body?.email,
      jobTitle: body?.jobTitle,
    });

    console.log('result', result);
    return res.status(201).json({ msg: 'success!', id: result?._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
