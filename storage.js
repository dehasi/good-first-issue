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
    const labelSet = await this.loadLabels();
    const result = Array.from(labelSet).sort();

    if (result.length == 0) {
      const defaultLabels = ['bug', 'good first issue']
      console.log('Saving defaultLabels: ' + defaultLabels);

      this.saveLabels(defaultLabels);
      return defaultLabels;
    }

    return result;
  }

  async loadLabels() {
    const key = this.key;
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (result) => {
        console.log('Retrieved: ' + result);
        resolve(result);
      });
    });
  }
}

