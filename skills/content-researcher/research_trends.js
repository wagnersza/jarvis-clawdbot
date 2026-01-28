const fetch = require('node-fetch');
const fs = require('fs');

const sourcesFile = './sources.json';

async function fetchContent(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }
        const text = await response.text();
        return text;
    } catch (error) {
        console.error(`Error fetching URL: ${url}\n`, error);
        return null;
    }
}

async function main() {
    const sources = JSON.parse(fs.readFileSync(sourcesFile, 'utf8'));
    const allResults = {};

    for (const category in sources) {
        allResults[category] = [];
        for (const url of sources[category].urls) {
            const content = await fetchContent(url);
            if (content) {
                allResults[category].push({ url, content });
            }
        }
    }

    const outputFilePath = `./research_trends_output_${new Date().toISOString().slice(0, 10)}.json`;

    fs.writeFileSync(outputFilePath, JSON.stringify(allResults, null, 2));
    console.log(`Research results saved to ${outputFilePath}`);
}

main().catch(err => console.error(err));