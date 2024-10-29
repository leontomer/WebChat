import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { check, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/register",
  [
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
    check("confirmPassword", "Passwords do not match").custom(
      (value, { req }) => value === req.body.password
    ),
  ],
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    const token = jwt.sign(
      { username: username },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ token });
  }
);

router.post("/login", async (req: any, res: any) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  const token = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );
  res.json({ token });
});

export default router;
