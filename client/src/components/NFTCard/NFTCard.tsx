import { Box, CardActionArea, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import React from "react";
import { MdApproval, MdMail } from "react-icons/md";
import { theme } from "theme";

type Props = {
  uri: string;
  tokenID: string;
  approved: Boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const NFTCard = ({ approved, uri, tokenID, onClick }: Props) => {
  return (
    <Card raised sx={{ maxWidth: 345 }}>
      <CardActionArea
        onClick={onClick}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            flexGrow: 1,
          }}
          //   height="140"
          image={uri}
          alt={`Token #${tokenID}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Token #{tokenID}
          </Typography>
          <Box display="flex" alignItems="center">
            {approved ? (
              <MdMail
                color={theme.palette.secondary.main}
                size="1.25rem"
                style={{ marginRight: "0.5rem" }}
              />
            ) : (
              <MdApproval size="1.25rem" style={{ marginRight: "0.5rem" }} />
            )}
            <Typography fontWeight="bold" fontSize="0.75rem">
              {approved ? "Deposit" : "Approve"}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NFTCard;
