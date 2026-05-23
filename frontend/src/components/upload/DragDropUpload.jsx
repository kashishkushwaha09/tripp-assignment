import { useRef, useState } from "react";
import { FiUploadCloud, FiFileText, FiImage } from "react-icons/fi";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { uploadDocument } from "../../services/uploadService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const DragDropUpload = () => {
  const inputRef = useRef(null);
const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const {user} = useAuth();


   const validateFile = (selectedFile) => {
    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Only PDF and image files allowed");
      return false;
    }

    return true;
  };
  const handleFile = (selectedFile) => {
    if (!validateFile(selectedFile)) return;

    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  };
  const handleUpload = async () => {
    const token=user?.token;
    if(!token) return;
    if (!file ) {
      return toast.error("Please select a file");
    }

    try {
      setLoading(true);

      const data = await uploadDocument(file, token);
    
      console.log(data);
      if(data?.success){
      toast.success("Itinerary generated successfully");
      navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.div
        whileHover={{ scale: 1.01 }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
        className={`
          cursor-pointer
          rounded-3xl
          border-2
          border-dashed
          p-10
          transition-all
          duration-300
          text-center
          bg-white/80
          backdrop-blur-md
          shadow-xl
          ${
            dragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }
        `}
      >
        <input
          type="file"
          ref={inputRef}
          hidden
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={(e) => handleFile(e.target.files[0])}
        />

        <div className="flex justify-center mb-5">
          <div className="bg-blue-100 p-5 rounded-full">
            <FiUploadCloud className="text-5xl text-blue-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          Upload Travel Documents
        </h2>

        <p className="mt-3 text-gray-500">
          Drag & drop flight tickets, hotel bookings, or PDFs here
        </p>
         <div className="flex justify-center gap-5 mt-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FiFileText /> PDF
          </div>

          <div className="flex items-center gap-2">
            <FiImage /> JPG / PNG
          </div>
        </div>
      </motion.div>
       {file && (
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-5 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">{file.name}</h3>
            <p className="text-sm text-gray-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium"
          >
            {loading ? "Uploading..." : "Upload File"}
          </button>
        </div>
      )}
    </div>
  );
};

export default DragDropUpload;