"use client"
import { useEffect, useState } from "react"
import styles from "./Friends.module.css"
import { FriendTrackedMedia } from "@/types/types"
import UpdateCard from "./UpdateCard"
import FriendCard from "./FriendCard"

export default function Friends({ friendInfo }: { friendInfo: FriendTrackedMedia[] }) {

    //const loadFriendInfo = async () => {
    //    const validationError = validateForm()
    //
    //    if (validationError) {
    //        setErrorMessage(validationError)
    //        setSuccessMessage("")
    //        return
    //    }

    //    setErrorMessage("")
    //    setSuccessMessage("")

    //    await fetch("/api/friends", {
    //        method: "GET",
    //       headers: {
    //            "Content-Type": "application/json",
    //        },
    //    });

    //    setSuccessMessage("Friends loaded!")
    //}

    const [newFriend, setNewFriend] = useState("")

    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const validateForm = () => {
        if (newFriend === "" || newFriend.length > 16) { return "Invalid username" }
        return null
    }

    const handleAdd = async () => {
        const validationError = validateForm()

        if (validationError) {
            setErrorMessage(validationError)
            setSuccessMessage("")
            return
        }

        setErrorMessage("")
        setSuccessMessage("")

        const payload = { friend: newFriend }

        console.log("Add friend payload:", payload)

        await fetch("/api/friends", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        setSuccessMessage("Friend Added!")
    }

    return (
        <div className={styles.main}>
            <h2 className={styles.sectionHeader}>Friends</h2>

            <div className={styles.content}>
                <div className={styles.searchBar}>
                    <input 
                        type="text"
                        value={newFriend}
                        onChange={(e) => setNewFriend(e.target.value)}
                        placeholder="Search for friends"
                        className={styles.searchBarInput}
                    />
                    <button className={styles.add} onClick = {handleAdd}>Add</button>
                </div>
                <h3 className={styles.recentHeader}>Recent Activity</h3>
                <div className={styles.updateCards}>
                    <UpdateCard />
                </div>
            </div>
        </div>
    )
}