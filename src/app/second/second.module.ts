import { NgModule } from '@angular/core';
import { CommonModule} from "@angular/common";
import { SecondRoutingModule } from './second-routing.module';
import { SecondComponent } from './second.component';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SecondRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SecondComponent]
})
export class SecondModule { }