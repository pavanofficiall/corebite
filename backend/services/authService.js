// services/authService.js
import { account } from './appwriteClient';

export const signUp = async (email, password, name) => {
  try {
    // The first argument "unique()" generates a unique ID automatically.
    const response = await account.create('unique()', email, password, name);
    return response;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const response = await account.createEmailSession(email, password);
    return response;
  } catch (error) {
    throw error;
  }
};
