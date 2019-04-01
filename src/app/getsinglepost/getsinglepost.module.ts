import { NgModule } from '@angular/core';
import { CommonModule} from "@angular/common";
import { GetsinglepostComponentRoutingModule } from './getsinglepost-routing.module';
import { GetsinglepostComponent } from './getsinglepost.component';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    GetsinglepostComponentRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [GetsinglepostComponent]
})
export class GetsinglepostModule { }