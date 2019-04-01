import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  API_URL = "https://jsonplaceholder.typicode.com";
  constructor(private httpClient: HttpClient) { }

  getPosts(){
    return this.httpClient.get(`${this.API_URL}/posts`);
  }

  addPost(postObj: Object){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

    let obj = {
      userId : postObj["userId"],
      id: postObj["id"],
      title: postObj["title"],
      body: postObj["body"]
    }

    return this.httpClient.post(`${this.API_URL}/posts`, JSON.stringify(obj), {headers: headers});
  }

  getSinglePost(postId: any){
    return this.httpClient.get(`${this.API_URL}/posts/${postId}`)
  }

}
