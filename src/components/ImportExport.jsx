import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';

function ImportExport() {
  // import/export states
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('ไม่ได้เลือกไฟล์');
  const fileInputRef = useRef(null);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleExportTemplate = () => {
    const header = [[
      'code','name','classLevel','course',
      'listening','reading','writing','total',
      'passingScore','testLevel','testCalendar','notes','savedBy','status'
    ]];
    const worksheet = XLSX.utils.aoa_to_sheet(header);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'add_course_template');
    XLSX.writeFile(workbook, 'add_course_template.xlsx');
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
        let parsed;
        if (isExcel) {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheet];
          parsed = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        } else {
          const text = e.target.result;
          const workbook = XLSX.read(text, { type: 'string' });
          const firstSheet = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheet];
          parsed = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        }
        setRows(parsed);
        if (parsed.length > 0) sendRowToForm(parsed[0]);
        alert('นำเข้าข้อมูลสำเร็จและส่งไปยังฟอร์มแล้ว');
      } catch (err) {
        console.error(err);
        alert('รูปแบบไฟล์ไม่ถูกต้อง หรืออ่านไฟล์ไม่สำเร็จ');
      }
    };
    if (isExcel) reader.readAsArrayBuffer(selectedFile);
    else reader.readAsText(selectedFile, 'utf-8');
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const sendRowToForm = (row) => {
    const draft = {
      code: row.code || '',
      name: row.name || '',
      classLevel: row.classLevel || '',
      course: row.course || '',
      listening: row.listening || '',
      reading: row.reading || '',
      writing: row.writing || '',
      total: row.total || '',
      passingScore: row.passingScore || '',
      testLevel: row.testLevel || '',
      testCalendar: row.testCalendar || '',
      notes: row.notes || '',
      savedBy: row.savedBy || '',
      status: row.status || '',
    };
    localStorage.setItem('addCourseDraft', JSON.stringify(draft));
    alert('ส่งข้อมูลไปยังฟอร์มแล้ว ให้สลับไปหน้าเพิ่มข้อมูลรายวิชาเพื่อกรอกอัตโนมัติ');
  };

  // ไม่มีส่วนแก้ไขนักเรียนที่นี่แล้ว — ใช้หน้าที่แยกต่างหากแทน

  return (
    <>
    <div className="flex flex-col justify-center items-center p-6">
      <div className="w-full ">

        {/* Tabs Navbar */}
        <div className="w-full bg-gray-100 rounded-t-lg">
          <div className="flex gap-2 px-2 pt-2">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium bg-white text-blue-600 border border-b-0 border-blue-200 rounded-t-md shadow-sm"
              aria-current="page"
            >
              จัดการข้อมูลนักเรียน
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/edit/all')}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-white border border-transparent rounded-t-md"
            >
              แก้ไขข้อมูลนักเรียน
            </button>
          </div>
        </div>

        <div className="bg-white rounded-b-lg shadow-md p-6 w-full">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            จัดการข้อมูลนักเรียน
          </h2>

          {/* Import Panel */}
            <div className="bg-blue-200 border-2 border-dashed border-blue-500 rounded-lg p-4">
              <h1 className="font-bold text-lg">นำเข้า-ส่งออก ข้อมูล</h1>
              <p>คุณสามารถเพิ่ม/อัปเดตข้อมูลนักเรียนจำนวนมากได้อย่างรวดเร็วโดยใช้ไฟล์ Excel (.xlsx) หรือ CSV</p>
              <ol>
                <li>1. <span className="font-bold">ดาวน์โหลด Template: </span>กดปุ่ม "Export Template"</li>
                <li>2. <span className="font-bold">กรอกข้อมูล: </span>เปิดไฟล์และกรอกข้อมูลนักเรียน</li>
                <li>3. <span className="font-bold">นำเข้าข้อมูล: </span>เลือกไฟล์และกด "Import"</li>
              </ol>
              <div className="flex flex-row gap-4 mt-4">
                <button onClick={handleExportTemplate} className="w-full bg-[#4a90e2] text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors font-medium">Export Template</button>
                <button onClick={handleFileButtonClick} className="w-full flex justify-evenly bg-white border-2 border-dashed rounded-md border-gray-300 text-gray-500 py-3 px-4 hover:bg-gray-100 transition-colors font-medium">
                  <span className="font-bold text-center bg-gray-200 rounded-md text-blue-500 w-1/3">เลือกไฟล์</span>
                  <span className="text-center">{fileName}</span>
                </button>
                <input ref={fileInputRef} type="file" accept=".xlsx,.xls,.csv" onChange={handleFileSelect} style={{ display: 'none' }} />
                <button onClick={handleImport} className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition-colors font-medium">Import</button>
              </div>
            </div>
          
        </div>
      </div>
    </div>

    {rows.length > 0 && (
      <div className="w-full px-6 md:max-w-4xl mx-auto mt-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-sm text-gray-700 mb-2">ตัวอย่างข้อมูล (แถวแรก):</div>
          <div className="overflow-x-auto">
            <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto max-h-40 whitespace-pre-wrap break-words">
              {JSON.stringify(rows[0], null, 2)}
            </pre>
          </div>
          <div className="mt-2 flex gap-2 flex-col sm:flex-row">
            <button
              onClick={() => sendRowToForm(rows[0])}
              className="px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto text-center"
            >
              ส่งแถวแรกไปกรอกฟอร์ม
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

export default ImportExport;