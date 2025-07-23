import { readFile } from "node:fs/promises";

import { Command } from "commander";
import { ParseLatin } from "parse-latin";
import { ParseEnglish } from "parse-english";
import Chinese from "retext-chinese/lib/parser";
import { toString } from "nlcst-to-string";
import { visit } from "unist-util-visit";
import { inspect } from "unist-util-inspect";
import matter from "gray-matter";

const program = new Command();

program.version("0.1.0").description("Natural language parser play.");

setTimeout(() => program.parseAsync());

program
  .command("parse")
  .description("Parse a text file.")
  .argument("<file>", "Text file to parse.")
  .option("-l, --lang <lang>", "Language to parse.", "la")
  .action(async (file, options) => {
    const parser = chooseParser(options.lang);

    const fileContent = await readFile(file, "utf-8");

    const { data, content } = matter(fileContent);
    const hasMatter = Object.keys(data).length > 0;

    const text = hasMatter ? content : fileContent;

    const tree = parser.parse(text);

    console.log(inspect(tree));

    visit(tree, "ParagraphNode", (node) => {
      console.log(toString(node));
    });
  });

function chooseParser(lang: string) {
  switch (lang) {
    case "en":
      return new ParseEnglish();
    case "cn":
      return new Chinese();
    case "la":
    default:
      return new ParseLatin();
  }
}
