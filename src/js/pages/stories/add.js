const Add = {
  async init() {
    this._initialUI();
    this._initialListener();
  },

  _initialUI() {
 
  },

  _initialListener() {
    const addFormRecord = document.querySelector("#addRecordForm");
    addFormRecord.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        addFormRecord.classList.add("was-validated");
        this._sendPost();
      },
      false,
    );
  },

  _sendPost() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log("formData");
      console.log(formData);

      this._goToHomePage();
    }
  },

  _getFormData() {
    const nameInput = "Current User";
    const dateInput = new Date().toISOString();
    const photoInput = document.querySelector("#validationCustomPhoto");
    const descriptionInput = document.querySelector("#validationCustomDescription");

    return {
      name: nameInput.value,
      description: descriptionInput.value,
      photoUrl: photoInput.files[0],
      createdAt: dateInput.value,
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter(
      (item) => item === "",
    );

    return formDataFiltered.length === 0;
  },

  _goToHomePage() {
    window.location.href = "/";
  },
};

export default Add;
