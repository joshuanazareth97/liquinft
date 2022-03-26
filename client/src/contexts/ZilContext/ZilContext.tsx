import { useState } from "react";
import { createContainer } from "unstated-next";

const useContext = () => {
  const [zilPay, setZilPay] = useState<any | undefined>(undefined);
  const [error, setError] = useState<boolean | undefined>(undefined);
  const [contract, setContract] = useState<any | undefined>(undefined);
  const [contractState, setContractState] = useState<any | undefined>(
    undefined
  );
  const [currentUser, setCurrentUser] = useState<any | undefined>(undefined);
  const [currentBlockNumber, setCurrentBlockNumber] = useState<
    number | undefined
  >(undefined);

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
    currentBlockNumber,
    setCurrentBlockNumber,
  };
};

export const { Provider: ZilProvider, useContainer: useZilpay } =
  createContainer(useContext);
