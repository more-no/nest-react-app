// file create with CLI - "ng generate service Wish"
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// this is created already as an Injectable
@Injectable({
  providedIn: 'root',
})

// we write here the logic to access the json file we created wishes.json
export class WishService {
  constructor(private http: HttpClient) {}

  getWishes() {
    // in a real app here we'd put a real URL
    return this.http.get('/assets/wishes.json');
    // we can make here get/put/post/ and many other requests
    // the GET method return an Observable (as object)
  }
}
