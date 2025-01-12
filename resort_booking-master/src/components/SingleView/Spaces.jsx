import React from "react";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";

const rooms = [
  {
    id: 1,
    title: "Bedroom 1",
    description: [
      "This is an air-conditioned room on the first floor.",
      "The room offers a king-sized bed, WiFi access and an attached balcony with a pool view.",
      "It has an attached bathroom equipped with a geyser, towels, basic toiletries, and a hot water facility.",
    ],
    image: "room1.jpg", // Replace with actual image URL
    tag: "King-sized bed",
  },
  {
    id: 2,
    title: "Bedroom 2",
    description: [
      "This is an air-conditioned room on the first floor.",
      "The room offers a king-sized bed, WiFi access and a garden view.",
      "It has an attached bathroom equipped with a geyser, towels, basic toiletries, and a hot water facility.",
    ],
    image: "room2.jpg", // Replace with actual image URL
    tag: "King-sized bed",
  },
  {
    id: 3,
    title: "Bedroom 3",
    description: [
      "This is an air-conditioned room on the first floor.",
      "The room offers a king-sized bed, WiFi access and an attached balcony with a garden view.",
      "It has an attached bathroom equipped with a geyser, towels, basic toiletries, and a hot water facility.",
    ],
    image: "room3.jpg", // Replace with actual image URL
    tag: "King-sized bed",
  },
  {
    id: 1,
    title: "Bedroom 1",
    description: [
      "This is an air-conditioned room on the first floor.",
      "The room offers a king-sized bed, WiFi access and an attached balcony with a pool view.",
      "It has an attached bathroom equipped with a geyser, towels, basic toiletries, and a hot water facility.",
    ],
    image: "room1.jpg", // Replace with actual image URL
    tag: "King-sized bed",
  },
  {
    id: 2,
    title: "Bedroom 2",
    description: [
      "This is an air-conditioned room on the first floor.",
      "The room offers a king-sized bed, WiFi access and a garden view.",
      "It has an attached bathroom equipped with a geyser, towels, basic toiletries, and a hot water facility.",
    ],
    image: "room2.jpg", // Replace with actual image URL
    tag: "King-sized bed",
  },
  {
    id: 3,
    title: "Bedroom 3",
    description: [
      "This is an air-conditioned room on the first floor.",
      "The room offers a king-sized bed, WiFi access and an attached balcony with a garden view.",
      "It has an attached bathroom equipped with a geyser, towels, basic toiletries, and a hot water facility.",
    ],
    image: "room3.jpg", // Replace with actual image URL
    tag: "King-sized bed",
  },
];

const ScrollableRooms = () => {
  const scrollRef = React.useRef(null);

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
          {rooms.map((room) => (
            <Card
              key={room.id}
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
                  image={room.image}
                  alt={room.title}
                  sx={{ borderRadius: "8px 8px 0 0" }}
                />
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
                  {room.tag}
                </Typography>
              </Box>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {room.title}
                </Typography>
                <ul style={{ padding: "0 16px", marginTop: 8 }}>
                  {room.description.map((line, index) => (
                    <li key={index}>
                      <Typography variant="body2">{line}</Typography>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ScrollableRooms;
