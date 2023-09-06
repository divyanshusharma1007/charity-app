"use client";
import { useState, useEffect, memo } from "react";
import { ethers } from "ethers";
const Memos = ({ state }) => {
  const [donations, setDonations] = useState([]);

  const { contract } = state;
  useEffect(() => {
    (async () => {
      try {
        console.log(state, "here is the state");
        // const amount = { value: ethers.utils.parseEther("1") };
        const Donations = await contract.getdonation();
        console.log(Donations,"here is memos");
        setDonations(Donations);
      } catch (e) {
        console.log(e,"error");
      }
    })();
  }, [contract]);
  console.log(donations,"donations in the value");
  return (
  
    <>
      <p className="font-bold text-lg">Donations</p>
      <div className="w-full overflow-auto mx-2">

      {donations.map((data) => {
        return (
          <div
            className="container-fluid"
            style={{ width: "100%" }}
            key={Math.random()}
          >
            <table
              style={{
                marginBottom: "10px",
              }}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "100px",
                    }}
                  >
                    {data.donnor_name}
                  </td>
                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "800px",
                    }}
                  >
                    {new Date(data.timestamp * 1000).toLocaleString()}
                  </td>
                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "300px",
                    }}
                  >
                    {data.to_use}
                  </td>
                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "400px",
                    }}
                  >
                    {data.by}
                  </td>
                  <td
                    style={{
                      backgroundColor: "#96D4D4",
                      border: "1px solid white",
                      borderCollapse: "collapse",
                      padding: "7px",
                      width: "400px",
                    }}
                  >
                    {memo.amount}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
        );
      })}
      
      </div>
    </>
    
  );
};
export default Memos;
