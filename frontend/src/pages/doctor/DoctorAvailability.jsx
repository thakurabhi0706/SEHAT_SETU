import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Clock } from "lucide-react";
import { updateAvailability } from "../../services/availabilityService";
import { getDoctorProfile } from "../../services/doctorService";
import ruralHealthcare3 from "../../assets/images/rural-healthcare3.jpg";

function DoctorAvailability() {
  const navigate = useNavigate();
  const [slots, setSlots] = useState([
    {
      day: "",
      startTime: "",
      endTime: "",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAvailability();
  }, []);

  const loadAvailability = async () => {
    try {
      const doctor = await getDoctorProfile();
      console.log("Doctor Profile:", doctor);

      if (doctor.availabilitySlots && doctor.availabilitySlots.length > 0) {
        setSlots(doctor.availabilitySlots);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
      alert("You must have at least one availability slot");
      return;
    }

    const updatedSlots = slots.filter((_, i) => i !== index);
    setSlots(updatedSlots);
  };

  const handleChange = (index, field, value) => {
    const updated = [...slots];
    updated[index][field] = value;
    setSlots(updated);
  };

  const validateSlots = () => {
    for (let slot of slots) {
      if (!slot.day || !slot.startTime || !slot.endTime) {
        return false;
      }
      if (slot.startTime >= slot.endTime) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateSlots()) {
      alert("Please fill all fields and ensure end time is after start time");
      return;
    }

    setSaving(true);
    try {
      await updateAvailability(slots);
      alert("Availability updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update availability");
    } finally {
      setSaving(false);
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
            backgroundImage: `url(${ruralHealthcare3})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#5C2415]/90 via-[#7A341F]/75 to-[#5C2415]/60" />

        {/* Back Button Inside Banner */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-20 bg-white/15 backdrop-blur-md text-white border border-white/20 hover:bg-white/25 rounded-xl px-5 py-3 flex items-center gap-2 font-semibold"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-5xl font-black">Availability Management</h1>
          <p className="mt-3 text-lg text-orange-100">
            Configure your consultation schedule
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* INFO CARD */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8 flex gap-4">
          <Clock className="text-blue-600 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Schedule Your Availability</h3>
            <p className="text-blue-700 text-sm">
              Add time slots when you're available for consultations. Patients will see these slots when booking appointments.
            </p>
          </div>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#1f2937] mb-2">Your Consultation Slots</h2>
            <p className="text-gray-600">
              {slots.length} slot{slots.length !== 1 ? "s" : ""} configured
            </p>
          </div>

          {/* SLOTS LIST */}
          <div className="space-y-5">
            {slots.map((slot, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-2xl p-6 bg-gray-50"
              >
                <div className="grid md:grid-cols-4 gap-4 items-end">
                  {/* Day Select */}
                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-2">
                      Day
                    </label>
                    <select
                      value={slot.day}
                      onChange={(e) =>
                        handleChange(index, "day", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20 bg-white"
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
                  </div>

                  {/* Start Time */}
                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-2">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) =>
                        handleChange(index, "startTime", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20"
                    />
                  </div>

                  {/* End Time */}
                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-2">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) =>
                        handleChange(index, "endTime", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7A341F] focus:ring-2 focus:ring-[#7A341F]/20"
                    />
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteSlot(index)}
                    disabled={slots.length === 1}
                    className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>

                {/* Time Validation Message */}
                {slot.startTime && slot.endTime && slot.startTime >= slot.endTime && (
                  <p className="text-red-500 text-sm mt-2">
                    End time must be after start time
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 mt-10 pt-8 border-t border-gray-200">
            <button
              onClick={addSlot}
              className="flex-1 md:flex-none bg-gray-100 hover:bg-gray-200 text-[#7A341F] px-8 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add Slot
            </button>

            <button
              onClick={handleSubmit}
              disabled={saving}
              className="flex-1 md:flex-none bg-[#7A341F] hover:bg-[#5C2415] disabled:bg-gray-400 text-white px-8 py-3 rounded-2xl font-semibold"
            >
              {saving ? "Saving..." : "Save Availability"}
            </button>
          </div>
        </div>

        {/* TIPS SECTION */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h3 className="font-semibold text-amber-900 mb-3">Tips for Setting Availability</h3>
          <ul className="space-y-2 text-amber-800 text-sm">
            <li>• Set realistic time slots that match your schedule</li>
            <li>• Ensure end time is always after start time</li>
            <li>• You can have multiple slots on the same day</li>
            <li>• Patients will only see your available slots when booking</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DoctorAvailability;