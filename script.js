console.log('tools.js run')
const csv = require("csv-parser")
const fs = require('fs')
const results = []

let tableData = {
	headers: [],
	rows: []
}
fs.createReadStream('data/test1.csv')
  .pipe(csv())
  .on('data', (data) => tableData.rows.push(data))
	.on('headers', (headers) => tableData.headers = headers)
  .on('end', () => {
    console.log(tableData)
		var table = Handlebars.compile(document.querySelector('#table-template').innerHTML)
		document.querySelector('#table-wrapper').innerHTML = table(
			{
				headers: tableData.headers,
				rows:tableData.rows.map( obj => Object.values(obj) )
			}
		)
  });

// document.addEventListener('DOMContentLoaded', function(){
//     console.log('document ready')
// }, false);
