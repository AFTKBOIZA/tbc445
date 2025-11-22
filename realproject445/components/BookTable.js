"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import marketplaceAbi from "@/abi/abismart.json";

const marketplaceAddress = "YOUR_MARKETPLACE_ADDRESS";

export default function BookTable() {
  const [books, setBooks] = useState([]);

  const loadBooks = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const market = new ethers.Contract(marketplaceAddress, marketplaceAbi, provider);

    const total = await market.nextBookId();
    const temp = [];

    for (let i = 0; i < Number(total); i++) {
      const b = await market.books(i);
      temp.push({ id: i, ...b });
    }
    setBooks(temp);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const buyBook = async (id) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const market = new ethers.Contract(marketplaceAddress, marketplaceAbi, signer);

    const tx = await market.buyBook(id);
    await tx.wait();

    alert("Purchased!");
    loadBooks();
  };

  return (
    <>
      <h3>Available Books</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cover</th>
            <th>Title</th>
            <th>Seller</th>
            <th>Price</th>
            <th>Sold</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td><img src={book.imageURL} width="70" /></td>
              <td>{book.title}</td>
              <td>{book.seller}</td>
              <td>{ethers.formatEther(book.price)}</td>
              <td>{book.sold ? "Yes" : "No"}</td>
              <td>
                {!book.sold && <button onClick={() => buyBook(book.id)}>Buy</button>}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </>
  );
}
