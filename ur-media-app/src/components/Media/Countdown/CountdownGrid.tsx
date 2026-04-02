"use client"
import { useState } from "react"
import styles from "./CountdownGrid.module.css"
import Poster from "../../Global/Poster"
import MediaCard from "./MediaCard"

export default function CountdownGrid({}){
    return(
        <div className={styles.main}>
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
            <MediaCard />
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