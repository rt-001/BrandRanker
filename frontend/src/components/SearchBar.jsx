import { useState } from "react";
import {
  Box,
  TextField,
  Chip,
  Button,
  Stack,
  Typography,
} from "@mui/material";

const SearchBar = ({ onSubmit }) => {
  const [brandInput, setBrandInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  const addBrand = () => {
    const b = brandInput.trim();
    if (!b) return setError("Brand cannot be empty");
    if (brands.includes(b)) return setError("Brand already added");
    if (brands.length >= 5) return setError("Max 5 brands");
    setBrands((prev) => [...prev, b]);
    setBrandInput("");
    setError("");
  };

  const addCategory = () => {
    const c = categoryInput.trim();
    if (!c) return setError("Category cannot be empty");
    if (categories.includes(c)) return setError("Category already added");
    if (categories.length >= 3) return setError("Max 3 categories");
    setCategories((prev) => [...prev, c]);
    setCategoryInput("");
    setError("");
  };

  const handleSubmit = () => {
    if (!brands.length || !categories.length) {
      return setError("Add at least 1 brand & 1 category");
    }
    onSubmit(brands, categories);
    setBrands([]);
    setCategories([]);
    setError("");
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          label="Add a Brand (e.g. Nike)"
          value={brandInput}
          onChange={(e) => setBrandInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addBrand()}
          helperText={`${brands.length}/5 added`}
          disabled={brands.length >= 5}
          fullWidth
        />
        <TextField
          label="Add a Category (e.g. running shoes)"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addCategory()}
          helperText={`${categories.length}/3 added`}
          disabled={categories.length >= 3}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!brands.length || !categories.length}
        >
          Rank
        </Button>
      </Stack>

      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
      <Box mt={2}>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {brands.map((b) => (
            <Chip
              key={b}
              label={b}
              onDelete={() => setBrands((prev) => prev.filter((x) => x !== b))}
            />
          ))}
        </Stack>
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
          {categories.map((c) => (
            <Chip
              key={c}
              label={c}
              onDelete={() =>
                setCategories((prev) => prev.filter((x) => x !== c))
              }
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default SearchBar;
