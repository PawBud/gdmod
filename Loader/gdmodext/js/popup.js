let patcherButton = document.getElementById("patcher-button");

patcherButton.addEventListener("click", function() {
    if (!patcherButton.hasAttribute("disabled")) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {message: "patch"});
        });
        patcherButton.setAttribute("disabled", true);
        chrome.windows.create({
            url: chrome.runtime.getURL("html/menu.html"),
            type: "popup"
        });
    }
});

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.runtime.onMessage.addListener(function(event) {
        if(typeof event["id"] !== "undefined") {
            if(event["id"] === "pong") {
                patcherButton.removeAttribute("disabled");
                patcherButton.innerText = "Open Control Pannel";
                document.getElementById("searching").innerText = "GD game found!";
            }
        }
    });
    chrome.tabs.sendMessage(tabs[0].id, {message: "ping"});
});