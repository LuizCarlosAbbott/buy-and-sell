import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fakeMyListings } from '../fake-data';
import { Listing } from '../types';

@Component({
  selector: 'app-edit-listing-page',
  templateUrl: './edit-listing-page.component.html',
  styleUrls: ['./edit-listing-page.component.css']
})
export class EditListingPageComponent implements OnInit {
  public listing: Listing = {
    id: '',
    name: '',
    description: '',
    price: 0
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.listing = fakeMyListings.find(listing => listing.id === id) || this.listing;
  }

  public onSubmit(): void {
    alert('Saving changes to the listing...');
    this.router.navigateByUrl('/my-listings')
  }
}
