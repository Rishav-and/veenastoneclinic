import React from 'react'

import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';

//basic layout to export content to excel sheet.

export const ExportCSV = ({csvData, fileName, buttonText}) => {



    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const fileExtension = '.xlsx';



    const exportToCSV = (csvData, fileName) => {

        const ws = XLSX.utils.json_to_sheet(csvData);

        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };

        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

        const data = new Blob([excelBuffer], {type: fileType});

        FileSaver.saveAs(data, fileName + fileExtension);

    }



    return (

        <button  onClick={(e) => exportToCSV(csvData,fileName)} className="btn btn-success export">{buttonText}</button>

    )

}