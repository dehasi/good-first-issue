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
      labelObject = issues.flatMap(i => i.labels).find(l => l.name === label);
      if (labelObject != null) {
        console.log(`${labelObject.name} : ${labelObject.color}`);
        pane = document.querySelector('#repository-container-header'); // > div.d-flex.mb-3.px-3.px-md-4.px-lg-5 > div
        pane.innerHTML += labelElement(labelObject, issues.length);
      } else {
        console.warn(`Label ${label} is not found`);
      }
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


function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function yc(color) {
  const t = "string" == typeof color ? parseInt(color.replace("#", ""), 16) : color;
  return +((299 * ((t >> 16) & 255) + 587 * ((t >> 8) & 255) + 114 * (255 & t)) / 1e3 / 255).toFixed(2) < 0.6
    ? "#ffffff"
    : "#000000";
}

// http://24ways.org/2010/calculating-color-contrast
// This is the same lightness algorithm as used on GitHub
function isDarkColor(color) {
  hh = hexToRgb(color);
//  const [r, g, b] = hh.r;
  const yiq = (hh.r * 299 + hh.g * 587 + hh.b * 114) / 1000;
  // Note: the value 150 is hardcoded into GitHub
  return yiq < 150;
}

function labelElement(label, count) {
  name = label.name
  color = label.color
  fontColor = isDarkColor(color) ? "#ffffff" : "#000000";
  url = "/" + user_repo() + "/issues?q=is:issue+is:open+label:" + '%22' + name.replaceAll(' ', '+') + '%22';
  return `<span class="labels lh-default d-block d-md-inline">`
         + `<a href="${url}" data-name="${name}"data-view-component="true"`
         + ` style="background: #${color}; color: #${fontColor}; border-color: #${color}" `
         + ` class="IssueLabel hx_IssueLabel">`
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
//https://api.github.com/repos/spring-cloud/spring-cloud-contract/issues?per_page=100&labels=bug