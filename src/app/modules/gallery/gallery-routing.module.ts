import { Route} from '@angular/router';
import { ArtistDetailsResolver, ArtistTop5TracksResolver } from './artist.resolver';
import { ArtistDetailsComponent } from './details/details.component';
import { CanDeactivateArtistDetails } from './gallery.guards';
import { ArtistListComponent } from './list/list.component';

export const galleryRoutes: Route[] = [
    {
      path     : '',
      component: ArtistListComponent,
      children : [
          {
              path         : ':id',
              component    : ArtistDetailsComponent,
              resolve      : {
                  artist  : ArtistDetailsResolver,
                  tracks : ArtistTop5TracksResolver

              },
              canDeactivate: [CanDeactivateArtistDetails]
          }
      ]
    }
];
