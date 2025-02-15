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
          <Typography variant="body2">
            <Skeleton variant="text" />
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CardSkeleton;
