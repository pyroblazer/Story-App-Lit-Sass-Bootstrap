import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class Spinner extends LitWithoutShadowDom {
  render() {
    return html`
      <div class="position-absolute start-0 top-0 d-flex justify-content-center align-items-center d-none vw-100 bg-black bg-opacity-75">
        <div class="spinner-border text-primary" id="loadingModal" role="status">
          <span class="visually-hidden"
          >Loading...</span>
        </div>
      </div>
    `;
  }

  // _templateIcon() {
  //   if (this.icon) {
  //     return html`<i class="bi ${this.icon} me-1"></i>`;
  //   }

  //   return html``;
  // }
}

customElements.define('spinner-custom', Spinner);
