//importando a biblioteca do excelnode 
const x1 = require("excel4node");
//area de trabalho da planilha
const wb = new x1.Workbook();

/// dando o nome da planilha 
const ws = wb.addWorksheet('Nome da Planilha')


//JSON para exportar em arquivo csv ou arquivo de planilha 
const data =[
    {
        "name ": "teste",
        "email": "teste@gmail.com",
        "phone": "123456789"
    },
    {
        "name ": "João",
        "email": "pessoa@gmail.com",
        "phone": "123456789"
    },
    {
        "name ": "Gabriel",
        "email": "pessoa@gmail.com",
        "phone": "123456789"
    },
    {
        "name ": "Lucas",
        "email": "pessoa@gmail.com",
        "phone": "123456789"
    },
    {
        "name ": "Caio",
        "email": "pessoa@gmail.com",
        "phone": "123456789"
    }
]

//definindo colunas da planinha 
const headingColumnNames =[
    "names",
    "email",
    "celualar"
]

//definindo uma primeira linha para os titulos da tabela
let headingColumnIndex =  1;
headingColumnNames.forEach(heading => {

    ws.cell(1, headingColumnIndex++).string(heading);
})


//gerando uma linha da tabela para os dados do JSON para tabela
let rowIndex =2;
data.forEach(record =>{
    let columnIndex = 1;
    Object.keys(record).forEach(columnName=>{
        ws.cell(rowIndex, columnIndex++).string(record[columnName])
    })
    rowIndex++;
})

wb.write('arquivo.xlsx')
wb.write('arquivo.csv')