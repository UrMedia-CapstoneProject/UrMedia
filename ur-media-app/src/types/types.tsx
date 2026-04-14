export interface PosterProps {
    title: string;
    imageUrl: string;
    onClick?: () => void;
}

export interface Game {
    id: number,
    name: string,
    released: string,
    rating: number,
    background_image: string
}

export interface Book {
    id: number
    title: string,
    description: string,
    author: string,
    thumbnail: string
}