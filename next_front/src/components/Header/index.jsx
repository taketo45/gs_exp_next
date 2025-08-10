import React, { useState, useEffect } from "react";
import styles from "@/components/Header/style.module.scss";
import Link from "next/link";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import { useRouter } from "next/navigation";

const index = () => {
  const [isAuth, setIsAuth] = useState();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
    //！！token は tokenの値を明示的にboolean 型に変換するテクニック🤗
    // tokenがあれば true、なければ false になる
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    router.push("/login");
  };

  return (
    <div className={styles.header}>
      <ul>
        <li>
          {isAuth ? (
            <>
              <div onClick={logout}>
                <AccessibilityIcon />
                ログアウト
              </div>
            </>
          ) : (
            <Link href="/login">
              <AccessibilityIcon />
              ログイン
            </Link>
          )}
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
  );
};

export default index;
