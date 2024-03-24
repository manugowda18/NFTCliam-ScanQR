import { MediaRenderer } from "@thirdweb-dev/react";
import prisma from "../../../prisma/prisma";
import ClaimButton from "../components/cliamButton"

async function getData(id: string) {
  const nft = await prisma.nFT.findUnique({
    where: {
      id,
    },
  });
  if (!nft) {
    throw new Error("NFT does not Exist");
  }
  return { nft: JSON.stringify(nft) };
}
export default async function ClimPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const nft = JSON.parse((await getData(searchParams.id)).nft);

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
      <div
        style={{
          backgroundColor: "#222",
          padding: "2rem",
          borderRadius: "1rem",
        }}
      >
        {nft.minted ? (
          <h1 style={{ textAlign: "center" }}>NFT Already Claimed</h1>
        ) : (
          <h1 style={{ textAlign: "center" }}>
            You&apos;ve dicovered a <br />
            <span>&apos;{nft.name}&apos; NFT</span>
          </h1>
        )}
        <div style={{ textAlign: "center" }}>
          <MediaRenderer
            src={nft.image}
            alt={nft.name}
            width="250px"
            height="250px"
          />
          <h2>{nft.name}</h2>
          <p>{nft.discription}</p>
        </div>
        {/* @ts-ignore */}
        <div
          style={{
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          <h3>Attribute: </h3>
          {Object.keys(nft.attributes).map((key) => (
            <div 
            key={key}
            style={{
                display:"flex",
                justifyContent:"space-between",
                borderBottom: "1px solid #444",
                padding:"0.5"
            }}
            >
                <p>{key}</p>
                <p>
                    {nft.attributes[key]}
                </p>
            </div>
          ))}
        </div>
        {!nft.minted && <ClaimButton id={searchParams.id}/>}
      </div>
    </div>
  );
}
