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
The app reads data from Firebase database, so in order to run those queries you would need some data in a Firebase DB.  
Follow this page to find out how to set up a database: https://firebase.google.com/  
After that you would need to load some sample data into the database. This project uses some sample data from 'Airline On-Time Performance Data' database from [US Bureau of Transportation Statistics](https://www.transtats.bts.gov/Tables.asp?DB_ID=120). Data sets:  
- On-Time Performance (the main data set)  
Plus some reference data:
- AirlineID

Downloaded CSV files can be imported into Firebase using some 3rd party tools. This is how it can be done manually:  
- Convert CSV files into Json using a tool like [Total CSV Converter](https://www.coolutils.com/TotalCSVConverter)
- Import Json files into your database using [Firebase console](https://support.google.com/firebase/answer/6386780?hl=en)

Copy firebase API keys and endpoints to [config.js](graphql-api/src/config.js)  


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


## How to use it
Simply follow the Graphi QL link: https://section9-210115.appspot.com/graphiql  
Run your queries there. Refer to the [schema](https://section9-210115.appspot.com/schema)
  
Sample query:  
```
query{
  flights(first:2){
    YEAR
    QUARTER    
    airline{
      Code
      Description
    }
    ORIGIN_CITY_NAME
    origin_airport{
      Code
      Description
    }
    destination_airport{
      Code
      Description
    }
    DEP_TIME
    DEP_DELAY_GROUP
    departure_delay_group {
      Code
      Description
    }
    ARR_DELAY_GROUP
    arrival_delay_group {
      Code
      Description
    }
  }
}
```

You can use some API client like [Postman](https://www.getpostman.com/) to run your queries over HTTP. Example POST query:  
URL: https://section9-210115.appspot.com/graphql  
Json request body:
```
{
	"query": "{ flights(first:2){YEAR MONTH QUARTER CANCELLED ORIGIN_CITY_NAME DEST_CITY_NAME airline{Code Description}}}"
}
```  

If you want to use other data sources or customise your queries update [schema](/graphql-api/src/data/schema.js) and [resolver](/graphql-api/src/data/resolvers.js) functions. Refer to [Apollo Graph QL documentation](https://www.apollographql.com/docs/graphql-tools/generate-schema.html).  

## Key design decisions
The app exposes 3 endpoints: one to run queries, another to view Graphi QL UI, and one to view schema.  
The actual middleware business logic is defined in [resolvers.js](/graphql-api/src/data/resolvers.js). Those functions use firebase library to query the database.

## Critical self-assessment
The app uses Firebase as its data storage. This is probably not the best choise. Being a realtime NoSQL database it is good for mobile apps. However probably not for analytics applications. It lacks features of relational databases, limited indexing, no aggregation.

## Things to improve
- Add more resolvers to access data in different ways according to user requirements
- Support other data sources, e.g. relational databases, other NoSQL databases, REST APIs.
- Add mutations if clients need to modify data

## Some other considerations and discoveries
The API could support some analytics/reporting applications. It could also support some data scientists and analysts who are capable of exploring data through REST APIs. It can serve as a single endpoint to multiple data sources. Also client applications don't need to be changed as long as Graph QL schema doesn't change. That makes backend databases and services changes more flexible.

## Resources
The follwoing tutorials and documentation pages were used to create this app:
- [GraphQL Server on Cloud Functions for Firebase](https://codeburst.io/graphql-server-on-cloud-functions-for-firebase-ae97441399c0)
- [RESTful Web Service with Node.js, Google App Engine and Firebase Real-time Database](https://medium.com/@csgsajeewa/restful-web-service-with-node-js-google-app-engine-and-firebase-48910b0b16a7)
- [Apollo Server documentation](https://www.apollographql.com/docs/apollo-server/)
- [Build a CMS API With GraphQL and Apollo Server](https://blog.manifold.co/build-a-cms-api-with-graphql-and-apollo-server-ae6a5d5c7fb3)
- [How to wrap a REST API with GraphQL - A 3-step tutorial](https://www.prisma.io/blog/how-to-wrap-a-rest-api-with-graphql-8bf3fb17547d/)
- [Google Firebase documentation](https://firebase.google.com)