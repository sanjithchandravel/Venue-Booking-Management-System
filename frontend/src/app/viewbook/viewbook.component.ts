import { Component } from '@angular/core';
import { NodeUtilityService } from '../node-utility.service';

@Component({
  selector: 'app-viewbook',
  templateUrl: './viewbook.component.html',
  styleUrl: './viewbook.component.css',
})
export class ViewbookComponent {
  bookingList: any[] = [];
  showBookings: boolean = false;

  constructor(private util: NodeUtilityService) {}

  viewBookings(): void {
    let u: any = localStorage.getItem('user');
    if (u != null) {
      this.util.getAllUserBook(u).subscribe((data) => {
        this.bookingList = data.item;
      });
      this.showBookings = !this.showBookings;
    }
  }
  deleteBooking(book: any): void {
    this.util
      .removeUserBook(book.username, book.hallname, book.city, book.date)
      .subscribe((data) => {
        if (data.status) {
          this.showBookings = !this.showBookings;
        }
      });
  }
}
