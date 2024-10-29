import express from "express";
import User from "../models/User";

const router = express.Router();

router.get("/searchUser/:searchTerm", async (req, res) => {
  const searchTerm = req.params.searchTerm;
  try {
    const users = await User.find({
      username: { $regex: searchTerm, $options: "i" },
    })
      .limit(10)
      .select("username -_id");
    const usernames = users.map((user) => user.username);
    res.json(usernames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
