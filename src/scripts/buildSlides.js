require('../shared/init');

import frontmatter from 'front-matter';
import fs from 'fs';
import path from 'path';

const slideDir = 'slides';

const slides = fs.readdirSync('slides')
  .filter(filename => filename.endsWith('.md'))
  .map((filename, i) => {
    const slideNumber = i + 1;
    const fullFilename = path.join(slideDir, filename);

    const { attributes, body } = frontmatter(
      fs.readFileSync(fullFilename, 'utf8')
    );

    // Rename files for consistency
    const newFilename = path.join(slideDir, `${slideNumber}.md`);
    fs.renameSync(fullFilename, newFilename);

    return {
      body,
      slideNumber,
      ...attributes,
    }
  });

const output = fs.writeFileSync('public/slides.json', JSON.stringify(slides));
