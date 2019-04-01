import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {PostsService} from "../posts.service";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-getsinglepost',
  templateUrl: './getsinglepost.component.html',
  styleUrls: ['./getsinglepost.component.css']
})
export class GetsinglepostComponent implements OnInit {

  constructor(private route:ActivatedRoute, private postsService: PostsService) { }

  public currentPostID = this.route.snapshot.paramMap.get("id");
  post: any;

  ngOnInit() {
    this.postsService.getSinglePost(this.currentPostID).subscribe( post => {
      this.post = post;
    });
  }

}
