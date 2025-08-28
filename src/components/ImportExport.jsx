import React, { useState, useRef } from 'react';

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
    // Create CSV template content
    const templateContent = 'ชื่อ,นามสกุล,รหัสนักเรียน,ชั้น,ห้อง,วิชา,คะแนน\n';
    const blob = new Blob([templateContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'student_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImport = () => {
    if (!selectedFile) {
      alert('กรุณาเลือกไฟล์ก่อน');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const csvContent = e.target.result;
      // Here you would process the CSV content
      console.log('CSV Content:', csvContent);
      alert('นำเข้าข้อมูลสำเร็จ');
    };
    reader.readAsText(selectedFile);
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
              คุณสามารถเพิ่ม/อัปเดตข้อมูลนักเรียนจำนวนมากได้อย่างรวดเร็วโดยใช้ไฟล์
              csv
            </p>
            <ol>
              <li>
                1. <span className="font-bold">ดาวน์โหลด Template: </span>
                กดปุ่ม "Export Template" เพื่อรับไฟล์ CSV ที่มีหัวตารางถูกต้อง
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
                accept=".csv"
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
