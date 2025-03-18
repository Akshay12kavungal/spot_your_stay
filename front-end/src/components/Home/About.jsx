import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  CircularProgress,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import axios from "axios";
import Header from "../Header2"; // Import Header
import Footer from "../Footer"; // Import Footer

const AboutUs = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openGallery, setOpenGallery] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Fetch properties from the API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/properties/");
        if (response.status === 200) {
          setProperties(response.data);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Handle opening the gallery for a specific property
  const handleOpenGallery = (property) => {
    setSelectedProperty(property);
    setOpenGallery(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, paddingTop: "6rem", paddingBottom: "4rem" }}> {/* Added paddingTop for space */}
        <Container maxWidth="lg">
          {/* Section 1: About Us Content */}
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "2rem",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              marginBottom: "4rem",
            }}
          >
            <Typography
              variant="h3" 
              component="h1"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#333",
                marginBottom: "2rem",
              }}
            >
              About Spot Your Stay
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#555",
                lineHeight: "1.8",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              Spot Your Stay is an Indian startup founded in 2025, where
              customers can book hand-picked, verified properties across
              India for their short and long term stays through our website.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#555",
                lineHeight: "1.8",
                textAlign: "center",
              }}
            >
              Spot Your Stay provides worry-free stays in our hand-picked
              spots with private pools, daily house-keeping, WiFi, and a lot
              more, because your peaceful stay is our priority. Unveiling our
              properties perfect for groups and small families as well, it’s
              your ideal blend of home and holiday vibes. Pick your favourite
              spot with Spot Your Stay.
            </Typography>
          </Box>

          {/* Section 2: Property Images */}
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: "bold",
              color: "#333",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            Explore Our Properties
          </Typography>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={4}>
              {properties.map((property) => (
                <Grid item xs={12} sm={6} md={4} key={property.id}>
                  <Box
                    sx={{
                      position: "relative",
                      cursor: "pointer",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                    onClick={() => handleOpenGallery(property)}
                  >
                    <CardMedia
                      component="img"
                      image={property.image}
                      alt={property.name}
                      sx={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {/* Images Dialog */}
      <Dialog
        open={openGallery}
        onClose={() => setOpenGallery(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{selectedProperty?.name}</DialogTitle>
        <DialogContent>
          <Box>
            {/* Property Description */}
            <Typography variant="body1" sx={{ marginBottom: "1.5rem" }}>
              {selectedProperty?.description}
            </Typography>

            {/* Property Details */}
            <Grid container spacing={2} sx={{ marginBottom: "1.5rem" }}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Price:</strong> ₹{selectedProperty?.price}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Rooms:</strong> {selectedProperty?.rooms}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Bathrooms:</strong> {selectedProperty?.bathrooms}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Guests:</strong> {selectedProperty?.guests}
                </Typography>
              </Grid>
            </Grid>

            {/* Gallery Images */}
            <Grid container spacing={2}>
              {selectedProperty?.gallery_images?.map((image) => (
                <Grid item xs={12} sm={6} md={4} key={image.id}>
                  <CardMedia
                    component="img"
                    image={image.image}
                    alt={image.title || "Gallery Image"}
                    sx={{
                      borderRadius: "8px",
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default AboutUs;