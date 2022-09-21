import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist } from 'app/shared/model/artist';
import { ArtistSearch } from 'app/shared/model/artist-search';
import { ArtistService } from 'app/shared/service/artist.service';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'artist-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistListComponent implements OnInit {

  @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;

  artists$: Observable<Artist[]>;
  artistsCount: number = 0;
  drawerMode: 'side' | 'over';

  searchInputControl: UntypedFormControl = new UntypedFormControl();
  selectedartist: Artist;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _artistService: ArtistService, private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {


    // Get the artists
    this.artists$ = this._artistService.artists$;
    this._artistService.artists$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((artists: Artist[]) => {

          console.log(artists);

            // Update the counts
            if(artists){
              this.artistsCount = artists.length;
            }
            

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });


    // Subscribe to search input field value changes
    this.searchInputControl.valueChanges
    .pipe(
        takeUntil(this._unsubscribeAll),
        switchMap(query =>

            // Search
            this._artistService.searchArtist(query)
        )
    )
    .subscribe();
  }

   /**
     * On backdrop clicked
     */
    onBackdropClicked(): void
    {
        // Go back to the list
        this._router.navigate(['./'], {relativeTo: this._activatedRoute});

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

}
