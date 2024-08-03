import React from "react";
import { Box, Paper, Skeleton } from "@mui/material";

const ItemSkeletons = () => {
  // Number of skeleton items to display
  const items = [1, 2, 3, 4, 5];

  return (
    <Box sx={{ width: "100%", maxWidth: "600px" }}>
      {items.map((item) => (
        <Box
          key={item}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
            mb: 2,
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
              bgcolor: "secondary.main",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
              <Skeleton
                variant="text"
                width="80%"
                height={32}
                sx={{ bgcolor: "primary.main" }}
              />
              <Skeleton
                variant="text"
                width="60%"
                height={24}
                sx={{ bgcolor: "primary.main", mr: 2 }}
              />
            </Box>
            <Skeleton
              variant="rectangular"
              width={32}
              height={24}
              sx={{ bgcolor: "primary.main", mr: 2 }}
            />
            <Skeleton
              variant="circular"
              width={30}
              height={30}
              sx={{ bgcolor: "primary.main", mr: 2 }}
            />
          </Paper>
          <Skeleton
            variant="circular"
            width={30}
            height={30}
            sx={{
              bgcolor: "primary.main",
              mr: 2,
              border: "1px solid",
              borderColor: "secondary.main",
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default ItemSkeletons;
