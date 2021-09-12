
issues = document.querySelector("#issues-tab > span:nth-child(2)")

alert("Hello from your Chrome extension!", `${issues.text}`)

issues.textContent= "lol it works!"
