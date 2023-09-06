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
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
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
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  return (
    <div className="bg-gradient-to-tr from-purple-400 to-rose-500 ">
      <h2 className="text-xl text-black px-10 py-2 font-bold">Charity-App</h2>
      <div class="isolate  px-6  sm:py-32 lg:px-8">
        {<Donate state={state} />}
        {state?.contract && <Donations state={state} />}
      </div>
    </div>
  );
}
