console.log('tools.js run')
const csv = require("csv-parser")
const fs = require('fs')
const {dialog} = require('electron').remote

function updateTable(filepath){
	let tableData = {
		headers: [],
		rows: []
	}
	let docTitle = filepath.split('\\').slice(-1)[0]
	document.querySelector('#docTitle').innerHTML = docTitle

	fs.createReadStream(filepath)
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
}

function clickOpen(){
	dialog.showOpenDialog({ properties: [ 'openFile' ]}).then((data) => {
		console.log(data)
		updateTable(data.filePaths[0])
	})
}
