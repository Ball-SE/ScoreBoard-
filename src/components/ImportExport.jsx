import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';

function ImportExport() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('ไม่ได้เลือกไฟล์');
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleExportTemplate = () => {
    // สร้างไฟล์ Excel (.xlsx) ที่มีเฉพาะ header ให้ผู้ใช้กรอกข้อมูลต่อ
    const header = [['ชื่อ','นามสกุล','รหัสนักเรียน','ชั้น','ห้อง','วิชา','คะแนน']];
    const worksheet = XLSX.utils.aoa_to_sheet(header);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'student_template');
    XLSX.writeFile(workbook, 'student_template.xlsx');
  };

  const handleImport = () => {
    if (!selectedFile) {
      alert('กรุณาเลือกไฟล์ก่อน');
      return;
    }
    
    const isExcel = /\.(xlsx|xls)$/i.test(selectedFile.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        if (isExcel) {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheet];
          const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
          console.log('Excel rows:', rows);
        } else {
          // รองรับ .csv ด้วยการให้ xlsx แปลงจาก string เช่นกัน
          const text = e.target.result;
          const workbook = XLSX.read(text, { type: 'string' });
          const firstSheet = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheet];
          const rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
          console.log('CSV rows:', rows);
        }
        alert('นำเข้าข้อมูลสำเร็จ');
      } catch (err) {
        console.error(err);
        alert('รูปแบบไฟล์ไม่ถูกต้อง หรืออ่านไฟล์ไม่สำเร็จ');
      }
    };
    if (isExcel) {
      reader.readAsArrayBuffer(selectedFile);
    } else {
      reader.readAsText(selectedFile, 'utf-8');
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col justify-center items-center p-6">
      <div className="w-full ">
        <div className="bg-white rounded-lg shadow-md p-6 w-full">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            จัดการข้อมูลนักเรียน
          </h2>
          <div className="bg-blue-200 border-2 border-dashed border-blue-500 rounded-lg p-4">
            <h1 className="font-bold text-lg">นำเข้า-ส่งออก ข้อมูล</h1>
            <p>
              คุณสามารถเพิ่ม/อัปเดตข้อมูลนักเรียนจำนวนมากได้อย่างรวดเร็วโดยใช้ไฟล์ Excel (.xlsx) หรือ CSV
            </p>
            <ol>
              <li>
                1. <span className="font-bold">ดาวน์โหลด Template: </span>
                กดปุ่ม "Export Template" เพื่อรับไฟล์ Excel ที่มีหัวตารางถูกต้อง
              </li>
              <li>
                2. <span className="font-bold">กรอกข้อมูล: </span>
                เปิดไฟล์ด้วยโปรแกรม Spreadsheet และกรอกข้อมูลนักเรียน
              </li>
              <li>
                3. <span className="font-bold">นำเข้าข้อมูล: </span>
                เลือกไฟล์ที่กรอกข้อมูลแล้วและกดปุ่ม "Import"
              </li>
            </ol>
            <div className="flex flex-row gap-4 mt-4">
              <button 
                onClick={handleExportTemplate}
                className="w-full bg-[#4a90e2] text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors font-medium"
              >
                Export Template
              </button>
              <button 
                onClick={handleFileButtonClick}
                className="w-full flex justify-evenly bg-white border-2 border-dashed rounded-md border-gray-300 text-gray-500 py-3 px-4 hover:bg-gray-100 transition-colors font-medium"
              >
                <span className="font-bold text-center bg-gray-200 rounded-md text-blue-500 w-1/3">
                  เลือกไฟล์
                </span>
                <span className="text-center">{fileName}</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              <button 
                onClick={handleImport}
                className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition-colors font-medium"
              >
                Import
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImportExport;
