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
import { auth, db, storage } from '../utils/firebase';

const Stories = {
  async getAll() {
    const storiesRef = collection(db, 'stories');
    const storiesQuery = query(
      storiesRef,
    );
    const querySnapshot = await getDocs(storiesQuery);

    const stories = [];
    querySnapshot.forEach((item) => {
      stories.push({
        id: item.id,
        ...item.data(),
      });
    });

    return stories;
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
