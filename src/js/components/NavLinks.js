import { html } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';
import CheckUserAuth from '../pages/auth/check-user-auth';
import Auth from '../network/auth';
import Utils from '../utils/utils';

class NavLinks extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  // eslint-disable-next-line class-methods-use-this
  _userLogOut(event) {
    event.preventDefault();

    try {
      Auth.logout();
      CheckUserAuth.checkLoginState();
    } catch (error) {
      console.error(error);
      Utils.showModalWithMessage(error);
    }
  }

  render() {
    const username = Utils.getUserName();

    return html`
      <ul class="navbar-nav d-flex w-100 align-items-center gap-3">
        <div>
          <img
            id="imgUserLogged"
            style="width: 30px;height: 30px"
            class="img-fluid rounded-pill"
            src="https://ui-avatars.com/api/?name=${username}&background=random"
            alt="User Name"
          />
          <span id="nameUserLogged"></span>
        </div>
        <nav-link content="${msg('Beranda')}" to="/"></nav-link>
        <nav-link content="${msg('Tambah Story')}" to="/stories/add.html"></nav-link>
        <nav-link content="${msg('Tentang Kami')}" to="/about.html"></nav-link>
        <a class="nav-link link-like" id="userLogOut" @click=${this._userLogOut}>${msg('Keluar')}</a>
        <nav-link content="${msg('Masuk')}" to="auth/login.html" id="loginMenu"></nav-link>
      </ul>
    `;
  }
}

customElements.define('nav-links', NavLinks);
