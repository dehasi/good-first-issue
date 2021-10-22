export default class Storage {
    constructor(defaultLabels = ['bug', 'good first issue']) {
        this.key = 'labels';

        labelSet = getObjectFromLocalStorage(this.key);

        if(labelSet == null){
            saveObjectInLocalStorage({
                [this.key]: labelSet
            });
        }

        saveLabels(defaultLabels);
    }

    saveLabels(labels) {
        saveObjectInLocalStorage({ [this.key]: labels});
    }

    labels() {
        return Array.from(getObjectFromLocalStorage(this.key)).sort();
    }

    async getObjectFromLocalStorage(key) {
      return new Promise((resolve, reject) => {
        try {
          chrome.storage.local.get(key, function(value) {
            resolve(value[key]);
          });
        } catch (ex) {
          reject(ex);
        }
      });
    }

    async saveObjectInLocalStorage(obj) {
      return new Promise((resolve, reject) => {
        try {
          chrome.storage.local.set(obj, function() {
            resolve();
          });
        } catch (ex) {
          reject(ex);
        }
      });
    }
}
