const fs = require('fs');
const jsdoc2md = require('jsdoc-to-markdown');

var readme = fs.readFileSync('.readme.md', 'utf8');
jsdoc2md.render({ files: ['geomToGml-3.2.1.js'] }).then(
    function(result){
	readme += '\n' + result;
	fs.writeFileSync('README.md', readme);
	console.log(readme);
	return 0;
    }
);
