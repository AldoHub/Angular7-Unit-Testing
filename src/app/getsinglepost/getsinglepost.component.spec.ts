import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetsinglepostComponent } from './getsinglepost.component';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientModule} from "@angular/common/http";

describe('GetsinglepostComponent', () => {
  let component: GetsinglepostComponent;
  let fixture: ComponentFixture<GetsinglepostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetsinglepostComponent ],
      imports: [RouterTestingModule, HttpClientModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetsinglepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



});
