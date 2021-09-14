issuesTab = document.querySelector('#issues-tab > span:nth-child(2)');

if (issuesTab == null) {
  console.log('No Issues tab');
}

issuesTab.textContent = 'lol it works!';

async function requestIssues() {
  url = window.location.toString().split('/');
  user = url[3];
  repo = url[4];
  data = null;

  return fetch(`https://api.github.com/repos/${user}/${repo}`)
    .then(r => r.json())
    .catch(error => console.log(error));
  // return response.json;
}

function goodIssue(issue) {
  return issue.labels.find(l => l.name === 'good first issue').length > 0;
}

requestIssues()
  .then(issues => {
    alert(`issues is ${issues}`);
    return issues.find(goodIssue).size();
  })
  .then(cnt => {
    alert(`cnt is ${cnt}`);
  });
// alert(`issues is ${issues}`);
// cnt = issues.find(goodIssue).size();
// alert(`cnt is ${cnt}`);
