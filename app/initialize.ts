import * as anchor from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import fs from "fs";

const WALLET_PATH = "/root/.config/solana/id.json";
const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync(WALLET_PATH, "utf8")));
const wallet = anchor.web3.Keypair.fromSecretKey(secretKey);

const provider = new anchor.AnchorProvider(
  new Connection("https://api.devnet.solana.com", "confirmed"),
  new anchor.Wallet(wallet),
  { commitment: "confirmed" }
);

anchor.setProvider(provider);

const PROGRAM_ID = new PublicKey("GDTHjNWifY9UhxtudyvuMscJUYseVQ2sLuSy4eD1PGcP");
const idl = JSON.parse(fs.readFileSync("../target/idl/ikiru.json", "utf8"));

const program = new anchor.Program(idl, PROGRAM_ID, provider);

(async () => {
  try {
    const tx = await program.methods.initialize().rpc();
    console.log("✅ Transacción enviada:", tx);
  } catch (err) {
    console.error("❌ Error al ejecutar initialize:", err);
  }
})();

