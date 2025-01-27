import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Chip, CircularProgress } from "@mui/material";
import axios from "axios";

const VillaDetailsSection = ({ propertyId }) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPropertyDetails = async () => {
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
      getPropertyDetails();
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
          Property details not available.
        </Typography>
      </Box>
    );
  }

  const amenities = property.amenities ? property.amenities.split(",") : [];

  return (
    <Box sx={{ padding: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            {property.name || "Villa Name"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {property.address || "Address not available"}
          </Typography>
        </Box>
        <Typography
          variant="subtitle2"
          sx={{
            backgroundColor: "#f5c518",
            padding: "4px 8px",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          {property.price ? `$${property.price}` : "Price on Request"}
        </Typography>
      </Box>

      <Box mb={2}>
        <Typography variant="body1" fontWeight="bold">
          About the Property:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {property.description || "Description not available"}
        </Typography>
      </Box>

      <Box mb={2}>
        <Typography variant="body1" fontWeight="bold">
          Amenities:
        </Typography>
        <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
          {amenities.length > 0 ? (
            amenities.map((amenity, index) => (
              <Chip
                key={`${amenity}-${index}`}
                label={amenity.trim()}
                sx={{
                  backgroundColor: "#F3F8FF",
                  color: "#1976D2",
                  fontWeight: "bold",
                }}
              />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              Amenities not listed.
            </Typography>
          )}
        </Box>
      </Box>

      <Box mt={2} display="flex" gap={2} justifyContent="center">
        {["Explore Your Stay", "Booking Policies", "FAQs"].map((text) => (
          <Button
            key={text}
            variant="outlined"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              borderColor: "#1976D2",
              color: "#1976D2",
              "&:hover": {
                borderColor: "#115293",
                color: "#115293",
              },
            }}
          >
            {text}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default VillaDetailsSection;
