import User from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, Password } = req.body;
    const user = await User.findOne({ email, Password });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { Password, ...data } = req.body;

    const user = await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findByIdAndDelete(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findById(id).select("-Password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
