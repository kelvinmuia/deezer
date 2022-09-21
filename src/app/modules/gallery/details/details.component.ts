import { Overlay } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist } from 'app/shared/model/artist';
import { ArtistTrack } from 'app/shared/model/artist-track';
import { ArtistService } from 'app/shared/service/artist.service';
import { Subject, takeUntil } from 'rxjs';
import { ArtistListComponent } from '../list/list.component';

@Component({
  selector: 'artist-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class ArtistDetailsComponent implements OnInit, OnDestroy {

  artist: Artist;
  artistTracks: Array<ArtistTrack>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _artistListComponent: ArtistListComponent,
    private _artistService: ArtistService) { }

  ngOnInit(): void {

    // Open the drawer
    this._artistListComponent.matDrawer.open();


    // Get the artist
    this._artistService.artist$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((artist: Artist) => {

        // Open the drawer in case it is closed
        this._artistListComponent.matDrawer.open();

        // Get the contact
        this.artist = artist;



        // Mark for check
        this._changeDetectorRef.markForCheck();
    });

// Get the Artist Tracks
this._artistService.artistTracks$
.pipe(takeUntil(this._unsubscribeAll))
.subscribe((artistTracks: ArtistTrack[]) => {

    // Open the drawer in case it is closed
    this._artistListComponent.matDrawer.open();

    // Get the contact
    this.artistTracks = artistTracks;



    // Mark for check
    this._changeDetectorRef.markForCheck();
});
  }

  /**
     * On destroy
     */
   ngOnDestroy(): void
   {
       // Unsubscribe from all subscriptions
       this._unsubscribeAll.next(null);
       this._unsubscribeAll.complete();

   }

   // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


   /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult>
    {
        return this._artistListComponent.matDrawer.close();
    }

}
