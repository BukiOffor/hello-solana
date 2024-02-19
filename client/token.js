import * as token from '@solana/spl-token'

// when it comes to this token stuff in solana, sol is not like eth.
// a mint account has to be created and that mint account will have an authority.
// all the mint account does is mints token to a specific address
// the address is not just a random address, but the address is generated for that particular mint
// and the owner of that address will be the intented receiptent of the token.

// say i own wallet A and need a token from mint Y. my wallet will be made the owner of ADDRESS C
// that the tokens will be minted to. Then wallet A can spend the tokens because it is the owner.

export async function createNewMint(
    connection,
    payer,
    mintAuthority,
    freezeAuthority,
    decimals
) {

    const tokenMint = await token.createMint(
        connection,
        payer,
        mintAuthority,
        freezeAuthority,
        decimals
    );

    console.log(
        `Token Mint: https://explorer.solana.com/address/${tokenMint}?cluster=devnet`
    );

    return tokenMint;
}

export async function createTokenAccount(connection,payer,mint,owner){
    const tokenAccount = await token.getOrCreateAssociatedTokenAccount(
        connection, payer, mint, owner
    )
    console.log(
        `Token Account: https://explorer.solana.com/address/${tokenAccount.address}?cluster=devnet`
    )
    return tokenAccount
}

export async function mintTokens(connection, payer, mint, destination, authority, amount) {
    const transactionSignature = await token.mintTo(
        connection, payer, mint, destination, authority, amount
    )
    console.log(
        `Mint Token Transaction: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
    )
}

export async function transferTokens(connection, payer, source, destination, owner, amount) {
    const transactionSignature = await token.transfer(
        connection, payer, source, destination, owner, amount
    )
    console.log(
        `Transfer Transaction: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`

    )
}