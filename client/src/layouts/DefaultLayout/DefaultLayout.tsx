import {
  AppBar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { FaWallet } from "react-icons/fa";
import { Outlet } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
  const [zilpayPresent, setZilpayPresent] = useState(false);
  const [zilpayObj, setZilpayObj] = useState<any>(null);
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    // @ts-ignore
    const zilpay = window.zilPay;
    setZilpayObj(zilpay);
    // setZilpayPresent(!zilpay);
    setZilpayPresent(!!zilpay);
  }, []);

  useEffect(() => {
    setInfoOpen(!zilpayPresent);
  }, [zilpayPresent, setInfoOpen]);

  const handleWalletConnect = useCallback(async () => {
    if (!zilpayPresent) {
      return setInfoOpen(true);
    }
    // const conn = await zilpayObj.wallet.connect();
  }, [zilpayObj, setInfoOpen]);

  return (
    <>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <Typography
            fontWeight="bold"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            LiquiNFT
          </Typography>
          <Button
            sx={{
              borderRadius: "2rem",
              padding: "0.5rem 1rem",
            }}
            endIcon={<FaWallet size="1rem" />}
            color="primary"
            variant="contained"
            onClick={handleWalletConnect}
          >
            Connect Wallet
          </Button>
          {/* <IconButton></IconButton> */}
        </Toolbar>
      </AppBar>
      <Container>{children ?? <Outlet />}</Container>
      <Dialog open={infoOpen}>
        <DialogTitle>Add the Zilpay wallet extension</DialogTitle>
        <DialogContent>
          <Typography mb="1rem">
            It seems like you don't have the{" "}
            <a target=" __blank" href="https://zilpay.io/">
              Zilpay Wallet extension
            </a>{" "}
            installed in your browser.
          </Typography>
          <Typography mb="1rem">
            Once you have added the extension to your browser, connect your
            wallet using the button in the top right of the menu bar.
          </Typography>
          <Typography mb="1rem">
            This will allow you to trustlessly login and begin using the app.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setInfoOpen(false)}
            variant="contained"
            color="primary"
          >
            Got It!
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DefaultLayout;
