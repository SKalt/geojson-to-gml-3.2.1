const fs = require('fs');
const jsdoc2md = require('jsdoc-to-markdown');

jsdoc2md.render({ files: ['src/index.js'] }).then(
  function(result){
    fs.writeFileSync('API.md', result);
    return 0;
  }
);
