import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReportsByPatient } from "../../services/medicalReportService";

function DoctorReports() {
  const { patientId } = useParams();

  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReports = async () => {
    try {
      const data =
        await getReportsByPatient(patientId);

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

  if (loading) {
    return (
      <div className="p-10">
        Loading reports...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef] p-8">

      {/* Back Button */}

      <button
        onClick={() => navigate(-1)}
        className="
          mb-6
          text-[#8c3b24]
          font-semibold
        "
      >
        ← Back
      </button>

      <div className="max-w-6xl mx-auto">

        <h1
          className="
            text-5xl
            font-bold
            text-[#8c3b24]
            mb-2
          "
        >
          Patient Medical Reports
        </h1>

        <p className="text-gray-500 mb-10">
          View reports uploaded by the patient
        </p>

        {reports.length === 0 ? (

          <div
            className="
              bg-white
              rounded-3xl
              shadow-md
              p-10
              text-center
            "
          >
            No reports uploaded
          </div>

        ) : (

          <div className="grid gap-6">

            {reports.map((report) => (

              <div
                key={report._id}
                className="
                  bg-white
                  rounded-3xl
                  shadow-md
                  p-6
                "
              >

                <h2
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  {report.reportName}
                </h2>

                <p
                  className="
                    text-gray-500
                    mt-2
                  "
                >
                  {report.reportType}
                </p>

                {report.notes && (
                  <p className="mt-4">
                    <strong>Notes:</strong>{" "}
                    {report.notes}
                  </p>
                )}

                <a
                  href={report.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-block
                    mt-5
                    bg-[#8c3b24]
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    font-semibold
                  "
                >
                  View Report
                </a>

              </div>
            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default DoctorReports;