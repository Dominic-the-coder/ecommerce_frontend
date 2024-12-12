import * as React from "react";
import { Card, CardContent, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function ProductList(props) {
  const { item } = props;
  const { _id, name, description, category, price } = item;

  return (
    <Grid item xs={12} sm={6} md={1}>
      <Card>
        <CardContent>
          <Typography style={{ fontWeight: 700 }} variant="h6" component="div">
            {name}
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "15px 0",
            }}
          >
            <Typography
              style={{ fontWeight: 700 }}
              variant="h6"
              component="div"
            >
              {price}
            </Typography>
            <Typography
              style={{ fontWeight: 700 }}
              variant="h6"
              component="div"
            >
              {category}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button variant="contained" fullWidth>
              Add To Cart
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "15px 0",
            }}
          >
            <Button variant="contained" size="small">
              Edit
            </Button>
            <Button variant="contained" color="error" size="small">
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}
