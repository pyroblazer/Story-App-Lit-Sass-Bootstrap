import Cookies from 'js-cookie';

const CheckUserAuth = {
  excludeRedirectPage: ['login.html', 'register.html'],

  isUserSignedIn() {
    return Cookies.get('token');
  },

  checkLoginState() {
    const isUserOnAuthPage = this._isUserOnAuthPage(this.excludeRedirectPage);

    const isUserSignedIn = this.isUserSignedIn();

    if (isUserSignedIn) {
      if (isUserOnAuthPage) {
        window.location.replace('/');
      } else {
        this._showLoginMenuOrUserLogMenu(isUserSignedIn);
      }
    } else if (!isUserOnAuthPage) {
      window.location.replace('/auth/login.html');
    }
  },

  _showLoginMenuOrUserLogMenu(userLoginState) {
    const loginMenu = document.querySelector('#loginMenu');
    const userLoggedMenu = document.querySelector('#userLoggedMenu');

    if (!userLoginState) {
      loginMenu?.classList.add('d-block');
      userLoggedMenu?.classList.add('d-none');

      loginMenu?.classList.remove('d-none');
      userLoggedMenu?.classList.remove('d-block');

      return;
    }

    loginMenu?.classList.add('d-none');
    userLoggedMenu?.classList.add('d-block');

    loginMenu?.classList.remove('d-block');
    userLoggedMenu?.classList.remove('d-none');
  },

  _isUserOnAuthPage(pages) {
    const filteredPages = pages.filter((item) => window.location.pathname.endsWith(item));
    return Boolean(filteredPages.length);
  },
};

export default CheckUserAuth;
