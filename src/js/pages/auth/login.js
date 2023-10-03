import Cookies from 'js-cookie';
import Auth from '../../network/auth';
import Utils from '../../utils/utils';

const Login = {
  async init() {
    this._showHidePassword();
    this._initialListener();
  },

  _initialListener() {
    const loginForm = document.querySelector('#loginForm');
    loginForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        loginForm.classList.add('was-validated');
        await this._getLogged();
      },
      false,
    );
  },

  async _getLogged() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      try {
        Utils.showSpinner();

        const response = await Auth.login({
          email: formData.email,
          password: formData.password,
        });

        Cookies.set('token', response.loginResult.token, { secure: true, expires: 1 });
        Cookies.set('username', response.loginResult.name, { secure: true, expires: 1 });

        await Auth.updateProfile(response.user, {
          displayName: response.loginResult.name,
        });
      } catch (error) {
        console.error(error);
        Utils.showModalWithMessage(error.response.data.message);
      } finally {
        Utils.hideSpinner();
      }
    }
  },

  _getFormData() {
    const email = document.querySelector('#validationCustomRecordEmail');
    const password = document.querySelector('#validationCustomPassword');

    return {
      email: email.value,
      password: password.value,
    };
  },

  _validateFormData(formData) {
    const { email, password } = formData;

    const errors = [];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Invalid email address.');
    }

    if (password.length < 1) {
      errors.push('Please enter the password.');
    }

    if (errors.length > 0) {
      const errorString = errors.join('\n');
      Utils.showModalWithMessage(errorString);
      return false;
    }

    return true;
  },

  _showHidePassword() {
    const passwordInput = document.getElementById('validationCustomPassword');
    const showPasswordButton = document.getElementById('showPasswordButton');
    showPasswordButton.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showPasswordButton.innerHTML = '<i class="bi bi-eye-slash"></i>';
      } else {
        passwordInput.type = 'password';
        showPasswordButton.innerHTML = '<i class="bi bi-eye"></i>';
      }
    });
  },
};

export default Login;
