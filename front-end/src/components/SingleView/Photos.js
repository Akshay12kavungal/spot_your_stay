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
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const VillaSection = ({ propertyId }) => {
  const [property, setProperty] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openGallery, setOpenGallery] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propertyResponse, galleryResponse] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/api/properties/${propertyId}/`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }),
          axios.get(`http://127.0.0.1:8000/api/gallery/?property=${propertyId}`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }),
        ]);

        if (propertyResponse.status === 200) {
          setProperty(propertyResponse.data);
        }
        if (galleryResponse.status === 200) {
          setGalleryImages(galleryResponse.data.images || galleryResponse.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchData();
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
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="body2" color="text.secondary">
          Home &gt; {property.name} &gt; Details
        </Typography>
        <Button variant="outlined" startIcon={<PictureAsPdfIcon />} sx={{ textTransform: "none" }}>
          View Brochure
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              image={property.image}
              alt={property.name}
              sx={{
                borderRadius: "12px",
                width: "100%",
                height: "620px",
                objectFit: "cover",
              }}
            />
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
              onClick={() => setOpenGallery(true)}
            >
              View Photos
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box display="flex" flexDirection="column" gap={2}>
            {galleryImages.slice(0, 2).map((image) => (
              <CardMedia
                key={image.id}
                component="img"
                image={image.image}
                alt={image.title || "Gallery Image"}
                sx={{
                  borderRadius: "12px",
                  cursor: "pointer",
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                }}
              />
            ))}
          </Box>
        </Grid>
      </Grid>


      <Dialog open={openGallery} onClose={() => setOpenGallery(false)} maxWidth="md" fullWidth>
        <DialogTitle>Gallery</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            {galleryImages.map((image) => (
              <CardMedia
                key={image.id}
                component="img"
                image={image.image}
                alt={image.title || "Gallery Image"}
                sx={{
                  borderRadius: "12px",
                  width: "100%",
                  height: "500px",
                  objectFit: "cover",
                }}
              />
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default VillaSection;
