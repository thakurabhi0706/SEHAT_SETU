// import { ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   getPatientProfile,
//   updatePatientProfile,
// } from "../../services/patientService";

// import {
//   uploadReport,
//   getPatientReports,
//   deleteReport,
// } from "../../services/medicalReportService";
// import BackButton from "../../components/common/BackButton";



// function PatientProfile() {
//     const navigate = useNavigate();
    

//     const loadReports =
//       async () => {

//         try {

//           const data =
//             await getPatientReports();

//           setReports(data);

//         } catch (error) {

//           console.error(error);
//         }
//       };
    
//   const [formData, setFormData] =
//     useState({
//       fullName: "",
//       age: "",
//       gender: "",
//       phone: "",
//       email: "",
//       address: "",
//       bloodGroup: "",
//       emergencyContact: "",
//       pastMedicalHistory: "",
//       allergies: "",
//       currentMedications: "",
//       chronicDiseases: "",
//     });
//     const [reportType,
//       setReportType] =
//       useState("");

//     const [reportName,
//       setReportName] =
//       useState("");

//     const [notes,
//       setNotes] =
//       useState("");

//     const [reportFile,
//       setReportFile] =
//       useState(null);

//     const [reports,
//       setReports] =
//       useState([]);

//   useEffect(() => {
//   loadProfile();
//   loadReports();
// }, []);
//   const loadProfile = async () => {
//     try {

//       const data =
//         await getPatientProfile();

//       setFormData({
//         ...data,

//         allergies:
//           data.allergies?.join(", ") || "",

//         currentMedications:
//           data.currentMedications?.join(", ") || "",

