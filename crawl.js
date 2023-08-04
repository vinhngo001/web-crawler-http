const { JSDOM } = require("jsdom");

function getURLsFormHTML(htmlBody, baseUrl) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    for (const linkEl of linkElements) {
        console.log({ linkEl: linkEl.href });
        urls.push(linkEl.href);
    }
    return urls;
}

function normalizeURL(urlString) {
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    console.log({ hostPath });
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    }
    return hostPath;
}

module.exports = {
    normalizeURL: normalizeURL,
    getURLsFormHTML: getURLsFormHTML
}