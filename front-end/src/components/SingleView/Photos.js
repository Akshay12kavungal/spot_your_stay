import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  CardMedia,
  IconButton,
  CircularProgress,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const VillaSection = ({ propertyId }) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/properties/${propertyId}/`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setProperty(response.data);
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchPropertyDetails();
    }
  }, [propertyId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!property) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="text.secondary">
          Villa details not available.
        </Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ padding: 2 }}>
      {/* Breadcrumb and Brochure Button */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="body2" color="text.secondary">
          Home &gt; {property.name} &gt; Details
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
              image={property.image}
              alt={property.name}
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
              image={property.image}
              alt={property.name}
              sx={{
                borderRadius: "12px",
                cursor: "pointer",
                width: "100%",
                height: "calc(50% - 8px)",
              }}
            />
            <CardMedia
              component="img"
              image={property.image}
              alt={property.name}
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
