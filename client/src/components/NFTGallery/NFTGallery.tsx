import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import NFTCard from "components/NFTCard/NFTCard";
import { useZilpay } from "contexts/ZilContext/ZilContext";
import React, { useCallback, useEffect, useState } from "react";
import { MdGeneratingTokens, MdRefresh } from "react-icons/md";
import { toast } from "react-toastify";
import { theme } from "theme";
import { approveNFT, depositNFT, getUSerNFTs } from "utils";

type Props = {
  title: string;
  symbol: string;
  address: string;
};

interface INFT {
  uri: string;
  id: string;
  approved: Boolean;
}

interface ISelectedNFT extends INFT {
  address: string;
}

const NFTGallery = ({ title, address, symbol }: Props) => {
  const [contractState, setContractState] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { zilPay, currentUser } = useZilpay();
  const [tokens, setTokens] = useState<INFT[] | null>(null);

  const [selectedNFT, setSelectedNFT] = useState<ISelectedNFT | null>(null);
  const [linkWindowOpen, setLinkWindowOpen] = useState(false);
  const [ftAddress, setFTAddress] = useState("");
  const [ftCount, setFTCount] = useState<number | "">("");

  const loadContract = useCallback(async () => {
    setLoading(true);
    const contract = zilPay.contracts.at(address);
    const state = await contract.getState();
    setContractState(state);
    setLoading(false);
  }, [zilPay, setContractState, setLoading]);

  useEffect(() => {
    if (!zilPay) return;
    loadContract();
  }, [zilPay, setContractState, loadContract]);

  useEffect(() => {
    if (!(contractState && currentUser)) return;
    const userTokens: INFT[] = getUSerNFTs(contractState, currentUser.base16);
    setTokens(userTokens);
  }, [contractState, currentUser]);

  const approve = useCallback(async () => {
    if (!zilPay || !selectedNFT) return;
    try {
      const approvePromise = approveNFT(
        zilPay,
        selectedNFT.id,
        selectedNFT.address
      );
      toast.promise(approvePromise, {
        pending: "Approving NFT for use...",
        success: "Success!",
        error: "Error!",
      });
      const res = await approvePromise;
    } catch (err) {
      console.log(err);
    }
  }, [zilPay, selectedNFT]);

  const handleNFTClick = useCallback(
    (token: INFT) => {
      setSelectedNFT({ ...token, address });
      if (token.approved) {
        setLinkWindowOpen(true);
      } else {
        approve();
      }
    },
    [currentUser, contractState, approve]
  );

  const deposit = useCallback(async () => {
    if (!zilPay || !selectedNFT || !ftAddress || !ftCount) return;
    try {
      const depositPromise = depositNFT(
        zilPay,
        selectedNFT.id,
        selectedNFT.address,
        ftAddress,
        ftCount
      );
      toast.promise(depositPromise, {
        pending: "Depositing your NFT and linking it to the provided tokens...",
        success: "Success!",
        error: "Error!",
      });
      console.log(await depositPromise);
      setLinkWindowOpen(false);
    } catch (err) {
      console.log(err);
    }
  }, [zilPay, selectedNFT, ftAddress, ftCount]);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        borderBottom="2px solid lightGrey"
        marginBottom="3rem"
        paddingBottom="2rem"
      >
        <Box marginBottom="0.5rem" display="flex" alignItems="center">
          <IconButton onClick={loadContract} style={{ marginRight: "0.5rem" }}>
            <MdRefresh color={theme.palette.primary.main} />
          </IconButton>
          <Typography variant="h6" fontWeight="bold">
            {title} ({symbol})
          </Typography>
        </Box>
        {loading && <LinearProgress sx={{ alignSelf: "stretch" }} />}
        {!loading && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
            }}
          >
            {tokens?.length ? (
              tokens.map((token) => {
                return (
                  // <Grid item sm={6} md={3} key={token.id}>
                  <NFTCard
                    onClick={() =>
                      // token.approved ? handleNFTClick(token) : approve()
                      handleNFTClick(token)
                    }
                    tokenID={token.id}
                    uri={token.uri}
                    approved={token.approved}
                  />
                  // </Grid>
                );
              })
            ) : (
              <Typography>You have no tokens for this contract!</Typography>
            )}
          </Box>
        )}
      </Box>
      <Dialog open={linkWindowOpen}>
        <DialogTitle>Deposit and Link</DialogTitle>
        <DialogContent>
          <Typography fontWeight="bold">
            Non Fungible Token #{selectedNFT?.id}
          </Typography>
          <Typography
            sx={{
              marginBottom: "1rem",
            }}
          >
            {address}
          </Typography>
          <Typography
            sx={{
              marginBottom: "0.5rem",
            }}
            fontWeight="bold"
          >
            Fungible (ZRC2) Token
          </Typography>
          <TextField
            value={ftAddress}
            onChange={(event) => setFTAddress(event.target.value)}
            sx={{
              marginBottom: "0.5rem",
              "& .MuiInputBase-input": {
                padding: "0.75rem",
              },
            }}
            variant="outlined"
            placeholder="Contract Address"
            fullWidth
          />
          <TextField
            value={ftCount}
            onChange={(event) => setFTCount(parseInt(event.target.value))}
            sx={{
              marginBottom: "0.5rem",
              "& .MuiInputBase-input": {
                padding: "0.75rem",
              },
            }}
            fullWidth
            variant="outlined"
            type="number"
            placeholder="Number of shares"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setLinkWindowOpen(false)}
            variant="outlined"
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={deposit} variant="contained" color="primary">
            Deposit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NFTGallery;
