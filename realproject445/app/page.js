"use client";
import { useState } from "react";
import ConnectWallet from "@/components/ConnectWallet";
import TokenBalance from "@/components/TokenBalance";
import ListBook from "@/components/ListBook";
import BookList from "@/components/BookList";

const tokenAddress = "0x30b32EE29623350E94206Ce0f83483E5cAF69416";      
const marketplaceAddress = "0xe18c143194ac22BB9aDb518f4EF969294131dc0c";

export default function HomePage() {
  const [account, setAccount] = useState("");

  return (
    <main style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Book Marketplace</h1>
      <ConnectWallet onConnect={setAccount} />
      {account && (
        <>
          <TokenBalance account={account} tokenAddress={tokenAddress} />
          <ListBook marketplaceAddress={marketplaceAddress} />
          <BookList marketplaceAddress={marketplaceAddress} />
        </>
      )}
    </main>
  );
}
