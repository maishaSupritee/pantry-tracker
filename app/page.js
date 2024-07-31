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
import ReusableModal from "./modal";
import CameraComponent from "./camera";

export default function Home() {
  const [newItem, setNewItem] = useState({ name: "", quantity: 1, expiry: "" });
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [editingItem, setEditingItem] = useState(null);
  //use to store errors
  const [errors, setErrors] = useState({
    name: "",
    quantity: "",
    expiry: "",
  });

  //passing in a dependancy array to prevent infinite renders. so only renders once
  useEffect(() => {
    getItems(setItems);
  }, []);

  const handleOpenModal = (mode, item = null) => {
    setModalMode(mode);
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingItem(null); //no item being edited when modal closes
  };

  //the addItem and updateItem functions now take a callback function where we are updating our list of items by using getItems
  const handleAddItem = (newItem) => {
    if (validateForm()) {
      addItem(newItem, () => {
        getItems(setItems); // Refresh the list after adding
        handleCloseModal();
      });
    }
  };

  const handleEditItem = (editedItem) => {
    if (validateForm()) {
      updateItem(editedItem, () => {
        getItems(setItems); // Refresh the list after editing
        handleCloseModal();
      });
    }
  };

  const handleTakePhoto = () => {
    // Implement photo taking logic here
    console.log("Taking photo...");
  };

  //ensure each field in the edit form is valid
  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", quantity: "", expiry: "" };

    if (!newItem.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (newItem.quantity < 1) {
      newErrors.quantity = "Quantity must be at least 1";
      isValid = false;
    }

    if (newItem.expiry) {
      const currentDate = new Date().toISOString().split("T")[0];
      if (newItem.expiry < currentDate) {
        newErrors.expiry = "Expiry date cannot be in the past";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
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
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "secondary.main",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Add new item to your pantry
        </Typography>
        <Button
          aria-label="add"
          variant="contained"
          onClick={() => handleOpenModal("add")}
          sx={{
            minWidth: "48px",
            minHeight: "48px",
            display: "flex",
            justifyContent: "center", // Center icon horizontally
            alignItems: "center",
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
              <Box
                sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
              >
                <Typography
                  variant="h6"
                  color="primary.main"
                  sx={{
                    wordBreak: "break-word",
                    mr: 2,
                    fontWeight: "bold",
                  }}
                >
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </Typography>
                <Typography
                  color="primary.main"
                  sx={{
                    fontSize: "0.75rem",
                  }}
                >
                  Expiry: {item.expiry !== "" ? item.expiry : "N/A"}
                </Typography>
              </Box>
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
              sx={{ borderRadius: "100%", height: "60%" }}
              onClick={() => handleOpenModal("edit", item)}
            >
              <CiEdit />
            </IconButton>
          </Box>
        ))}
      </Box>

      <ReusableModal
        open={modalOpen}
        handleClose={handleCloseModal}
        item={editingItem}
        handleSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        title={modalMode === "add" ? "Add New Pantry Item" : "Edit Pantry Item"}
        showPhotoButton={modalMode === "add"}
        onTakePhoto={handleTakePhoto}
      />
    </Box>
  );
}
