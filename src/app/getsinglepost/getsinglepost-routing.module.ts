import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {GetsinglepostComponent} from "./getsinglepost.component";

const routes: Routes = [
  { path: '', component: GetsinglepostComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GetsinglepostComponentRoutingModule { }