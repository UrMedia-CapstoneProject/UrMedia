'use client'

import styles from "./PageButton.module.css"
import { usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"

interface PageButtonProps {
    currentPage: number,
    hasMore: boolean
}
export default function PageButton({currentPage, hasMore}: PageButtonProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams()

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', page.toString())
        return `${pathname}?${params.toString()}`
    }
    
    return (
       <nav className={styles.main}>
        <Link
            className={styles.pageButton}
            href={handlePageChange(currentPage - 1)}
        >
            Previous
        </Link>
        <Link
            className={styles.pageButton}
            style={{fontSize: '1.1rem'}}
            href={handlePageChange(currentPage + 1)}
        >
            Next
        </Link>
       </nav>
    )
}