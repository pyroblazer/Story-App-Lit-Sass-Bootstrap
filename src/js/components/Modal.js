import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';
import Utils from '../utils/utils';

class Modal extends LitWithoutShadowDom {
  constructor() {
    super();
    this.closeModal = Utils.hideModal();
  }

  render() {
    return html`
      <div class="modal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" @click="${this.closeModal}" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p id="modalMessage"></p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('modal-custom', Modal);
