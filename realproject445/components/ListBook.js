"use client";
import { useState } from "react";
import { ethers } from "ethers";
import IMarketplace from "@/abi/abismart.json";

export default function ListBook({ marketplaceAddress }) {
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [price, setPrice] = useState("");

  const listBook = async () => {
    if (!window.ethereum) return alert("MetaMask not found");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const marketplace = new ethers.Contract(marketplaceAddress, IMarketplace, signer);
    const tx = await marketplace.listBook(title, imageURL, ethers.parseEther(price));
    await tx.wait();
    alert("Book listed!");
    setTitle(""); setImageURL(""); setPrice("");
  };

  return (
    <div>
      <h3>List a Book</h3>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Image URL" value={imageURL} onChange={e => setImageURL(e.target.value)} />
      <input placeholder="Price in NWN" value={price} onChange={e => setPrice(e.target.value)} />
      <button onClick={listBook}>List Book</button>
    </div>
  );
}
