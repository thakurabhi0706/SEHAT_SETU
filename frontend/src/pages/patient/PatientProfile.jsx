import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useEffect,
  useState,
} from "react";

import {
  getPatientProfile,
  updatePatientProfile,
} from "../../services/patientService";

import {
  uploadReport,
  getPatientReports,
  deleteReport,
} from "../../services/medicalReportService";
import BackButton from "../../components/common/BackButton";



function PatientProfile() {
    const navigate = useNavigate();
    

    const loadReports =
      async () => {

        try {

          const data =
            await getPatientReports();

          setReports(data);

        } catch (error) {

          console.error(error);
        }
      };
    
  const [formData, setFormData] =
    useState({
      fullName: "",
      age: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      bloodGroup: "",
      emergencyContact: "",
      pastMedicalHistory: "",
      allergies: "",
      currentMedications: "",
      chronicDiseases: "",
    });
    const [reportType,
      setReportType] =
      useState("");

    const [reportName,
      setReportName] =
      useState("");

    const [notes,
      setNotes] =
      useState("");

    const [reportFile,
      setReportFile] =
      useState(null);

    const [reports,
      setReports] =
      useState([]);

  useEffect(() => {
  loadProfile();
  loadReports();
}, []);
  const loadProfile = async () => {
    try {

      const data =
        await getPatientProfile();

      setFormData({
        ...data,

        allergies:
          data.allergies?.join(", ") || "",

        currentMedications:
          data.currentMedications?.join(", ") || "",

        chronicDiseases:
          data.chronicDiseases?.join(", ") || "",
      });

    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleDeleteReport = async (id) => {
    try {

      await deleteReport(id);

      setReports(
        reports.filter(
          (report) => report._id !== id
        )
      );

    } catch (error) {
      console.error(error);
    }
  };

  const handleReportUpload =
    async () => {

      try {

        const data =
          new FormData();

        data.append(
          "report",
          reportFile
        );

        data.append(
          "reportType",
          reportType
        );

        data.append(
          "reportName",
          reportName
        );

        data.append(
          "notes",
          notes
        );

        await uploadReport(data);

        alert(
          "Report uploaded successfully"
        );

        loadReports();

      } catch (error) {

        console.error(error);

        alert(
          "Upload failed"
        );
      }
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await updatePatientProfile({
          ...formData,

          allergies:
            formData.allergies
              .split(",")
              .map((a) => a.trim()),

          currentMedications:
            formData.currentMedications
              .split(",")
              .map((a) => a.trim()),

          chronicDiseases:
            formData.chronicDiseases
              .split(",")
              .map((a) => a.trim()),
        });

        alert(
          "Profile updated successfully"
        );

      } catch (error) {

        console.error(error);

        alert(
          "Failed to update profile"
        );
      }
    };

  return (
    <div className="min-h-screen bg-[#f7f4ef] p-10">

      <div className="bg-white rounded-3xl shadow-md p-8">

        <BackButton />

        <h1 className="text-4xl font-bold text-[#8c3b24]">
          My Profile
        </h1>

        

        <p className="text-gray-500 mt-2">
          Manage your healthcare profile
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6 mt-10"
        >

          <Input
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />

          <Input
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />

          <Input
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />

          <Input
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            value={formData.email}
            disabled
          />

          <Input
            label="Blood Group"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
          />

          <div className="md:col-span-2">
            <TextArea
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <Input
            label="Emergency Contact"
            name="emergencyContact"
            value={
              formData.emergencyContact
            }
            onChange={handleChange}
          />

          <div className="md:col-span-2">
            <TextArea
              label="Past Medical History"
              name="pastMedicalHistory"
              value={
                formData.pastMedicalHistory
              }
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <TextArea
              label="Allergies"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <TextArea
              label="Current Medications"
              name="currentMedications"
              value={
                formData.currentMedications
              }
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <TextArea
              label="Chronic Diseases"
              name="chronicDiseases"
              value={
                formData.chronicDiseases
              }
              onChange={handleChange}
            />
          </div>


          <div className="mt-12">

            <h2
              className="
                text-3xl
                font-bold
                text-[#8c3b24]
                mb-6
              "
            >
              Medical Reports
            </h2>

            <div
              className="
                bg-white
                rounded-3xl
                shadow-md
                p-6
              "
            >

              <input
                type="text"
                placeholder="Report Type"
                value={reportType}
                onChange={(e) =>
                  setReportType(
                    e.target.value
                  )
                }
                className="
                  w-full
                  border
                  p-3
                  rounded-xl
                  mb-4
                "
              />

              <input
                type="text"
                placeholder="Report Name"
                value={reportName}
                onChange={(e) =>
                  setReportName(
                    e.target.value
                  )
                }
                className="
                  w-full
                  border
                  p-3
                  rounded-xl
                  mb-4
                "
              />

              <textarea
                placeholder="Notes"
                value={notes}
                onChange={(e) =>
                  setNotes(
                    e.target.value
                  )
                }
                className="
                  w-full
                  border
                  p-3
                  rounded-xl
                  mb-4
                "
              />

              <input
                type="file"
                onChange={(e) =>
                  setReportFile(
                    e.target.files[0]
                  )
                }
                className="mb-4"
              />

              <button
                onClick={
                  handleReportUpload
                }
                className="
                  bg-[#8c3b24]
                  text-white
                  px-6
                  py-3
                  rounded-xl
                  font-semibold
                "
              >
                Upload Report
              </button>

            </div>

          </div>

<div className="mt-8 space-y-4">

  {reports.map((report) => (

    <div
      key={report._id}
      className="
        bg-gray-50
        border
        rounded-xl
        p-4
      "
    >

      <h3 className="font-semibold">
        {report.reportName}
      </h3>

      <p>{report.reportType}</p>

      <div className="flex gap-4 mt-4">

        <a
          href={report.fileUrl}
          target="_blank"
          rel="noreferrer"
          className="text-[#8c3b24] font-semibold"
        >
          View Report
        </a>

        <button
          onClick={() =>
            handleDeleteReport(report._id)
          }
          className="text-red-600 font-semibold"
        >
          Delete
        </button>

      </div>

    </div>

  ))}

</div>





          <button
            type="submit"
            className="
              bg-[#8c3b24]
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
            "
          >
            Save Profile
          </button>

        </form>

      </div>

    </div>
  );
}

function Input(props) {
  return (
    <div>
      <label className="block mb-2 font-medium">
        {props.label}
      </label>

      <input
        {...props}
        className="
          w-full
          border
          rounded-xl
          p-3
        "
      />
    </div>
  );
}

function TextArea(props) {
  return (
    <div>
      <label className="block mb-2 font-medium">
        {props.label}
      </label>

      <textarea
        {...props}
        rows="4"
        className="
          w-full
          border
          rounded-xl
          p-3
        "
      />
    </div>
  );
}

export default PatientProfile;