import LitWithoutShadowDom from "../base/LitWithoutShadowDom";
import { html } from "lit";
import { msg, updateWhenLocaleChanges } from "@lit/localize";

class Main extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <div class="main-content">
        <div class="container py-5">
          <h1 class="mb-3">${msg("Tambah Story")}</h1>

          <form class="row g-3" id="addRecordForm" novalidate>
            <div class="col-12">
              <label for="validationCustomDescription" class="form-label"
                >${msg("Deskripsi")}</label
              >
              <textarea-with-validation
                inputId="validationCustomDescription"
                invalidFeedbackMessage="Required"
                required
              ></textarea-with-validation>
            </div>

            <div class="col-12">
              <label for="validationCustomPhoto" class="form-label"
                >${msg("Foto")}</label
              >
              <input-image-with-preview
                inputId="validationCustomPhoto"
                invalidFeedbackMessage="Required"
                required
              ></input-image-with-preview>
            </div>

            <div class="col-12 text-end">
              <button class="btn btn-dark" type="submit">${msg("Simpan")}</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}

customElements.define("add-main", Main);