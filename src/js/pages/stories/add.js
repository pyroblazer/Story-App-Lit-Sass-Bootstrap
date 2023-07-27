import Stories from '../../network/stories';

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
    console.log('formDataInitSendPost');
    console.log(formData);

    try {
      const storageResponse = await Stories.storePhoto(formData.photoUrl);
      const srcPhoto = await Stories.getPhotoURL(storageResponse.metadata.fullPath);

      const response = await Stories.store({
        ...formData,
        photoUrl: srcPhoto,
      });
      console.log(response);
      window.alert('New story added successfully');

      this._goToHomePage();
    } catch (error) {
      console.error(error);
    }
  },

  _getFormData() {
    const photoInput = document.querySelector('#validationCustomPhoto');
    const descriptionInput = document.querySelector(
      '#validationCustomDescription',
    );

    return {
      description: descriptionInput.value,
      photoUrl: photoInput.files[0],
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter(
      (item) => item === '',
    );

    return formDataFiltered.length === 0;
  },

  _goToHomePage() {
    window.location.href = '/';
  },
};

export default Add;
