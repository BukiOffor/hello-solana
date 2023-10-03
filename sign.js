import { Keypair, Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/node-helpers";
import * as dotenv  from "dotenv";

dotenv.config()

const keypair = Keypair.generate();
//const mykey = getKeypairFromEnvironment("SECRET_KEY");

async function main() {

    const connection = new Connection(clusterApiUrl("devnet"));
    const address = new PublicKey('CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN');
    const balance = await connection.getAccountInfo(address)

    console.log(balance);


    console.log(`The public key is: `, keypair.publicKey.toBase58());
    console.log(`The secret key is: `, keypair.secretKey);
    //console.log(`The secret key is: `, mykey);


    console.log(`✅ Generated keypair!`)
}
main()