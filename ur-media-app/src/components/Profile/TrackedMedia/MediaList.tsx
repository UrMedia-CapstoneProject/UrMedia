"use client"
import styles from "./MediaList.module.css"
import { useState } from "react"
import MediaCard from "./MediaCard";

export default function() {
    return (
        <div className={styles.main}>
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
        </div>
    )
}