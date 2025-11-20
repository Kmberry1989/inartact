export interface Artist {
    id: string;
    name: string;
    isAlive: boolean;
    born?: string;
    died?: string;
    title: string;
    medium: string;
    date: string;
    location: string;
    cause: string;
export interface Artist {
    id: string;
    name: string;
    isAlive: boolean;
    born?: string;
    died?: string;
    title: string;
    medium: string;
    date: string;
    location: string;
    cause: string;
    bio: string;
    workDescription: string;
    searchQuery: string;
    imageUrl?: string;
    link?: string;
    mixcloudEmbed?: string;
    vimeoUrl?: string;
    latitude?: number;
    longitude?: number;
}