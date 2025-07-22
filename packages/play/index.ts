import { readFile } from "node:fs/promises";

import { Command } from "commander";
import { ParseLatin } from "parse-latin";
import { ParseEnglish } from "parse-english";
import { toString } from "nlcst-to-string";
import { visit } from "unist-util-visit";

const program = new Command();

program.version("0.1.0").description("Natural language parser play.");

setTimeout(() => program.parseAsync());

program
  .command("parse")
  .description("Parse a text file.")
  .argument("<file>", "Text file to parse.")
  .option("-l, --lang <lang>", "Language to parse.", "latin")
  .action(async (file, options) => {
    const parser =
      options.lang === "latin" ? new ParseLatin() : new ParseEnglish();

    const content = await readFile(file, "utf-8");

    const tree = parser.parse(content);

    visit(tree, "ParagraphNode", (node) => {
      console.log(toString(node));
    });
  });
