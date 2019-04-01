import { TestBed, async, getTestBed, fakeAsync, tick } from '@angular/core/testing';

import { AppComponent } from './app.component';

import {Location} from "@angular/common";
import { RouterTestingModule } from '@angular/router/testing'; // needed for routing testing
import {NgModuleFactoryLoader} from "@angular/core"; //needed for Lazy loaded routes
import {HttpClientModule} from "@angular/common/http"; //needed because lazy loaded route uses it

import {routes} from "./app-routing.module"; //import routes
import {Router} from "@angular/router"; //import routing
import {SecondModule} from "./second/second.module"; //import the module for lazy loading test

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpEvent, HttpEventType} from '@angular/common/http';
import { PostsService } from './posts.service';

describe('AppComponent', () => {
  let injector: TestBed;
  let service : PostsService;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes), //pass the routes
        HttpClientModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,

      ],
    }).compileComponents();
  }));

  
 
  beforeEach(() => {
    injector = getTestBed();
    httpTestingController = TestBed.get(HttpTestingController);
    service = injector.get(PostsService);
  })

 
//component
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  //looking to the title property in the app.component.ts
  it(`should have as title 'angulartesting'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('angulartesting');
  });

  it('should navigate to posts child path', fakeAsync(() => {
    let router = TestBed.get(Router);
    let location = TestBed.get(Location);
    let fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation(); //This sets up the location change listener and performs the initial navigation
  
    const loader = TestBed.get(NgModuleFactoryLoader); // Allows to simulate the loading of ng modules in tests.
    loader.stubbedModules = {lazyModule: SecondModule};
  
    router.resetConfig([
      {path: 'second', loadChildren: 'lazyModule'}, //name should match the stubbedModule
    ]);
  
    router.navigateByUrl('/second');
  
    //since the /posts route makes a HTTP request we need to do it here -----START
    const dummyPosts: any[] = [
      {
        userId: 1,
        id: 1,
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      },
      {
        userId: 1,
        id: 2,
        title: "qui est esse",
        body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
      }
    ];

   
    service.getPosts().subscribe((event: HttpEvent<any>) => {
      switch(event.type){
        case HttpEventType.Response:
          expect(event.body).toEqual(dummyPosts);
      }
    });

    const mockReq = httpTestingController.expectOne(`${service.API_URL}/posts`);
    
    expect(mockReq.request.method).toBe("GET");
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');

    mockReq.flush(dummyPosts);

    httpTestingController.verify(); //close the mock request
    //since the /posts makes a HTTP request we need to do it here -----END


    tick(); //it waits until all the requests are done to continue
    fixture.detectChanges();
    //check the path
    expect(location.path()).toBe('/second');
  }));
  
/*
  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to angulartesting!');
  });
  */
});
