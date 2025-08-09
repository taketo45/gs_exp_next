import React from 'react'
import styles from "./style.module.scss"
import g_styles from "@/styles/style.module.scss"
import Link from 'next/link'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

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

const Login = () => {
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

  const onSubmit = (data) => {
    console.log(data);
    reset();
  }

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            type="text" 
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

export default Login;