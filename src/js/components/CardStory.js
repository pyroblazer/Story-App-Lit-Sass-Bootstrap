// import LitWithoutShadowDom from "./base/LitWithoutShadowDom";
// import { html } from "lit";
// import { msg, updateWhenLocaleChanges } from "@lit/localize";
// import Stories from "../network/stories";

// class CardStory extends LitWithoutShadowDom {
//   static properties = {
//     storyRecord: { type: Object, reflect: true },
//     createdAtDate: { type: String, reflect: true },
//   };

//   constructor(storyRecord, createdAtDate) {
//     super();
//     updateWhenLocaleChanges(this);

//     console.log(storyRecord);
//     this.storyRecord = storyRecord;
//     this.createdAtDate = createdAtDate;
//   }

//   render() {
//     return html`
//       <div class="col-xxl-3 col-lg-4 col-md-6 col-12 mb-3">
//         <div class="card border-dark">
//           <img class="card-img-top" src=${Stories.storyRecord.photoUrl} />
//           <div class="card-body">
//             <h5 class="card-title">
//               ${storyRecord.name}
//             </h5>
//             <p class="card-text">${createdAtDate}</p>
//             <p class="card-text custom-text-truncate">${storyRecord.description}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     `;
//   }
// }

// customElements.define("card-story", CardStory);
