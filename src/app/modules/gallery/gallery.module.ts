import { NgModule } from '@angular/core';

import { ArtistListComponent } from './list/list.component';
import { ArtistDetailsComponent } from './details/details.component';
import { RouterModule } from '@angular/router';
import { galleryRoutes } from './gallery-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from 'app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseCardModule } from '@fuse/components/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ArtistListComponent,
    ArtistDetailsComponent
  ],
  imports: [
    RouterModule.forChild(galleryRoutes),
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    FuseCardModule,
    SharedModule
  ]
})
export class GalleryModule { }
