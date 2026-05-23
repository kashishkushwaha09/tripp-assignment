import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  FiMapPin,
  FiCalendar,
  FiShare2,
  FiTrash2,
  FiEye,
  FiPlus,
} from "react-icons/fi";

import {
  getUserItineraries,
  deleteItinerary,
} from "../services/itineraryService";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  const {user} = useAuth();

  useEffect(() => {
    fetchItineraries();
  }, []);

  const fetchItineraries = async () => {
    try {
        const token=user?.token;
       
        if(!token) return;
      const data = await getUserItineraries(user?.token);

      setItineraries(data.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch itineraries");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
        if(!user?.token) return;
      await deleteItinerary(id, user?.token);

      setItineraries((prev) =>
        prev.filter((item) => item._id !== id)
      );

      toast.success("Itinerary deleted");
    } catch (error) {
      console.log(error);

      toast.error("Delete failed");
    }
  };

  const handleShare = (shareId) => {
    const shareUrl = `${window.location.origin}/share/${shareId}`;

    navigator.clipboard.writeText(shareUrl);

    toast.success("Share link copied");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
     
      <div className="border-b border-white/20 bg-white/60 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="mb-3 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-600">
                AI Powered Travel Planner
              </p>

              <h1 className="max-w-3xl text-5xl font-bold leading-tight text-slate-800">
                Your Smart Travel Itinerary Dashboard
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
                Upload booking documents and generate intelligent AI-powered
                travel itineraries instantly.
              </p>
            </div>

            <Link
              to="/upload"
              className="flex items-center gap-3 rounded-2xl bg-blue-600 px-7 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-2xl"
            >
              <FiPlus className="text-xl" />
              Upload Booking
            </Link>
          </div>
        </div>
      </div>

     
      <div className="mx-auto max-w-7xl px-6 py-12">
       
        <div className="mb-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-500">
              Total Itineraries
            </h3>

            <p className="mt-3 text-4xl font-bold text-blue-600">
              {itineraries.length}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-500">
              AI Generated
            </h3>

            <p className="mt-3 text-4xl font-bold text-emerald-600">
              100%
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-500">
              Shared Trips
            </h3>

            <p className="mt-3 text-4xl font-bold text-purple-600">
              {
                itineraries.filter(
                  (item) => item.shareId
                ).length
              }
            </p>
          </div>
        </div>

       
        {itineraries.length === 0 ? (
          <div className="rounded-[2rem] bg-white p-16 text-center shadow-xl">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
              <FiMapPin className="text-4xl text-blue-600" />
            </div>

            <h2 className="mt-8 text-3xl font-bold text-slate-800">
              No itineraries yet
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
              Upload your travel booking documents and generate smart AI travel
              plans instantly.
            </p>

            <Link
              to="/upload"
              className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-7 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-blue-700"
            >
              <FiPlus />
              Create First Itinerary
            </Link>
          </div>
        ) : (
          <>
            
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate-800">
                  Recent Itineraries
                </h2>

                <p className="mt-2 text-slate-500">
                  Manage, share and explore your AI-generated trips.
                </p>
              </div>
            </div>

            {/* Cards */}
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {itineraries.map((item) => (
                <div
                  key={item._id}
                  className="group overflow-hidden rounded-[2rem] bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
               
                  <div className="h-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

                  <div className="p-7">
                  
                    <div className="mb-5">
                      <h3 className="line-clamp-2 text-2xl font-bold text-slate-800">
                        {item.title}
                      </h3>

                      <div className="mt-4 flex items-center gap-2 text-slate-500">
                        <FiMapPin className="text-blue-500" />

                        <span className="font-medium">
                          {item.destination || "Unknown Destination"}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                        <FiCalendar />

                        <span>
                          {new Date(
                            item.createdAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="mb-6 rounded-2xl bg-slate-100 p-4">
                      <p className="text-sm font-medium text-slate-500">
                        Trip Duration
                      </p>

                      <p className="mt-1 text-xl font-bold text-slate-800">
                        {item.itinerary?.days?.length || 0} Days
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        to={`/itinerary/${item._id}`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700"
                      >
                        <FiEye />
                        View
                      </Link>

                      <button
                        onClick={() =>
                          handleShare(item.shareId)
                        }
                        className="flex items-center justify-center rounded-xl border border-slate-200 p-3 text-slate-600 transition-all duration-300 hover:bg-slate-100"
                      >
                        <FiShare2 className="text-lg" />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item._id)
                        }
                        className="flex items-center justify-center rounded-xl border border-red-200 p-3 text-red-500 transition-all duration-300 hover:bg-red-50"
                      >
                        <FiTrash2 className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
