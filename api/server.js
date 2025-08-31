const express = require("express");


const app = express();

const { PrismaClient } = require("@prisma/client");
// const { PrismaClient } = require("./generated/prisma");
// import { PrismaClient } from './generated/prisma'

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const PORT = 8888;

const prisma = new PrismaClient();

app.use(express.json());

app.get("/",(req, res) => {
  res.send("<h1>API作っているよ!!!</h1>");
});

app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPass = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPass,
    },
  });

  return res.json({ user });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: {email} });
  if(!user){
    return res.status(404).json({
      error: "そのユーザーは存在しません",
    });
  }

  const isPasswordCheck = await bcrypt.compare(password, user.password);

  if(!isPasswordCheck){
    return res.status(401).json({
      error: "そのパスワードはまちがっています",
    });
  }

  // token = チケットのイメージ もしくは 入場券
  const token = jwt.sign({ id: user.id }, process.env.KEY, {
    expiresIn: "1d",
  });

  return res.json({ token });

});




//ここでサーバーを起動させます
app.listen(PORT, () => console.log("server start!!!!!!"));