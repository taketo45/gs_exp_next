import React from "react";
import styles from "./style.module.scss";
import g_styles from "@/styles/errors.module.scss";
import Link from "next/link";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/navigation"; // 絶対にnavigationを選ぶこと！

const loginSchema = z.object({
  email: z.string().min(1, "メールアドレスが未入力です").email("メールアドレスの形式で入力してください"),

  password: z.string().min(1, "パスワードが未入力です").max(30, "パスワードは30文字以内にしてください"),
});

const Login = () => {
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange", // リアルタイムバリデーションを有効にする
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const router = useRouter();

  // useStateを


  const onSubmit = async (data) => {
    try {
      const response = await apiClient.post("/api/auth/login", {
        email: data.email,
        password: data.password,
      });
      localStorage.setItem("token", response.data.token);
      router.push("/");
    } catch (error) {
      console.log("error", error);
      alert("エラーが発生しました。apiサーバーの状態・設定が正しいか確認してください");
    }
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.form__title}>ログイン</h3>

        <div className={styles.form__item}>
          <label htmlFor="">メールアドレス</label>
          <input
           id="email"
           name="email"
           type="text"
           placeholder="メールアドレスを入力してください" {...register("email")} 
          />
          {errors.email && <span className={g_styles.validation}>{errors.email.message}</span>}
        </div>

        <div className={styles.form__item}>
          <label htmlFor="">パスワード</label>
          <input 
           id="password" 
           name="password" 
           type="text" 
           placeholder="パスワードを入力してください" {...register("password")} 
          />
          {errors.password && <span className={g_styles.validation}>{errors.password.message}</span>}
        </div>

        <button className={styles.form__btn}>
          <AutoAwesomeIcon style={{ color: "green" }} />
          ログイン
        </button>
      </form>
    </div>
  );
};

export default Login;
