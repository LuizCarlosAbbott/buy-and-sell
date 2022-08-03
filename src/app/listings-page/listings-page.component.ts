import { Component, OnInit } from '@angular/core';
import { ListingsService } from '../listings.service';
import { Listing } from '../types';

@Component({
  selector: 'app-listings-page',
  templateUrl: './listings-page.component.html',
  styleUrls: ['./listings-page.component.css']
})
export class ListingsPageComponent implements OnInit {
  public listings: Listing[] = [];

  constructor(
    private listingService: ListingsService
  ) { }

  ngOnInit(): void {
    this.listings = this.listingService.getListings();
  }

}
