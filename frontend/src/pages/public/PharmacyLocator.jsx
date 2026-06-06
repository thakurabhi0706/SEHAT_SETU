import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

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
  const [location, setLocation] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);

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

      console.log(data);

      setPharmacies(
        data.features || []
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (!location) {
    return (
      <div className="p-10 text-xl">
        Loading nearby pharmacies...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef] p-10">

      <h1 className="text-5xl font-bold text-[#8B4513] mb-8">
        Nearby Pharmacies
      </h1>

      <Link
        to="/"
        className="
          inline-block
          mb-6
          px-4
          py-2
          border
          rounded-lg
          hover:bg-gray-100
        "
      >
        ← Back
      </Link>

      {/* MAP */}

      <div className="grid grid-cols-12 gap-6 h-[80vh]">

  {/* LEFT PANEL */}

  <div
    className="
      col-span-4
      bg-white
      rounded-2xl
      shadow-md
      p-5
      overflow-y-auto
    "
  >
    <h2 className="text-3xl font-bold text-[#8B4513] mb-5">
      Nearby Pharmacies
    </h2>

    <div className="space-y-4">

      {pharmacies.map((pharmacy) => (

        <div
          key={pharmacy.properties.place_id}
          className="
            border
            rounded-xl
            p-4
            hover:shadow-md
            transition
          "
        >
          <h3 className="text-xl font-semibold">
            {pharmacy.properties.name ||
              "Unnamed Pharmacy"}
          </h3>

          <p className="text-gray-600 mt-2">
            {
              pharmacy.properties
                .address_line1
            }
          </p>

          <p className="text-gray-500">
            {
              pharmacy.properties.city
            }
          </p>

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${pharmacy.geometry.coordinates[1]},${pharmacy.geometry.coordinates[0]}`}
            target="_blank"
            rel="noreferrer"
            className="
              inline-block
              mt-3
              px-4
              py-2
              rounded-lg
              bg-[#8B4513]
              text-white
            "
          >
            Get Directions
          </a>
        </div>

      ))}

    </div>

  </div>

  {/* RIGHT PANEL */}

  <div
    className="
      col-span-8
      sticky
      top-0
      h-full
    "
  >

    <MapContainer
      center={location}
      zoom={14}
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "20px",
      }}
    >

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={location}>
        <Popup>
          Your Location
        </Popup>
      </Marker>

      {pharmacies.map((pharmacy) => {
        const [lon, lat] =
          pharmacy.geometry.coordinates;

        return (
          <Marker
            key={
              pharmacy.properties.place_id
            }
            position={[lat, lon]}
          >
            <Popup>

              <strong>
                {pharmacy.properties.name}
              </strong>

              <br />

              {
                pharmacy.properties
                  .address_line1
              }

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