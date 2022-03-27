import { useEffect, useState } from "react";
import { createContainer } from "unstated-next";

export interface IUSer {
  base16: string;
  bech32: string;
}

export interface IContractInit {
  contract_owner?: string;
  name?: string;
  symbol?: string;
  _scilla_version?: number;
  _this_address?: string;
  _creation_block?: number;
}

const useContext = () => {
  const [zilPay, setZilPay] = useState<any | undefined>(undefined);
  const [error, setError] = useState<boolean | undefined>(undefined);
  const [contract, setContract] = useState<any | undefined>(undefined);
  const [contractState, setContractState] = useState<any | undefined>(
    undefined
  );
  const [currentUser, setCurrentUser] = useState<IUSer | null>(() => {
    const rawData = localStorage.getItem("zilpay");
    if (rawData) {
      const data = JSON.parse(rawData);
      return data.currentUser ?? null;
    }
    return null;
  });
  const [currentBlockNumber, setCurrentBlockNumber] = useState<
    number | undefined
  >(undefined);
  const [userNFTs, setUserNFTs] = useState<any>(() => {
    const rawData = localStorage.getItem("zilpay");
    if (rawData) {
      const data = JSON.parse(rawData);
      return data.userNFTs ?? null;
    }
    return null;
  });

  // Set up event listeners
  useEffect(() => {
    if (!zilPay?.wallet?.isConnect) return;
    const account = zilPay.wallet
      .observableAccount()
      .subscribe((user: IUSer) => setCurrentUser(user || null));
    return () => {
      account?.unsubscribe?.();
    };
  }, [zilPay]);

  // On mount check localstorage
  useEffect(() => {
    const rawData = localStorage.getItem("zilpay");
    if (rawData) {
      const data = JSON.parse(rawData);
      setError(data.error);
      //   setContractState(data.contractState);
    }
  }, [setError, setCurrentUser, setContractState]);

  // Write to localstorage on state change
  useEffect(() => {
    localStorage.setItem(
      "zilpay",
      JSON.stringify({ error, contractState, currentUser, userNFTs })
    );
  }, [error, contractState, currentUser, userNFTs]);

  return {
    zilPay,
    setZilPay,
    error,
    setError,
    contract,
    setContract,
    contractState,
    setContractState,
    currentUser,
    setCurrentUser,
    userNFTs,
    setUserNFTs,
    currentBlockNumber,
    setCurrentBlockNumber,
  };
};

export const { Provider: ZilProvider, useContainer: useZilpay } =
  createContainer(useContext);
