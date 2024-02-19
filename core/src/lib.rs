use solana_program::{
    account_info::AccountInfo, entrypoint::ProgramResult, msg, program::invoke_signed, pubkey::Pubkey, rent::Rent, system_instruction, sysvar::Sysvar
};
pub mod instruction;
use instruction::MovieInstruction;

solana_program::entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8]
) -> ProgramResult {
    let instruction = MovieInstruction::unpack(instruction_data)?;
    match instruction {
        MovieInstruction::AddMovieReview { title, rating, description } => {
            let acccount_len = (4 + title.len()) + (4 + description.len())+ 1 ;
            let rent = Rent::get()?;
            let rent_lamports = rent.minimum_balance(acccount_len);
            msg!("Rent: {}", rent_lamports);
            let (note_pda_account, bump_seed) = Pubkey::find_program_address(
                &[accounts[1].key.as_ref(), 
                title.as_str().as_bytes().as_ref(),], 
                program_id
            );
            msg!("Note PDA: {}",note_pda_account);
            msg!("Bump seed: {}", bump_seed);
            let instruction = system_instruction::create_account(
                &accounts[0].key,
                &note_pda_account,
                rent_lamports,
                acccount_len.try_into().unwrap(),
                program_id,
            );
            let account_infos = &[
                accounts[0].clone(),
                accounts[1].clone(),
                ];

            invoke_signed(
                &instruction, 
                account_infos,
                &[&[accounts[0].key.as_ref(), title.as_str().as_bytes().as_ref(), &[bump_seed]]] 
            )?;
            msg!("Created account {}", note_pda_account.to_string());
            let _ = add_movie_review(program_id, accounts, title, rating, description);
        }
    };
    Ok(())
}
#[allow(unused_variables)]
pub fn add_movie_review(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    title: String,
    rating: u8,
    description: String,
    
) -> ProgramResult {
    // Logging instruction data that was passed in
    msg!("Adding movie review...");
    msg!("Title: {}", title);
    msg!("Rating: {}", rating);
    msg!("Description: {}", description);
    let acccount_len = (4 + title.len()) + (4 + description.len())+ 1 ;
    let rent = Rent::get()?;
    let rent_lamports = rent.minimum_balance(acccount_len);
    
    Ok(())
}

