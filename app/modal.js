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

  const [editedItem, setEditedItem] = useState({ name: "", quantity: 0 });

  useEffect(() => {
    if (item) {
      setEditedItem(item);
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault(); //prevent the default behavior of the form
    handleEdit(editedItem); //pass the item we edited to the handleEdit function which in turn passes to updateItem
    handleClose();
  };

  if (!item) return null; //if there is no item, return null

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
