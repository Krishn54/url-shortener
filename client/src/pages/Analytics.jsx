import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API_URL = import.meta.env.VITE_API_URL;

const Analytics = () => {
  const { id } = useParams();

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const chartData = analytics
    ? Object.entries(analytics.clicksPerDay)
        .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
        .map(([date, clicks]) => ({
          date,
          clicks,
        }))
    : [];

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`${API_URL}/analytics/${id}`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Failed to fetch analytics");
          return;
        }

        setAnalytics(data);
      } catch (error) {
        console.error(error);
        alert("Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Analytics not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">URL Analytics</h1>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">{analytics.url.shortCode}</h2>

          <p className="text-gray-600 mt-2">{analytics.url.originalUrl}</p>

          <div className="mt-6">
            <p className="text-gray-500">Total Clicks</p>

            <p className="text-4xl font-bold">{analytics.totalClicks}</p>
          </div>

          <div className="mt-6">
            <p className="text-gray-500">Today's Clicks</p>

            <p className="text-3xl font-bold">{analytics.todayClicks}</p>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Devices</h2>

            <div className="space-y-2">
              {Object.entries(analytics.devices).map(([device, count]) => (
                <div
                  key={device}
                  className="flex justify-between bg-gray-100 p-3 rounded-lg"
                >
                  <span>{device}</span>
                  <span className="font-semibold">{count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Browsers</h2>

            <div className="space-y-2">
              {Object.entries(analytics.browsers).map(([browser, count]) => (
                <div
                  key={browser}
                  className="flex justify-between bg-gray-100 p-3 rounded-lg"
                >
                  <span>{browser}</span>

                  <span className="font-semibold">{count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Operating Systems</h2>

            <div className="space-y-2">
              {Object.entries(analytics.operatingSystems).map(([os, count]) => (
                <div
                  key={os}
                  className="flex justify-between bg-gray-100 p-3 rounded-lg"
                >
                  <span>{os}</span>

                  <span className="font-semibold">{count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Clicks Per Day</h2>

            <div className="bg-gray-50 p-4 rounded-lg">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="date" />

                  <YAxis allowDecimals={false} />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="clicks"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
