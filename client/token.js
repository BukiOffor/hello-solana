import * as token from '@solana/spl-token'

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
}

export async function mintTokens(connection, payer, mint, destination, authority, amount) {
    const transactionSignature = await token.mintTo(
        connection, payer, mint, destination, authority, amount
    )
    console.log(
        `Mint Token Transaction: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
    )
}