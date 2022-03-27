import { Box, CardActionArea, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import React from "react";
import { MdCheckCircle } from "react-icons/md";
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
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          //   height="140"
          image={uri}
          alt={`Token #${tokenID}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Token #{tokenID}
          </Typography>
          {approved && (
            <Box display="flex" alignItems="center">
              <MdCheckCircle
                color={theme.palette.secondary.main}
                size="1.25rem"
                style={{ marginRight: "0.5rem" }}
              />
              <Typography fontSize="0.75rem">Approved for deposit</Typography>
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NFTCard;
