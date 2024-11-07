import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { NodeUtilityService } from '../node-utility.service';
import { Router } from '@angular/router';
import { UpperpipePipe } from '../upperpipe.pipe';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrl: './venue.component.css',
})
export class VenueComponent implements OnChanges {
  @Input() filterData: any;
  venues: any[] = [];
  filteredVenues: any[] = [];
  seatingCapacity: number = 0;
  selectedLocation: string = '';
  selectedAc: string = '';
  selectedRoomsAvailable: number = 0;
  selectedParkingCapacity: number = 0;
  allValue: any[] = [];

  constructor(private util: NodeUtilityService, private router: Router) {}

  ngOnInit(): void {
    // Fetch venues from the service when component initializes
    this.getVenues();
  }
  ngOnChanges(): void {
    // Check if filterData exists and apply filters accordingly
    if (this.filterData) {
      this.applyFilters(this.filterData);
    }
  }

  getVenues(): void {
    // Call venue service to fetch venues
    this.util.getVenues().subscribe((venues) => {
      this.venues = venues;
      // Initially, display all venues
      this.filteredVenues = venues.item;
      this.allValue = venues.item;
    });
  }

  bookVenue(venue: any): void {
    // Navigate to booking component and pass venue details
    this.router.navigate(['/booking'], { state: { venue } });
  }

  applyFilters(filterData: any): void {
    // Update filter values
    this.filteredVenues = this.allValue;
    this.seatingCapacity = filterData.seatingCapacity;
    this.selectedLocation = filterData.selectedLocation;
    this.selectedAc = filterData.selectedAc;
    this.selectedRoomsAvailable = filterData.selectedRoomsAvailable;
    this.selectedParkingCapacity = filterData.selectedParkingCapacity;

    // Assuming this code is part of your filtering logic
    this.filteredVenues = this.filteredVenues.filter((venue) => {
      let match = true;
      if (
        this.seatingCapacity &&
        parseInt(venue.seatingcapacity) < this.seatingCapacity
      ) {
        match = false;
      }
      if (this.selectedLocation && venue.city !== this.selectedLocation) {
        match = false;
      }
      if (this.selectedAc && venue.ac !== this.selectedAc) {
        match = false;
      }
      if (
        this.selectedRoomsAvailable &&
        parseInt(venue.roomsavailable) < this.selectedRoomsAvailable
      ) {
        match = false;
      }
      if (
        this.selectedParkingCapacity &&
        parseInt(venue.parkingcapacity) < this.selectedParkingCapacity
      ) {
        match = false;
      }
      return match;
    });

    // Remove null entries from the filteredVenues array
    this.filteredVenues = this.filteredVenues.filter((venue) => venue !== null);
  }
}
