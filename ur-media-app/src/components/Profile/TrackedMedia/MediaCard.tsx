"use client"
import styles from "./MediaCard.module.css"
import { useState } from "react"
import Poster from "@/components/Global/Poster";

export default function () {
    return (
        <div className={styles.main}>
            <div className={styles.poster}>
                <Poster title = {"The Odyssey"} imageUrl = {"/test-images/the-odyssey.jpg"}/>
            </div>

            <div className={styles.info}>
                <p>{"The Odyssey"}</p>

                <div className={styles.userInfo}>
                    <p>Status: Plan to Watch</p>
                    <p>10/10</p>
                </div>
            </div>
        </div>
    )
}