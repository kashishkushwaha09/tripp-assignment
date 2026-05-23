import DragDropUpload from "../components/upload/DragDropUpload";

const UploadPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-5 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-800">
            AI Travel Itinerary Generator
          </h1>

          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your travel bookings and automatically generate a smart AI-powered itinerary.
          </p>
        </div>

        <DragDropUpload />
      </div>
    </div>
  );
};

export default UploadPage;