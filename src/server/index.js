// Initialization
require('../shared/init');
import './init';

import app from './app';

// Start listening
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`App started listening on port ${port}`);
