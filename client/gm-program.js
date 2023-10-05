import {
    Transaction, SystemProgram,PublicKey,
    Keypair, Connection, clusterApiUrl,
    sendAndConfirmTransaction,
    TransactionInstruction
} from "@solana/web3.js";
import * as borsh from '@project-serum/borsh';
import * as fs from "fs";



const projectID = "8VpuXXQNwJ7VUrsnZat5LAhHacA9TjtoEDZSFNCD8kyB";
const programId = new PublicKey(projectID);

const rawPayerKeypair = JSON.parse(fs.readFileSync("../.config/solana/id.json", "utf-8"));
const payerKeypair = Keypair.fromSecretKey(Buffer.from(rawPayerKeypair));

const data = borsh.struct([
    borsh.str('name')
])
const buffer = Buffer.alloc(1000);
data.encode({ name: 'Micheal Cox' }, buffer);
const instructionBuffer = buffer.slice(0, data.getSpan(buffer));

const connection = new Connection(clusterApiUrl("devnet"));

//create an account to write data to, pass the programID to own the account, so that the programID can write to it
const greetedPubkey = await PublicKey.createWithSeed(
    payerKeypair.publicKey,
    'Glass Chewer',
    programId,
);
const instruction = new TransactionInstruction({
    keys: [       
        {
            pubkey: greetedPubkey, // account to store our data
            isSigner: false,
            isWritable: true
        }
    ],
    programId: programId,
    data: instructionBuffer
})

const transaction = new Transaction();
transaction.add(instruction)


sendAndConfirmTransaction(
    connection,
    transaction,
    [payerKeypair]
).then((txid) => {
    console.log(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`)

})