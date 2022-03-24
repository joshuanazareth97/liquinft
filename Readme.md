# LiquiNFT on Zilliqa - Fractionalised NFT ownership

LiquiNFT contracts allow users to lock up their NFT in the LiquiNFT contract, which then creates a new fungible token representing fractional ownership of the NFT. The number of fractional shares created is an input variable in the relevant transition and can be defined by the user.

To unlock (redeem) the NFT collateral, all fungible token shares must first be burnt - by calling the redeem transition in the relevant smart contracts.

We've successfully deployed a template LiquiShares Contract on the Zilliqa developer testnet -

LiquiSharesTracker - 0x99686aefe1d96353892f11eba81cc2193cca9a90
Fungible Token - 0x7a72f9fcc6de607946f53565ff8251172a69d696
Non Fungible Token - 0xe619b0755bce423677142aaf0ccc4c2a89f57eab

See LiquiShareTracker.scilla and & LiquiNFT-xxx-test.scilla for our codebase, under the Reference Folder.

# How does it work?

Given that a fungible token is flexible such that it can be exchanged for another of its kind without losing value, a smart contract can be deployed to generate ZRC2 tokens linked to an indivisible ZRC1 NFT. This way, anyone who holds any of the ZRC2 tokens generated can own a percentage of the rare and valuable NFT.
This is how fractional ownership of an NFT can be created, and the smart contract can secure the data that differentiates the fractional NFT from other NFTs. This idea can also be applied on any blockchain network that supports smart contracts and NFTs such that the NFT is locked in a smart contract on the blockchain and ownership of the NFT is represented by multiple fungible tokens whose supply is governed by the smart contract.”
So, in simple terms, the non-fungible ZRC1 tokens are broken up into fungible ZRC2 tokens, which allow any buyers to own a portion. This is both a benefit to buyers and curators.

# Why Fractional Ownership?

So this allows lots of people to have part ownership thus being part of the club and making some sweet profits from a future sale, all without having to spend millions. A buyer chooses how much they want to put up and in return they are given a percentage of shares which represents ownership.
This is the big difference between the digital and physical world. You could never break up the Mona Lisa and divide ownership without having an incomplete piece of work. However, we can do this with a CryptoPunk and many more.

# Smart Contract Transitions and Procedures

LiquiShares.scilla caputres the business logic of fractionalising the NFT.

1. The _Deposit_and_link_ transition handles conversion of ZRC1 to ZRC2 fractional shares. It first calls the _AuthorizedDepositNFT_ procedure to approve & transfer the relevant NFT from the user to the contract. This requires the NFT contract address and the TokenID as params.

The transition then calls the _AuthorizedMint_ procedure to mint the requested amount of ZRC2 Fungible Tokens, representing fractional ownership in the NFT.

2. The _Recieve_and_redeem_ transition allows the collateral NFT to be redeemed, if and only if one user has ALL the fungible fractional tokens (i.e. complete ownership of the collateral NFT). Otherwise, the transaction reverts.

# Additional informattion

It is important to note that the NFT-liquiShares linking process is open ended. This means you can link an NFT's redeemability to any ZRC2 FT, including existing tokens of various protocols. It is up to the NFT depositor to pick a new ZRC2 token that he/she owns fully, if they wish to retain ownership of the NFT in fractionalised form - and perhaps use the shares for financing activities via collateralised loans or auctions of portions of the NFT.

The requirement for redemption is simply that the user's balance of the fractional shares is exactly equal to the total supply of the fractional shares, _at the time of redemption_. Thus in case the token inflates or deflates the total supply between the inital linkage and the final redemption, it will still be possible to use the shares to redeem the NFT at any time. This makes very flexibile and innovative models of fractional NFT ownership possible.

Also, one FT cannot represent fractional shares in more than one NFT. This is by design, since at redemption of one NFT all the FTs will get burned. If they represented multiple NFTs, the other NFTs would become unredeemable, as the fractional FTs are now destroyed.

<br />

# Running the app locally

## Frontend

1. Change into the client directory and install dependencies:

   `cd client`
   `npm install`

2. Run the development React server

   `npm start`

## API Gateway

1. Change into the gateway directory and install dependencies

   `cd client`
   `npm install`

2. Run the api gateway in docker

   `sudo docker-compose -f docker-compose.yaml up --build`
