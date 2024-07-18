import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Skeleton,
  Container,
} from "@mui/material";

const CardSkeleton = () => {
  return (
    <Container maxWidth="xl">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia>
          <Skeleton variant="rectangular" height={200} />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5">
            <Skeleton variant="text" />
          </Typography>
          <Typography variant="body2">
            <Skeleton variant="text" />
            <Skeleton variant="text" width="80%" />
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CardSkeleton;
