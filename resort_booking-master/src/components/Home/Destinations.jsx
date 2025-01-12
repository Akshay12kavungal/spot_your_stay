import React, { useRef } from 'react';
import { styled } from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 40px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ScrollContainer = styled.div`
  position: relative;
`;

const DestinationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Updated to show 4 destinations */
  gap: 40px;
  padding: 10px 0;
  overflow-x: auto;
  scroll-behavior: smooth;
  width: 100%;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    background: #f5f5f5;
  }

  ${props => props.$direction === 'left' ? 'left: -20px;' : 'right: -20px;'}

  @media (max-width: 768px) {
    display: none;
  }
`;

const DestinationItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  margin-bottom: 12px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DestinationName = styled.span`
  font-size: 16px;
  color: #333;
  margin-top: 8px;
`;

const destinations = [
  { name: 'Alleppey', color: '#FFB6C1', image: 'https://i.postimg.cc/Y9BkmjKs/Ooty.png' },
  { name: 'Ooty', color: '#FFE4E1', image: 'https://i.postimg.cc/Y9BkmjKs/Ooty.png' },
  { name: 'Coorg', color: '#FFDAB9', image: 'https://i.postimg.cc/Y9BkmjKs/Ooty.png' },
  { name: 'Goa', color: '#FFE4B5', image: 'https://i.postimg.cc/Y9BkmjKs/Ooty.png' },
];

const DestinationPicker = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const container = scrollContainerRef.current;

      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <Container>
      <Title>Pick a destination</Title>

      <ScrollContainer>
        <ScrollButton 
          $direction="left" 
          onClick={() => scroll('left')}
        >
          ←
        </ScrollButton>

        <DestinationGrid ref={scrollContainerRef}>
          {destinations.map((destination, index) => (
            <DestinationItem key={index}>
              <IconContainer>
                <img src={destination.image} alt={destination.name} />
              </IconContainer>
              <DestinationName>{destination.name}</DestinationName>
            </DestinationItem>
          ))}
        </DestinationGrid>

        <ScrollButton 
          $direction="right" 
          onClick={() => scroll('right')}
        >
          →
        </ScrollButton>
      </ScrollContainer>
    </Container>
  );
};

export default DestinationPicker;