//         chronicDiseases:
//           data.chronicDiseases?.join(", ") || "",
//       });

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleChange = (e) => {

//     setFormData({
//       ...formData,
//       [e.target.name]:
//         e.target.value,
//     });
//   };

//   const handleDeleteReport = async (id) => {
//     try {

//       await deleteReport(id);

//       setReports(
//         reports.filter(
//           (report) => report._id !== id
//         )
//       );

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleReportUpload =
//     async () => {

//       try {

//         const data =
//           new FormData();

//         data.append(
//           "report",
//           reportFile
//         );

//         data.append(
//           "reportType",
//           reportType
//         );

//         data.append(
//           "reportName",
//           reportName
//         );

//         data.append(
//           "notes",
//           notes
//         );

//         await uploadReport(data);

//         alert(
//           "Report uploaded successfully"
//         );

//         loadReports();

//       } catch (error) {

//         console.error(error);

//         alert(
//           "Upload failed"
//         );
//       }
//     };

//   const handleSubmit =
//     async (e) => {

//       e.preventDefault();

//       try {

//         await updatePatientProfile({
//           ...formData,

//           allergies:
//             formData.allergies
//               .split(",")
//               .map((a) => a.trim()),

//           currentMedications:
//             formData.currentMedications
//               .split(",")
//               .map((a) => a.trim()),

//           chronicDiseases:
//             formData.chronicDiseases
//               .split(",")
//               .map((a) => a.trim()),
//         });

//         alert(
//           "Profile updated successfully"
//         );

//       } catch (error) {

//         console.error(error);

//         alert(
//           "Failed to update profile"
//         );
//       }
//     };

//   return (
//     <div className="min-h-screen bg-[#f7f4ef] p-10">

//       <div className="bg-white rounded-3xl shadow-md p-8">

//         <BackButton />

//         <h1 className="text-4xl font-bold text-[#8c3b24]">
//           My Profile
//         </h1>

        

//         <p className="text-gray-500 mt-2">
//           Manage your healthcare profile
//         </p>

//         <form
//           onSubmit={handleSubmit}
//           className="grid md:grid-cols-2 gap-6 mt-10"
//         >

//           <Input
//             label="Full Name"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//           />

//           <Input
//             label="Age"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//           />

//           <Input
//             label="Gender"
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//           />

//           <Input
//             label="Phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//           />

//           <Input
//             label="Email"
//             name="email"
//             value={formData.email}
//             disabled
//           />

//           <Input
//             label="Blood Group"
//             name="bloodGroup"
//             value={formData.bloodGroup}
//             onChange={handleChange}
//           />

//           <div className="md:col-span-2">
//             <TextArea
//               label="Address"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//             />
//           </div>

//           <Input
//             label="Emergency Contact"
//             name="emergencyContact"
//             value={
//               formData.emergencyContact
//             }
//             onChange={handleChange}
//           />

//           <div className="md:col-span-2">
//             <TextArea
//               label="Past Medical History"
//               name="pastMedicalHistory"
//               value={
//                 formData.pastMedicalHistory
//               }
//               onChange={handleChange}
//             />
//           </div>

//           <div className="md:col-span-2">
//             <TextArea
//               label="Allergies"
//               name="allergies"
//               value={formData.allergies}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="md:col-span-2">
//             <TextArea
//               label="Current Medications"
//               name="currentMedications"
//               value={
//                 formData.currentMedications
//               }
//               onChange={handleChange}
//             />
//           </div>

//           <div className="md:col-span-2">
//             <TextArea
//               label="Chronic Diseases"
//               name="chronicDiseases"
//               value={
//                 formData.chronicDiseases
//               }
//               onChange={handleChange}
//             />
//           </div>


//           <div className="mt-12">

//             <h2
//               className="
//                 text-3xl
//                 font-bold
//                 text-[#8c3b24]
//                 mb-6
//               "
//             >
//               Medical Reports
//             </h2>

//             <div
//               className="
//                 bg-white
//                 rounded-3xl
//                 shadow-md
//                 p-6
//               "
//             >

//               <input
//                 type="text"
//                 placeholder="Report Type"
//                 value={reportType}
//                 onChange={(e) =>
//                   setReportType(
//                     e.target.value
//                   )
//                 }
//                 className="
//                   w-full
//                   border
//                   p-3
//                   rounded-xl
//                   mb-4
//                 "
//               />

//               <input
//                 type="text"
//                 placeholder="Report Name"
//                 value={reportName}
//                 onChange={(e) =>
//                   setReportName(
//                     e.target.value
//                   )
//                 }
//                 className="
//                   w-full
//                   border
//                   p-3
//                   rounded-xl
//                   mb-4
//                 "
//               />

//               <textarea
//                 placeholder="Notes"
//                 value={notes}
//                 onChange={(e) =>
//                   setNotes(
//                     e.target.value
//                   )
//                 }
//                 className="
//                   w-full
//                   border
//                   p-3
//                   rounded-xl
//                   mb-4
//                 "
//               />

//               <input
//                 type="file"
//                 onChange={(e) =>
//                   setReportFile(
//                     e.target.files[0]
//                   )
//                 }
//                 className="mb-4"
//               />

//               <button
//                 onClick={
//                   handleReportUpload
//                 }
//                 className="
//                   bg-[#8c3b24]
//                   text-white
//                   px-6
//                   py-3
//                   rounded-xl
//                   font-semibold
//                 "
//               >
//                 Upload Report
//               </button>

//             </div>

//           </div>

// <div className="mt-8 space-y-4">

//   {reports.map((report) => (

//     <div
//       key={report._id}
//       className="
//         bg-gray-50
//         border
//         rounded-xl
//         p-4
//       "
//     >

//       <h3 className="font-semibold">
//         {report.reportName}
//       </h3>

//       <p>{report.reportType}</p>

//       <div className="flex gap-4 mt-4">

//         <a
//           href={report.fileUrl}
//           target="_blank"
//           rel="noreferrer"
//           className="text-[#8c3b24] font-semibold"
//         >
//           View Report
//         </a>

//         <button
//           onClick={() =>
//             handleDeleteReport(report._id)
//           }
//           className="text-red-600 font-semibold"
//         >
//           Delete
//         </button>

//       </div>

//     </div>

//   ))}

// </div>





//           <button
//             type="submit"
//             className="
//               bg-[#8c3b24]
//               text-white
//               px-6
//               py-3
//               rounded-xl
//               font-semibold
//             "
//           >
//             Save Profile
//           </button>

//         </form>

//       </div>

//     </div>
//   );
// }

// function Input(props) {
//   return (
//     <div>
//       <label className="block mb-2 font-medium">
//         {props.label}
//       </label>

//       <input
//         {...props}
//         className="
//           w-full
//           border
//           rounded-xl
//           p-3
//         "
//       />
//     </div>
//   );
// }

// function TextArea(props) {
//   return (
//     <div>
//       <label className="block mb-2 font-medium">
//         {props.label}
//       </label>

//       <textarea
//         {...props}
//         rows="4"
//         className="
//           w-full
//           border
//           rounded-xl
//           p-3
//         "
//       />
//     </div>
//   );
// }

// export default PatientProfile;


import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPatientProfile, updatePatientProfile } from "../../services/patientService";
import { uploadReport, getPatientReports, deleteReport } from "../../services/medicalReportService";

function PatientProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
  const [reportType, setReportType] = useState("");
  const [reportName, setReportName] = useState("");
  const [notes, setNotes] = useState("");
  const [reportFile, setReportFile] = useState(null);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    loadProfile();
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await getPatientReports();
      setReports(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadProfile = async () => {
    try {
      const data = await getPatientProfile();
      setFormData({
        ...data,
        allergies: data.allergies?.join(", ") || "",
        currentMedications: data.currentMedications?.join(", ") || "",
        chronicDiseases: data.chronicDiseases?.join(", ") || "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDeleteReport = async (id) => {
    try {
      await deleteReport(id);
      setReports(reports.filter((report) => report._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleReportUpload = async () => {
    try {
      const data = new FormData();
      data.append("report", reportFile);
      data.append("reportType", reportType);
      data.append("reportName", reportName);
      data.append("notes", notes);
      await uploadReport(data);
      alert("Report uploaded successfully");
      setReportType("");
      setReportName("");
      setNotes("");
      setReportFile(null);
      loadReports();
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePatientProfile({
        ...formData,
        allergies: formData.allergies.split(",").map((a) => a.trim()),
        currentMedications: formData.currentMedications.split(",").map((a) => a.trim()),
        chronicDiseases: formData.chronicDiseases.split(",").map((a) => a.trim()),
      });
      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6]">
      {/* Hero Banner */}
      <div className="relative h-56 rounded-b-[32px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&h=300&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#5C2415]/90 via-[#7A341F]/75 to-[#5C2415]/60" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-20 bg-white/15 backdrop-blur-md text-white border border-white/20 hover:bg-white/25 rounded-xl px-5 py-3 flex items-center gap-2 font-semibold transition-all"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Hero Content - Centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <h1 className="text-5xl font-black text-white leading-tight text-center">
            My Profile
          </h1>
          <p className="text-lg text-orange-100 mt-3 text-center">
            Manage your healthcare profile
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Profile Form Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#7A341F] mb-8">Personal Information</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} />
              <Input label="Age" name="age" type="number" value={formData.age} onChange={handleChange} />
              <Input label="Gender" name="gender" value={formData.gender} onChange={handleChange} />
              <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
              <Input label="Email" name="email" value={formData.email} disabled />
              <Input label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} />
            </div>

            <div className="grid md:grid-cols-1 gap-6">
              <Input label="Emergency Contact" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} />
            </div>

            <TextArea label="Address" name="address" value={formData.address} onChange={handleChange} />
            <TextArea label="Past Medical History" name="pastMedicalHistory" value={formData.pastMedicalHistory} onChange={handleChange} />
            <TextArea label="Allergies (comma separated)" name="allergies" value={formData.allergies} onChange={handleChange} />
            <TextArea label="Current Medications (comma separated)" name="currentMedications" value={formData.currentMedications} onChange={handleChange} />
            <TextArea label="Chronic Diseases (comma separated)" name="chronicDiseases" value={formData.chronicDiseases} onChange={handleChange} />

            <button
              type="submit"
              className="bg-[#7A341F] hover:bg-[#5C2415] text-white px-8 py-4 rounded-2xl font-semibold transition-all w-full md:w-auto"
            >
              Save Profile
            </button>
          </form>
        </div>

        {/* Medical Reports Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-3xl font-bold text-[#7A341F] mb-8">Medical Reports</h2>

          <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
            <h3 className="text-lg font-semibold text-[#5C2415] mb-6">Upload New Report</h3>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 font-medium text-[#1f2937]">Report Type</label>
                <input
                  type="text"
                  placeholder="e.g., Blood Test, X-Ray"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full border border-gray-200 bg-white p-4 rounded-2xl focus:ring-2 focus:ring-[#7A341F] focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-[#1f2937]">Report Name</label>
                <input
                  type="text"
                  placeholder="e.g., Monthly Checkup"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  className="w-full border border-gray-200 bg-white p-4 rounded-2xl focus:ring-2 focus:ring-[#7A341F] focus:outline-none transition"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium text-[#1f2937]">Notes</label>
              <textarea
                placeholder="Add any additional notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="3"
                className="w-full border border-gray-200 bg-white p-4 rounded-2xl focus:ring-2 focus:ring-[#7A341F] focus:outline-none transition"
              />
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
              <div className="flex-1">
                <label className="block mb-2 font-medium text-[#1f2937]">Attach File</label>
                <input
                  type="file"
                  onChange={(e) => setReportFile(e.target.files[0])}
                  className="w-full text-sm text-gray-600 file:bg-[#7A341F] file:text-white file:px-4 file:py-2 file:rounded-xl file:border-0 file:cursor-pointer hover:file:bg-[#5C2415] transition-all"
                />
              </div>
              <button
                onClick={handleReportUpload}
                type="button"
                className="bg-[#7A341F] hover:bg-[#5C2415] text-white px-8 py-4 rounded-2xl font-semibold transition-all md:mt-6"
              >
                Upload Report
              </button>
            </div>
          </div>

          {/* Reports List */}
          <div>
            <h3 className="text-lg font-semibold text-[#5C2415] mb-6">Your Reports</h3>
            {reports.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No reports uploaded yet</p>
            ) : (
              <div className="space-y-4">
                {reports.map((report) => (
                  <div
                    key={report._id}
                    className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex items-center justify-between hover:border-[#7A341F] transition-all"
                  >
                    <div>
                      <h4 className="font-semibold text-[#1f2937] text-lg">{report.reportName}</h4>
                      <p className="text-gray-600 text-sm mt-1">{report.reportType}</p>
                      {report.notes && <p className="text-gray-500 text-xs mt-2">{report.notes}</p>}
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={report.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#7A341F] hover:text-[#5C2415] font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-all"
                      >
                        View
                      </a>
                      <button
                        onClick={() => handleDeleteReport(report._id)}
                        className="text-red-600 hover:text-red-700 font-semibold px-4 py-2 rounded-lg hover:bg-red-50 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block mb-2 font-medium text-[#1f2937]">{label}</label>
      <input
        {...props}
        className="w-full border border-gray-200 bg-white rounded-2xl p-4 focus:ring-2 focus:ring-[#7A341F] focus:outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
    </div>
  );
}

function TextArea({ label, ...props }) {
  return (
    <div>
      <label className="block mb-2 font-medium text-[#1f2937]">{label}</label>
      <textarea
        {...props}
        rows="4"
        className="w-full border border-gray-200 bg-white rounded-2xl p-4 focus:ring-2 focus:ring-[#7A341F] focus:outline-none transition"
      />
    </div>
  );
}

export default PatientProfile;