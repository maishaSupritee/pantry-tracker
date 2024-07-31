import * as React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const TransitionsModal = ({ open, handleClose, item, handleEdit }) => {
  const theme = useTheme(); //useTheme gives us access to breakpoints to determine screen size
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); //checks if the screen is mobile or smaller than sm

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "90%" : 400, //make the modal 90% width (smaller) on mobile and 400px on desktop
    maxWidth: "100%",
    bgcolor: "secondary.main",
    border: "2px solid tertiary.main",
    boxShadow: 24,
    p: isMobile ? 2 : 4, //less padding on mobile
  };

  const [editedItem, setEditedItem] = useState({
    name: "",
    quantity: 0,
    expiry: "",
  });

  //use to store errors
  const [errors, setErrors] = useState({
    name: "",
    quantity: "",
    expiry: "",
  });

  useEffect(() => {
    if (item) {
      setEditedItem(item);
    }
  }, [item]);

  if (!item) return null; //if there is no item, return null

  //ensure each field in the edit form is valid
  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", quantity: "", expiry: "" };

    if (!editedItem.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (editedItem.quantity < 1) {
      newErrors.quantity = "Quantity must be at least 1";
      isValid = false;
    }

    if (editedItem.expiry) {
      const currentDate = new Date().toISOString().split("T")[0];
      if (editedItem.expiry < currentDate) {
        newErrors.expiry = "Expiry date cannot be in the past";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //prevent the default behavior of the form
    if (validateForm()) {
      //if all fields valid only update item then
      handleEdit(editedItem); //pass the item we edited to the handleEdit function which in turn passes to updateItem
      handleClose();
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{
        backdrop: Backdrop,
      }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant={isMobile ? "h6" : "h5"} //smaller heading on mobile
            component="h2"
            sx={{ color: "primary.main" }}
          >
            Edit Pantry Item
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              value={editedItem.name}
              onChange={(e) =>
                setEditedItem({ ...editedItem, name: e.target.value })
              }
              error={!!errors.name} //change the field and label to error state
              helperText={errors.name} //display error message
              margin="normal"
            />
            <TextField
              fullWidth
              label="Quantity"
              type="number"
              value={editedItem.quantity}
              onChange={(e) =>
                setEditedItem({
                  ...editedItem,
                  quantity: Number(e.target.value),
                })
              }
              error={!!errors.quantity}
              helperText={errors.quantity}
              inputProps={{ min: 1 }} //quantity must be at least 1
              margin="normal"
            />
            <TextField
              fullWidth
              label="Expiry"
              type="date"
              value={editedItem.expiry}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                setEditedItem({
                  ...editedItem,
                  expiry: e.target.value,
                })
              }
              error={!!errors.expiry}
              helperText={errors.expiry}
              inputProps={{
                min: new Date().toISOString().split("T")[0], //date can only be today or later
              }}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Save Changes
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TransitionsModal;
