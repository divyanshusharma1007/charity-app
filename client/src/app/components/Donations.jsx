"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

const Memos = ({ state }) => {
  const [donations, setDonations] = useState([]);

  const { contract } = state;

  useEffect(() => {
    (async () => {
      try {
        console.log(state, "here is the state");
        const Donations = await contract.getdonation();
        console.log(Donations, "here is memos");
        setDonations(Donations);
      } catch (e) {
        console.error(e, "error");
      }
    })();
  }, [contract]);

  console.log(donations, "donations in the value");

  return (
    <>
      <p className="font-bold text-lg text-white">Donations</p>
      <div className="w-full overflow-auto mx-2 rounded-md">
        {donations.map((data, index) => (
          <div
            className="container-fluid mb-4"
            style={{ width: "100%" }}
            key={`donation_${index}`}
          >
            <table className="w-full table-fixed">
              
              <tbody>
                <tr className="bg-purple-700 text-white">
                  <td className="border border-white p-2 w-1/6">{data.donnor_name}</td>
                  <td className="border border-white p-2 w-2/6">
                    {new Date(data.timestamp * 1000).toLocaleString()}
                  </td>
                  <td className="border border-white p-2 w-1/6">{data.to_use}</td>
                  <td className="border border-white p-2 w-1/6 overflow-auto">{data.by}</td>
                  <td className="border border-white p-2 w-1/6 overflow-auto">{data.amount.toString()}</td>

                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
};

export default Memos;
