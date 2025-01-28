import React from "react";
import VillaSection from "../components/SingleView/Photos";
import VillaDetailsSection from "../components/SingleView/Details";
import ScrollableRooms from "../components/SingleView/Spaces";
import SearchBar from "../components/Home/Search";
import Header2 from "../components/Header2";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

function SingleView() {
  const { id: propertyId } = useParams(); // Destructure `id` from useParams()

  if (!propertyId) {
    return (
      <div>
        <Header2 />
        <div style={{ marginTop: "80px", textAlign: "center" }}>
          <h1>Property ID not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header2 />
      <div style={{ marginTop: "80px" }}>
        <VillaSection propertyId={propertyId} />
      </div>
      <div>
        <SearchBar />
      </div>
      <div>
        <VillaDetailsSection propertyId={propertyId} />
      </div>
      <div>
        <ScrollableRooms propertyId={propertyId} /> {/* Pass propertyId if needed */}
      </div>
      <Footer />
    </div>
  );
}

export default SingleView;
