import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class Spinner extends LitWithoutShadowDom {
  render() {
    return html`
      <div id="spinner" class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    `;
  }

  _templateIcon() {
    if (this.icon) {
      return html`<i class="bi ${this.icon} me-1"></i>`;
    }

    return html``;
  }
}

customElements.define('spinner-custom', Spinner);
