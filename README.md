# Medical Resources

It is a Web Application where Hospitals, Pharmacies and Users come together. It's an application for Hospitals to log their available number of rooms, for Pharmacies to log the available medicine and its quantity and for Users to reserve a room at the Hospital and reserve or order medicine from the Pharmacy.

## Getting Started

These steps will get you a copy of the project up and running for development and testing purposes.

## Installation

1.  Install  **Nodejs** _latest stable version_
2.  Install  **npm** _latest stable version_
3.  Install  **mongoDB** _latest stable version_
4. _Optional Step_ ⇒ You can install **MongoDB Compass** [any user interface application for MongoDB] as it offers a user interface for dealing with the database
5.  Clone the Project
6.  **In Server Directory** 
	Run the following commands:
	```
	npm install
	cp .env.example .env
	```
    
7. **In client Directory** 
	Run the following commands:
	```
	npm install
	cp .env.example .env
	```
8.  In the **Server/.env** file change the  `DB_HOST`,  `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` and `DB_PORT`  variables to match the credentials of the database you just created. 
9. In the **Server/.env** file change the  `SECRET`,  `EMAIL_SECRET`, `EMAIL_USER`, `EMAIL_PASS`, `PASSWORD_RESET_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` and `BING_MAP_KEY`. 
_We strongly recommend to not to change other variables that have value unless you totally understand their functionality._
    

## Usage

1. In the **Server** directory, run the following command to launch the Server in development mode:  `npm start`
2. In the **client** directory, run the following command to launch the client:  `npm start`

## Hospital Admin Features

1. CRUD Operations on Rooms.
2. Review all Reservations received.

## Pharmacy Admin Features

1. CRUD Operations on Medicine.
2. Review all Reservations received.
3. Review all Orders received.

## User Features

1.  Update his Profile Data.
2.  Search for Hospitals.
3.  View Hospital Profile
4.  Reserve a Room from Hospital (this reservation should be fulfilled within time limit specified by the Hospital Admin).
5.  Search for Medicine.
6.  View Pharmacy Profile and Rate it.
7.  Order Medicine from Pharmacy (if it has delivery service).
8.  Reserve Medicine from Pharmacy (this reservation should be fulfilled within time limit specified by the Pharmacy Admin).
9.  Track his orders.
10. Track his hospital reservations.
11. Track his pharmacy reservations.

## Built With

[Nodejs](https://nodejs.org/en/) and [Reactjs](https://reactjs.org/)

## Authors

1.  [Ahmed Adel](https://github.com/AhmedAdelFahim)
2.  [Ebtsam Ali](https://github.com/ebtsamali)
3.  [Rehab Ayman](https://github.com/rehabayman)
