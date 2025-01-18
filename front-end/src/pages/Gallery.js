import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";

const images = [
  { id: 1, src: "https://i.postimg.cc/13ctz6HN/P1181260.jpg", alt: "Image 1" },
  { id: 2, src: "https://i.postimg.cc/dtfXTS5b/P1181228.jpg", alt: "Image 2" },
  { id: 3, src: "https://i.postimg.cc/13ctz6HN/P1181260.jpg", alt: "Image 3" },
  { id: 4, src: "https://i.postimg.cc/13ctz6HN/P1181260.jpg", alt: "Image 4" },
  { id: 5, src: "https://i.postimg.cc/dtfXTS5b/P1181228.jpg", alt: "Image 5" },
  { id: 6, src: "https://i.postimg.cc/13ctz6HN/P1181260.jpg", alt: "Image 6" },
  { id: 7, src: "https://i.postimg.cc/dtfXTS5b/P1181228.jpg", alt: "Image 7" },
  { id: 8, src: "https://i.postimg.cc/13ctz6HN/P1181260.jpg", alt: "Image 8" },
  { id: 6, src: "https://i.postimg.cc/13ctz6HN/P1181260.jpg", alt: "Image 6" },
  { id: 7, src: "https://i.postimg.cc/dtfXTS5b/P1181228.jpg", alt: "Image 7" },
  { id: 8, src: "https://i.postimg.cc/13ctz6HN/P1181260.jpg", alt: "Image 8" },
];

const SectionWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "50px 20px",
  backgroundColor: "transparent",
  color: "#000",
});

const ContentWrapper = styled(Box)({
  display: "flex",
  width: "100%",
  maxWidth: "1200px",
  height: "500px",
  gap: "20px",
});

const LeftPanel = styled(Box)({
  flex: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
});

const RightPanel = styled(Box)({
  flex: 1,
  overflowY: "auto",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
});

const ThumbnailGrid = styled(Grid)({
  img: {
    width: "100%",
    height: "auto",
    borderRadius: "4px",
    cursor: "pointer",
    border: "2px solid transparent",
    "&:hover": {
      border: "2px solid #000",
    },
  },
});

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(images[0].src);

  return (
    <SectionWrapper>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Our Gallery
      </Typography>

      <ContentWrapper>
        {/* Left Panel */}
        <LeftPanel>
          <img src={selectedImage} alt="Selected" />
        </LeftPanel>

        {/* Right Panel */}
        <RightPanel>
          <ThumbnailGrid container spacing={2}>
            {images.map((image) => (
              <Grid item xs={6} key={image.id}>
                <img
                  src={image.src}
                  alt={image.alt}
                  onClick={() => setSelectedImage(image.src)}
                />
              </Grid>
            ))}
          </ThumbnailGrid>
        </RightPanel>
      </ContentWrapper>
    </SectionWrapper>
  );
};

export default GallerySection;
