import setupGraphQLServer from "./graphql/server"
import { https } from "firebase-functions"

/* CF for Firebase with graphql-server-express */
const graphQLServer = setupGraphQLServer()

// https://us-central1-section9-210115.cloudfunctions.net/api
export const api = https.onRequest(graphQLServer)