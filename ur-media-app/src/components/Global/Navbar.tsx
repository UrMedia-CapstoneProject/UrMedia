"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import SignOutButton from "./SignOutButton";
import SearchBar from "./SearchBar";
import SignUpButton from "./SignUpButton";

export default function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!menuRef.current || !buttonRef.current) return;

            const target = event.target as Node;

            if (
                !menuRef.current.contains(target) &&
                !buttonRef.current.contains(target)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
                <SearchBar />
            </div>

            <Link href="/" className={styles.logo}>
                <h1 className={styles.logoText}>UrMedia</h1>
            </Link>

            <button
                className={styles.hamburger}
                ref={buttonRef}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </button>

            <div className={styles.profile}>
                {isLoggedIn ? (
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
                            <Link href="/">Settings</Link>
                            <SignOutButton />
                        </div>
                    </div>
                ) : (
                    <SignUpButton />
                )}
            </div>

            <div
                ref={menuRef}
                className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}
            >
                <Link href="/catalog" onClick={() => setMenuOpen(false)}>
                    Search
                </Link>
                {isLoggedIn ? (
                    <div className={styles.buttons}>
                        <Link href="/profile" onClick={() => setMenuOpen(false)}>
                            Profile
                        </Link>
                        <Link href="/" onClick={() => setMenuOpen(false)}>
                            Settings
                        </Link>
                        <SignOutButton />
                    </div>) : (<SignUpButton />)}

            </div>
        </div>
    );
}
