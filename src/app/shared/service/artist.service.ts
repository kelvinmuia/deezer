import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { environment } from 'environments/environment';
import { Artist } from '../model/artist';
import { ArtistSearch } from '../model/artist-search';
import { ArtistTrack } from '../model/artist-track';

@Injectable({
    providedIn: 'root'
})
export class ArtistService
{
    // Private
    private _artist: BehaviorSubject<Artist | null> = new BehaviorSubject(null);
    private _artists: BehaviorSubject<Artist[] | null> = new BehaviorSubject(null);
    private _artistTracks: BehaviorSubject<ArtistTrack[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
        // Set the private defaults
        this._artist = new BehaviorSubject(null);
        this._artists = new BehaviorSubject(null);
        this._artistTracks = new BehaviorSubject(null);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for Artist
     */
    get artist$(): Observable<Artist>
    {
        return this._artist.asObservable();
    }

    /**
     * Getter for Artists
     */
    get artists$(): Observable<Artist[]>
    {
        return this._artists.asObservable();
    }

     /**
     * Getter for Artists Tracks
     */
      get artistTracks$(): Observable<ArtistTrack[]>
      {
          return this._artistTracks.asObservable();
      }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

   /**
     * Search Artist
     */
    searchArtist(query: string): Observable<Artist[]>
    {
        return this._httpClient.get<any>(environment.corsUrl+environment.url+ "/search/artist?q="+query).pipe(
            tap((response) => {
                this._artists.next(response.data);
            })
        );
    }

    /**
     * Get artist by id
     */
     getArtistById(id: number): Observable<Artist>
     {
         return this._artists.pipe(
             take(1),
             map((artists) => {
 
                 // Find the artist
                 const artist = artists.find(item => item.id === id) || null;
 
                 // Update the artist
                 this._artist.next(artist);
 
                 // Return the artist
                 return artist;
             }),
             switchMap((artist) => {
 
                 if ( !artist )
                 {
                     return throwError('Could not found artist with id of ' + id + '!');
                 }
 
                 return of(artist);
             })
         );
     }

      /**
     * Get artist top 5 tracks
     */
       getArtistTop5TracksById(id: number): Observable<ArtistTrack[]>
       {
        return this._httpClient.get<any>(environment.corsUrl+environment.url+'/artist/'+id+'/top').pipe(
            tap((response) => {
                this._artistTracks.next(response.data);
            })
        );
       }
    
}
