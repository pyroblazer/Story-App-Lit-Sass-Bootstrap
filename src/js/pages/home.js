import Stories from '../network/stories';
import Utils from '../utils/utils';

const Home = {
  async init() {
    await this._initialData();
    this._initialListener();
  },

  async _initialData() {
    try {
      Utils.showSpinner();
      this._userStories = await Stories.getAll();

      this._populateStoriesRecordToTable(this._userStories.listStory);
    } catch (error) {
      console.error(error);
      Utils.showModalWithMessage(error);
    } finally {
      Utils.hideSpinner();
    }
  },

  _initialListener() {
    const customTextTruncateElements = document.querySelectorAll(
      '.custom-text-truncate',
    );

    customTextTruncateElements.forEach((customTextTruncate) => {
      const expandBtn = document.createElement('button');
      expandBtn.type = 'button';
      expandBtn.classList.add('w-100');
      expandBtn.classList.add('bi');
      expandBtn.classList.add('bi-arrows-expand');
      expandBtn.classList.add('expand-btn');
      expandBtn.classList.add('btn');
      expandBtn.classList.add('btn-dark');

      customTextTruncate.insertAdjacentElement('afterend', expandBtn);

      const closeBtn = document.createElement('button');
      closeBtn.type = 'button';

      closeBtn.classList.add('w-100');
      closeBtn.classList.add('bi');
      closeBtn.classList.add('bi-x');
      closeBtn.classList.add('close-btn');
      closeBtn.classList.add('btn');
      closeBtn.classList.add('btn-dark');
      customTextTruncate.insertAdjacentElement('afterend', closeBtn);

      expandBtn.addEventListener('click', () => {
        customTextTruncate.classList.add('expanded');
      });

      closeBtn.addEventListener('click', () => {
        customTextTruncate.classList.remove('expanded');
      });
    });
  },

  _convertTimestampToDate(timestamp) {
    const date = new Date(timestamp);

    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes} UTC`;

    const formattedDateString = `${formattedDate}, ${formattedTime}`;

    return formattedDateString;
  },

  _isDescriptionThreeLines(description, fontSize, lineHeight, containerWidth) {
    const expectedHeightForThreeLines = lineHeight * 3;

    const tempElement = document.createElement('div');
    tempElement.style.fontSize = `${fontSize}px`;
    tempElement.style.lineHeight = `${lineHeight}px`;
    tempElement.style.width = `${containerWidth}px`;
    tempElement.style.position = 'absolute';
    tempElement.style.visibility = 'hidden';
    tempElement.innerHTML = description;

    document.body.appendChild(tempElement);

    const tempElementHeight = tempElement.clientHeight;

    document.body.removeChild(tempElement);

    return tempElementHeight <= expectedHeightForThreeLines;
  },

  _populateStoriesRecordToTable(listStory = null) {
    if (!(typeof listStory === 'object')) {
      throw new Error(
        `Parameter listStory should be an object. The value is ${listStory}`,
      );
    }

    if (!Array.isArray(listStory)) {
      throw new Error(
        `Parameter listStory should be an array. The value is ${listStory}`,
      );
    }

    const recordBodyGrid = document.querySelector('#recordsGridRow');

    if (listStory.length <= 0) {
      recordBodyGrid.innerHTML = 'EMPTY';
      return;
    }

    listStory.forEach((item, idx) => {
      const storyRecord = listStory[idx];
      const templateBodyCard = this._templateBodyCard(idx, storyRecord);
      recordBodyGrid.innerHTML += templateBodyCard;
      const descriptionElement = document.getElementById(`description-${idx}`);

      // Example usage:
      const {
        lineHeight,
        containerWidth,
        fontSize,
        clientHeight,
      } = window.getComputedStyle(descriptionElement);
      const fontSizeInPixels = parseFloat(fontSize);
      const lineHeightInPixels = parseFloat(lineHeight);
      const containerWidthInPixels = parseFloat(containerWidth);
      const clientHeightInPixels = parseFloat(clientHeight);
      const isThreeLines = this._isDescriptionThreeLines(
        storyRecord.description,
        fontSizeInPixels,
        lineHeightInPixels,
        containerWidthInPixels,
        clientHeightInPixels,
      );
      if (!isThreeLines) descriptionElement.classList.add('custom-text-truncate');
    });
  },

  _templateBodyCard(index, storyRecord) {
    const createdAtDate = this._convertTimestampToDate(storyRecord.createdAt);
    const location = storyRecord.lat && storyRecord.lon ? `${storyRecord.lat}, ${storyRecord.lon}` : '';

    return /* html */ `
      <div class="col-xxl-3 col-lg-4 col-md-6 col-12 mb-3">
        <div class="card border-dark" style="min-height: 720px;">
          <img class="card-img-top" id="img-${storyRecord.id}" src="${storyRecord.photoUrl}" style="height: 450px; overflow: hidden; object-fit: cover;"/>
          <div class="card-body">
            <h5 class="card-title">
              ${storyRecord.name}
            </h5>
            <p class="card-text">${createdAtDate}</p>
            <p id="location" class="card-text" style="min-height: 1em;">${location}</p>
            <div>
              <p id="description-${index}" class="card-text-2">
                ${storyRecord.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

export default Home;
