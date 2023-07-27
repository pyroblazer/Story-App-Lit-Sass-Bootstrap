import { v4 as uuidv4 } from 'uuid';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import axios from 'axios';
import { auth, db, storage } from '../utils/firebase';
import ApiEndpoint from '../config/api-endpoint';

const Stories = {
  async getAll() {
    let responseRecords = {};
    try {
      // Make the GET request using Axios
      const response = await axios.get(ApiEndpoint.GET_ALL_STORY);

      console.log(response);

      // Access the data from the response
      responseRecords = response.data;
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error('Error:', error);
    }
    return responseRecords;
  },

  async getById(id) {
    const storyRef = doc(db, 'stories', id);
    const docSnapshot = await getDoc(storyRef);

    return docSnapshot.data();
  },

  async store({ description, photoUrl }) {
    const storiesRef = collection(db, 'stories');
    const data = { description, photoUrl };

    return addDoc(storiesRef, {
      ...data,
      id: uuidv4(),
      name: auth.currentUser.displayName,
      createdAt: new Date().toISOString(),
    });
  },

  async storePhoto(file) {
    const storageRef = ref(
      storage,
      `stories/${auth.currentUser.uid}/${file.name}`,
    );

    return uploadBytes(storageRef, file);
  },

  async getPhotoURL(fileFullPath) {
    const storageRef = ref(storage, fileFullPath);

    return getDownloadURL(storageRef);
  },
};

export default Stories;
