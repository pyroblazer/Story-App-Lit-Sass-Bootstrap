/* eslint-disable no-unused-expressions */
// import axios from 'axios';
import Cookies from 'js-cookie';
import axiosInstance from '../utils/http';
import ApiEndpoint from '../config/api-endpoint';
import CheckUserAuth from '../pages/auth/check-user-auth';
import Utils from '../utils/utils';

const Stories = {
  async getAll() {
    let responseRecords = {};
    try {
      Utils.showSpinner();

      const userSignedIn = CheckUserAuth.isUserSignedIn();

      if (!userSignedIn) return responseRecords;

      const authToken = Cookies.get('token');

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await axiosInstance.get(ApiEndpoint.GET_ALL_STORY, config);

      responseRecords = response.data;
    } catch (error) {
      console.error('Error:', error);
      Utils.showModalWithMessage(error);
    } finally {
      Utils.hideSpinner();
    }
    return responseRecords;
  },

  async getById(id) {
    let responseRecord = {};
    try {
      Utils.showSpinner();

      const userSignedIn = CheckUserAuth.isUserSignedIn();

      if (!userSignedIn) return responseRecord;

      const authToken = Cookies.get('token');

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const response = await axiosInstance.get(ApiEndpoint.GET_BY_ID_STORY(id), config);

      responseRecord = response.data;
    } catch (error) {
      console.error('Error:', error);
      Utils.showModalWithMessage(error);
    } finally {
      Utils.hideSpinner();
    }

    return responseRecord;
  },

  async store({
    description, photo, lat = null, lon = null,
  }) {
    let response; // Declare response outside the try-catch block
    try {
      const userSignedIn = CheckUserAuth.isUserSignedIn();

      const headers = {
        'Content-Type': 'multipart/form-data',
      };

      if (userSignedIn) {
        const authToken = Cookies.get('token');
        headers.Authorization = `Bearer ${authToken}`;
      }

      const config = {
        headers,
      };

      const formData = new FormData();

      formData.append('photo', photo);
      formData.append('description', description);
      if (lat !== null) formData.append('lat', lat); // Use !== null instead of a ternary operator
      if (lon !== null) formData.append('lon', lon); // Use !== null instead of a ternary operator

      const url = userSignedIn ? ApiEndpoint.STORE_STORY : ApiEndpoint.STORE_STORY_GUEST;
      response = await axiosInstance.post(url, formData, config);
    } catch (error) {
      console.error(error);
      Utils.showModalWithMessage(error);
    } finally {
      Utils.hideSpinner();
    }
    return response.data; // Return response outside the try-catch block
  },
};

export default Stories;
