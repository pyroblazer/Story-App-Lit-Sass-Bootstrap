import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class NavApp extends LitWithoutShadowDom {
  static properties = {
    brandName: { type: String, reflect: true },
    isOpen: { type: Boolean },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();
    this.isOpen = false;
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('brandName')) {
      throw new Error(
        `Atribut "brandName" harus diterapkan pada elemen ${this.localName}`,
      );
    }
  }

  toggleNavbar() {
    this.isOpen = !this.isOpen;
  }

  render() {
    return html`
    <nav class="navbar navbar-dark bg-dark">
          <div class="container">
            <a class="navbar-brand text-uppercase text-bold" href="/"
              >${this.brandName}</a
            >
            <button
              class="navbar-toggler"
              type="button"
              @click=${this.toggleNavbar}
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse ${this.isOpen ? 'show' : ''}">
              <nav-links />
            </div>
          </div>
        </nav>
    `;
  }
}

customElements.define('nav-app', NavApp);
