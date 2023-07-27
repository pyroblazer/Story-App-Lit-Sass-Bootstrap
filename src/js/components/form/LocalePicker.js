import { html } from 'lit';
import { updateWhenLocaleChanges } from '@lit/localize';
import { allLocales } from '../../../generated/locale-codes';
import {
  getLocale,
  localeNames,
  setLocaleFromUrl,
} from '../../localization';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';

class LocalePicker extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <select class="form-select w-auto m-auto" @change=${this._localeChanged}>
        ${allLocales.map((locale) => html`
            <option value=${locale} ?selected=${locale === getLocale()}>
              ${localeNames[locale]}
            </option>
          `)}
      </select>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  _localeChanged(event) {
    const newLocale = event.target.value;

    if (newLocale !== getLocale()) {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', newLocale);

      window.history.pushState(null, '', url.toString());
      setLocaleFromUrl();
    }
  }
}

customElements.define('locale-picker', LocalePicker);
