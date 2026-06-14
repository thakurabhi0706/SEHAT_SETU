import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FileText, ArrowLeft, Download, Eye, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { getReportsByPatient } from "../../services/medicalReportService";

const PRIMARY_COLOR = "#7A341F";

function DoctorReports() {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReports = async () => {
    try {
      const data = await getReportsByPatient(patientId);
      setReports(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f7f4ef] via-white to-[#faf8f5] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-[#7A341F]/20 border-t-[#7A341F] rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f4ef] via-white to-[#faf8f5] p-6 md:p-10 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#7A341F]/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-orange-300/10 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Button */}
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="mb-8 flex items-center gap-2 text-[#7A341F] font-bold hover:text-orange-500 transition-colors duration-300 group"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back</span>
          </motion.button>

          {/* Title Section */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-1.5 h-10 bg-gradient-to-b from-[#7A341F] to-orange-500 rounded-full" />
              <p className="text-[#7A341F] font-bold text-sm tracking-widest uppercase">
                Medical Records
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl md:text-6xl font-black text-gray-900 mb-3"
            >
              Patient Medical Reports
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg text-gray-600"
            >
              View and manage all uploaded medical reports
            </motion.p>
          </div>
        </motion.div>

        {/* CONTENT */}
        {reports.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6"
            >
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-50 rounded-full flex items-center justify-center">
                <FileText size={40} className="text-[#7A341F]" />
              </div>
            </motion.div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Reports Found
            </h2>
            <p className="text-gray-600 mb-8">
              This patient hasn't uploaded any medical reports yet.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7A341F] to-orange-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-[#7A341F]/40 transition-all duration-300"
            >
              <ArrowLeft size={20} />
              Go Back
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            className="grid gap-6"
          >
            {reports.map((report, index) => (
              <motion.div
                key={report._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl border border-white/50 overflow-hidden transition-all duration-300"
              >
                <div className="p-8">
                  {/* Report Header */}
                  <div className="flex items-start justify-between mb-6 gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <motion.div
                        initial={{ scale: 0.8, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center flex-shrink-0"
                      >
                        <FileText size={28} className="text-[#7A341F]" />
                      </motion.div>

                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 group-hover:text-[#7A341F] transition-colors duration-300">
                          {report.reportName}
                        </h2>

                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#7A341F]/10 to-orange-100 text-[#7A341F] text-sm font-bold rounded-full">
                            <FileText size={14} />
                            {report.reportType}
                          </span>

                          {report.uploadedAt && (
                            <span className="inline-flex items-center gap-1.5 text-gray-600 text-sm font-medium">
                              <Clock size={14} className="text-gray-400" />
                              {formatDate(report.uploadedAt)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notes Section */}
                  {report.notes && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg"
                    >
                      <p className="text-sm text-blue-900">
                        <strong className="text-blue-700">Notes:</strong> {report.notes}
                      </p>
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    className="flex items-center gap-3 pt-4 border-t border-gray-100"
                  >
                    <motion.a
                      href={report.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7A341F] to-orange-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#7A341F]/40 transition-all duration-300"
                    >
                      <Eye size={20} />
                      <span className="hidden sm:inline">View Report</span>
                      <span className="sm:hidden">View</span>
                    </motion.a>

                    <motion.a
                      href={report.fileUrl}
                      download
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:border-[#7A341F] hover:text-[#7A341F] transition-all duration-300"
                      title="Download Report"
                    >
                      <Download size={20} />
                      <span className="hidden sm:inline">Download</span>
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default DoctorReports;