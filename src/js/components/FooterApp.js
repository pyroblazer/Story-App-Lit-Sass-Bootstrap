import { html } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class FooterApp extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <locale-picker class="d-block mb-3"></locale-picker>
      <p class="text-center text-white mb-0">
        ${msg('STORIES by Ignatius Timothy Manullang')}
      </p>
    `;
  }
}

customElements.define('footer-app', FooterApp);
