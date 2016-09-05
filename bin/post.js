const fs = require('fs');
const sCurDir = process.cwd(), // get current directory
	sTitle = process.argv[2],  // get the post title
	oDate = new Date(),        // get current date
	sDate = oDate.getFullYear() +
			'-' +
			((oDate.getMonth()+1) > 10 ? '' : '0')  + (oDate.getMonth()+1) +
			'-' +
			(oDate.getDate() > 10 ? '' : '0') + oDate.getDate(),
	sFilePath = sCurDir + '\\' + 
				sDate + '-' + 
				sTitle.replace(/\s+/g, '-') + '.md';
// data wrote into the post file
const data = '---\n' +
			'title: ' + sTitle + '\n' +
			'date: ' + sDate + '\n' +
			'author: uolcano\n' +
			'categories: \n' +
			'tags: \n' +
			'---';

fs.access(sFilePath, fs.F_OK, err => { // check if file exists
	if(err) { // write it if file not exists
		fs.writeFile(sFilePath, data, err => {
			if(err) throw err;
		});
	} else {
		console.log('Error: create file failed, for the file has existed.');
	}
});
