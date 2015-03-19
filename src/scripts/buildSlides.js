require('../shared/init');

import frontmatter from 'front-matter';
import fs from 'fs';
import path from 'path';

const slideDir = 'slides';

const slides = fs.readdirSync('slides')
  .filter(filename => filename.endsWith('.md'))
  .sort(sortAlphabetically)
  .map((filename, i) => {
    const slideNumber = i + 1;
    const fullFilename = path.join(slideDir, filename);

    const { attributes, body } = frontmatter(
      fs.readFileSync(fullFilename, 'utf8')
    );

    return {
      body,
      slideNumber,
      ...attributes,
    }
  });

const output = fs.writeFileSync('public/slides.json', JSON.stringify(slides));

function sortAlphabetically(a, b) {
  a = parseInt(a);
  b = parseInt(b);
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
