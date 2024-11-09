import express from "express";
import Chat from "../models/Message";
const authenticate = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/getLatestChats/:user", authenticate, async (req, res) => {
  const user = req.params.user;
  try {
    const chats = await await Chat.aggregate([
      {
        $match: {
          $or: [{ sender: user }, { recipient: user }],
        },
      },
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$sender", user] },
              then: "$recipient",
              else: "$sender",
            },
          },
          timestamp: { $first: "$timestamp" },
        },
      },
      { $sort: { timestamp: -1 } },
      { $limit: 5 },
    ]);
    res.json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
