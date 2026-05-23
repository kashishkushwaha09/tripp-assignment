import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiArrowLeft,
  FiShare2,
} from "react-icons/fi";

import { getSingleItinerary, getSingleItineraryShare } from "../services/itineraryService";
import { useAuth } from "../context/AuthContext";

const ItineraryDetails = () => {
  const { id, shareId } = useParams();

  const [itineraryData, setItineraryData] = useState(null);

  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  
  useEffect(() => {
    if (shareId) {
      fetchSharedItinerary();
    } else {
       fetchItinerary();
    }
  }, []);
  const fetchItinerary = async () => {
    try {
      if (!user) return;
      const response = await getSingleItinerary(id, user?.token);

      setItineraryData(response.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch itinerary");
    } finally {
      setLoading(false);
    }
  };
  const fetchSharedItinerary = async () => {
    try {
   
      const response = await getSingleItineraryShare(shareId);

      setItineraryData(response.data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch itinerary");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/share/${itineraryData.shareId}`;

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
      <div className="border-b border-white/20 bg-white/70 backdrop-blur-lg">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="mb-8 flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-slate-700 shadow transition hover:bg-slate-100"
            >
              <FiArrowLeft />
              Back
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700"
            >
              <FiShare2 />
              Share Trip
            </button>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-xl">
            <h1 className="text-5xl font-bold leading-tight text-slate-800">
              {itineraryData.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-slate-500">
              <div className="flex items-center gap-2">
                <FiMapPin className="text-blue-500" />

                <span className="font-medium">{itineraryData.destination}</span>
              </div>

              <div className="flex items-center gap-2">
                <FiCalendar className="text-blue-500" />

                <span>
                  {new Date(itineraryData.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
                {itineraryData.itinerary?.days?.length} Days Trip
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="space-y-10">
          {itineraryData.itinerary.days.map((dayData) => (
            <div
              key={dayData.day}
              className="overflow-hidden rounded-[2rem] bg-white shadow-xl"
            >
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-6 text-white">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <h2 className="text-3xl font-bold">Day {dayData.day}</h2>

                    <p className="mt-2 text-blue-100">
                      Planned activities and travel schedule
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/20 px-5 py-3 backdrop-blur-lg">
                    <p className="text-sm text-blue-100">Date</p>

                    <p className="mt-1 text-lg font-semibold">{dayData.date}</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="relative border-l-2 border-blue-200 pl-8">
                  {dayData.activities.map((activity, index) => (
                    <div key={index} className="relative mb-10 last:mb-0">
                      <div className="absolute -left-[42px] top-1 h-5 w-5 rounded-full border-4 border-white bg-blue-600 shadow"></div>

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:border-blue-200 hover:bg-white hover:shadow-lg">
                        <div className="mb-4 flex items-center gap-2 text-blue-600">
                          <FiClock />

                          <span className="font-semibold">{activity.time}</span>
                        </div>

                        <p className="text-lg leading-relaxed text-slate-700">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItineraryDetails;
