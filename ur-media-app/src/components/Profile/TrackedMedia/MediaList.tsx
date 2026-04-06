"use client"
import styles from "./MediaList.module.css"
import { useState } from "react"
import Media from "./MediaCard";

export default function() {
    return (
        <div className={styles.main}>
            <Media />
            <Media />
            <Media />
            <Media />
            <Media />
            <Media />
            <Media />
            <Media />
        </div>
    )
}