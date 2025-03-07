import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // For navigation to another page

const CollectionSlider = () => {
  const scrollContainerRef = useRef(null);
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  // Fetch data from the API
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/gallery/');
        if (!response.ok) {
          throw new Error('Failed to fetch gallery data');
        }
        const data = await response.json();
        setGalleryData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280;
      const container = scrollContainerRef.current;
      const newScrollPosition = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

      container.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleShowAll = () => {
    // Navigate to another page to show all images
    navigate('/gallery', { state: { galleryData } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Slice the galleryData to show only the first 4 or 5 items
  const displayedCards = galleryData.slice(0, 4); // Change 4 to 5 if you want 5 cards

  // Use the first image from galleryData for the "Show All" card
  const showAllImage = galleryData.length > 0 ? galleryData[0].image : '';

  return (
    <div className="slider-container">
      <div className="header">
        <h2>GALLERY</h2>
        <div className="navigation-buttons">
          <button onClick={() => scroll('left')} className="nav-button">
            <ChevronLeft />
          </button>
          <button onClick={() => scroll('right')} className="nav-button">
            <ChevronRight />
          </button>
        </div>
      </div>

      <div ref={scrollContainerRef} className="cards-container">
        {displayedCards.map((item, index) => (
          <div key={index} className="card">
            <div className="card-inner">
              <img
                src={item.image}
                alt={item.title || 'Gallery Image'}
                className="card-image"
              />
              <div className="card-overlay"></div>
              <div className="card-content">
                {item.tag && <span className="tag">{item.tag}</span>}
              </div>
            </div>
          </div>
        ))}
        {/* "Show All" card */}
        <div className="card" onClick={handleShowAll}>
          <div className="card-inner show-all">
            <img
              src={showAllImage} // Use an image from galleryData
              alt="Show All"
              className="card-image"
            />
            <div className="card-overlay"></div>
            <div className="card-content">
              <h3 className="title">Show All</h3>
              <p className="description">View all images in the gallery</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .header h2 {
          font-size: 24px;
          font-weight: 600;
          margin: 0;
        }

        .navigation-buttons {
          display: flex;
          gap: 8px;
        }

        .nav-button {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background-color: #f3f4f6;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        }

        .nav-button:hover {
          background-color: #e5e7eb;
        }

        .cards-container {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-behavior: smooth;
        }

        .cards-container::-webkit-scrollbar {
          display: none;
        }

        .card {
          min-width: 250px;
          max-width: 250px;
          flex-shrink: 0;
          scroll-snap-align: start;
        }

        .card-inner {
          position: relative;
          height: 300px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.3);
          transition: all 0.5s;
        }

        .card-content {
          position: absolute;
          inset: 0;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          transition: all 0.5s;
        }

        .tag {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(0, 0, 0, 0.3);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 14px;
        }

        .title {
          color: white;
          text-align: center;
          font-size: 18px;
          margin: 0;
          transition: all 0.5s;
        }

        .description {
          color: white;
          text-align: center;
          font-size: 14px;
          margin: 0;
          opacity: 0;
          transition: opacity 0.5s;
          max-width: 100%;
        }

        /* Hover effects */
        .card-inner:hover .card-image {
          transform: scale(1.1);
        }

        .card-inner:hover .card-overlay {
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(2px);
        }

        .card-inner:hover .card-content {
          justify-content: flex-start;
          padding-top: 48px;
        }

        .card-inner:hover .title {
          margin-bottom: 16px;
        }

        .card-inner:hover .description {
          opacity: 1;
        }

        /* "Show All" card styles */
        .show-all {
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .show-all .card-content {
          text-align: center;
        }

        .show-all .title {
          font-size: 24px;
          margin-bottom: 8px;
        }

        .show-all .description {
          opacity: 1;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default CollectionSlider;