import React from 'react'
import styles from "@/components/Header/style.module.scss"
import Link from 'next/link'
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";

const index = () => {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link href="/login">
            <AccessibilityIcon />
            ログイン
          </Link>
        </li>
        <li>
          <Link href="/signup">
            <AirplanemodeActiveIcon />
            登録
          </Link>
        </li>
        <li>
          <Link href="/timeline">
            <AirplanemodeActiveIcon />
            タイムライン
          </Link>
        </li>
        <li>
          <Link href="/construction">
            <AirplanemodeActiveIcon />
            作成中
          </Link>
        </li>
      </ul>

    </div>
  )
}

export default index