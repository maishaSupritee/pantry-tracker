"use client";

import { Box, Typography, Paper, IconButton, Button } from "@mui/material";
import { IoAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { addItem, getItems, deleteItem, updateItem } from "./helpers";
import { CiEdit } from "react-icons/ci";
import ReusableModal from "./modal";
import ItemSkeletons from "./skeletons";

export default function Home() {
  const [items, setItems] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingItem, setEditingItem] = useState(null);

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
    addItem(newItem, () => {
      handleCloseModal();
    });
  };

  const handleEditItem = (editedItem) => {
    updateItem(editedItem, () => {
      handleCloseModal();
    });
  };

  const handleDeleteItem = (id) => {
    deleteItem(id);
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
          variant="contained"
          onClick={() => handleOpenModal("add")}
          sx={{
            minWidth: "48px",
            minHeight: "48px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 0,
            borderRadius: "10px",
          }}
        >
          <IoAdd style={{ width: "32px", height: "32px" }} />
        </Button>
      </Box>

      <Box sx={{ width: "100%", maxWidth: "600px" }}>
        {items !== null ? (
          items.map((item) => (
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
                  sx={{ flexShrink: 0 }}
                  onClick={() => handleDeleteItem(item.id)}
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
          ))
        ) : (
          <ItemSkeletons />
        )}
      </Box>

      <ReusableModal
        open={modalOpen}
        handleClose={handleCloseModal}
        item={editingItem}
        handleSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        title={modalMode === "add" ? "Add New Pantry Item" : "Edit Pantry Item"}
      />
    </Box>
  );
}
