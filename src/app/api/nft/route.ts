import prisma from "../../../../prisma/prisma";
import { Engine } from "@thirdweb-dev/engine";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id, address } = await req.json();

  const {
    ENGINE_URL,
    THIRDWEB_ACCESS_TOKEN,
    BACKEND_WALLET_ADDRESS,
    NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
  } = process.env;

  try {
    const nft = await prisma.nFT.findUnique({
      where: {
        id,
      },
    });

    if (!nft) {
      return NextResponse.json({ error: "NFT not found" }, { status: 404 });
    }

    if (nft.minted) {
      return NextResponse.json(
        { error: "NFT already minted" },
        { status: 400 }
      );
    }

    const engine = new Engine({
      url: process.env.ENGINE_URL!,
      accessToken: process.env.THIRDWEB_ACCESS_TOKEN!,
    });

    const tx = await engine.erc721.mintTo(
      "mumbai",
      NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!,
      BACKEND_WALLET_ADDRESS!,
      {
        metadata: {
          name: nft?.name,
          description: nft?.description,
          image: nft?.image,
        },
        receiver: address,
      }
    );

    await prisma.nFT.update({
      where: {
        id,
      },
      data: {
        owner: address,
        minted: true,
      },
    });

    return NextResponse.json(tx, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}