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
}