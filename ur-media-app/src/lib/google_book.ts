const BASE_URL="https://books.google.com/books/v1/"

export const googleBooksFetch = async <T>(endpoint: string, params: Record<string, string> = {}): Promise<T> => {
    const search = new URLSearchParams({key: process.env.GOOGLE_BOOK_API_KEY!, ...params});
    console.log(`${BASE_URL}${endpoint}?${search.toString()}`)
    const response = await fetch(`${BASE_URL}${endpoint}?${search.toString()}`);

    if (!response.ok) throw new Error(`GOOGLE BOOK API error: ${response.statusText}`);
    return response.json();
}