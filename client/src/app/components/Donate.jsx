"use client";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
export default function Donate({ state }) {
  const { contract } = state;
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [amountFor, setAmountFor] = useState("");
  console.log(contract);
  return (
    <>
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Donate for Something
        </h2>
      </div>
      <form action="#" method="POST" class="mx-auto mt-16 max-w-xl sm:mt-20">
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              for="first-name"
              class="block text-sm font-semibold leading-6 text-gray-900"
            >
              Name
            </label>
            <div class="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                placeholder=" "
                value={name}
                // autoComplete={false}
                onChange={(e) => setName(e.target.value)}
                autocomplete="given-name"
                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              for="last-name"
              class="block text-sm font-semibold leading-6 text-gray-900"
            >
              Amount
            </label>
            <div class="mt-2.5">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autocomplete="family-name"
                placeholder=" "
                value={amount}
                // autoComplete={false}
                onChange={(e) => setAmount(e.target.value)}
                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div class="sm:col-span-2">
          <label
            for="company"
            class="block text-sm font-semibold leading-6 text-gray-900"
          >
            Amout for
          </label>
          <div class="mt-2.5">
            <input
              type="text"
              name="company"
              value={amountFor}
              onChange={(e) => {
                setAmountFor(e.target.value);
              }}
              id="company"
              autocomplete="organization"
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div class="mt-10">
          <button
       
            class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={async (e) => {
                      e.preventDefault();
                      console.log(amount, amountFor, name);
                      const tranAm = { value: ethers.utils.parseEther(amount) };
                      let transisation = await contract.donate(name, amountFor,tranAm);
                      await transisation.wait();
                      alert("transisation is done")
          
                    }}
          >
            Let't Donate
          </button>
        </div>
      </form>
    </>
   
  );
}
