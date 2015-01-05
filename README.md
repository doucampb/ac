# Arnold Clark Technical Test

##Frontend Code

The following tools and frontend frameworks were used

- Grunt for building and linting
- AngularJS
- Protractor for integration testing

## How to run the application

Ensure NodeJS and grunt are installed.

After cloning the repository, install npm dependencies.

    $ npm install

## Run the Integration tests

Install webdriver

    $ ./node_modules/protractor/bin/webdriver-manager update

Run the integration tests

    $ grunt protractor

## Build the JavaScript concatenated file

Javascript build

    $ grunt concat

## Backend Code
The backend code was written completely in Java and served using the play framework
https://www.playframework.com

After cloning the repository, type the following

    activator run

Now navigatate to http://localhost:9000

The API calls that used could be as follows e.g
http://localhost:9000/api/carImages/obfuscatedStockRef/AKRPNLC410-AUC2
http://localhost:9000/api/stockReference/ARNCI-U-27455/registration/CA04LPK