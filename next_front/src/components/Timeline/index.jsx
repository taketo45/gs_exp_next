import React from 'react'
import styles from "./style.module.scss"
import g_styles from "@/styles/style.module.scss"
import Link from 'next/link'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { Button } from '@mui/material';
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const timelineSchema = z.object({
  timeline: z.string()
    .min(1, "本文は必須です")
    .min(10, "本文は10文字以上で入力してください")
    .max(200, "本文は200文字以下で入力してください")
})


const Timeline = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
  mode: "onChange", // リアルタイムバリデーションを有効にする
  resolver: zodResolver(timelineSchema),
  defaultValues: {
  timeline: ''
}
})

  const onSubmit = (data) => {
    console.log(data);
    reset();
  }
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