import { useNavigate } from 'react-router-dom';
import ImportExport from '../components/ImportExport';

function Admin() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
            <div className="w-full max-w-screen-lg mx-auto rounded-lg shadow-md">
                <div className="flex flex-row items-center justify-between bg-[#4a90e2] px-6 py-4 rounded-t-lg">
                    <h1 className="text-white text-[35px] font-bold text-center ml-65">
                        ระบบแจ้งคะแนนสอบนักเรียน
                    </h1>
                    <button
                        className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors font-bold"
                        onClick={() => navigate("/")}
                    >
                        Logout
                    </button>
                </div>
                {/* <นำเข้า-ส่งออก ข้อมูล /> */}
                <ImportExport />
                <div className="flex flex-row items-center justify-center bg-gray-200 px-6 py-4 rounded-b-lg">
                    <p className="text-gray-500 text-center">
                        มหาวิทยาลัย...
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Admin;