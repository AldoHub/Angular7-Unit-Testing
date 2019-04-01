import { Component, OnInit } from '@angular/core';
import {PostsService} from "../posts.service";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {

  constructor(private postsService: PostsService) { }
  posts:Observable<any>;

  ngOnInit() {
   this.posts = this.postsService.getPosts();
  }

}
