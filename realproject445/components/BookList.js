"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import IMarketplace from "@/abi/abismart.json";

export default function BookList({ marketplaceAddress }) {
  const [books, setBooks] = useState([]);

  const loadBooks = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const marketplace = new ethers.Contract(marketplaceAddress, IMarketplace, provider);
    const total = await marketplace.nextBookId();
    const arr = [];
    for (let i = 0; i < total; i++) {
      const b = await marketplace.books(i);
      arr.push(b);
    }
    setBooks(arr);
  };

  useEffect(() => { loadBooks(); }, []);

  const buyBook = async (id) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const marketplace = new ethers.Contract(marketplaceAddress, IMarketplace, signer);
    const tx = await marketplace.buyBook(id);
    await tx.wait();
    alert("Book bought!");
    loadBooks();
  };

  return (
    <div>
      <h3>Available Books</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Cover</th><th>Title</th><th>Seller</th><th>Price</th><th>Sold</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.id.toString()}</td>
              <td><img src={book.imageURL} width="70" /></td>
              <td>{book.title}</td>
              <td>{book.seller}</td>
              <td>{ethers.formatEther(book.price)}</td>
              <td>{book.sold ? "Yes" : "No"}</td>
              <td>{!book.sold && <button onClick={() => buyBook(book.id)}>Buy</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
