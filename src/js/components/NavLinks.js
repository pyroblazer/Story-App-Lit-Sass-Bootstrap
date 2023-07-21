import { html } from "lit";
import LitWithoutShadowDom from "./base/LitWithoutShadowDom";
import { msg, updateWhenLocaleChanges } from "@lit/localize";

class NavLinks extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <ul class="navbar-nav navbar-nav justify-content-end flex-grow-1 pe-3">
        <nav-link content="${msg(`Beranda`)}" to="/"></nav-link>
        <nav-link
          content="${msg(`Tambah Story`)}"
          to="/stories/add.html"
        ></nav-link>
        <nav-link
          content="${msg(`Tentang Kami`)}"
          to="/about.html"
        ></nav-link>
        <nav-link-auth class="d-none" id="userLoggedMenu"></nav-link-auth>
        <nav-link content="${msg(`Masuk`)}" to="#" id="loginMenu"></nav-link>
      </ul>
    `;
  }
}

customElements.define("nav-links", NavLinks);
