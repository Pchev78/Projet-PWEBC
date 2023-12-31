var adBlockEnabled = false;
var testAd = document.createElement('div');
testAd.innerHTML = ' ';
testAd.className = 'adsbox';
document.body.appendChild(testAd);
window.setTimeout(function() {
    if (testAd.offsetHeight === 0) {
        adBlockEnabled = true;
    }
    testAd.remove();
    if (adBlockEnabled) {
        console.error("Le bloqueur de publicités est activé.");
    } else {
        console.info("Le bloqueur de publicités n'est pas activé.");
    }
}, 100);
