import Cookies from 'js-cookie';
import { Modal } from 'bootstrap';

/* eslint-disable no-undef */
const Utils = {
  setUserToken(key, value) {
    return sessionStorage.setItem(key, value);
  },
  getUserToken(key) {
    return sessionStorage.getItem(key);
  },
  destroyUserToken(key) {
    return sessionStorage.removeItem(key);
  },
  showSpinner() {
    const loadingSpinner = document.getElementById('loadingModal');
    loadingSpinner.parentNode.classList.replace('d-none', 'vh-100');
  },
  hideSpinner() {
    const loadingSpinner = document.getElementById('loadingModal');
    loadingSpinner.parentNode.classList.replace('vh-100', 'd-none');
  },
  getUserName() {
    return Cookies.get('username') ?? 'User Name';
  },
  showModalWithMessage(message) {
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.innerHTML = message.replace(/\n/g, '<br>');
    const modal = document.querySelector('#myModal');
    modal.style.display = 'block';
  },
  hideModal() {
    const modal = document.querySelector('#myModal');
    modal.style.display = 'none';
    this.hideSpinner();
  },
};

export default Utils;
