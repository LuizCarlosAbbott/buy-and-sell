import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { Listing } from './types';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const httpOptionsWithAuthToken = (token: string) => ({
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'AuthToken': token
  })
})

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  constructor(
    private http: HttpClient,
    private auth: AngularFireAuth
  ) { }

  public getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/listings');
  }

  public getListingById(id: string): Observable<Listing> {
    return this.http.get<Listing>(`/api/listings/${id}`);
  }

  public addViewToListing(id: string): Observable<Listing> {
    return this.http.post<Listing>(
      `/api/listings/${id}/add-view`,
      {},
      httpOptions
    );
  }

  public getListingsForUser(): Observable<Listing[]> {
    return new Observable<Listing[]>(observer => {
      this.auth.user.subscribe(user => {
        user && user.getIdToken().then(token => {
          if (user && token) {
            this.http.get<Listing[]>(`/api/users/${user.uid}/listings`, httpOptionsWithAuthToken(token))
              .subscribe(listings => {
                observer.next(listings);
              });
          } else {
            observer.next([]);
          }
        })
      })
    })
  }

  public deleteListing(id: string): Observable<unknown> {
    return this.http.delete<unknown>(`/api/listings/${id}`);
  }

  public createListing(name: string, description: string, price: number): Observable<Listing> {
    return this.http.post<Listing>(
      '/api/listings',
      { name, description, price },
      httpOptions
    );
  }

  public editListing(id: string, name: string, description: string, price: number): Observable<Listing> {
    return this.http.post<Listing>(
      `/api/listings/${id}`,
      { name, description, price },
      httpOptions
    )
  }
}
