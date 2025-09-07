import React from 'react'
import styles from "./style.module.scss"
import g_styles from "@/styles/errors.module.scss"
import Link from 'next/link'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { Button } from '@mui/material';
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import apiClient from "@/lib/apiClient";
import { useState } from "react";

const timelineSchema = z.object({
  timeline: z.string()
    .min(1, "本文は必須です")
    .min(10, "本文は10文字以上で入力してください")
    .max(200, "本文は200文字以下で入力してください")
})


const Timeline = ({setPosts}) => {

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
  mode: "onChange", // リアルタイムバリデーションを有効にする
  resolver: zodResolver(timelineSchema),
  defaultValues: {
  timeline: ''
}
})


const onSubmit = async (data) => {
  console.log("フォームデータ:", data);

  if (!data.timeline.trim()) {
    alert("投稿内容を入力してください");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    // tokenをチェックし、ない人は投稿できないようにしているのでここで確認する🤗
    if (!token) {
      alert("ログインが必要です");
      return;
    }
    const response = await apiClient.post(
      "/api/post",
      { content: data.timeline },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    reset(); // ✅ 投稿後にフォームをリセット
    alert("投稿が完了しました！");

    // ✅ 投稿後に `posts` の状態を更新
    setPosts((prevPosts) => [response.data, ...prevPosts]);
  } catch (error) {
    console.error("投稿エラー:", error);
    alert("投稿に失敗しました");
  }
};

  return (
    <div className={styles.timeline}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          name="timeline"
          id="timeline"
          placeholder='本文を入力してください。'
          {...register("timeline")}
        >
        </textarea>
        {errors.timeline && <span className={g_styles.validation}>{errors.timeline.message}</span>}
        <Button
          size='large'
          variant='outlined'
          color='success'
          type="submit" 
        >送信</Button>
      </form>

    </div>
  );
};

export default Timeline;