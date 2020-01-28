#Quotes
Web application that displays a random quote. You can vote on this quote and the top 5 most popular quotes are listed below the quote!

The actual application can be found running at [https://quotes-client.now.sh](https://quotes-client.now.sh)

- [Quotes.](#quotes)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Features](#features)
  - [Structure](#structure)
    - [Client](#client)
    - [API](#api)
    - [Database](#database)
  - [Continuous Integration and Deployment](#continuous-integration-and-deployment)

## Prerequisites

- [Yarn](https://legacy.yarnpkg.com/en/docs/install/)
- Node 12.*

## Installation

- Execute `yarn install` in the root directory
- Then, execute `yarn setup` in the root directory. This will install dependencies in both the client and server project
- Finally, execute `yarn start:dev` to run the client and API at the same time

## Features

- Features that have been implemented can be found on the [projects page here](https://github.com/timohermans/quotes/projects)
- Note that rating and fetching a new quote has been made deliberately slow

## Structure

The project consists of three components:

- Client
- API (server)
- Database

### Client

- The client is created using [Angular 8](https://www.angular.io/docs) and resides in the `client` folder.
- [Bulma CSS](https://www.bulma.io) is used as CSS framework
- The structure follows the Angular guidelines. Notable examples:

  - _Folder-by-features_ structure
  - Modules inside the `feature` folder adhere to the [flat principle](https://github.com/timohermans/quotes/projects)

### API

- The API resides in the `server` folder
- It is created with [NestJS](https://nestjs.com/)
  - If you know Angular, you know NestJS :)
- The architecture used is [the vertical slice architecture](https://jimmybogard.com/vertical-slice-architecture/)
  - Every entity (for now only `quotes`) has their own folder. Inside this folder you find:
    - Use-case folders. Every use-case has a `Request/Command`, `UseCase` and `Result` class. The `UseCase` class is where all the magic happens
    - Controller (`*.controller.ts`)
    - Domain model (`*.entity.ts`)

### Database

- The database used is [Firebase](https://firebase.google.com/)
- This is a NoSQL database.
- Note that this proejct could have been build with the client and Firebase alone. However, this would not show my technical skills on the backend as much.

## Continuous Integration and Deployment

Quality assurance has been implemented on various stages of the development cycle:

- "TDD" has been used creating new feature. TDD here means unit tests have been written on both the front- and backend before any real implementation have been written for **business logic**.
  - There are some exceptions to above rule
    - I did not write unit tests that also query DOM elements in any way (e.g. with Angular `TestBed`). The reason for this can be found [here](https://medium.com/@marko.bjelac/unit-testing-angular-testbed-considered-harmful-7e2bb8f32586)
    - I have not written any integration / E2E tests due to time constraints and risk of failure
- Before each push can be done, validation scripts are run on both front- and backend every time

  - Normally this should also been done on the build server, but I've chosen not to because of costs

- When a pull request has been merged to `master`, [Github Actions](https://github.com/timohermans/quotes/actions) will pick up a new build and deploy the API and client automatically via [Zeit](https://zeit.co)
