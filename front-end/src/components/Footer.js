import React, { useState } from "react";
import { Box, Typography, Link, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { styled } from "@mui/system";
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
  const [openContactModal, setOpenContactModal] = useState(false);
  const [openPolicyModal, setOpenPolicyModal] = useState(false); // State for policy modal

  const footerLinks = [
    { text: "Contact Us", action: () => setOpenContactModal(true) },
    { text: "FAQs", action: () => {} },
    { text: "Cancellation & Refund Policy", action: () => setOpenPolicyModal(true) },
    { text: "Terms & Conditions", action: () => {} },
    { text: "Privacy Policy", action: () => {} },
  ];

  const socialMediaLinks = [
    { text: "Facebook", action: () => window.open("https://facebook.com", "_blank") },
    { text: "Twitter", action: () => window.open("https://twitter.com", "_blank") },
    { text: "Instagram", action: () => window.open("https://instagram.com", "_blank") },
  ];

  return (
    <Box sx={{ backgroundColor: "#1a1a1a", color: "white", py: 6, px: { xs: 2, sm: 4, md: 8 } }}>
      {/* Footer Links in the First Line */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row", // Horizontal layout
          flexWrap: "wrap", // Wrap links to the next line if they don't fit
          justifyContent: "center", // Center links horizontally
          gap: 4, // Spacing between links
          mb: 2, // Margin bottom
        }}
      >
        {footerLinks.map((link, index) => (
          <Typography key={index} variant="body2" sx={{ opacity: 0.8 }}>
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

      {/* Social Media Links in the Second Line */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row", // Horizontal layout
          flexWrap: "wrap", // Wrap links to the next line if they don't fit
          justifyContent: "center", // Center links horizontally
          gap: 4, // Spacing between links
          mb: 4, // Margin bottom
        }}
      >
        {socialMediaLinks.map((link, index) => (
          <Typography key={index} variant="body2" sx={{ opacity: 0.8 }}>
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

      <Divider sx={{ backgroundColor: "#444", my: 4 }} />

      {/* Copyright Section with only the © and Spot Your Stay in gold */}
      <Typography variant="body2" align="center" sx={{ opacity: 1, color: "#a89160" }}>
        <span style={{ color: "#a89160", fontWeight: "bold" }}>&copy;</span> {new Date().getFullYear()}{" "}
        <span style={{ color: "#a89160", fontWeight: "bold" }}>Spot Your Stay</span>. All rights reserved.
      </Typography>

      {/* Contact Us Modal */}
      <ContactForm open={openContactModal} handleClose={() => setOpenContactModal(false)} />

      {/* Cancellation & Refund Policy Modal */}
      <Dialog
        open={openPolicyModal}
        onClose={() => setOpenPolicyModal(false)}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            padding: "16px",
            maxWidth: "500px",
            width: "100%",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
            padding: "16px 0",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          Cancellation & Refund Policy
        </DialogTitle>
        <DialogContent sx={{ padding: "24px 16px" }}>
          <Typography variant="body1" gutterBottom sx={{ color: "#555", lineHeight: "1.6" }}>
            Kindly note our cancellation and refund policy:
          </Typography>
          <Box
            component="ul"
            sx={{
              marginLeft: "24px",
              color: "#555",
              "& li": {
                marginBottom: "8px",
              },
            }}
          >
            <li>
              Please inform us of any cancellations <strong>at least 7 days prior</strong> to your booking date.
            </li>
            <li>
              <strong>No refunds</strong> will be issued for cancellations made within 7 days of the booking date.
            </li>
            <li>
              Refunds, if applicable, will be processed within <strong>10 business days</strong>.
            </li>
          </Box>
          <Typography
            variant="body1"
            sx={{
              fontStyle: "italic",
              marginTop: "16px",
              color: "#555",
              textAlign: "center",
            }}
          >
            Your cooperation is appreciated. Thank you!
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            padding: "16px",
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <Button
            onClick={() => setOpenPolicyModal(false)}
            variant="contained"
            sx={{
              borderRadius: "8px",
              padding: "8px 24px",
              backgroundColor: "#d32f2f",
              "&:hover": {
                backgroundColor: "#b71c1c",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Footer;