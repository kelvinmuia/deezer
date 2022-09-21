import { Album } from "./album";
import { Contributors } from "./contributors";

export interface ArtistTrack {
    id: number;
    title: string,
    title_short: string,
    contributors: Contributors,
    artist: string,
    album: Album,
    type: string
}