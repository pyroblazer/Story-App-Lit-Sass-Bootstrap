import { html } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';

class Top extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <section class="d-flex justify-content-between align-items-center">
        <h1>${msg('Stories Untukmu')}</h1>
        <button-link
          classes="btn-dark text-capitalize"
          to="/stories/add.html"
          icon="bi-plus-lg"
          content="${msg('Tambah Story')}"
        ></button-link>
      </section>
    `;
  }
}

customElements.define('home-top', Top);
