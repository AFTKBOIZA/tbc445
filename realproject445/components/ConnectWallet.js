"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function ConnectWallet({ onConnect }) {
  const [account, setAccount] = useState("");

  const connect = async () => {
    if (!window.ethereum) return alert("MetaMask not found");
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccount(accounts[0]);
    onConnect(accounts[0]);
  };

  return (
    <div>
      {account ? (
        <p>Connected: {account}</p>
      ) : (
        <button onClick={connect}>Connect Wallet</button>
      )}
    </div>
  );
}
