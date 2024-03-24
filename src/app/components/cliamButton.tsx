"use client";

import { useState, type FC } from "react";
import axios from "axios";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

const ClaimButton: FC<{ id: string }> = ({ id }) => {
  const address = useAddress();
  const [loading, setLoading] = useState(false);

  const claim = async () => {
    setLoading(true);
    try {
      await axios.post("/api/nft", {
        id: id,
        address,
      });

      alert("NFT claimed!");
    } catch (err) {
      alert(`Error claiming NFT: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {address && (
        <button
          onClick={() => claim()}
          disabled={loading}
          style={{
            padding: "1rem",
            borderRadius: "1rem",
            backgroundColor: "#111",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          {loading ? "loading..." : "Cliam"}
        </button>
      )}
      <ConnectWallet
      btnTitle="Sign In to Claim"
      modalTitle="Sign In"
      />
    </div>
  );
};

export default ClaimButton;
