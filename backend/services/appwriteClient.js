// services/appwriteClient.js
import { Client, Account } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // e.g., 'https://cloud.appwrite.io/v1'
  .setProject('67baef25001f0dd3f9b2'); // Replace with your project ID

export const account = new Account(client);
export default client;
