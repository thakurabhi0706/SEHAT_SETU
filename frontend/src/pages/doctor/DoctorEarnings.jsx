import { useEffect, useState } from "react";
import { ArrowLeft, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getDoctorEarnings } from "../../services/doctorEarningsService";
import ruralHealthcare2 from "../../assets/images/rural-healthcare2.jpg";

function DoctorEarnings() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getDoctorEarnings();
      setData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6] flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-[#7A341F]">Loading...</h1>
      </div>
    );
  }

  const totalTransactions = data?.transactions?.length || 0;
  const averageTransaction = totalTransactions > 0 ? Math.round((data?.totalEarnings || 0) / totalTransactions) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6]">
      {/* HERO SECTION */}
      <div className="relative h-56 rounded-b-[32px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url(${ruralHealthcare2})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#5C2415]/90 via-[#7A341F]/75 to-[#5C2415]/60" />

        {/* Back Button Inside Banner */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-20 bg-white/15 backdrop-blur-md text-white border border-white/20 hover:bg-white/25 rounded-xl px-5 py-3 flex items-center gap-2 font-semibold transition-all"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-5xl font-black">Earnings</h1>
          <p className="mt-3 text-lg text-orange-100">
            Track your consultation earnings and transactions
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* STATS CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* Total Earnings */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-semibold">Total Earnings</h3>
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <DollarSign size={24} className="text-green-600" />
              </div>
            </div>
            <p className="text-4xl font-black text-[#7A341F]">
              ₹{data?.totalEarnings || 0}
            </p>
            <p className="text-gray-500 text-sm mt-2">Lifetime earnings</p>
          </div>

          {/* Total Transactions */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-semibold">Transactions</h3>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Calendar size={24} className="text-blue-600" />
              </div>
            </div>
            <p className="text-4xl font-black text-blue-600">{totalTransactions}</p>
            <p className="text-gray-500 text-sm mt-2">Total consultations paid</p>
          </div>

          {/* Average Earnings */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-semibold">Average Per Session</h3>
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <TrendingUp size={24} className="text-purple-600" />
              </div>
            </div>
            <p className="text-4xl font-black text-purple-600">₹{averageTransaction}</p>
            <p className="text-gray-500 text-sm mt-2">Per consultation</p>
          </div>
        </div>

        {/* TRANSACTIONS LIST */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-3xl font-bold text-[#1f2937] mb-8">Transaction History</h2>

          {data?.transactions && data.transactions.length > 0 ? (
            <div className="space-y-4">
              {data.transactions.map((item, index) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-6 hover:border-[#7A341F] hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-[#7A341F]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#7A341F] font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1f2937]">
                        {item.patient?.fullName || "Unknown Patient"}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <Calendar size={14} />
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-black text-green-600">₹{item.paymentAmount}</p>
                    <p className="text-xs text-gray-500 mt-1">Paid</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <DollarSign size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">No Transactions Yet</h3>
              <p className="text-gray-500">
                Your earnings will appear here once patients complete consultations
              </p>
            </div>
          )}
        </div>

        {/* INFO CARD */}
        {data?.totalEarnings > 0 && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Earnings Insight</h3>
            <p className="text-blue-800 text-sm">
              You've earned <span className="font-bold">₹{data?.totalEarnings}</span> from{" "}
              <span className="font-bold">{totalTransactions}</span> consultations. Keep providing
              excellent service to increase your earnings and patient satisfaction!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorEarnings;