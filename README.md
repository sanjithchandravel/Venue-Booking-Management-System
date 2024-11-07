# Venue-Booking-Management-System

## Overview

The Venue Booking Management System is a web application designed to streamline venue booking for event organizers and venue owners. The platform enables users to search, filter, and book venues based on various criteria, while administrators can manage venues, users, and bookings efficiently. This project uses Angular for the frontend and JavaScript for backend operations, including a MongoDB database for secure and scalable data management.

## Table of Contents

1. Features
2. Installation
3. System Requirements
4. Usage
5. Project Structure
6. Credits

## Features

- **User Registration & Authentication**: Secure sign-up and login functionality for users and administrators.
- **Venue Management**: Venue owners can list venues with detailed descriptions (location, capacity, facilities, etc.).
- **Booking Management**: Users can search, filter, and book venues with real-time availability checks.
- **Admin Dashboard**: Enables administrators to manage venues, user accounts, and bookings.
- **Real-Time Notifications**: Booking confirmations, reminders, and updates.
- **Analytics & Reporting**: Generate reports on venue utilization, revenue, and occupancy rates.
- **Data Security**: Ensures secure handling of credentials and booking information.

## Installation

### Prerequisites

- **Node.js** (v20.11.1)
- **Angular CLI** (v15.1+)
- **MongoDB** (v7.0.6)

### Steps

1. **Clone the Repository**:
    
    ```bash
    git clone <https://github.com/yourusername/VenueBookingManagementSystem.git>
    cd VenueBookingManagementSystem
    
    ```
    
2. **Navigate to Backend and Install Dependencies**:
    
    ```bash
    cd backend
    npm install
    
    ```
    
3. **Set Up MongoDB**:
Ensure MongoDB is running and accessible. Adjust the MongoDB connection string in `backend/config/db.js` or equivalent configuration file if necessary.
4. **Start the Backend Server**:
    
    ```bash
    node server.js
    
    ```
    
5. **Navigate to Frontend and Install Dependencies**:
    
    ```bash
    cd ../frontend
    npm install
    
    ```
    
6. **Run the Angular Development Server**:
    
    ```bash
    ng serve --host 127.0.0.1
    
    ```
    
7. **Access the Application**:
Open a browser and navigate to `http://127.0.0.1:4200`.

## System Requirements

### Hardware

- **Processor**: Intel Core i5 or equivalent
- **RAM**: 8GB or higher
- **Storage**: SSD with at least 256GB of free space
- **Network**: Ethernet or Wi-Fi connectivity

### Software

- **Operating System**: Any 64-bit OS
- **Database Management System**: MongoDB
- **Text Editor**: Visual Studio Code

## Usage

### User Guide

1. **Register**: Users must register with a username, password, email, and phone number to book venues.
2. **Login**: Access the dashboard to view and manage bookings.
3. **Browse Venues**: Use filters like location, capacity, AC, parking, etc., to find suitable venues.
4. **Book Venues**: Select a date and confirm booking if available.
5. **Admin Access**: Admins can manage users, venues, and bookings through a dashboard.

### Admin Guide

1. **Manage Users**: View, edit, and delete user accounts as needed.
2. **Manage Venues**: Add, update, or delete venue listings.
3. **Oversee Bookings**: View and manage all bookings to prevent conflicts.

## Project Structure

- **/frontend**: Contains Angular code for the user interface.
- **/backend**: Contains JavaScript code for server-side logic and MongoDB connections.
