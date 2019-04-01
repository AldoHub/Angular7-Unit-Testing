import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { PostsService } from './posts.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpEvent, HttpEventType, HttpParams } from '@angular/common/http';


describe('PostsService', () => {
  let injector: TestBed;
  let service : PostsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [PostsService]
  }));

  beforeEach(() => {
    injector = getTestBed();
    httpTestingController = TestBed.get(HttpTestingController);
    service = injector.get(PostsService);
  })

  afterEach(()=> {
    //we call the verify method on our HttpTestingController instance
    //to ensure that there are no outstanding requests to be made.
    httpTestingController.verify();
  })
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //----- GET REQUEST
  describe("#requestPost", () => {
    it("returned Observable should match the right data", () => {
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

      //call the service function
      //If the HttpEventType is of type Response, 
      //we assert for the response event to have a body equal to our mock posts.

      service.getPosts().subscribe((event: HttpEvent<any>) => {
        switch(event.type){
          case HttpEventType.Response:
            expect(event.body).toEqual(dummyPosts);
        }
      });

      //We then make use of the HttpTestingController
      // (injected in the test as httpMock) to assert that one request
      // was made to the service’s url property. If no request is expected,
      // the expectNone method can also be used.
     
      const mockReq = httpTestingController.expectOne(`${service.API_URL}/posts`);
      //We can now make any number of assertions on the mock request.
      // Here we assert that the request hasn’t been cancelled and the the response if of type json.
      // Additionally, we could assert the request’s method (GET, POST, …)
      expect(mockReq.request.method).toBe("GET");
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');

      //Next we call flush on the mock request and pass-in our mock users.
      // The flush method completes the request using the data passed to it.
      mockReq.flush(dummyPosts);
     
    
    })
  })


  //----------POST REQUEST
  describe('#postRequest', () => {
    it("returned Observable should match the right data", () => {
      const dummyPost =  {
        userId: 1,
        id: 1,
        title: "demo",
        body: "body demo"
      }


      //get the service post
      /**
       * We run the addPost function and we expect that the property title
       * in the response that we will get when the request is carried (when the observable resolves)
       *  out is "demo" (the same as in the dummyPost)
       */
      service.addPost({
      somethingToTest: "this is something to test"
       }).subscribe( userData => {
        expect(userData["title"]).toEqual("demo");
      });

      //checking that there is just one request.
      const mockReq = httpTestingController.expectOne(`${service.API_URL}/posts`);
      expect(mockReq.request.method).toBe("POST");
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      /**
       * Then we flush or respond with the mock data that we pass as a parameter,
       * and that causes the Observable to resolve and evaluate the expect on line 104
       * 
       */
      mockReq.flush(dummyPost);

      /**
       * Finally we run the afterEach block 
       * to verify that there are no pending HTTP requests.
       */
    })
  })

  describe("#getSinglePost", () => {
    it("should get the response object", () => {
      //set the param
      //const dummyParams = new HttpParams().set('id', '1'); //ends up being id=1
      const dummyParam = 1;
      const dummyUser = [{
        userId: 1,
        id: 1,
        title: "Im a dummy title",
        body: "Im a dummy content"
      }];

      service.getSinglePost(dummyParam).subscribe(result => {
        expect(result[0].id).toEqual(dummyParam);
      })

      const mockReq = httpTestingController.expectOne(`${service.API_URL}/posts/${dummyParam}`);
      expect(mockReq.request.method).toBe("GET");
      
      mockReq.flush(dummyUser);

  })
})


}) // ENDOF POST SERVICE DESCRIBE


