/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const fs = require('fs-extra');

const uiFolder = 'src/components/ui';
const svgFolder = path.join(uiFolder, 'svg');
const targetFile = path.join(svgFolder, 'index.ts');

function stripExtension(filename) {
  return filename.replace('.svg', '');
}

function split(str, index) {
  return [str.slice(0, index), str.slice(index)];
}

function makeIconName(filename) {
  const kebabCase = stripExtension(filename);
  const parts = kebabCase.split('-');
  return parts
    .map(p => {
      const [first, rest] = split(p, 1);
      return first.toUpperCase() + rest;
    })
    .join('');
}

function getSvgList() {
  const files = fs.readdirSync(svgFolder);
  return files
    .filter(f => f.endsWith('.svg'))
    .map(filename => ({
      filename,
      key: stripExtension(filename),
      name: makeIconName(filename),
    }));
}

function main() {
  const svgs = getSvgList();

  const imports = svgs.map(svg => `import ${svg.name} from './${svg.filename}';`).join('\n');
  const exports = svgs.map(svg => `'${svg.key}': ${svg.name},`).join('\n');
  const exportStatement = `export const SVGs = { ${exports} } as const;`;

  const fileContent = `${imports}\n\n${exportStatement}`;

  fs.writeFile(targetFile, fileContent, 'utf-8', function (error) {
    if (error) console.error(error);
  });
}

main();
