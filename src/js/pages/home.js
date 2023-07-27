import Stories from '../network/stories';

const Home = {
  async init() {
    await this._initialData();
    this._initialListener();
  },

  async _initialData() {
    // const fetchRecords = await fetch("/data/DATA.json");
    // const responseRecords = await fetchRecords.json();

    // this._userListStory = responseRecords.listStory;
    // this._populateStoriesRecordToTable(this._userListStory);
    try {
      this._userStories = await Stories.getAll();

      // this._userStories = responseRecords.listStory;
      this._populateStoriesRecordToTable(this._userStories);
    } catch (error) {
      console.error(error);
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
      recordBodyGrid.innerHTML += this._templateBodyCard(idx, listStory[idx]);
    });
  },

  _templateBodyCard(index, storyRecord) {
    const createdAtDate = this._convertTimestampToDate(storyRecord.createdAt);

    return /* html */ `
      <div class="col-xxl-3 col-lg-4 col-md-6 col-12 mb-3">
        <div class="card border-dark">
          <img class="card-img-top" id="img-${storyRecord.id}" src="${storyRecord.photoUrl}"/>
          <div class="card-body">
            <h5 class="card-title">
              ${storyRecord.name}
            </h5>
            <p class="card-text">${createdAtDate}</p>
            <p class="card-text custom-text-truncate">${storyRecord.description}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

export default Home;
