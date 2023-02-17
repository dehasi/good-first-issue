export default class Storage {
    constructor(defaultLabels = ['bug', 'good first issue']) {
        this.key = 'labels';

        labelSet = getObjectFromLocalStorage(this.key);

      if (labelSet == null) {
            saveObjectInLocalStorage({
                [this.key]: labelSet
            });
        }

        saveLabels(defaultLabels);
    }

    saveLabels(labels) {
      const kk = this.key;
      chrome.storage.local.set({kk : labels}, ()=> {

        console.log('Saved  ' + labels);
      });
    }

    labels() {
        return Array.from(getObjectFromLocalStorage(this.key)).sort();
    }

    getObjectFromLocalStorage(key) {
      chrome.storage.local.get([key], (result) => {
        console.log('Retrieved name: ' + result);
      });
    }
}
