# Zeppelin

A sample trading app built on Drivewealth Trading APIs. It contains a backend based on [Firebase](https://firebase.google.com/) and an app built using [Expo](https://expo.dev/)

## Important
The code available in this repository is intended to demonstrate the usage of the Drivewealth APIs and is provided as open source. However, please note that it is not optimized for production use and Drivewealth does not provide official support for this code.

## Firebase (Backend)

This code uses [Firebase](https://firebase.google.com/) to serve as the backend for the Zeppelin App. We will be using the Authentication feature to authorize users to the App. We will also use Firestore as a database to save the **Application User to Drivewealth User** mapping.

## Expo (Frontend)

The app is built out to be Universal (runs on Android, iOS and the Web) using [Expo](https://expo.dev/). It also uses [Native Base](https://nativebase.io/) for UI Components. 

## Getting started

Signup for accounts at [Firebase](https://firebase.google.com/). If you are planning to build native apps, signup for [Expo](https://expo.dev/) as well.

### Firebase

In your Firebase Console do the [Firebase Console](https://firebase.google.com/) perform the following steps ...<br>
1) Create a new project.<br>
2) Enable Firestore<br>
3) Enable Authentication.<br>
4) Enable Email Password Based Authentication.<br>
5) Create some sample Users for the Application.<br>
6) Create a web app. Project Settings > General > Your Apps.<br>
7) Copy the ```firebaseConfig``` of the web app into [ZeppelinApp/app.json](ZeppelinApp/app.json)<br>


### On Local Machine

This setup uses [Node 16](https://nodejs.org/en/blog/release/v16.16.0). One can manage multiple versions of Nodejs with [NVM](https://github.com/nvm-sh/nvm#installing-and-updating). If you are on Codespaces nvm should already be installed for you.

```
# Install NVM. Make sure you add nvm to the path. Follow the instructions post installation.

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash


# Install Node 16

nvm install 16
nvm use 16

# Install Firebase CLI
npm install -g firebase-tools

# Login and associate the project you created earlier.
firebase login
firebase projects:list
firebase use --add
firebase use <project-id>

# Install App Dependencies

cd ZeppelinApp
npm install

# Install Firebase Server App Dependencies

cd ZeppelinServer/firebase/functions
npm install

```

## Env variables (secrets)

Create a secret file called .env under [ZeppelinServer/firebase/functions](ZeppelinServer/firebase/functions) and setup the following variables.
```
DW_CLIENT_ID=<Client ID from Drivewealth>
DW_CLIENT_SECRET=<Client Secret from Drivewealth>
DW_APP_KEY=<App Key from Drivewealth>
DW_API_URL=https://bo-api.drivewealth.io
```

## Running the App

Start the local server

```
# Inside the ZeppelinServer/firebase

firebase serve
```

Start the app

```
# Inside the ZeppelinApp

npm start
# tap on "w" to start the web app
```
