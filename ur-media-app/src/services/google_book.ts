import { googleBooksFetch} from "@/lib/google_book";
import { Book } from "@/types/types";

export interface googleBookResponse<T> {
    results: T[]
}

export async function getPopularBooks(page: string, ) {
    try {
        const res = await googleBooksFetch<googleBookResponse<Book>>('volumes', {page: page, })
    } catch {

    }
}