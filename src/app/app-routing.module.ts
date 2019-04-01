import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: './main/main.module#MainModule' },
  { path: 'second', loadChildren: './second/second.module#SecondModule' },
  { path: 'addpost', loadChildren: './addpost/addpost.module#AddpostModule' },
  { path: 'getsinglepost/:id', loadChildren: './getsinglepost/getsinglepost.module#GetsinglepostModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
