"use client";

import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  Alert,
  Tooltip,
  TextField,
  InputAdornment,
} from "@mui/material";
import { IoAdd } from "react-icons/io5";
import { IoMdSearch, IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import {
  addItem,
  getItems,
  deleteItem,
  updateItem,
  searchItems,
} from "../db/helpers";
import { CiEdit } from "react-icons/ci";
import ReusableModal from "./modal";
import ItemSkeletons from "./skeletons";

export default function Home() {
  const [items, setItems] = useState(null); //all items in the pantry
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingItem, setEditingItem] = useState(null);
  const [searchItem, setSearchItem] = useState("");
  const [filteredItems, setFilteredItems] = useState(null);
  const displayItems = filteredItems || items; //whether to display all items or items we searched for
  const [isSearching, setIsSearching] = useState(false);

  const searchFieldSx = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "secondary.main",
      },
      "&:hover fieldset": {
        borderColor: "tertiary.main",
      },
      "&.Mui-focused fieldset": {
        borderColor: "tertiary.main",
      },
    },
    "& .MuiInputLabel-root": {
      color: "secondary.main",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "tertiary.main",
    },
    "& .MuiOutlinedInput-input": {
      color: "secondary.main",
    },
    borderRadius: "10px",
  };

  //passing in a dependancy array to prevent infinite renders. so only renders once
  useEffect(() => {
    getItems(setItems);
  }, []);

  const handleSearch = () => {
    if (searchItem.trim()) {
      //trim the search item to remove any whitespace
      searchItems(searchItem.trim(), setFilteredItems);
      setIsSearching(true);
    } else {
      setFilteredItems(null);
    }
  };

  const clearSearch = () => {
    setSearchItem("");
    setFilteredItems(null);
    setIsSearching(false);
  };

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

  const isExpiringWithinFiveDays = (expiryDate) => {
    if (!expiryDate) return false; //if there is no expiry date, return false
    const today = new Date();
    const expiry = new Date(expiryDate);
    const differenceInTime = expiry.getTime() - today.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays <= 5 && differenceInDays >= 0; //if less than 5 days left till expiry, but not expired yet
  };

  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today; //check if expiry date is before today
  };

  const getExpiryStatus = (expiryDate) => {
    if (isExpired(expiryDate)) return "error";
    if (isExpiringWithinFiveDays(expiryDate)) return "warning";
    return "none";
  };

  const getExpiryMessage = (expiryDate) => {
    if (isExpired(expiryDate)) return "Oh no! This item has expired!";
    if (isExpiringWithinFiveDays(expiryDate))
      return "Use this item quick! It's expiring within 5 days!";
    return ""; //neither expired/expiring within 5 days then no message
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
        variant="h2"
        sx={{
          mt: 3,

          fontFamily: "Inter, sans-serif",
          fontWeight: "bold",
          color: "secondary.main",
          transform: "translateZ(0)",
          transition: "transform 0.4s ease-out", //0.4s to move up and down
          "&:hover": {
            //hover effect to move up and down
            transform: "translateY(-7px) translateZ(0)",
          },
          letterSpacing: "2px", //make the words spaced out
        }}
      >
        Pantry Tracker
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
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
          Add a new item to your pantry
        </Typography>
        <Button
          variant="contained"
          onClick={() => handleOpenModal("add")}
          sx={{
            minWidth: "40px",
            minHeight: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 0,
            borderRadius: "10px",
            bgcolor: "secondary.main",
            "&:hover": {
              bgcolor: "tertiary.main",
            },
          }}
        >
          <IoAdd style={{ width: "32px", height: "32px", color: "white" }} />
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <TextField
          fullWidth
          value={searchItem}
          sx={searchFieldSx}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder="Search items..."
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={isSearching ? clearSearch : handleSearch}
                  edge="end"
                  sx={{ color: "secondary.main", mr: -1 }}
                >
                  {isSearching ? <IoMdClose /> : <IoMdSearch />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ width: "100%", maxWidth: "600px" }}>
        {displayItems !== null ? (
          displayItems.length > 0 ? (
            displayItems.map((item) => {
              const expiryStatus = getExpiryStatus(item.expiry);
              const expiryMessage = getExpiryMessage(item.expiry);

              return (
                <Tooltip //the component that lets us display some messages when we hover over an item
                  key={item.id}
                  title={
                    expiryStatus !== "none" ? ( //if the item is expired or expiring within 5 days, display the message
                      <Alert severity={expiryStatus} sx={{ m: -1 }}>
                        {expiryMessage}
                      </Alert>
                    ) : (
                      ""
                    )
                  }
                  arrow //point to the element expiring/expired
                  placement="top"
                >
                  <Box
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
                        bgcolor: "primary.main",
                        "&:hover": {
                          borderColor: "tertiary.main",
                          borderWidth: 2,
                          borderStyle: "solid",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1,
                        }}
                      >
                        <Typography
                          variant="h6"
                          color="secondary.main"
                          sx={{
                            wordBreak: "break-word", //line break instead of overflowing component
                            mr: 2,
                            fontWeight: "bold",
                          }}
                        >
                          {item.name.charAt(0).toUpperCase() +
                            item.name.slice(1)}
                        </Typography>
                        <Box
                          sx={{
                            display: "inline-block",
                            bgcolor:
                              expiryStatus !== "none"
                                ? `${expiryStatus}.main` //matching colors of warning or error with alert boxes
                                : "transparent",
                            p: expiryStatus !== "none" ? 0.5 : 0,
                            borderRadius: 1,
                            width: "fit-content",
                          }}
                        >
                          <Typography
                            color={
                              expiryStatus !== "none"
                                ? "primary.main"
                                : "secondary.main"
                            }
                            sx={{
                              fontSize: "0.75rem",
                            }}
                          >
                            Expiry: {item.expiry !== "" ? item.expiry : "N/A"}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="h6"
                        color="secondary.main"
                        sx={{
                          mr: 2,
                          flexShrink: 0,
                        }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton
                        sx={{ flexShrink: 0, color: "secondary.main" }}
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <MdDelete />
                      </IconButton>
                    </Paper>

                    <IconButton
                      size="large"
                      sx={{
                        borderRadius: "100%",
                        height: "60%",
                        color: "tertiary.main",
                      }}
                      onClick={() => handleOpenModal("edit", item)}
                    >
                      <CiEdit />
                    </IconButton>
                  </Box>
                </Tooltip>
              );
            })
          ) : (
            <Typography color="secondary.main">No items found.</Typography>
          )
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
