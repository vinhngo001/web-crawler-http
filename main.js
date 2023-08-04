const { crawlPage } = require("./crawl");

function main() {

    // for (const arg of process.argv) {
    //     console.log(arg)
    // }

    // if (process.argv.length < 3) {
    //     console.log("No website provided");
    //     process.exit(1);
    // }
    // if (process.argv.length > 3) {
    //     console.log("too many command line args");
    //     process.exit(1);
    // }



    const baseURL = "https://wagslane.dev";
    console.log(`Staring crwaling... ${baseURL}`);

    crawlPage(baseURL);

}

main()