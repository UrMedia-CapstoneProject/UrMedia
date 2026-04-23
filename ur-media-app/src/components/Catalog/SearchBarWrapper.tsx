"use client"
import Form from "next/form";
import SearchBar from "../Global/SearchBar";
import MediaFilters from "../Global/MediaFilters";
import { useSearchParams } from "next/navigation";
import styles from "./SearchBarWrapper.module.css";


export default function SearchBarWrapper() {
    const searchParams = useSearchParams();
    const selectedCategory = searchParams.get("category") || "";

    return (
        <div className={styles.main}>
            <Form action={`/catalog`} className={styles.searchForm}>
                <div className={styles.searchBarWrapper}>
                    <SearchBar isDisabled={!selectedCategory} />
                </div>
                <MediaFilters />
            </Form>
        </div>
    )
}