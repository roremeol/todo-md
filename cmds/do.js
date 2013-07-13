// Node.js
var path            = require('path');
var fs              = require('fs');

// Local
var todo = require("../lib/todo.js");

module.exports = function (program) {

	program
	   .command('do <index>')
	   .description('Marks task as done')
	   .option('-i, --input <file>')
	   .option('-o, --output [file]')
	   .action(function(index, opts) {
	   		opts = todo.getDefaultOptions(program, opts);

			var markdown = todo.readTodo(opts.input)
				.map(function(line, i) {
					if (i++ == index)
					  line = todo.markDone(line);

					return line;
				});

			if (opts.output)
				fs.writeFile(opts.output, markdown.join('\n'));

			console.log(markdown.map(todo.addCount).join('\n'));

	   });
	
};