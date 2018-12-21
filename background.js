const url = chrome.runtime.getURL('data.json');
let on = false, loaded = false;
// let current = -1;

function registerOnClicked(key) {
    chrome.browserAction.onClicked.addListener(function(tab) {
        if (!loaded) {
            console.log('loaded');
            chrome.tabs.executeScript({
                file: 'contentScript.js'
            });

            loaded = true;
        }

        on = !on;
        console.log('status:', on);
        chrome.tabs.sendMessage(tab.id, {on: on});
        chrome.browserAction.setBadgeText({text: on ? 'ON' : 'OFF'});
    });
}

fetch(url)
    .then((response) => response.json()) //assuming file contains json
    .then((json) => {
        registerOnClicked(json.key);
    });
    