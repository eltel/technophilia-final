import { MongoClient } from 'mongodb';

const uri = process.env.DATABASE_URL;
if (!uri) {
    throw new Error('Please define the DATABASE_URL environment variable');
  }
const options = {};


let client;
let clientPromise: Promise<MongoClient> | undefined;

if (!process.env.DATABASE_URL) {
  throw new Error('Please add your Mongo URI to .env.local');
}

declare const global: {
    [key: string]: any;
};

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so the database connection
    // is not constantly reopened during hot reloads.
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;
