import {
  Container,
  Typography,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";
import { useEffect, useState } from "react";
import { getProducts, getCategories } from "../../utils/api";

export default function Products() {
  const [category, setCategory] = useState("");
  const [list, setList] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories(category).then((data) => {
      setCategories(data);
    });
  }, [category]); // only when genre is changed

  useEffect(() => {
    getProducts(category).then((data) => {
      setList(data);
    });
  }, []); // only when page first loaded

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  console.log(list)
  return (
    <div>
      <Header />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px 0",
          }}
        >
          <Typography style={{ fontWeight: 700 }} variant="h6" component="div">
            Products        
          </Typography>
          <Button variant="contained" color="success">
            Add New
          </Button>
        </div>
        <div>
          <FormControl variant="filled" style={{ minWidth: 150 }}>
            <InputLabel id="demo-simple-select-filled-label">
              All Categories
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={category}
              onChange={handleChange}
            >
              {categories.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {list && list.length > 0 ? (
          list.map((item) => (
            <ProductList key={item._id} item={item} />
            ))
          ) : <Typography>No items yet.</Typography>}
      </Container>
    </div>
  );
}
