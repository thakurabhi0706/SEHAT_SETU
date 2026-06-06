import {
  useEffect,
  useState,
} from "react";

import {
  getDoctorEarnings,
} from "../../services/doctorEarningsService";

import BackButton from "../../components/common/BackButton";

function DoctorEarnings() {
  const [data, setData] =
    useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result =
        await getDoctorEarnings();

      setData(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10 bg-[#f7f4ef] min-h-screen">

      <h1 className="text-4xl font-bold text-[#8c3b24] mb-8">
        Earnings
      </h1>
      <BackButton />

      <div
        className="
          bg-white
          rounded-3xl
          p-8
          shadow-md
          border
        "
      >
        <h2 className="text-xl text-gray-500">
          Total Earnings
        </h2>

        <p className="text-5xl font-bold mt-3">
          ₹
          {data?.totalEarnings || 0}
        </p>
      </div>

      <div className="mt-8 bg-white rounded-3xl p-8 shadow-md">

        <h2 className="text-2xl font-bold mb-6">
          Transactions
        </h2>

        <div className="space-y-4">

          {data?.transactions?.map(
            (item) => (

              <div
                key={item._id}
                className="
                  flex
                  justify-between
                  border-b
                  pb-4
                "
              >

                <div>
                  <p className="font-semibold">
                    {
                      item.patient
                        ?.fullName
                    }
                  </p>

                  <p className="text-gray-500">
                    {
                      new Date(
                        item.createdAt
                      ).toLocaleDateString()
                    }
                  </p>
                </div>

                <div className="font-bold text-green-600">
                  ₹
                  {item.paymentAmount}
                </div>

              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}

export default DoctorEarnings;