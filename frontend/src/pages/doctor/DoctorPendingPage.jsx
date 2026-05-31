const DoctorPendingPage = () => {
  return (
    <div className="min-h-screen bg-[#f5f1eb] flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold text-[#8B4513] mb-4">
          Verification Pending
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed">
          Your profile has been submitted successfully.
          <br />
          Our admin team is reviewing your credentials and documents.
        </p>

        <div className="mt-8 bg-[#fff7ed] border border-[#f5d0a9] rounded-2xl p-4">
          <p className="text-[#8B4513] font-medium">
            You will be able to access your doctor dashboard once approved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorPendingPage;