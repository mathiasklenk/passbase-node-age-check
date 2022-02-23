![alt text](https://i.imgur.com/cOj85Lg.jpg "Passbase Header")

# Passbase Age Checker

This App shows an example integration of the Passbase Node.js server-side library. Before your try to run the App please sign up on our [developer platform](https://app.passbase.com/signup) and use **your own secret API key**, which you can find in the [API settings](https://app.passbase.com/settings/api) section. 

Please follow our integration guide in our [developer documentation](https://docs.passbase.com/server/api) to install all dependencies first in a correct way.

## Requirements

Ensure that you have an up to date version of node installed. This means, that you will also need to have `npm` installed. If you haven't, please follow [this guide here](https://www.pluralsight.com/guides/getting-started-with-nodejs) first to install everything correctly.

## Install & Run

In the project directory you can run:

1. Run `npm install` inside the project directory in order to install the dependencies
2. Go into `index.js` and change `SECRET_API_KEY` with your own secret API key.
3. Run `npm start` to start the development server
4. Navigate to the [developer dashboard](https://app.passbase.com/) and add a webbhook endpoint (you need to use a tunneling tool such as `ngrok` to forward the requests to your local development server with https). An endpoint could look like this: `https://b5c1-62-241-124-98.ngrok.io/passbase-webhooks`
5. Within the [developer dashboard](https://app.passbase.com/) approve or decline an existing verification
6. It should print out if the user is over 18 or not in the console based on the birthdate

This runs the app in the development mode. Open your terminal to see the verification information logged in the console.
