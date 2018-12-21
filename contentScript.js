const url = chrome.runtime.getURL('data.json');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
} 

let mapJson, mapKeys = -1;
function fancify(evt) {
    if (mapJson && mapKeys && mapKeys.length > 0 && evt.key && evt.key.length === 1) {
        evt.preventDefault();
        const currentIndex = getRandomInt(0, mapKeys.length);
        const valueToUse = mapJson.map[mapKeys[currentIndex]][evt.key] || evt.key;
        evt.srcElement.value += valueToUse;
    }
}

// let mapJson, currentJson, currentIndex = -1
// window.addEventListener('keydown', fancify);

fetch(url)
    .then((response) => response.json()) //assuming file contains json
    .then((json) => {
        mapJson = json;
        mapKeys = Object.keys(mapJson.map);

    });

chrome.runtime.onMessage.addListener(function(message) {
    console.log('message:', message.on);
    message.on ? window.addEventListener('keydown', fancify) :
                 window.removeEventListener('keydown', fancify);
});