"use client";
import React from 'react';
import Link from 'next/link';
import styles from "../../styles/maintanance.module.css";
import anime from "animejs/lib/anime.min.js";


const MaintenancePage = () => {
  React.useEffect(() => {
    anime({
      targets: ".loading-circle",
      scale: [
        { value: 1.1, easing: "easeOutSine", duration: 500 },
        { value: 1, easing: "easeInOutQuad", duration: 500 },
      ],
      rotate: "1turn",
      loop: true,
    });
  }, []);
  return (
    <div className={styles.maintenancePage}>
    <h1 className="text-5xl font-bold bg-clip-text bg-gradient-to-r animate-pulse from-white">
    WE&apos;re UNDER CONSTRUCTION</h1>
 
  <p className={styles.description}>
  Our website is currently under maintenance. We&apos;ll be back soon!
  </p>
  <Link href="/about">
          About Us
        </Link>
  <div className={styles.Imaged}>
    <div className={styles.loadingCircle} />
  </div>
</div>
  );
};

export default MaintenancePage;