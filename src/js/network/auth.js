import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../utils/firebase';

const Auth = {
  async register({ email, password }) {
    return createUserWithEmailAndPassword(auth, email, password);
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
