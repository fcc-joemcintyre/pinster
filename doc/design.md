# Pinster Design

The *Pinster* application is a full stack application project defined by
FreeCodeCamp.

## License
This document is licensed under a Creative Commons Attribution 4.0
International License (CC-BY).

The source code for the project is made available under a MIT license,
https://www.github.com/fcc-joemcintyre/pinster/LICENSE.txt

# Overview

Pinster displays pictures with descriptions, and lets people select those
they like to create a collection of pins. These collections can be viewed
by other users of the application.

For users that register and login, they create new pins, and edit or remove
the pins they have created.

An instance of the application is hosted on Heroku at
https://pinster-jm/herokuapp.com

# Design

## Functional Requirements

Client Loading:

- The server will serve a web application to a connecting browser

Client Display:



Data Exchange:

- The server will accept REST calls for,
  - register
  - login, logout, verifyLogin (for continuing session)
  - search for pins by user
  - add/remove pins for a user

## Data Defintions

#### User

| Field    | Description |
| -------- | ----------- |
| key      | Unique, indexed. Generated for each added user. |
| email    | email address for user |
| name     | name for user |
| hash     | password hash (only for local users)|
| salt     | password salt (only for local users)|

#### Pins

| Field    | Description |
| -------- | ----------- |
| key      | Unique, indexed. Generated for each added pin. |
| creator  | FKey User.key. Pin creator. |
| username | Name to display on pin |
| category | Category pin assigned to |
| title    | Title to display on the pin |
| text     | Description to display on the pin |
| url      | URL to image to display on the pin |
| pinners  | Array of User.id that have pinned this pin |

## Non-Functional Requirements

The application processor, memory and storage requirements will fit within the
constraints to be hosted on a free Heroku dyno.

No redundancy or scaling features are implemented.

The Heroku instance uses HTTPS for transport security between the browser and
application. Other deployments of this application must also use HTTPS since
authentication and sessions are essential to the applications function.

## Technology Selections

The server is implemented with Node.js version 16.x and uses Typescript
generating ES2020 Javascript conforming to the native ES20xx support provided
in this version of Node.js.
Data is stored in MongoDB (4.x driver for MongoDB 4.x or 5.x servers).

The client interface is implemented with React 17.x using ES2020 Javascript
as supported by Babel. Redux and react-router are also used.

Styles are defined using CSS-in-JS using Styled Components.
