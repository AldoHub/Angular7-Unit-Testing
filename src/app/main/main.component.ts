import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  submitted: boolean = false;

  reasons: any[] = [
    {
      reason: "Improve the design of implementations.",
      description: "Start coding a feature without giving it a lot of thought to the design is a very common mistake among developers. Using unit testing is going to enforce to think and re-think the design, and if you are using TDD the impact is even bigger."
    },
    {
      reason: "Allows refactoring.",
      description: "Since you already have tests that ensure you that everything is working as expected, you can easily add changes to that code with the certainty that you are not adding any bugs."
    },
    {
      reason: "Add new features without breaking anything.",
      description: "When you are adding a new feature you can run the tests to ensure that you ain’t breaking any other part of the application."
    }
  ]

  public requestForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    content: new FormControl('',  Validators.required),
    
  });


  sendRequest(formData: FormData){
    console.log(formData);
    this.submitted = true;
  }

  ngOnInit() {
  }

}
