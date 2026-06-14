import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import {
  ArrowLeft,
  MapPin,
  Navigation,
  Loader,
} from "lucide-react";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function PharmacyLocator() {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setLocation([lat, lon]);

        fetchNearbyPharmacies(lat, lon);
      },
      (error) => {
        console.error(error);
        setError("Unable to get your location. Please enable location access.");
        setLoading(false);
      }
    );
  }, []);

  const fetchNearbyPharmacies = async (
    lat,
    lon
  ) => {
    try {
      const apiKey =
        import.meta.env.VITE_GEOAPIFY_API_KEY;

      const response = await fetch(
        `https://api.geoapify.com/v2/places?categories=healthcare.pharmacy&filter=circle:${lon},${lat},10000&limit=20&apiKey=${apiKey}`
      );

      const data = await response.json();

      setPharmacies(
        data.features || []
      );
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch nearby pharmacies.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6] flex items-center justify-center">
        <div className="text-center">
          <Loader size={48} className="mx-auto text-[#7A341F] animate-spin mb-4" />
          <h1 className="text-2xl font-semibold text-[#7A341F]">
            Finding nearby pharmacies...
          </h1>
          <p className="text-gray-600 mt-2">Please allow location access</p>
        </div>
      </div>
    );
  }

  if (error || !location) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6]">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white hover:bg-gray-100 text-[#7A341F] border border-gray-300 rounded-xl px-5 py-3 flex items-center gap-2 font-semibold"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center bg-white rounded-3xl p-12 shadow-lg max-w-md">
            <MapPin size={48} className="mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-[#1f2937] mb-2">Location Error</h2>
            <p className="text-gray-600 mb-6">
              {error || "Unable to determine your location."}
            </p>
            <button
              onClick={() => navigate(-1)}
              className="w-full bg-[#7A341F] hover:bg-[#5C2415] text-white py-3 rounded-xl font-semibold"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f6f1] to-[#f1ede6]">
      {/* HEADER */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="bg-white hover:bg-gray-100 text-[#7A341F] border border-gray-300 rounded-xl px-4 py-2 flex items-center gap-2 font-semibold"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <h1 className="text-3xl font-bold text-[#7A341F]">
            Nearby Pharmacies
          </h1>

          <div className="w-24" />
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-80px)] p-6 max-w-7xl mx-auto">
        {/* LEFT PANEL - PHARMACY LIST */}
        <div className="lg:col-span-1 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col">
          {/* LIST HEADER */}
          <div className="bg-gradient-to-r from-[#7A341F] to-[#5C2415] p-6 text-white">
            <h2 className="text-2xl font-bold">
              {pharmacies.length} Pharmacies Found
            </h2>
            <p className="text-orange-100 text-sm mt-1">Within 10km radius</p>
          </div>

          {/* PHARMACY LIST */}
          <div className="overflow-y-auto flex-1">
            {pharmacies.length > 0 ? (
              <div className="space-y-3 p-6">
                {pharmacies.map((pharmacy) => (
                  <div
                    key={pharmacy.properties.place_id}
                    onClick={() => setSelectedPharmacy(pharmacy)}
                    className={`rounded-2xl p-4 cursor-pointer transition-all border-2 ${
                      selectedPharmacy?.properties.place_id ===
                      pharmacy.properties.place_id
                        ? "border-[#7A341F] bg-orange-50 shadow-md"
                        : "border-gray-200 hover:border-[#7A341F] hover:bg-gray-50"
                    }`}
                  >
                    <h3 className="font-bold text-[#1f2937]">
                      {pharmacy.properties.name || "Unnamed Pharmacy"}
                    </h3>

                    <div className="mt-3 space-y-2 text-sm text-gray-600">
                      <div className="flex items-start gap-2">
                        <MapPin size={16} className="text-[#7A341F] flex-shrink-0 mt-0.5" />
                        <span>
                          {pharmacy.properties.address_line1 || "N/A"}
                        </span>
                      </div>

                      {pharmacy.properties.city && (
                        <p className="text-xs text-gray-500">
                          {pharmacy.properties.city}
                        </p>
                      )}
                    </div>

                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${pharmacy.geometry.coordinates[1]},${pharmacy.geometry.coordinates[0]}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-[#7A341F] hover:bg-[#5C2415] text-white text-sm font-semibold transition-colors"
                    >
                      <Navigation size={16} />
                      Directions
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center p-6">
                <div>
                  <MapPin size={48} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">No pharmacies found nearby</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL - MAP */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          <MapContainer
            center={location}
            zoom={14}
            style={{
              height: "100%",
              width: "100%",
              borderRadius: "24px",
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* YOUR LOCATION MARKER */}
            <Marker position={location}>
              <Popup>
                <div className="text-center">
                  <p className="font-bold text-[#7A341F]">Your Location</p>
                  <p className="text-sm text-gray-600">
                    {location[0].toFixed(4)}, {location[1].toFixed(4)}
                  </p>
                </div>
              </Popup>
            </Marker>

            {/* PHARMACY MARKERS */}
            {pharmacies.map((pharmacy) => {
              const [lon, lat] =
                pharmacy.geometry.coordinates;

              return (
                <Marker
                  key={pharmacy.properties.place_id}
                  position={[lat, lon]}
                >
                  <Popup>
                    <div className="w-48">
                      <strong className="text-[#7A341F]">
                        {pharmacy.properties.name}
                      </strong>

                      <div className="mt-2 text-sm text-gray-600">
                        <p>{pharmacy.properties.address_line1}</p>
                        {pharmacy.properties.city && (
                          <p className="text-xs mt-1">
                            {pharmacy.properties.city}
                          </p>
                        )}
                      </div>

                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-3 px-3 py-2 rounded-lg bg-[#7A341F] text-white text-xs font-semibold hover:bg-[#5C2415]"
                      >
                        Get Directions
                      </a>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default PharmacyLocator;