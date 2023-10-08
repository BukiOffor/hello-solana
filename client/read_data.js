import { Keypair, Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/node-helpers";
import * as dotenv from "dotenv";
import * as borsh from '@project-serum/borsh';


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

    const projectID = "8VpuXXQNwJ7VUrsnZat5LAhHacA9TjtoEDZSFNCD8kyB";
    const programId = new PublicKey(projectID);

    console.log(`✅ Generated keypair!`)
    const accounts = connection.getProgramAccounts(programId).then(accounts => {
        accounts.map(({ pubkey, account }) => {
            console.log('Account:', pubkey)
            console.log('Encoded Data buffer:', account.data);
            console.log('Decoded Data buffer:', decode(account.data))
        })
      })
}
main()

 async function decode(data) {
    const schema = borsh.struct([
        borsh.str('name')
    ])
    const name = schema.decode(data)
    return name;
}