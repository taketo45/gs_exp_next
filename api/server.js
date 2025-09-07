
const express = require("express");


const app = express();

const cors = require("cors");

const { PrismaClient } = require("@prisma/client");
// const { PrismaClient } = require("./generated/prisma");
// import { PrismaClient } from './generated/prisma'

const bcrypt = require("bcrypt")

// json web token jwtの機能を設定します🤗
const jwt = require("jsonwebtoken");

const PORT = 8888;

const prisma = new PrismaClient();

// 必ずexpress.json()の上で記述！そうしないとcorsが回避できません！！
app.use(cors());

// jsで書いた文字列をjsonとしてexpressで使えるようにする必要があります🤗
app.use(express.json());


// ミドルウェア=レストランの入り口 で 「予約がしてる？」の確認のようなイメージ🤗
// 予約（＝トークン）がある人 → 店内（＝APIの処理）に進める
// 予約がない人 → 入れない（エラーになる）
const authenticateToken = (req, res, next) => {
  console.log("Authorization ヘッダー:", req.headers.authorization);

  const token = req.headers.authorization?.split(" ")[1]; //予約（トークン）を取り出す
  console.log("抽出されたトークン:", token);

  if (!token) {
    // 予約（トークン）がない場合は入れない
    return res.status(401).json({ message: "認証トークンが必要です。" });
  }

  try {
    const decoded = jwt.verify(token, process.env.KEY); //予約（トークン）を確認
    console.log("デコード結果:", decoded);

    req.user = decoded; //OKならユーザー情報を設定🤗
    next(); // 店（APIの処理）に進める
  } catch (error) {
    console.log("JWT 検証エラー:", error);
    return res.status(403).json({ message: "無効なトークンです。" });
  }
};




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

  // token = チケットのイメージ もしくは 入場券
  const token = jwt.sign({ id: user.id }, process.env.KEY, {
    expiresIn: "1d",
  });

  return res.json({ user,token });
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


// 投稿API authenticateTokenは次のページで記述しています🤗
app.post("/api/post", authenticateToken, async (req, res) => {
  console.log("現在のユーザー ID:", req.user.id);
  //userのidをチェックします🤗が流れとしては次のページを参考にしてください🤗

  const { content } = req.body;
  console.log(content, "content");
  // contentが空の時=文字が入力されていないのでここでエラーでDBにデータを送らないようにする🤗
  if (!content) {
    return res.status(400).json({ message: "投稿内容が入力されていません" });
  }

  try {
    // 成功した時にprismaを使用してデータを登録する🤗
    const post = await prisma.post.create({
      data: {
        content,
        authorId: req.user.id,
      },
      include: {
        //ここはポイントになります！
        author: true,
      },
    });
    res.status(201).json(post);
  } catch (err) {
    console.log(err, "エラー内容");
    res.status(500).json({ message: "サーバーエラーです。" });
  }

  // この下は消さない
});

// 投稿取得API🤗
app.get("/api/posts", async (req, res) => {
  try {
    // 成功した時にprismaを使用してデータを取得🤗
    const posts = await prisma.post.findMany({
      take: 10, //これで最新の10件を取得できる🤗超便利！,
      orderBy: { createdAt: "desc" }, //これで登録日から降順で取得(登録された最後のものから順番に取得)
      include: {
        //ここはポイントになります！
        author: true,
      },
    });
    res.status(201).json(posts);
  } catch (err) {
    console.log(err, "エラー内容");
    res.status(500).json({ message: "サーバーエラーです。" });
  }

  // この下は消さない
});



//ここでサーバーを起動させます
app.listen(PORT, () => console.log("server start!!!!!!"));