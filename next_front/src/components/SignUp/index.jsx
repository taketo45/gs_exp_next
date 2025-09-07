import React from 'react'
import styles from "./style.module.scss"
import g_styles from "@/styles/errors.module.scss"
import Link from 'next/link'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/navigation"; 

const signupSchema = z.object({
  name: z.string()
    .min(1, "名前は入力してください")
    .max(30, "名前は30文字以下で登録してください"),
  email: z.string()
    .min(1, "メールアドレスが未入力です")
    .email("メールアドレスの形式で入力してください"),
  password: z.string()
    .min(1, "パスワードが未入力です")
    .min(6, "パスワードは6文字以上にしてください")
});

const SignUp = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: {errors}
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  // 画面遷移するためにuseRouterを使えるように準備する
  const router = useRouter();

  //登録処理
  const handleSignup = async (data) => {
    try {
      const response = await apiClient.post("/api/auth/register", {
        username: data.name,
        email: data.email,
        password: data.password,
      });
      //登録成功後にログイン画面に遷移する
      localStorage.setItem("token", response.data.token);
      setTimeout(() => {
        router.push("/");

      }, 2000);
    } catch (error) {
      console.log(error, "error");
      alert("エラーが発生しました。apiサーバーの状態・設定が正しいか確認してください");
    }
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(handleSignup)}>
        <h3 className={styles.form__title}>アカウント作成</h3>

        <div className={styles.form__item}>
          <label htmlFor="">お名前</label>
          <input
            id="name"
            name="name"
            type="text" 
            placeholder="お名前を入力してください" 
            {...register("name")}
          />
          {errors.name && <span className={g_styles.validation}>{errors.name.message}</span>}
        </div>

        <div className={styles.form__item}>
          <label htmlFor="">メールアドレス</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="メールアドレスを入力してください" 
            {...register("email")}
          />
          {errors.email && <span className={g_styles.validation}>{errors.email.message}</span>}
        </div>

        <div className={styles.form__item}>
          <label htmlFor="">パスワード</label>
          <input
            id="password"
            name="password"
            type="password" 
            placeholder="パスワードを入力してください" 
            {...register("password")}
          />
          { errors.password && 
            <span className={g_styles.validation}>
            {errors.password.message}
            </span> 
            }
        </div>

        <button className={styles.form__btn}>
          <AutoAwesomeIcon style={{ color: "red" }} />
          登録
        </button>
      </form>
    </div>
  );
};

export default SignUp;