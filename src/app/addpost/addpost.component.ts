import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";
import {PostsService} from "../posts.service";

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

  constructor(private postsService: PostsService) { }

  public postForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('',  Validators.required),
    
  });

  sendPostRequest(formData: FormData){
    console.log(formData);
     let obj = {
      userId : 101,
      id: 101,
      title: formData["title"],
      body: formData["body"],
    }

    this.postsService.addPost(obj).subscribe( data => {
      console.log(data);
    })
  }

  ngOnInit() {
  }

}
