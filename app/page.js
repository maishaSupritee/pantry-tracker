"use client";

import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { IoAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { addItem, getItems, deleteItem, updateItem } from "./helpers";
import { CiEdit } from "react-icons/ci";
import TransitionsModal from "./modal";

export default function Home() {
  const [newItem, setNewItem] = useState({ name: "", quantity: 1 });
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  //passing in a dependancy array to prevent infinite renders. so only renders once
  useEffect(() => {
    getItems(setItems);
  }, []);

  const handleOpenModal = (item) => {
    setEditingItem(item); //pass the current item to be edited
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingItem(null); //no item being edited when modal closes
  };

  const handleEditItem = (editedItem) => {
    updateItem(editedItem);
    handleCloseModal();
  };

  return (
    <Box
      component="main"
      sx={{
        bgcolor: "primary.main",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 1,
        gap: 2,
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        sx={{
          mt: 3,
          mb: 2,
          fontFamily: "Inter, sans-serif",
          fontWeight: "bold",
          color: "secondary.main",
        }}
      >
        Pantry Tracker
      </Typography>
      <Box
        component="form"
        onSubmit={(e) => addItem(e, newItem, setNewItem)}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          gap: 2,
          mb: 3,
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ mb: { xs: 2, sm: 0 }, alignItems: "center" }}
        >
          <Grid item xs={12} sm={8}>
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "secondary.100",
                  borderRadius: "10px",
                  "& fieldset": {
                    borderColor: "secondary.100",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "tertiary.main",
                  },
                },
              }}
              fullWidth
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              id="itemName"
              name="itemName"
              required
              placeholder="Enter item"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "secondary.100",
                  borderRadius: "10px",
                  "& fieldset": {
                    borderColor: "secondary.100",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "tertiary.main",
                  },
                },
              }}
              fullWidth
              value={newItem.quantity}
              onChange={(e) => {
                setNewItem({ ...newItem, quantity: e.target.value });
              }}
              type="number"
              id="itemQuantity"
              name="itemQuantity"
              placeholder="Enter quantity"
            />
          </Grid>
        </Grid>
        <Button
          aria-label="add"
          variant="contained"
          size="large"
          type="submit"
          sx={{
            minWidth: "56px",
            height: "56px",
            p: 0,
            borderRadius: "10px",
          }}
        >
          <IoAdd style={{ width: "32px", height: "32px" }} />
        </Button>
      </Box>

      <Box sx={{ width: "100%", maxWidth: "600px" }}>
        {items.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Paper
              elevation={6}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                p: 2,
                mb: 2,
                bgcolor: "secondary.main",
              }}
            >
              <Typography
                variant="h6"
                color="primary.main"
                sx={{
                  wordBreak: "break-word",
                  flexGrow: 1,
                  mr: 2,
                }}
              >
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Typography>
              <Typography
                variant="h6"
                color="primary.main"
                sx={{
                  mr: 2,
                  flexShrink: 0,
                }}
              >
                {item.quantity}
              </Typography>
              <IconButton
                aria-label="delete"
                sx={{ flexShrink: 0 }}
                onClick={() => deleteItem(item.id)}
              >
                <MdDelete />
              </IconButton>
            </Paper>

            <IconButton
              size="large"
              sx={{ borderRadius: "100%", height: "80%" }}
              onClick={() => handleOpenModal(item)}
            >
              <CiEdit />
            </IconButton>
          </Box>
        ))}
      </Box>

      <TransitionsModal
        open={modalOpen}
        handleClose={handleCloseModal}
        item={editingItem}
        handleEdit={handleEditItem}
      />
    </Box>
  );
}
