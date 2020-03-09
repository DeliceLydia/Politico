# Politico
POLITICO is a fullstack Javascript application that enables citizens to give their mandate to politicians running for different government offices while building trust in the process through transparency.

## User Interface (UI)
* HTML
* CSS

### GitHub Pages link for UI
[Politico/UI link](https://delicelydia.github.io/Politico/html/index.html)

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

## BUILT WITH

 * Javascript
 * NodeJs
 * ExpressJs

## HOW TO RUN THE APPLICATION

 ### SETING UP THE ENVIRONMENT
 
 1. Clone this repository to your local PC

    **` https://github.com/DeliceLydia/Politico.git`** [here](https://github.com/DeliceLydia/Politico)

## Installing
The installation of this application is fairly straightforward, After cloning this repository to your local machine,CD into the package folder using your terminal and run the following

```
> npm install
```

It will install the node_modules which will help you run the project on your local machine.

## Run the server
```
> npm start
```
## Author
- Delice Lydia <Delydia84@gmail.com>