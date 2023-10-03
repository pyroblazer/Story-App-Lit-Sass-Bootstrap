import geolib from 'geolib';
import Stories from '../../network/stories';
import Utils from '../../utils/utils';

const Add = {
  async init() {
    this._initialUI();
    this._initialListener();
  },

  _initialUI() {},

  _initialListener() {
    const addFormRecord = document.querySelector('#addRecordForm');
    addFormRecord.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        addFormRecord.classList.add('was-validated');
        this._sendPost();
      },
      false,
    );
  },

  async _sendPost() {
    const formData = this._getFormData();

    try {
      const position = await this.getCurrentLocation();

      await Stories.store({
        ...formData,
        photo: formData.photo,
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });

      Utils.showModalWithMessage('New story added successfully');

      setTimeout(() => {
        this._goToHomePage();
      }, 500);
    } catch (error) {
      console.error(error);
      Utils.showModalWithMessage(error);
    }
  },

  _getFormData() {
    const photoInput = document.querySelector('#validationCustomPhoto');
    const descriptionInput = document.querySelector(
      '#validationCustomDescription',
    );

    return {
      description: descriptionInput.value,
      photo: photoInput.files[0],
    };
  },

  _validateFormData(formData) {
    const errors = [];

    if (!formData.description) {
      errors.push('Description is required.');
    }

    if (!formData.photo) {
      errors.push('Photo is required.');
    }

    if (errors.length > 0) {
      const message = errors.join('\n');
      Utils.showModalWithMessage(message);
      return false;
    }

    return true;
  },

  _goToHomePage() {
    window.location.href = '/';
  },
};

export default Add;
