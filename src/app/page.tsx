"use client";

import React from "react";
import {
  useAddress,
  useContract,
  useOwnedNFTs,
  ConnectWallet,
} from "@thirdweb-dev/react";
import { MediaRenderer } from "../app/components/MediaRenderer";

export default function Home() {
  const address = useAddress();

  const NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!;
  const { contract } = useContract(NFT_CONTRACT_ADDRESS);
  const { data: nfts, isLoading } = useOwnedNFTs(contract, address);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <ConnectWallet btnTitle="Sign-In" />
      {address && ( // Check if the user is connected
        <div
          style={{
            backgroundColor: "#222",
            padding: "2rem",
            borderRadius: "1rem",
            maxWidth: "500px",
            width: "100%",
            marginTop: "2rem",
          }}
        >
          <h1>Your Assets</h1>
          <h3>Total: {isLoading ? "Loading" : nfts?.length}</h3>
          {!isLoading && nfts?.length! > 0 ? (
            nfts?.map((nft) => (
              <div
                style={{
                  backgroundColor: "#111",
                  padding: "1rem",
                  borderRadius: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  marginTop: "1rem",
                }}
                key={nft.metadata.id}
              >
                <MediaRenderer
                  src={nft.metadata.image}
                  width="100px"
                  height="100px"
                />
                <h3>{nft.metadata.image}</h3>
              </div>
            ))
          ) : (
            <p>You don&apos;t have any NFTs yet <br /> <br /> <span style={{
              color:"red"
            }}>Can&apos;t Cliam Nft using QR now from My side Engine API Key is Removed. You can clone this repo add your Engine API Key then you Cliam the NFT Qr.</span> <br /> <br /> TO Git Repo :  <a style={{color:"blue"}} href="https://github.com/manugowda18/NFTCliam-ScanQR">Click Here</a></p> // Corrected typo
          )}
        </div>
      )}
    </div>
  );
}
