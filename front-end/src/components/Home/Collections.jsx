import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const collections = [
  {
    title: "COLDPLAY Concert Stays",
    description: "Experience luxury stays near concert venues with exclusive amenities and premium services.",
    image: "https://i.postimg.cc/vZ1GHhYQ/Zv-Ta-Qr-Vs-Gr-YSw-A6-V-web-6.jpg",
    tag: ""
  },
  {
    title: "Luxury Vistas",
    description: "Discover breathtaking views from our handpicked luxury accommodations around the world.",
    image: "https://i.postimg.cc/7hcZyhx4/68053c90-0bae-486e-ba18-dc3f02102bfb-Luxury-Collection-Banner-Image.jpg",
    tag: "Top"
  },
  {
    title: "Unique Vistas Of India",
    description: "Delve into a one-of-a-kind collection of retreats that offer stunning vistas, unparalleled luxury, and unforgettable escapes in India's hidden gems.",
    image: "https://i.postimg.cc/vZ1GHhYQ/Zv-Ta-Qr-Vs-Gr-YSw-A6-V-web-6.jpg",
    tag: ""
  },
  {
    title: "Corporate Offsite Vistas",
    description: "Perfect locations for team building and corporate retreats with modern amenities.",
    image: "https://i.postimg.cc/7hcZyhx4/68053c90-0bae-486e-ba18-dc3f02102bfb-Luxury-Collection-Banner-Image.jpg",
    tag: "Top"
  },
  {
    title: "Best Rated",
    description: "Top-rated properties with exceptional reviews and outstanding guest experiences.",
    image: "https://i.postimg.cc/vZ1GHhYQ/Zv-Ta-Qr-Vs-Gr-YSw-A6-V-web-6.jpg",
    tag: ""
  }
];

const CollectionSlider = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280;
      const container = scrollContainerRef.current;
      const newScrollPosition = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      container.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="slider-container">
      <div className="header">
        <h2>CHOOSE A COLLECTION</h2>
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
        {collections.map((collection, index) => (
          <div key={index} className="card">
            <div className="card-inner">
              <img
                src={collection.image}
                alt={collection.title}
                className="card-image"
              />
              <div className="card-overlay"></div>
              <div className="card-content">
                {collection.tag && (
                  <span className="tag">{collection.tag}</span>
                )}
                <h3 className="title">{collection.title}</h3>
                <p className="description">{collection.description}</p>
              </div>
            </div>
          </div>
        ))}
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
      `}</style>
    </div>
  );
};

export default CollectionSlider;