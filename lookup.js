issues = document.querySelector('#issues-tab > span:nth-child(2)');

if (issues == null) {
  console.log('No Issues tab');
}
// fetch(url).then(r=> r.json().then(j=> console.log('\nREQUEST 2',j)));

issues.textContent = 'lol it works!';

async function requestIssues() {
  url = window.location.toString().split('/');
  user = url[3];
  repo = url[4];
  data = null;

  const response = await fetch(`https://api.github.com/repos/${user}/${repo}`)
    .catch(function (error) {
      console.log(error);
    });
  return response.json;
}

function goodIssue(issue) {
  return issue.labels.find(l => l.name === 'good first issue').length > 0;
}

async function funcName(url) {
  const response = await fetch(url);
  var data = await response.json();
}

cnt = requestIssues()
alert(`cnt is ${cnt}`);
