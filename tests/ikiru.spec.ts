import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { assert } from "chai";

describe("ikiru", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Ikiru as Program;

  it("Checks transfer logic", async () => {
    const allowedWallet = new PublicKey("G13e8Lwfuwq9gKkEpNxreB8x29Kt73MW7chMiEyZnDTL");
    const tokenMint = new PublicKey("E9KWc6XVAKFeLqfFT7GXqQ6iiDERbmk9RW69xMD7MWj8");

    const tx = await program.methods
      .checkTransfer()
      .accounts({
        sender: allowedWallet,
        tokenMint: tokenMint,
      })
      .rpc();

    console.log("✅ Transaction Signature", tx);
  });
});

