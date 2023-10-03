import Auth from '../../network/auth';
import Utils from '../../utils/utils';

const Register = {
  async init() {
    this._initialListener();
  },

  _initialListener() {
    const registerForm = document.querySelector('#registerForm');
    registerForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        registerForm.classList.add('was-validated');
        await this._getRegistered();
      },
      false,
    );
  },

  async _getRegistered() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      try {
        Auth.register(formData);
        Utils.showModalWithMessage('Registered a new user');

        setTimeout(() => {
          window.location.href = '/auth/login.html';
        }, 500);
      } catch (error) {
        console.error(error);
        Utils.showModalWithMessage(error);
      }
    }
  },

  _getFormData() {
    const name = document.querySelector('#validationCustomRecordName');
    const email = document.querySelector('#validationCustomEmail');
    const password = document.querySelector('#validationCustomPassword');

    return {
      name: name.value,
      email: email.value,
      password: password.value,
    };
  },

  _validateFormData(formData) {
    const { name, email, password } = formData;

    const errors = [];

    if (name.length < 1) {
      errors.push('Please enter a username.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Invalid email address.');
    }

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters.');
    }

    if (errors.length > 0) {
      const errorString = errors.join('\n');
      Utils.showModalWithMessage(errorString);
      return false;
    }

    return true;
  },
};

export default Register;
