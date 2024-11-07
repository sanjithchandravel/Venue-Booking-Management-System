import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NodeUtilityService {
  constructor(private httpClient: HttpClient) {}
  url: string = 'http://localhost:5000/';
  login(username: string, password: string): Observable<any> {
    return this.httpClient.get(
      this.url + 'check?username=' + username + '&password=' + password
    );
  }
  register(
    username: string,
    gender: string,
    phone: number,
    email: string,
    password: string
  ): Observable<any> {
    return this.httpClient.get(
      this.url +
        'insert?username=' +
        username +
        '&gender=' +
        gender +
        '&phone=' +
        phone +
        '&email=' +
        email +
        '&password=' +
        password
    );
  }
  remove(username: string, password: string): Observable<any> {
    return this.httpClient.get(
      this.url + 'remove?username=' + username + '&password=' + password
    );
  }
  removeByAdmin(username: string): Observable<any> {
    return this.httpClient.get(this.url + 'remove1?username=' + username);
  }

  removeVenueByAdmin(name: string, city: string): Observable<any> {
    return this.httpClient.get(
      this.url + 'remove2?name=' + name + '&city=' + city
    );
  }
  update(username: string, password: string): Observable<any> {
    return this.httpClient.get(
      this.url + 'update?username=' + username + '&password=' + password
    );
  }
  getVenues(): Observable<any> {
    return this.httpClient.get(this.url + 'venue');
  }
  book(
    username: string,
    name: string,
    city: string,
    date: string
  ): Observable<any> {
    return this.httpClient.get(
      this.url +
        'book?username=' +
        username +
        '&city=' +
        city +
        '&name=' +
        name +
        '&date=' +
        date
    );
  }
  getAllUsers(): Observable<any> {
    return this.httpClient.get(this.url + 'getAllUsers');
  }
  getAllBook(): Observable<any> {
    return this.httpClient.get(this.url + 'getAllBook');
  }
  getAllUserBook(username: string): Observable<any> {
    return this.httpClient.get(
      this.url + 'getAllUserBook?username=' + username
    );
  }
  removeUserBook(
    username: string,
    name: string,
    city: string,
    date: string
  ): Observable<any> {
    return this.httpClient.get(
      this.url +
        'removeUserBook?username=' +
        username +
        '&city=' +
        city +
        '&name=' +
        name +
        '&date=' +
        date
    );
  }
  checkAvail(name: string, city: string, date: string): Observable<any> {
    return this.httpClient.get(
      this.url + 'avail?name=' + name + '&city=' + city + '&date=' + date
    );
  }

  addVenue(
    name: string,
    seat: string,
    city: string,
    ac: string,
    park: string,
    room: string,
    des: string
  ): Observable<any> {
    return this.httpClient.get(
      this.url +
        'addVenue?name=' +
        name +
        '&seat=' +
        seat +
        '&city=' +
        city +
        '&ac=' +
        ac +
        '&park=' +
        park +
        '&room=' +
        room +
        '&des=' +
        des
    );
  }
}
