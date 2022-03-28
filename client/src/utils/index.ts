import { LIQUISHARE_ADDRESS } from "app_contsants";
import { toast } from "react-toastify";
import decodeMessage from "utils/decodeMessage";

export const truncateString = (str: string) => {
  if (!str) return;
  return `${str.slice(0, 5)}...${str.slice(-5)}`;
};

export const callContract = async (zilPay: any) => {
  const { contract } = zilPay;
  const gasPrice = zilPay.utils.units.toQa("1000", zilPay.utils.units.Units.Li);
  const tx = await contract.call(
    "Mint",
    [
      {
        vname: "to",
        type: "ByStr20",
        value: "0xAD37af61933de2B32d22F43E509Da8fc6c0C94e6",
      },
      {
        vname: "token_uri",
        type: "String",
        value:
          "https://lh3.googleusercontent.com/JNSmnBKyh0AyL8X-7D85S2C17gooQqB8sTCVbW-NM0Fy6QaVvUv2w9vyjX14XwZFdx_7XzyaehNx4PzkS-Cwcg0ZdUsKFkj0J00dcD0=w600",
      },
    ],
    {
      gasPrice,
      gasLimit: zilPay.utils.Long.fromNumber(9000),
    },
    true
  );
  console.log(tx);
};

export const approveNFT = async (
  zilPay: any,
  tokenId: string,
  NFTAddress: string
) => {
  const { contracts } = zilPay;
  const NFTContract = contracts.at(NFTAddress);
  const gasPrice = zilPay.utils.units.toQa("1000", zilPay.utils.units.Units.Li);
  const tx = await NFTContract.call(
    "SetApprove",
    [
      {
        vname: "to",
        type: "ByStr20",
        value: LIQUISHARE_ADDRESS,
      },
      {
        vname: "token_id",
        type: "Uint256",
        value: tokenId,
      },
    ],
    {
      gasPrice,
      gasLimit: zilPay.utils.Long.fromNumber(9000),
    },
    true
  );
  console.log(tx.ID);
  return await transitionMessageAlert(zilPay, tx.ID, "SetApprove");
};

export const depositNFT = async (
  zilPay: any,
  NFTId: string,
  NFTAddress: string,
  FTAddress: string,
  FTCount: number
) => {
  const { contracts } = zilPay;
  const liquiShareContract = contracts.at(LIQUISHARE_ADDRESS);
  const gasPrice = zilPay.utils.units.toQa("1000", zilPay.utils.units.Units.Li);
  const tx = await liquiShareContract.call(
    "Deposit_and_link",
    [
      {
        vname: "nfttokenAddress",
        type: "ByStr20",
        value: NFTAddress,
      },
      {
        vname: "tokenid",
        type: "Uint256",
        value: NFTId,
      },
      {
        vname: "fractionalshare",
        type: "ByStr20",
        value: FTAddress,
      },
      {
        vname: "numshares",
        type: "Uint128",
        value: String(FTCount),
      },
    ],
    {
      gasPrice,
      gasLimit: zilPay.utils.Long.fromNumber(9000),
    },
    true
  );
  return await transitionMessageAlert(zilPay, tx.ID, "Deposit");
};

export const checkRedeem = async (
  zilPay: any,
  NFTId: string,
  NFTAddress: string
) => {
  const { contracts } = zilPay;
  const liquiShareContract = contracts.at(LIQUISHARE_ADDRESS);
  const gasPrice = zilPay.utils.units.toQa("1000", zilPay.utils.units.Units.Li);
  const tx = await liquiShareContract.call(
    "Deposit_and_link",
    [
      {
        vname: "nfttokenAddress",
        type: "ByStr20",
        value: NFTAddress,
      },
      {
        vname: "tokenid",
        type: "Uint256",
        value: NFTId,
      },
    ],
    {
      gasPrice,
      gasLimit: zilPay.utils.Long.fromNumber(9000),
    },
    true
  );
  return await transitionMessageAlert(zilPay, tx.ID, "Deposit");
};

const transitionMessageAlert = (
  zilPay: any,
  transactionId: string,
  transitionName: string
) => {
  const transition = new Promise<string>((success, error) => {
    const subscription = zilPay.wallet
      .observableTransaction(transactionId)
      .subscribe(async (hash: any) => {
        // subscription.unsubscribe();
        try {
          const Tx = await zilPay.blockchain.getTransaction(hash);
          // const code = Tx.receipt.transitions[0].msg.params[0].value;
          const {
            success: txSuccess,
            event_logs,
            exceptions,
          } = Tx.receipt || {};
          // const message = decodeMessage(code);
          if (txSuccess) {
            const message = event_logs?.[0]?._eventname || "";
            console.log(message);
            success(message || "No message received");
          } else {
            const message = exceptions?.[0]?.message || "";
            console.log(message);
            error(message || "No message received");
          }
        } catch (err) {
          console.log(err);
          error("Transaction error");
        }
      });
  });
  return transition;
};

export const getUSerNFTs = (contractState: any, address: string) => {
  const { token_owners, token_uris, token_approvals } = contractState;
  const tokensOwned = Object.keys(token_owners).filter((key: string) => {
    return token_owners[key].toLowerCase() === address.toLowerCase();
  });
  return tokensOwned.map((token: string) => {
    return {
      uri: token_uris[token],
      id: token,
      approved: token_approvals[token] === LIQUISHARE_ADDRESS,
    };
  });
};
