const issuesTab = document.querySelector('#issues-tab > span:nth-child(2)');

function requestIssues(label) {
  url = window.location.toString().split('/');
  user = url[3];
  repo = url[4];
  label = label.replaceAll(' ', '+');
  return fetch(
    `https://api.github.com/repos/${user}/${repo}/issues?per_page=100&labels=${label}`
  )
    .then(r => r.json())
    .catch(error => console.log(error));
}

function addLabelCount(label) {
  requestIssues(label).then(issues => {
    if (issues.length > 0) {
      issuesTab.textContent += `:${issues.length}`;
    }
  });
}

function getOrDefault(key, defaultValue) {
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


labelsMap = {
  'good first issue': 'green',
  'bug': 'red',
};
var labelsList = getOrDefault('labelsList', ['good first issue', 'bug'])
console.log('labelsList'  + labelsList)
labelsList = getOrDefault('labelsList', ['good first issue', 'bug'])
console.log('labelsList'  + getOrDefault('labelsList', ['good first issue', 'bug']))
console.log('labelsList'  + getOrDefault('labelsList', ['good first issue', 'bug']))
console.log('labelsList'  + getOrDefault('labelsList', ['good first issue', 'bug']))
console.log('labelsList'  + getOrDefault('labelsList', ['good first issue', 'bug']))

if (issuesTab != null) {
  for (const [label, color] of Object.entries(labelsMap)) {
    addLabelCount(label);
  }
} else {
  console.log('No Issues tab');
}
