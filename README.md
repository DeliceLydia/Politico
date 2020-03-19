[![Build Status](https://travis-ci.org/DeliceLydia/Politico.svg?branch=develop)](https://travis-ci.org/DeliceLydia/Politico)

[![Coverage Status](https://coveralls.io/repos/github/DeliceLydia/Politico/badge.svg?branch=develop)](https://coveralls.io/github/DeliceLydia/Politico?branch=develop)

[![Maintainability](https://api.codeclimate.com/v1/badges/b6c6066e3ce6efed0b95/maintainability)](https://codeclimate.com/github/DeliceLydia/Politico/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/b6c6066e3ce6efed0b95/test_coverage)](https://codeclimate.com/github/DeliceLydia/Politico/test_coverage)


# Politico
POLITICO is a fullstack Javascript application that enables citizens to give their mandate to politicians running for different government offices while building trust in the process through transparency.

## User Interface (UI)
* HTML
* CSS

### GitHub Pages link for UI
[Politico/UI link](https://delicelydia.github.io/Politico/html/index.html)

### Link to Politico on Heroku
[Politico/Heroku link](https://politico1.herokuapp.com/)

---------------------------------------------------------------------

 ## SERVER

## API ENDPOINTS

| Ressource URL | Methods  | Description  |
| ------- | --- | --- |
| /api/v1/auth/signup| POST | Get the user to signup |
| /api/v1/auth/signin | POST | Get the user to signin|
| /api/v1/parties | POST | Get the admin to post a political party |
| /api/v1/parties/ | GET | Get the admin to get all political parties |
 /api/v1/parties/:partyId | GET |Get the admin to view a specific political party by Id  |
| /api/v1/parties/:partyId | DELETE| Get the admin to DELETE a specific political party by Id |
| /api/v1/offices/| POST | Get the admin to post a new political office|
| /api/v1/offices/:officeId/register| POST | Get the admin to register a new candidate|
| /api/v1/offices/| GET | Get the admin to get all political offices|
| /api/v1/offices/:officeId| GET | Get the admin to get a specific political office by Id|
| /api/v1/offices/:officeId | DELETE| Get the admin to DELETE a specific political  by Id |


## SERVER ENVIRONMENT
 * NODEJS (runtime environment for running JS codes)

## FRAMEWORKS
 * Express (used for building fast APIs )

## BUILT WITH

 * Javascript
 * NodeJs
 * ExpressJs

## DATABASE
 
 * Postgresql

## TESTING FRAMEWORK AND ASSERTION LIBRARY
 
 * Mocha
 * Chai

## CONTINUOUS INTEGRATION
 
 * Travis CI

## TEST COVERAGE
 
 * nyc

## DEPLOYMENT
 
 * heroku


## HOW TO RUN THE APPLICATION

 ### SETING UP THE ENVIRONMENT
 
 1. Clone this repository to your local PC

    **` https://github.com/DeliceLydia/Politico.git`** [here](https://github.com/DeliceLydia/Politico)

## Installing
The installation of this application is fairly straightforward, After cloning this repository to your local machine,CD into the package folder using your terminal and run the following

```
  npm install
```

It will install the node_modules which will help you run the project on your local machine.

## Run the server
```
  npm start
```

## Create table in the database
```
  npm run tables
```

## Delete table in the database
```
 npm run drop
```
## Run test
```
 npm test
```

## Author
  Delice Lydia <Delydia84@gmail.com>

## Licence & copyright
Copyright (c) Delice Lydia Ingabire, Software Developer
