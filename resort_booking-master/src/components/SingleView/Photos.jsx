import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  CardMedia,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const VillaSection = () => {
  return (
    <Box sx={{ padding: 2 }}>
      {/* Breadcrumb and Brochure Button */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="body2" color="text.secondary">
          Home &gt; Villas in Alibaug &gt; Pranaam Villa in Alibaug
        </Typography>
        <Button
          variant="outlined"
          startIcon={<PictureAsPdfIcon />}
          sx={{ textTransform: "none" }}
        >
          View Brochure
        </Button>
      </Box>

      {/* Main Content */}
      <Grid container spacing={2}>
        {/* Main Image */}
        <Grid item xs={12} md={8}>
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              src="https://i.postimg.cc/fbwKrcyz/P1181274.jpg" // Replace with the main image URL
              alt="Main Villa"
              sx={{ borderRadius: "12px", width: "100%" }}
            />
            {/* View Photos Overlay */}
            <Button
              variant="contained"
              sx={{
                position: "absolute",
                bottom: 16,
                left: 16,
                textTransform: "none",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: "#fff",
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
              }}
            >
              View Photos
            </Button>
            {/* Icons for Share and Favorite */}
            <Box
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                display: "flex",
                gap: 1,
              }}
            >
              <IconButton sx={{ backgroundColor: "#fff" }}>
                <ShareIcon />
              </IconButton>
              <IconButton sx={{ backgroundColor: "#fff" }}>
                <FavoriteBorderIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>

        {/* Small Images */}
        <Grid item xs={12} md={4}>
          <Box display="flex" flexDirection="column" gap={2}>
            <CardMedia
              component="img"
              src="https://i.postimg.cc/13ctz6HN/P1181260.jpg" // Replace with additional image 1
              alt="Villa Detail"
              sx={{
                borderRadius: "12px",
                cursor: "pointer",
                width: "100%",
                height: "calc(50% - 8px)",
              }}
            />
            <CardMedia
              component="img"
              src="https://i.postimg.cc/dtfXTS5b/P1181228.jpg" // Replace with additional image 2
              alt="Villa Detail"
              sx={{
                borderRadius: "12px",
                cursor: "pointer",
                width: "100%",
                height: "calc(50% - 8px)",
              }}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Tags */}
      <Box mt={2} display="flex" gap={1}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#333" },
          }}
        >
          Best Rated
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#f5c518",
            color: "#000",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#e5b417" },
          }}
        >
          Luxury
        </Button>
      </Box>
    </Box>
  );
};

export default VillaSection;
