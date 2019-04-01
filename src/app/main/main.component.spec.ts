import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main.component';
import{ BrowserModule, By} from "@angular/platform-browser";

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent],
      imports : [ReactiveFormsModule, BrowserModule] //add the MODULES you need here
    })
    .compileComponents();
  }));

  beforeEach(() => {
    //fixture Obj, that allows us to create an instance
    //of our component
    fixture = TestBed.createComponent(MainComponent); 
    
    //component instance
    component = fixture.componentInstance;
    // detect changes function, applies component changes to the HTML 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  //check if the title is being loaded
  it('should render title in a h1 tag', () => {
    //Before running any test in angular you need to configure an angular test bed.
    //This allows you to create an angular environment for the component being tested

    //Any module, component or service that your tested component needs have to be included in the test bed    
    //fixture.detectChanges();
    //Finally, after setting the configuration, you call the compile components function.
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('header h1').textContent).toContain('Angular Unit Testing');
  });


  //We use an async before each. 
  //The purpose of the async is to let all the possible asynchronous code to finish before continuing.
 
  it('should containe a list of reasons', async(() =>{
     expect(component.reasons.length).toBeGreaterThan(0);
  }));

  //------------------ FORM
  //form should be invalid if empty
  it("form should be invalid", async(() => {
    component.requestForm.controls["email"].setValue("");
    component.requestForm.controls["content"].setValue("");

    expect(component.requestForm.valid).toBeFalsy();

  }));

//form should be valid if NOT empty
it("form should be valid", async(() => {
  component.requestForm.controls["email"].setValue("something@something.com");
  component.requestForm.controls["content"].setValue("this is a simple description");

  expect(component.requestForm.valid).toBeTruthy();

}));

//form should be invalid if the email is not formatted corretly
it("form should be invalid IF email is not CORRECT", async(() => {
  component.requestForm.controls["email"].setValue("not an email");
  component.requestForm.controls["content"].setValue("this is a simple description");

  expect(component.requestForm.valid).toBeFalsy();

}));


it("should set submitted to true", async(() => {
  //add some form data since the function is waiting for that 
  let data = {
    email: "something@something.com",
    content: "this is a testing message",
  } 

  let formData = new FormData();
  formData.set("info", JSON.stringify(data));

  component.sendRequest(formData);
  expect(component.submitted).toBeTruthy();
 
}));


it("should call the sendRequest method on the input", async(() => {
  //fixture.detectChanges();
  spyOn(component, "sendRequest");
  //get the element input
  let input = fixture.debugElement.query(By.css("#submit")).nativeElement;
  //click the input
  input.click();

  //since the input should be disabled, the sendRequest should not be called
  expect(component.sendRequest).toHaveBeenCalledTimes(0);

}));



});
