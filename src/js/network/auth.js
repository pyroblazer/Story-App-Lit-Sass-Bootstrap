import Cookies from 'js-cookie';
import axiosInstance from '../utils/http';
import ApiEndpoint from '../config/api-endpoint';
import CheckUserAuth from '../pages/auth/check-user-auth';
import Utils from '../utils/utils';

const Auth = {
  async register({ name, email, password }) {
    try {
      Utils.showSpinner();
      const response = await axiosInstance.post(ApiEndpoint.REGISTER, {
        name,
        email,
        password,
      }).catch((error) => {
        Utils.showModalWithMessage(error.response.data.message);
      });
      return response?.data;
    } catch (error) {
      console.error('Error:', error);
      Utils.showModalWithMessage(error.response.data.message);
      throw error;
    } finally {
      Utils.hideSpinner();
    }
  },

  async login({ email, password }) {
    try {
      Utils.showSpinner();
      const response = await axiosInstance.post(ApiEndpoint.LOGIN, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      alert(error);
      Utils.showModalWithMessage(error.response.data.message);
      throw error;
    } finally {
      Utils.hideSpinner();
    }
  },

  async logout() {
    try {
      Cookies.remove('token');
      Cookies.remove('username');
    } catch (error) {
      console.error('Error:', error);
      Utils.showModalWithMessage(error);
      throw error;
    } finally {
      Utils.hideSpinner();
    }
  },

  async updateProfile() {
    CheckUserAuth.checkLoginState();
  },
};

export default Auth;
