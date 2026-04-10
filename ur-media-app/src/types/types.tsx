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