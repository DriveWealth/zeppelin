# Zeppelin

A sample trading app built on Drivewealth Trading APIs. It contains a backend based on [Firebase](https://firebase.google.com/) and an app built using [Expo](https://expo.dev/)

## Important
The code available in this repository is intended to demonstrate the usage of the Drivewealth APIs and is provided as open source. However, please note that it is not optimized for production use and Drivewealth does not provide official support for this code.

## Firebase 

This code usese [Firebase](https://firebase.google.com/) to serve as the backend for the Zeppelin App. We will be using the Authentication feature to authorize users to the app. We will also use Firestore to save the **Application User to Drivewealth User** mapping.

## Getting started

Signup for accounts at [Firebase](https://firebase.google.com/) and [Expo](https://expo.dev/)

### Firebase

In your Firebase Console do the [Firebase Console](https://firebase.google.com/) and [Expo](https://expo.dev/)
Create a new project.<br>
Enable Firestore.<br>
Enable Authentication.<br>
Enable Email Password Based Authentication.<br>
Create some sample Users for the Application.<br>

### Expo
Create a new project



### Getting started

```
# Install Node 16

nvm install 16
nvm use 16

# Install App Dependencies

cd ZeppelinApp
npm install

# Install Firebase Server App Dependencies

cd ZeppelinServer/firebase/functions
npm install

```
## Setup your config

In [/workspaces/zeppelin/ZeppelinApp/app.json](/workspaces/zeppelin/ZeppelinApp/app.json) change the **firebaseConfig** section to match the app you created in [Firebase](https://console.firebase.google.com/)

## Env variables (secrets)

Create a secret file called .env under [ZeppelinServer/firebase/functions](ZeppelinServer/firebase/functions) and setup the following variables.
```
DW_CLIENT_ID=<Client ID from Drivewealth>
DW_CLIENT_SECRET=<Client Secret from Drivewealth>
DW_APP_KEY=<App Key from Drivewealth>
DW_API_URL=https://bo-api.drivewealth.io
```
