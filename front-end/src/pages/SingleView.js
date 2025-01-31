import React from 'react';
import VillaSection from '../components/SingleView/Photos';
import VillaDetailsSection from '../components/SingleView/Details';
import ScrollableRooms from '../components/SingleView/Spaces';
import SearchBar from '../components/Home/Search';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
function SingleView() {
  const propertyId = useParams();

  return (
    <div>
        <Header2 />
        <div style={{ marginTop: '80px' }}><VillaSection /></div> Adjust marginTop to your header height
        <div><SearchBar /></div>
        <div><VillaDetailsSection propertyId={propertyId.id} /></div>
        <div><ScrollableRooms /></div>
        <Footer></Footer>
    </div>
  );
}

export default SingleView;