import { html, nothing } from 'lit';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';

class InputWithValidation extends LitWithoutShadowDom {
  static properties = {
    type: { type: String, reflect: true },
    value: { type: String, reflect: true },
    inputId: { type: String, reflect: true },

    validFeedbackMessage: { type: String, reflect: true },
    invalidFeedbackMessage: { type: String, reflect: true },

    required: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this._checkAvailabilityProperty();

    this.type = 'text';
    this.required = false;
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('invalidFeedbackMessage')) {
      throw new Error(
        `Atribut "invalidFeedbackMessage" harus diterapkan pada elemen ${this.localName}`,
      );
    }
  }

  render() {
    const passwordElement = this.type === 'password'
      ? html`
            <div class="input-group-append">
              <button class="btn btn-outline-secondary border-gray" type="button" id="showPasswordButton">
                <i class="bi bi-eye"></i>
              </button>
            </div>
          `
      : nothing;

    return html`
      <div class="input-group">
        <input
          id=${this.inputId || nothing}
          class="form-control"
          type=${this.type}
          .value=${this.value || ''}
          ?required=${this.required}
          minlength=${this.type === 'password' ? 8 : 1}
          @input=${this._handleInput}
        />
        ${passwordElement}
      </div>
      ${this._validFeedbackTemplate()}
      <div class="invalid-feedback">${this.invalidFeedbackMessage}</div>
    `;
  }

  _validFeedbackTemplate() {
    if (this.validFeedbackMessage) {
      return html`
        <div class="valid-feedback">${this.validFeedbackMessage}</div>
      `;
    }

    return html``;
  }
}

customElements.define('input-with-validation', InputWithValidation);
