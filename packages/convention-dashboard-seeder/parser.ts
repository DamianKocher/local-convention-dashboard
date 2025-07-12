const FRONT_MATTER_DELIMITER = "---";
import fs from "fs";

const data = fs.readFileSync("./example.md");
const content = data.toString();

console.log(parse(content))

function parse(file: string) {
    const frontMatterStart = file.indexOf(FRONT_MATTER_DELIMITER);
    const afterFrontMatterStart = frontMatterStart + FRONT_MATTER_DELIMITER.length;

    const frontMatterEnd = file.indexOf(FRONT_MATTER_DELIMITER, frontMatterStart + FRONT_MATTER_DELIMITER.length);
    const afterFrontMatterEnd = frontMatterEnd + FRONT_MATTER_DELIMITER.length;

    if (frontMatterStart === -1 || frontMatterEnd === -1) {
        throw new Error();
    }

    const metadata = JSON.parse(file.substring(afterFrontMatterStart, frontMatterEnd));
    const markdown = file.substring(afterFrontMatterEnd);

    return {
        ...metadata,
        markdown
    };
}