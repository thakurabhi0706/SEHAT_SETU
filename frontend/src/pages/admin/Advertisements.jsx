import { useState, useEffect } from "react";

import {
  createAdvertisement,
  getAdvertisementsAdmin,
  toggleAdvertisement,
  deleteAdvertisement,
} from "../../services/advertisementService";

import {uploadFile} from "../../services/uploadService";
import BackButton from "../../components/common/BackButton";

function Advertisements() {

  const [ads, setAds] = useState([]);

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
    }
  };

  const handleCreateAd = async (e) => {
    e.preventDefault();

    try {

      let imageUrl = "";

      if (image) {
        const uploaded = await uploadFile(image);
        imageUrl = uploaded.fileUrl;
        }

      await createAdvertisement({
        ...formData,
        imageUrl,
      });

      alert(
        "Advertisement created successfully"
      );

      setFormData({
        title: "",
        description: "",
        redirectLink: "",
        targetAudience: "All",
        startDate: "",
        endDate: "",
      });

      setImage(null);

      fetchAds();

    } catch (error) {
      console.error(error);
      alert("Failed to create ad");
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-10">
        Advertisements
      </h1>

      <BackButton />

      {/* CREATE FORM */}

      <form
        onSubmit={handleCreateAd}
        className="
          bg-white
          p-8
          rounded-3xl
          shadow
          mb-10
          space-y-5
        "
      >

        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
          className="w-full border p-3 rounded-xl"
        />

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
          className="w-full border p-3 rounded-xl"
        />

        <input
          type="text"
          placeholder="Redirect Link"
          value={formData.redirectLink}
          onChange={(e) =>
            setFormData({
              ...formData,
              redirectLink: e.target.value,
            })
          }
          className="w-full border p-3 rounded-xl"
        />

        <select
          value={formData.targetAudience}
          onChange={(e) =>
            setFormData({
              ...formData,
              targetAudience: e.target.value,
            })
          }
          className="w-full border p-3 rounded-xl"
        >
          <option value="All">All</option>
          <option value="Patient">
            Patient
          </option>
          <option value="Doctor">
            Doctor
          </option>
        </select>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="date"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({
                ...formData,
                startDate: e.target.value,
              })
            }
            className="border p-3 rounded-xl"
          />

          <input
            type="date"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({
                ...formData,
                endDate: e.target.value,
              })
            }
            className="border p-3 rounded-xl"
          />

        </div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(e.target.files[0])
          }
        />

        <button
          type="submit"
          className="
            bg-[#8c3b24]
            text-white
            px-8
            py-3
            rounded-xl
          "
        >
          Create Advertisement
        </button>

      </form>

      {/* ADS LIST */}

      <div className="grid md:grid-cols-2 gap-6">

        {ads.map((ad) => (

          <div
            key={ad._id}
            className="
              bg-white
              rounded-3xl
              shadow
              overflow-hidden
            "
          >

            <img
              src={ad.imageUrl}
              alt=""
              className="
                h-52
                w-full
                object-cover
              "
            />

            <div className="p-5">

              <h2 className="text-xl font-bold">
                {ad.title}
              </h2>

              <p className="mt-2 text-gray-600">
                {ad.description}
              </p>

              <p className="mt-2">
                Audience:
                {" "}
                {ad.targetAudience}
              </p>

              <p>
                Status:
                {" "}
                {ad.isActive
                  ? "Active"
                  : "Disabled"}
              </p>

              <div className="flex gap-3 mt-4">

                <button
                  onClick={async () => {
                    await toggleAdvertisement(
                      ad._id
                    );

                    fetchAds();
                  }}
                  className="
                    bg-yellow-500
                    text-white
                    px-4
                    py-2
                    rounded-xl
                  "
                >
                  {ad.isActive
                    ? "Disable"
                    : "Enable"}
                </button>

                <button
                  onClick={async () => {
                    await deleteAdvertisement(
                      ad._id
                    );

                    fetchAds();
                  }}
                  className="
                    bg-red-500
                    text-white
                    px-4
                    py-2
                    rounded-xl
                  "
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Advertisements;