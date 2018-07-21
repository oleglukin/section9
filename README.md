# section9

This is a Node.js api that uses Graph QL to query GCP Firebase database


It is deployed to GCP API Engine.  
You can access GraphiQL UI here: https://section9-210115.appspot.com/graphiql  
View GraphQL schema: https://section9-210115.appspot.com/schema

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
