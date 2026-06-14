import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Power, Trash2, Calendar, Target } from "lucide-react";
import {
  createAdvertisement,
  getAdvertisementsAdmin,
  toggleAdvertisement,
  deleteAdvertisement,
} from "../../services/advertisementService";
import { uploadFile } from "../../services/uploadService";
import ruralHealthcare5 from "../../assets/images/rural-healthcare3.jpg";

function Advertisements() {
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    redirectLink: "",
    targetAudience: "All",
    startDate: "",
    endDate: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const data = await getAdvertisementsAdmin();
      setAds(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateAd = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (!formData.title || !formData.description) {
        alert("Please fill in all required fields");
        setSubmitting(false);
        return;
      }

      let imageUrl = "";
      if (image) {
        const uploaded = await uploadFile(image);
        imageUrl = uploaded.fileUrl;
      }

      await createAdvertisement({
        ...formData,
        imageUrl,
      });

      alert("Advertisement created successfully");

      setFormData({
        title: "",
        description: "",
        redirectLink: "",
        targetAudience: "All",
        startDate: "",
        endDate: "",
      });

      setImage(null);
      setImagePreview(null);

      fetchAds();
    } catch (error) {
      console.error(error);
      alert("Failed to create ad");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (id) => {
    setActionLoading(id);
    try {
      await toggleAdvertisement(id);
      fetchAds();
    } catch (error) {
      console.error(error);
      alert("Failed to update advertisement");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this advertisement?")) {
      setActionLoading(id);
      try {
        await deleteAdvertisement(id);
        fetchAds();
      } catch (error) {
        console.error(error);
        alert("Failed to delete advertisement");
      } finally {
        setActionLoading(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6] flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-[#7A341F]">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6]">
      {/* HERO SECTION */}
      <div className="relative h-56 rounded-b-[32px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${ruralHealthcare5})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#5C2415]/90 via-[#7A341F]/75 to-[#5C2415]/60" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-20 bg-white/15 backdrop-blur-md text-white border border-white/20 hover:bg-white/25 rounded-xl px-5 py-3 flex items-center gap-2 font-semibold"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-5xl font-black">Advertisements</h1>
          <p className="mt-3 text-lg text-orange-100">
            Manage platform advertisements and campaigns
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* CREATE FORM */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-12">
          <h2 className="text-3xl font-bold text-[#1f2937] mb-6">Create New Advertisement</h2>

          <form onSubmit={handleCreateAd} className="space-y-6">
            {/* TITLE & DESCRIPTION */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold text-sm mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  placeholder="Enter ad title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold text-sm mb-2">
                  Target Audience
                </label>
                <select
                  value={formData.targetAudience}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      targetAudience: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20 bg-white"
                >
                  <option value="All">All Users</option>
                  <option value="Patient">Patients Only</option>
                  <option value="Doctor">Doctors Only</option>
                </select>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-gray-700 font-semibold text-sm mb-2">
                Description *
              </label>
              <textarea
                placeholder="Enter ad description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20"
                rows="4"
              />
            </div>

            {/* REDIRECT LINK */}
            <div>
              <label className="block text-gray-700 font-semibold text-sm mb-2">
                Redirect Link
              </label>
              <input
                type="text"
                placeholder="https://example.com"
                value={formData.redirectLink}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    redirectLink: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20"
              />
            </div>

            {/* DATES */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold text-sm mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      startDate: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold text-sm mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      endDate: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20"
                />
              </div>
            </div>

            {/* IMAGE UPLOAD */}
            <div>
              <label className="block text-gray-700 font-semibold text-sm mb-2">
                Advertisement Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                {imagePreview ? (
                  <div className="space-y-3">
                    <img src={imagePreview} alt="Preview" className="h-32 mx-auto rounded-lg object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                      className="text-red-600 hover:text-red-700 font-semibold text-sm"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload size={32} className="mx-auto text-gray-400" />
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <span className="text-[#7A341F] font-semibold hover:underline">
                        Click to upload
                      </span>
                    </label>
                    <p className="text-gray-500 text-sm">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#7A341F] hover:bg-[#5C2415] disabled:bg-gray-400 text-white py-3 rounded-2xl font-semibold"
            >
              {submitting ? "Creating..." : "Create Advertisement"}
            </button>
          </form>
        </div>

        {/* ADS LIST */}
        {ads.length > 0 ? (
          <div>
            <h2 className="text-3xl font-bold text-[#1f2937] mb-6">Active Advertisements ({ads.length})</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {ads.map((ad) => (
                <div
                  key={ad._id}
                  className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  {/* IMAGE */}
                  <img
                    src={ad.imageUrl}
                    alt={ad.title}
                    className="h-52 w-full object-cover"
                  />

                  {/* CONTENT */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-[#1f2937]">
                        {ad.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          ad.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {ad.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{ad.description}</p>

                    {/* META INFO */}
                    <div className="space-y-2 mb-4 pb-4 border-t border-gray-200 pt-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Target size={16} />
                        <span>Audience: {ad.targetAudience}</span>
                      </div>
                      {ad.startDate && ad.endDate && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar size={16} />
                          <span>
                            {new Date(ad.startDate).toLocaleDateString()} -{" "}
                            {new Date(ad.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleToggle(ad._id)}
                        disabled={actionLoading === ad._id}
                        className={`flex-1 ${
                          ad.isActive
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : "bg-green-600 hover:bg-green-700"
                        } disabled:bg-gray-400 text-white py-2 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm`}
                      >
                        <Power size={16} />
                        {actionLoading === ad._id ? "..." : ad.isActive ? "Disable" : "Enable"}
                      </button>

                      <button
                        onClick={() => handleDelete(ad._id)}
                        disabled={actionLoading === ad._id}
                        className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-2 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm"
                      >
                        <Trash2 size={16} />
                        {actionLoading === ad._id ? "..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-12 text-center">
            <Upload size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-bold text-[#1f2937]">No Advertisements Yet</h3>
            <p className="text-gray-500 mt-2">Create your first advertisement using the form above.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Advertisements;