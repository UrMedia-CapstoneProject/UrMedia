"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./NavbarClient.module.css";
import SignOutButton from "./SignOutButton";
import SearchBar from "./SearchBar";
import SignUpButton from "./SignUpButton";
import MediaFilters from "./MediaFilters";
import Form from "next/form"
import { useSearchParams } from "next/navigation";

type NavbarClientProps = {
  isLoggedIn: boolean
  avatarUrl: string | null
}

export default function Navbar({ isLoggedIn, avatarUrl }: NavbarClientProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const searchParams = useSearchParams();
    const selectedCategory = searchParams.get("category") || "";
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
        <Link href="/catalog?category=movies">
          <Image
            src="/navbar-icons/browse1.png"
            title="Browse Catalog"
            alt="Browse"
            width={40}
            height={40}
            className={styles.browseIcon}
          />
        </Link>
        <Form action={`/catalog`} className={styles.searchForm}>
          <SearchBar isDisabled={!selectedCategory} />
          <MediaFilters />
        </Form>
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
                src={avatarUrl || "/profile-icons/default icon.png"}
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
          </div>
        ) : (
          <SignUpButton />
        )}
      </div>
    </div>
  );
}
