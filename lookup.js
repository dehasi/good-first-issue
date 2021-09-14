
issues = document.querySelector("#issues-tab > span:nth-child(2)")

if (issues == null) {
    console.log('No Issues tab')
    return
}
// fetch(url).then(r=> r.json().then(j=> console.log('\nREQUEST 2',j)));

issues.textContent= "lol it works!"


function goodIssue(issue) {
  return issue.labels.find(l => l.name == "good first issue").length > 0;
}

url = window.location.toString().split("/")
user = url[3]
repo = url[4]

base = "https://api.github.com/repos/"

async function funcName(url){
    const response = await fetch(url);
    var data = await response.json();
}

cnt = funcName(base + user + "/" + repo).find(goodIssue);
alert(`cnt is ${cnt}`)

