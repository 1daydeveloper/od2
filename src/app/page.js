"use client";
import Image from "next/image";
import React from "react";
import anime from "animejs/lib/anime.min.js";
import styles from "../styles/Home.module.css";
import Link from 'next/link';

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
      <div className={styles.Imaged}>
        <Image
          src="/odd.png"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
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

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div class="container"></div>
    </main>
  );
}
export default MaintenancePage;
