import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const ScrollableRooms = ({ propertyId }) => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = React.useRef(null);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/gallery/?property=${propertyId}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          // Adjust based on your API response structure
          setGalleryImages(response.data.images || response.data || []);
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchGalleryImages();
    }
  }, [propertyId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!galleryImages.length) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="text.secondary">
          No images available for this property.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", p: 2 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Spaces
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: 2,
            scrollBehavior: "smooth",
            width: "100%",
            p: 1,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {galleryImages.map((image) => (
            <Card
              key={image.id}
              sx={{
                minWidth: 300,
                maxWidth: 300,
                borderRadius: 2,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Box position="relative">
                <CardMedia
                  component="img"
                  height="180"
                  image={image.image}
                  alt={image.title || "Gallery Image"}
                  sx={{ borderRadius: "8px 8px 0 0" }}
                />
                {image.tag && (
                  <Typography
                    variant="caption"
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      bgcolor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: 1,
                      px: 1,
                      py: 0.5,
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {image.tag}
                  </Typography>
                )}
              </Box>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {image.title || "Untitled"}
                </Typography>
                {image.description && (
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {image.description}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ScrollableRooms;
