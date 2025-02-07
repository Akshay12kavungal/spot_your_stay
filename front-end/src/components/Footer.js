import React, { useState, useEffect } from "react";
import { Box, Typography, Link, Grid, Divider, Button } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import ContactForm from "../components/Home/ContactForm";

// Styled luxury button with golden accents
const LuxuryButton = styled(Button)({
  backgroundColor: "transparent",
  color: "white", // White text color
  fontWeight: "bold",
  textTransform: "none",
  fontSize: "14px",
  "&:hover": {
    color: "#d4af37", // Brighter gold on hover
    backgroundColor: "rgba(255, 215, 0, 0.1)",
  },
});

const Footer = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openContactModal, setOpenContactModal] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/properties/", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        if (response.status === 200) {
          setProperties(response.data);
        } else {
          setError("Unexpected response");
        }
      } catch (error) {
        setError("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const footerData = [
    {
      title: "Exclusive Stays",
      links: loading
        ? [{ text: "Loading...", action: null }]
        : error
        ? [{ text: "Failed to load", action: null }]
        : properties.map((property) => ({
            text: capitalizeWords(property.name),
            action: () => {},
          })),
    },
    {
      title: "Top Collections",
      links: [
        { text: "Luxury Villas", action: () => {} },
        { text: "Pet-Friendly Villas", action: () => {} },
        { text: "Trending This Season", action: () => {} },
      ],
    },
    {
      title: "Support",
      links: [
        { text: "Contact Us", action: () => setOpenContactModal(true) },
        { text: "FAQs", action: () => {} },
        { text: "Cancellation & Refund Policy", action: () => {} },
        { text: "Terms & Conditions", action: () => {} },
        { text: "Privacy Policy", action: () => {} },
      ],
    },
    {
      title: "Follow Us",
      links: [
        { text: "Facebook", action: () => window.open("https://facebook.com", "_blank") },
        { text: "Twitter", action: () => window.open("https://twitter.com", "_blank") },
        { text: "Instagram", action: () => window.open("https://instagram.com", "_blank") },
      ],
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#1a1a1a", color: "white", py: 6, px: { xs: 4, md: 8 } }}>
      <Grid container spacing={6} sx={{ display: "flex", justifyContent: "space-between", textAlign: "center" }}>
        {footerData.map((section, index) => (
          <Grid item xs={12} sm={6} md={3} sx={{ textAlign: { xs: "center", sm: "left" } }} key={index}>
            <FooterSection section={section} />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ backgroundColor: "#444", my: 4 }} />

      {/* Copyright Section with only the © and Spot Your Stay in gold */}
      <Typography variant="body2" align="center" sx={{ opacity: 1, color: "#a89160" }}>
        <span style={{ color: "#a89160", fontWeight: "bold" }}>&copy;</span> {new Date().getFullYear()}{" "}
        <span style={{ color: "#a89160", fontWeight: "bold" }}>Spot Your Stay</span>. All rights reserved.
      </Typography>

      {/* Contact Us Modal */}
      <ContactForm open={openContactModal} handleClose={() => setOpenContactModal(false)} />
    </Box>
  );
};

const FooterSection = ({ section }) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
    <Typography variant="h6" sx={{ fontWeight: "bold", textTransform: "uppercase", mb: 2, color: "white" }}>
      {section.title}
    </Typography>

    {section.links.map((link, i) => (
      <Typography key={i} variant="body2" sx={{ opacity: 0.8 }}>
        {link.action ? (
          <LuxuryButton onClick={link.action}>{link.text}</LuxuryButton>
        ) : (
          <Link
            href={link.url}
            underline="none"
            color="inherit"
            sx={{ transition: "0.3s", "&:hover": { color: "#d4af37" } }}
          >
            {link.text}
          </Link>
        )}
      </Typography>
    ))}
  </Box>
);

export default Footer;
