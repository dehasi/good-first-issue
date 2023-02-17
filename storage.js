export default class Storage {
    constructor(defaultLabels = ['bug', 'good first issue']) {
      this.key = 'LABELS';

      labelSet = loadLabels(this.key);

      if (labelSet == null) {
         saveLabels(defaultLabels);
      }
    }

    saveLabels(labels) {
      const key = this.key;
      chrome.storage.local.set({key : labels}, () => {
        console.log('Saved: ' + labels);
      });
    }

    labels() {
        return Array.from(loadLabels()).sort();
    }

    loadLabels() {
      const key = this.key;
      var res = []
      chrome.storage.local.get([key], (result) => {
        res = result;
        console.log('Retrieved: ' + result);
      });
      return res;
    }
}
