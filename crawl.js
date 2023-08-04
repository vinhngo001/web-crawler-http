const { JSDOM } = require("jsdom");
const fetch = require("node-fetch");

async function crawlPage(currentUrl) {
    console.log(`actively crawling: ${currentUrl}`);

    const resp = await fetch(currentUrl);

    console.log(await resp.text());
}

function getURLsFormHTML(htmlBody, baseUrl) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');

    for (const linkEl of linkElements) {
        // console.log({ linkEl: linkEl.href });
        if (linkEl.href.slice(0, 1) === "/") {
            const urlObj = new URL(`${baseUrl}${linkEl.href}`);
            urls.push(urlObj.href);
        } else {
            const urlObj = new URL(linkEl.href);
            urls.push(urlObj.href);
        }
    }
    // console.log({ urls });
    return urls;
}

function normalizeURL(urlString) {
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    // console.log({ hostPath });
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    }
    return hostPath;
}

module.exports = {
    normalizeURL: normalizeURL,
    getURLsFormHTML: getURLsFormHTML,
    crawlPage: crawlPage
}