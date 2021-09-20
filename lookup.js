const issuesTab = document.querySelector('#issues-tab > span:nth-child(2)');

function user_repo() {
  url = window.location.toString().split('/');
  user = url[3];
  repo = url[4];
  return `${user}/${repo}`;
}

function requestIssues(label) {
  url = window.location.toString().split('/');
  user = url[3];
  repo = url[4];
  label = label.replaceAll(' ', '+');
  return fetch(
    `https://api.github.com/repos/${user_repo()}/issues?per_page=100&labels=${label}`
  )
    .then(r => r.json())
    .catch(error => console.log(error));
}

function addLabelCount(label) {
  requestIssues(label).then(issues => {
    if (issues.length > 0) {
      // TODO: what if we have duplicated labels?
      lbls = issues.flatMap(i => i.labels).filter(l => l.name === label);
      if (lbls.length > 0) {
        labelObject = lbls[0];
        console.log(`${labelObject.name} : ${labelObject.color}`);
        pane = document.querySelector('#repository-container-header'); // > div.d-flex.mb-3.px-3.px-md-4.px-lg-5 > div
        pane.innerHTML += labelElement(labelObject, lbls.length);
      }
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

function labelElement(label, count){
  name = label.name
  // TODO: add proper color
  url = "/" + user_repo() + "/issues?q=is:issue+is:open+label:" + '%22' + name.replaceAll(' ', '+') + '%22';
  return `<span class="labels lh-default d-block d-md-inline">`
         + `<a href="${url}" data-name="${name}"data-view-component="true" class="IssueLabel hx_IssueLabel">`
         + `${name}: ${count}</a></span>`
}

var labelsList = getOrDefault('labelsList', ['good first issue', 'bug'])
console.log('labelsList'  + labelsList)
labelsList = getOrDefault('labelsList', ['good first issue', 'bug'])
console.log('labelsList'  + getOrDefault('labelsList', ['good first issue', 'bug']))

labels =  ['good first issue', 'bug']
if (issuesTab != null) {
  for (let label of labels) {
    addLabelCount(label);
  }
} else {
  console.log('No Issues tab');
}
//https://api.github.com/repos/spring-cloud/spring-coud-contract/issues?per_page=100&labels=bug