import React from 'react'
import styles from "./style.module.scss"
import Link from 'next/link'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { Button } from '@mui/material';

const Post = ({content, createdAt, author}) => {
  const handleSubmit = () => {
    
  }
  return (
    <div className={styles.post}>
      <p>{new Date(createdAt).toLocaleDateString()}</p>
      <p>{content}</p>
      <p>{author.username}</p>
    </div>
  );
};

export default Post;