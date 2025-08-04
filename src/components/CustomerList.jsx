import React, { useEffect, useState } from "react";
import axios from "axios";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/customers?limit=30");
        const customerData = res.data.customers;

        const withOrderCounts = await Promise.all(
          customerData.map(async (cust) => {
            try {
              const detailsRes = await axios.get(
                `http://localhost:4000/customers/${cust.id}`
              );
              return {
                ...cust,
                orderCount: detailsRes.data.orderCount,
              };
            } catch {
              return { ...cust, orderCount: "?" };
            }
          })
        );

        setCustomers(withOrderCounts);
        setFilteredCustomers(withOrderCounts);
        setLoading(false);
      } catch {
        setError("Failed to fetch customers.");
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const filtered = customers.filter((cust) =>
      `${cust.first_name + cust.last_name} ${cust.email}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [searchQuery, customers]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Customer List</h1>

        <input
          type="text"
          placeholder="Search by name or email"
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {loading ? (
          <div className="text-center text-gray-500">Loading customers...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : filteredCustomers.length === 0 ? (
          <div className="text-center text-gray-400 italic">
            No customers found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCustomers.map((cust) => (
              <div
                key={cust.id}
                className="bg-white rounded-xl border border-gray-200 shadow hover:shadow-lg transition-all p-5"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {cust.first_name + " " + cust.last_name || "Unnamed"}
                </h2>
                <p className="text-gray-600 text-sm">{cust.email}</p>
                <div className="mt-3 text-sm text-gray-700">
                  <span className="font-medium">Orders:</span>{" "}
                  {cust.orderCount !== undefined ? cust.orderCount : "—"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerList;
