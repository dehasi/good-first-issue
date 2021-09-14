issuesTab = document.querySelector('#issues-tab > span:nth-child(2)');

if (issuesTab == null) {
  console.log('No Issues tab');
}

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

label = 'good first issue';
requestIssues(label).then(issues => {
  if (issues.length > 0) {
    issuesTab.textContent += `:${issues.length}`;
  }
});
