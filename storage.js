class storage {
  constructor(defaultLabels = ['bug', 'good first issue']) {
    this.key = 'labels';
    this.labelSet = new Set();
    saveLabels(defaultLabels);
  }

  saveLabels(labels) {
    this.labelSet = new Set(labels);
    chrome.storage.sync.set({ this.key:  this.labelSet }, () => {});

  }

  labels() {
    return Array.from(this.labelSet).sort();
  }

  getOrDefault(key, defaultValue) {
    result = null;
    chrome.storage.sync.get(key, kv => {
      console.log('result ' + kv);
      if (kv[key]) {
        console.log('result ' + kv[key]);
        result = kv[key];
      } else {
        console.log('no value for key ' + key);
        chrome.storage.sync.set({ key: defaultValue }, () => {});
        result = defaultValue;
      }
    });
    return result;
  }
}
