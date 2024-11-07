import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { NodeUtilityService } from '../node-utility.service';
import { Router } from '@angular/router';
import { UpperpipePipe } from '../upperpipe.pipe';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  user: string = '';
  userList: any[] = [];
  venueList: any[] = [];
  errorMessage: string = '';
  showUser: boolean = false;
  showVenue: boolean = false;
  addVenue: boolean = false;
  showBookings: boolean = false;
  bookingList: any[] = [];
  selectedLocation: string = '';
  bookingListAll: any[] = [];
  constructor(
    private util: NodeUtilityService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    let u: any = localStorage.getItem('user');
    this.user = u;
    if (u == null || u == '') {
      this.router.navigateByUrl('landing');
    }
  }
  applyFilters(): void {
    // Update filter values
    this.bookingList = this.bookingListAll;

    // Assuming this code is part of your filtering logic
    this.bookingList = this.bookingList.filter((venue) => {
      let match = true;
      if (this.selectedLocation && venue.city !== this.selectedLocation) {
        match = false;
      }
      return match;
    });
  }

  fetchUserList(): void {
    // Call the user service to retrieve the list of users
    this.util.getAllUsers().subscribe((users) => {
      this.userList = users.item;
    });
    this.showUser = !this.showUser;
    this.showVenue = false;
    this.addVenue = false;
    this.showBookings = false;
  }
  fetchVenue(): void {
    this.util.getVenues().subscribe((data) => {
      this.venueList = data.item;
    });
    this.showUser = false;
    this.showVenue = !this.showVenue;
    this.addVenue = false;
    this.showBookings = false;
  }
  show(): void {
    this.addVenue = !this.addVenue;
    this.showUser = false;
    this.showVenue = false;
    this.showBookings = false;
  }
  book(): void {
    this.util.getAllBook().subscribe((data) => {
      this.bookingList = data.item;
      this.bookingListAll = data.item;
      this.showBookings = !this.showBookings;
      this.addVenue = false;
      this.showUser = false;
      this.showVenue = false;
    });
  }
  deleteBooking(book: any) {
    this.util
      .removeUserBook(book.username, book.hallname, book.city, book.date)
      .subscribe((data) => {
        if (data.status) {
          this.showBookings = !this.showBookings;
        }
      });
  }
  submitVenue(form: any) {
    this.util
      .addVenue(
        form.value.name,
        form.value.seat,
        form.value.city,
        form.value.ac,
        form.value.park,
        form.value.room,
        form.value.des
      )
      .subscribe((data) => {
        if (data.status) {
          form.controls['name'].reset('');
          form.controls['seat'].reset('');
          form.controls['city'].reset('');
          form.controls['ac'].reset('');
          form.controls['park'].reset('');
          form.controls['room'].reset('');
          form.controls['des'].reset('');
        }
      });
  }
  deleteUser(user: any) {
    this.util.removeByAdmin(user.username).subscribe((data) => {
      if (data.status) {
        this.showUser = false;
      }
    });
  }
  deleteVenue(venue: any) {
    this.util.removeVenueByAdmin(venue.name, venue.city).subscribe((data) => {
      if (data.status) {
        this.showVenue = false;
      }
    });
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('login');
  }
}
