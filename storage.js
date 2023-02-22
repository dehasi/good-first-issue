export default class Storage {
  constructor() {
    this.key = 'LABELS';
  }

  saveLabels(labels) {
    const key = this.key;
    chrome.storage.local.set({ key: labels }, () => {
      console.log('Saved: ' + labels);
    });
  }

  async labels() {
    const defaultLabels = ['bug', 'good first issue']
    const labelSet = await this.loadLabels();

    if (labelSet == null) {
      this.saveLabels(defaultLabels);
      return defaultLabels;
    }

    return Array.from(labelSet).sort();
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

