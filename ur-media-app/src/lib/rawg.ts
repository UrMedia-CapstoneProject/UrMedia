const BASE_URL = "https://api.rawg.io/api/"

export const rawgFetch = async <T>(endpoint: string, params: Record<string, string> = {}): Promise<T> => {
    const search = new URLSearchParams({ key: process.env.RAWG_API_KEY!, ...params});
    console.log(`${BASE_URL}${endpoint}?${search.toString()}`)
    const response = await fetch(`${BASE_URL}${endpoint}?${search.toString()}`);

    if (!response.ok) throw new Error(`RAWG API error: ${response.statusText}`);
    return response.json();
}
