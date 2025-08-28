import { useNavigate } from "react-router-dom";
import { admin } from "../data/admin";
import { useState } from "react";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // หา student ที่เลขบัตรตรงกับที่กรอก
    const foundAdmin = admin.find((a) => a.username === username && a.password === password);
    if (foundAdmin) {
      navigate("/admin");
    } else {
      setError("Username or password is incorrect");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="w-full max-w-screen-lg mx-auto rounded-lg shadow-md">
        {/* Header */}
        <div className="flex flex-row items-center justify-between bg-[#4a90e2] px-6 py-4 rounded-t-lg">
          <h1 className="text-white text-[35px] font-bold text-center ml-65">
            ระบบแจ้งคะแนนสอบนักเรียน
          </h1>
          <button
            className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors font-bold"
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col justify-center items-center p-6">
          <div className="w-full max-w-lg">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                Admin Login
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    placeholder="Username"
                    className="w-full border-2 border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none transition-colors"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    className="w-full border-2 border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none transition-colors"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                <button className="w-full bg-[#4a90e2] text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors font-medium"
                onClick={handleLogin}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-row items-center justify-center bg-gray-200 px-6 py-4 rounded-b-lg">
          <p className="text-gray-500 text-center">มหาวิทยาลัย...</p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
