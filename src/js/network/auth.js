import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import axios from 'axios';
import { auth } from '../utils/firebase';
import ApiEndpoint from '../config/api-endpoint';

const Auth = {
  async register({ name, email, password }) {
    try {
      // Make the POST request using Axios
      const response = await axios.post(ApiEndpoint.REGISTER, {
        name,
        email,
        password,
      });

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  async login({ email, password }) {
    return signInWithEmailAndPassword(auth, email, password);
  },

  async logout() {
    return signOut(auth);
  },

  async updateProfile(user, { displayName = null } = {}) {
    return updateProfile(user, {
      displayName,
    });
  },
};

export default Auth;
