import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  @Output() filterData: EventEmitter<any> = new EventEmitter();

  selectedDate: string = '';
  minDate: string = '';
  seatingCapacity: number = 0;
  selectedLocation: string = '';
  selectedAc: string = '';
  selectedRoomsAvailable: number = 0; // Added for rooms available filter
  selectedParkingCapacity: number = 0; // Added for parking capacity filter

  constructor() {}

  applyFilters(): void {
    // Emit filter values
    this.filterData.emit({
      seatingCapacity: this.seatingCapacity,
      selectedLocation: this.selectedLocation,
      selectedAc: this.selectedAc,
      selectedRoomsAvailable: this.selectedRoomsAvailable,
      selectedParkingCapacity: this.selectedParkingCapacity,
    });
    //alert('hello11');
  }
}
