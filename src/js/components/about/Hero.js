import { html } from 'lit';
import { updateWhenLocaleChanges } from '@lit/localize';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';

class Hero extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <section class="hero section" id="hero">
        <div class="user-intro">
          <h1 class="name">STORIES</h1>
          <p class="title">A story app by Ignatius Timothy Manullang</p>
        </div>
        <div class="avatar">
          <img src="/img/about/logo.png" alt="Stories Logo S Only" />
        </div>
      </section>
    `;
  }
}

customElements.define('about-hero', Hero);
