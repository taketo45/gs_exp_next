import React from 'react'
import styles from "./style.module.scss"
import Link from 'next/link'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { Button } from '@mui/material';

const Timeline = () => {
  const handleSubmit = () => {
    
  }
  return (
    <div className={styles.timeline}>
      <form onSubmit={handleSubmit}>
        <textarea name="" id="" placeholder='本文を入力してください。'></textarea>
        <Button
          size='large'
          variant='outlined'
          color='success'
        >送信</Button>
      </form>

    </div>
  );
};

export default Timeline;