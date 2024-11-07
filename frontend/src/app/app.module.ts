import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { ForgetComponent } from './forget/forget.component';
import { DeleteComponent } from './delete/delete.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FilterComponent } from './filter/filter.component';
import { VenueComponent } from './venue/venue.component';
import { BookingComponent } from './booking/booking.component';
import { AdminComponent } from './admin/admin.component';
import { ViewComponent } from './view/view.component';
import { ViewbookComponent } from './viewbook/viewbook.component';
import { CityValidateDirective } from './city-validate.directive';
import { UpperpipePipe } from './upperpipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    LandingComponent,
    ForgetComponent,
    DeleteComponent,
    HeaderComponent,
    FilterComponent,
    VenueComponent,
    BookingComponent,
    AdminComponent,
    ViewComponent,
    ViewbookComponent,
    CityValidateDirective,
    UpperpipePipe,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
