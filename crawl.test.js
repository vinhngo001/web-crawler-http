const { normalizeURL, getURLsFormHTML } = require("./crawl");
const { test, expect } = require("@jest/globals");

test("normalizeURL", () => {
    const input = "https://blog.boot.dev/path";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
});

test("normalizeURL strip protocol", () => {
    const input = "https://blog.boot.dev/path";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);

});

test("normalizeURL capitials", () => {
    const input = "https://BLOG.boot.dev/path";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
    const input = "http://blog.boot.dev/path";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
});

test("getURLsFormHTML", () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev/">Boot.dev Blog</a>
            </body>
        </html>
    `
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFormHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/"];
    expect(actual).toEqual(expected);
});

test("getURLsFormHTML relative", () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="/path/">Boot.dev Blog</a>
            </body>
        </html>
    `
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFormHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
});


test("getURLsFormHTML absolute", () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev/path/">Boot.dev Blog</a>
            </body>
        </html>
    `
    const inputBaseURL = "https://blog.boot.dev/path/";
    const actual = getURLsFormHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
});