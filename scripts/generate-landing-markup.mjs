import fs from "node:fs";

const source = "/Users/adib/Desktop/Infinity_AI_Buildfest/InfluenceIQ/InfluenceIQ.html";
const target = "src/components/landing/landingMarkup.ts";

const html = fs.readFileSync(source, "utf8");
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<script>/);

if (!bodyMatch) {
  throw new Error("Could not extract landing body markup.");
}

const bodyMarkup = bodyMatch[1]
  .replaceAll("assets/influenceiq-scoreline-mark.svg", "/assets/influenceiq-scoreline-mark.svg")
  .replaceAll('href="Signup.html"', 'href="/signup"')
  .replaceAll('href="Dashboard.html"', 'href="/dashboard"')
  .replaceAll('href="Discover.html"', 'href="/discover"')
  .replaceAll('href="Brief.html"', 'href="/briefs/new"')
  .trim();

fs.writeFileSync(
  target,
  `export const landingMarkup = ${JSON.stringify(bodyMarkup)};\n`
);
