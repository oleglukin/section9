# section9

## What it is
This is a simple Node.js app that uses Graph QL to query GCP Firebase database.  

## How it's built
The app uses the following libraries:  
- express, graphql, apollo to run api server and support GraphQL queries
- firebase to read data from Firebase - GCP (Google Cloud Platform) database service
- babel - to use new JavaScript syntax

## How to access it or run it
The app is deployed to GCP API Engine.  
You can access GraphiQL UI here: https://section9-210115.appspot.com/graphiql  
View GraphQL schema: https://section9-210115.appspot.com/schema

### Prepare some data to query
The app queries Firebase database, so in order to run those queries you would need some data in a Firebase cluster.  
Follow this page to find out how to set up a database: [https://firebase.google.com/] 
After that you would need to load some sample data into the database. This project uses some sample data from 'Airline On-Time Performance Data' database from [US Bureau of Transportation Statistics](https://www.transtats.bts.gov/Tables.asp?DB_ID=120). Data sets:  
- On-Time Performance (the main data set)  
Plus some reference data:
- AirlineID

Downloaded CSV files can be imported into Firebase using some 3rd party tools. This is how it can be done manually:  
- Convert CSV files into Json using some tool like [Total CSV Converter](https://www.coolutils.com/TotalCSVConverter)
- Import Json files into your database using [Firebase console](https://support.google.com/firebase/answer/6386780?hl=en)


### Steps to run it locally
1. Pull the app code to you local drive
2. Run command line in the app folder, e.g. /path/graphql-api/
3. Run `npm install` to download dependencies
4. Build using this command: `npm run-script build` OR `npx babel src --out-dir dist`
5. Run locally: `npm start` or `node ./dist/index.js`
6. Open GraphiQL UI in your browser and run some queries: http://localhost:8080/graphiql/

### Steps to deploy to GCP App Engine
1. Pull code, install dependencies and build
2. Create a [project in GCP](https://cloud.google.com/resource-manager/docs/creating-managing-projects)
3. Enable billing
4. Enable [Google App Engine API](https://support.google.com/cloud/answer/6158841?hl=en)
5. Install GCP SDK
6. Authenticate with Googe account: `gcloud auth login`
7. Set GCP project to deploy to: `gcloud config set project PROJECT_ID`
8. Run this command: `gcloud app deploy`. You might need to comment out these lines from app.yaml:
```
skip_files:
 - ^node_modules$
```








Sample query:  
```
query{
  flights(first:2){
    YEAR
    MONTH
    QUARTER
    CANCELLED
    ORIGIN_CITY_NAME
    DEST_CITY_NAME
    airline{
      Code
      Description
    }
  }
}
```