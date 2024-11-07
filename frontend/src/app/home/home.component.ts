import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VenueComponent } from '../venue/venue.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  user: string = '';
  constructor(private router: Router) {
    let u: any = localStorage.getItem('user');
    this.user = u;
    if (u == null || u == '') {
      this.router.navigateByUrl('landing');
    }
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('login');
  }
  filterData: any = {}; // Initialize an object to hold filter data

  // Define a method to handle filter changes emitted by the FilterComponent
  handleFilterChange(event: any): void {
    // Assign the filter data emitted by the FilterComponent to the filterData object
    this.filterData = event;
    //alert(this.filterData.selectedLocation);
  }
}
