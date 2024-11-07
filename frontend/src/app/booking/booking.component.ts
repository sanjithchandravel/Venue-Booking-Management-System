import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NodeUtilityService } from '../node-utility.service';
import { UpperpipePipe } from '../upperpipe.pipe';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent {
  venue: any;
  minDate: string = '';
  selectedDate: string = '';
  isBookingAvailable: boolean = false;
  message: string = '';
  isMessage: boolean = false;
  buttonview: boolean = false;
  constructor(private router: Router, private util: NodeUtilityService) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // January is 0
    const day = today.getDate();
    this.minDate = `${year}-${month < 10 ? '0' : ''}${month}-${
      day < 10 ? '0' : ''
    }${day}`;
    // Get venue details passed from venue component
    this.venue = history.state.venue;
  }

  ngOnInit(): void {
    // Check if venue details are available
    if (!this.venue) {
      // If venue details are not available, navigate back to venue list
      this.router.navigate(['/venues']);
    }
  }
  book(): void {
    this.message = 'I hereby confirm my booking';
    this.isMessage = true;
    this.buttonview = true;
  }

  bookVenue(): void {
    let u: any = localStorage.getItem('user');
    if (u != null) {
      this.util
        .book(u, this.venue.name, this.venue.city, this.selectedDate)
        .subscribe((data) => {
          this.router.navigate(['/home']);
        });
    }
  }
  checkAvailability(): void {
    this.util
      .checkAvail(this.venue.name, this.venue.city, this.selectedDate)
      .subscribe((data) => {
        if (data.status) {
          this.isBookingAvailable = true;
          this.message = data.message;
          this.isMessage = false;
        } else {
          this.isBookingAvailable = false;
          this.message = data.message;
          this.isMessage = true;
        }
      });
  }
}
