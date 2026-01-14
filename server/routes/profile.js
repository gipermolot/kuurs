import express from "express";
import { authMiddleware } from "./auth.js";
import { prisma } from "../db.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  res.json({ user });
});

export default router;
