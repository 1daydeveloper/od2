"use client";
import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useState } from 'react';
import styles from "../../styles/maintanance.module.css";

const MaintenancePage = () => {
  
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