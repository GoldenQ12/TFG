export interface Content {
    id: string;
    title: string;
    description: string;
    image: string; 
    type: string | "anime" | "movies" | "series" | "videogames"
}