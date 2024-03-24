"use client";

import { ThirdwebProvider, embeddedWallet } from "@thirdweb-dev/react";

import type { FC } from "react";
import React from "react";

export const CustomThirdwebProvider: FC<{ clildren: React.ReactNode}> = ({ clildren}) => {
    return(
        <ThirdwebProvider
        activeChain="mumbai"
        clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
        supportedWallets={[embeddedWallet()]}
        >
            { clildren}
        </ThirdwebProvider>
    );
};