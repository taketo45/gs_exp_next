const express = require("express");


const app = express();

// const { PrismaClient } = require("@prisma/client");
const { PrismaClient } = require("./generated/prisma");
// import { PrismaClient } from './generated/prisma'

const PORT = 8888;

const prisma = new PrismaClient();

app.use(express.json());

app.get("/",(req, res) => {
  res.send("<h1>API作っているよ!!!</h1>");
});

app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });

  return res.json({ user });
});

//ここでサーバーを起動させます
app.listen(PORT, () => console.log("server start!!!!!!"));