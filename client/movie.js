import {
    Transaction, SystemProgram,PublicKey,
    Keypair, Connection, clusterApiUrl,
    sendAndConfirmTransaction,
    TransactionInstruction
} from "@solana/web3.js";
import * as borsh from '@project-serum/borsh';


const projectID = "9hbfYuxz12N3B28MKxwDgDUJfukfYyegvN7qtCsVUzJd";
const programId = new PublicKey(projectID);

const rawPayerKeypair = JSON.parse(fs.readFileSync("../../Downloads/wallet-keypair.json", "utf-8"));
const signer = Keypair.fromSecretKey(Buffer.from(rawPayerKeypair));
const connection = new Connection(clusterApiUrl("devnet"));


const data = borsh.struct([
    borsh.u8('variant'),
    borsh.str("title"),
    borsh.u8("rating"),
    borsh.str("description")
])

const buffer = Buffer.alloc(1000);
data.encode({ variant: 0,title: "Pain", rating: 4, description: "A movie about pain" }, buffer);
const instructionBuffer = buffer.slice(0, data.getSpan(buffer));
const instruction = new TransactionInstruction({
    keys: [],
    programId: programId,
    data: instructionBuffer
})
const transaction = new Transaction();
transaction.add(instruction)

sendAndConfirmTransaction(
    connection,
    transaction,
    [signer]
).then((txid) => {
    console.log(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`)

})



