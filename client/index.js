import {
    Transaction, SystemProgram,PublicKey,
    Keypair, Connection, clusterApiUrl,
    sendAndConfirmTransaction,
    TransactionInstruction
} from "@solana/web3.js";
import * as borsh from '@project-serum/borsh';
import * as fs from "fs";
import { createNewMint, createTokenAccount, mintTokens, transferTokens } from "./token.js";
import * as token from '@solana/spl-token'


const rpc = clusterApiUrl("devnet");
const connection = new Connection(rpc, {
    commitment: "confirmed",
  });
const rawPayerKeypair = JSON.parse(fs.readFileSync("../../.config/solana/id.json", "utf-8"));
const payer = Keypair.fromSecretKey(Buffer.from(rawPayerKeypair));


main().catch((err) => {
    console.log(err)
})

async function main() {
    const mint = await createNewMint(connection, payer, payer.publicKey, payer.publicKey, 6); 
    const mintInfo = await token.getMint(connection, mint);
    const tokenAccount = await createTokenAccount(connection,payer,mint,payer.publicKey) 
    console.log(mintInfo)
    await mintTokens(
        connection, payer, mint, tokenAccount.address, payer, "100"*"10" ** mintInfo.decimals
    )
    const receiver = Keypair.generate().publicKey
    const receiverTokenAccount = await createTokenAccount(
        connection, payer, mint, receiver
     )
    transferTokens(
        connection, payer, tokenAccount.address, receiverTokenAccount.address, payer,"100"*"10" ** mintInfo.decimals
    )

    
}













