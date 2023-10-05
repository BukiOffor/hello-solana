import {
    Transaction, SystemProgram,PublicKey,
    Keypair, Connection, clusterApiUrl,
    sendAndConfirmTransaction,
    TransactionInstruction
} from "@solana/web3.js";
import * as borsh from '@project-serum/borsh';
import * as fs from "fs";
import { createNewMint } from "./token.js";
import * as token from '@solana/spl-token'


const rpc = clusterApiUrl("devnet");
const connection = new Connection(rpc);
const rawPayerKeypair = JSON.parse(fs.readFileSync("../.config/solana/id.json", "utf-8"));
const payer = Keypair.fromSecretKey(Buffer.from(rawPayerKeypair));


main().catch((err) => {
    console.log(err)
})

async function main() {
    const tokenMint = await createNewMint(connection, payer, payer.publicKey, payer.publicKey, 6); //Gs33seStwP3dJFQ5cYJsiADzZRkWwTWpHZX3hvTzh7ez
    const mintInfo = await token.getMint(connection, tokenMint);
    console.log(mintInfo);
}













