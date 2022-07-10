
const fs = require("fs"); //npm install fs
const path = require("path");

var baseDir = path.resolve("./");

const xl = require('excel4node');
const wb = new xl.Workbook();
const ws = wb.addWorksheet('New_Port_Details');

var dataJson = fs.readFileSync(baseDir + "/testdata/loadMatchDetailsApi.json", "utf8"); //dir of your json file as param

const dataObject = JSON.parse(dataJson);
const dataObjectEntries = Object.entries(dataObject); 
const dataMap = new Map(dataObjectEntries);
var values = []
for (let [key, value] of dataMap.entries()) {
values.push(JSON.parse(value))
}
const headingColumnNames = [
    "City",
    "State",
    "Company Details",
    "Tollfree:\\nPhone:\\nFax",
    "Contacts",
    "Company Description",
    "Authority",
    "Assets",
    "Drayage Service",
    "Ingate / Outgate",
    "Notes",
    "States Served",
    "Tollfree"
]

//Write Column Title in Excel file
let headingColumnIndex = 1;
headingColumnNames.forEach(heading => {
    ws.cell(1, headingColumnIndex++)
        .string(heading)
});

//Write Data in Excel file
let rowIndex = 2;
values.forEach( record => {
    let columnIndex = 1;
    headingColumnNames.forEach(columnName =>{
        ws.cell(rowIndex,columnIndex++)
            .string(record [columnName])
    });
    rowIndex++;
}); 
// let rowIndex = 2;
// values.forEach( record => {
//     let columnIndex = 1;
//     Object.keys(record ).forEach(columnName =>{
//         ws.cell(rowIndex,columnIndex++)
//             .string(record [columnName])
//     });
//     rowIndex++;
// }); 
wb.write('All_ports_details.xlsx');