import { NgModule } from '@angular/core';
import { CommonModule} from "@angular/common";
import { AddpostRoutingModule } from './addpost-routing.module';
import { AddpostComponent } from './addpost.component';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AddpostRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddpostComponent]
})
export class AddpostModule { }