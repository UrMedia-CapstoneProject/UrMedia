"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import styles from "./Navbar.module.css"
import SignOutButton from "./SignOutButton"

export default function Navbar() {
    return (
        <div className={styles.main}>
            <div className={styles.search}>
                <Link href="/catalog">
                    <Image
                        src="/navbar-icons/browse1.png"
                        title="Browse Catalog"
                        alt="Browse"
                        width={40}
                        height={40}
                        className={styles.browseIcon}
                    />
                </Link>
                <div className={styles.searchBar}>
                    <input type="text" placeholder="Search..." className={styles.searchBarInput} />
                    <Link href="/catalog" className={styles.searchBarButton}>
                        <Image
                            src="/navbar-icons/search1.png"
                            title="Search"
                            alt="Search"
                            width={25}
                            height={25}
                        />
                    </Link>
                </div>
            </div>
            <Link href="/" className={styles.logo}>
                <h1 className={styles.logoText}>UrMedia</h1>
            </Link>
            <div className={styles.profile}>
                <div className={styles.dropdownWrapper}>
                    <Link href="/profile">
                        <Image
                            src="/test-images/dog1.jpg"
                            title="Username"
                            alt="Profile"
                            width={50}
                            height={50}
                            className={styles.pfp}
                        />
                    </Link>

                    <Image
                        src="/navbar-icons/caret-down1.png"
                        title="Dropdown"
                        alt=""
                        width={18}
                        height={18}
                        className={styles.dropdown}
                    />

                    <div className={styles.dropdownMenu}>
                        <Link href="/profile">Profile</Link>
                        <Link href="/profile/edit">Edit Profile</Link>
                        <SignOutButton />
                    </div>
                </div>
            </div>
        </div>
    )
}