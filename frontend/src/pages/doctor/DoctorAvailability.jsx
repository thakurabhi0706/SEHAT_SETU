import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateAvailability }
from "../../services/availabilityService";
import { getDoctorProfile }
from "../../services/doctorService";



function DoctorAvailability() {
  const navigate = useNavigate();
    useEffect(() => {
    loadAvailability();
  }, []);
  const [slots, setSlots] = useState([
    {
      day: "",
      startTime: "",
      endTime: "",
    },
  ]);



  const loadAvailability = async () => {
    try {

      const doctor =
        await getDoctorProfile();

      console.log(
        "Doctor Profile:",
        doctor
      );

      if (
        doctor.availabilitySlots &&
        doctor.availabilitySlots.length > 0
      ) {
        setSlots(
          doctor.availabilitySlots
        );
      }

    } catch (error) {
      console.error(error);
    }
  };
  const addSlot = () => {
    setSlots([
      ...slots,
      {
        day: "",
        startTime: "",
        endTime: "",
      },
    ]);
  };

  const deleteSlot = (index) => {

      if (slots.length === 1) {
        return;
      }

      const updatedSlots = slots.filter(
        (_, i) => i !== index
      );

      setSlots(updatedSlots);
  };

  const handleChange = (
    index,
    field,
    value
  ) => {
    const updated = [...slots];

    updated[index][field] = value;

    setSlots(updated);
  };

  const handleSubmit = async () => {
    try {

      await updateAvailability(slots);

      alert(
        "Availability updated successfully"
      );

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f4ef] p-10">

      <button
        onClick={() => navigate(-1)}
        className="
          flex items-center
          gap-2
          mb-6
          text-[#8c3b24]
          font-semibold
        "
      >
        ← Back
      </button>

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-md p-8">

        <h1 className="text-4xl font-bold text-[#8c3b24]">
          Availability Management
        </h1>

        <p className="mt-2 text-gray-500">
          Configure your consultation schedule
        </p>

        


        <div className="space-y-6 mt-8">

          {slots.map((slot, index) => (

          <div
            key={index}
            className="grid md:grid-cols-4 gap-4 items-center"
          >

            <select
              value={slot.day}
              onChange={(e) =>
                handleChange(
                  index,
                  "day",
                  e.target.value
                )
              }
              className="border rounded-xl p-4"
            >
              <option value="">Select Day</option>

              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </select>

            <input
              type="time"
              value={slot.startTime}
              onChange={(e) =>
                handleChange(
                  index,
                  "startTime",
                  e.target.value
                )
              }
              className="border rounded-xl p-4"
            />

            <input
              type="time"
              value={slot.endTime}
              onChange={(e) =>
                handleChange(
                  index,
                  "endTime",
                  e.target.value
                )
              }
              className="border rounded-xl p-4"
            />

            <button
              onClick={() => deleteSlot(index)}
              className="
                bg-red-500
                text-white
                px-4
                py-4
                rounded-xl
              "
            >
              Delete
            </button>

          </div>
        ))}

        </div>

        <div className="flex gap-4 mt-8">

          <button
            onClick={addSlot}
            className="
              bg-gray-200
              px-6 py-3
              rounded-xl
            "
          >
            Add Slot
          </button>

          <button
            onClick={handleSubmit}
            className="
              bg-[#8c3b24]
              text-white
              px-6 py-3
              rounded-xl
            "
          >
            Save Availability
          </button>

        </div>

      </div>

    </div>
  );
}

export default DoctorAvailability;