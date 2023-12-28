"use client";
import Image from "next/image";
import abi from "../../../artifacts/contracts/charity.sol/charity.json";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Donate from "./components/Donate";
import Navbar from "./components/Navbar";
import Donations from "./components/Donations";

export default function Home() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (!ethereum) {
          throw new Error("Metamask not installed");
        }

        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        setAccount(account);
        setState({ provider, signer, contract });
        setLoading(false); // Set loading to false after successful connection
      } catch (error) {
        console.log(error);
        setLoading(false); // Set loading to false on error
        alert(error.message || "An error occurred");
      }
    };

    connectWallet();
  }, []);

  return (
    <div className="bg-gradient-to-tr from-purple-500 to-rose-600 ">
      <h1 className="text-3xl text-white font-bold mb-8 text-center">
        Charity-App
      </h1>
      {loading ? (
        <p className="text-white">Connecting to the wallet...</p>
      ) : (
        <div className="flex justify-center">
          <main className="container px-4 sm:px-6 md:px-8 sm:py-16 lg:py-24 ">
            <Donate state={state} />
            {state?.contract && <Donations state={state} />}
          </main>
        </div>
      )}
    </div>
  );
}
