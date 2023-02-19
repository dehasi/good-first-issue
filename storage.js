export default class Storage {
  constructor(defaultLabels = ['bug', 'good first issue']) {
    this.key = 'LABELS';

    const labelSet = await loadLabels();

    if (labelSet == null) {
      saveLabels(defaultLabels);
    }
  }

  saveLabels(labels) {
    const key = this.key;
    chrome.storage.local.set({ key: labels }, () => {
      console.log('Saved: ' + labels);
    });
  }

  labels() {
    return Array.from(loadLabels()).sort();
  }

  async loadLabels() {
    const key = this.key;
    return new Promise((resolve) => {
      chrome.storage.local.get([key], (result) => {
        console.log('Retrieved: ' + result);
        resolve(result);
      });
    });
  }
}

