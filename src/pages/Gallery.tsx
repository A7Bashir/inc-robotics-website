import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';
import { useLanguage } from '../contexts/LanguageContext';
import { API_ENDPOINTS } from '../config/api';

const GalleryContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.white};
  padding-top: 80px;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding-top: 70px;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding-top: 60px;
  }
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.black} 100%);
  color: ${theme.colors.white};
  padding: ${theme.spacing['5xl']} 0;
  text-align: center;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['4xl']} 0;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing['3xl']} 0;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, ${theme.fontSizes['7xl']});
  font-weight: ${theme.fontWeights.black};
  margin-bottom: ${theme.spacing.lg};
  background: linear-gradient(135deg, ${theme.colors.white} 0%, ${theme.colors.accent} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.gray[300]};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ContentSection = styled.section`
  padding: ${theme.spacing['5xl']} 0;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: ${theme.spacing.lg};
  padding-right: ${theme.spacing.lg};
`;

const FilterSection = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['3xl']};
`;

const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
  margin-bottom: ${theme.spacing['2xl']};
`;

const FilterButton = styled.button<{ $active: boolean }>`
  background: ${props => props.$active ? theme.colors.accent : theme.colors.gray[200]};
  color: ${props => props.$active ? theme.colors.white : theme.colors.gray[700]};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.full};
  font-weight: ${theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    background: ${props => props.$active ? theme.colors.secondary : theme.colors.gray[300]};
    transform: translateY(-2px);
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['4xl']};
`;

const GalleryItem = styled(motion.div)`
  position: relative;
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  cursor: pointer;
  box-shadow: ${theme.shadows.md};
  transition: box-shadow ${theme.transitions.normal};
  background: ${theme.colors.gray[100]};
  
  &:hover {
    box-shadow: ${theme.shadows.xl};
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: contain;
  object-position: center;
  background: ${theme.colors.gray[100]};
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 250px;
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes['2xl']};
  text-align: center;
  padding: ${theme.spacing.lg};
`;

const PlaceholderText = styled.div`
  font-size: ${theme.fontSizes.sm};
  margin-top: ${theme.spacing.sm};
  opacity: 0.8;
`;

const GalleryOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
  color: ${theme.colors.white};
  padding: ${theme.spacing.lg};
  transform: translateY(0);
  transition: background ${theme.transitions.normal};
  
  ${GalleryItem}:hover & {
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.95));
  }
`;

const GalleryTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.bold};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.white};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
`;

const GalleryDescription = styled.p`
  font-size: ${theme.fontSizes.sm};
  opacity: 0.95;
  line-height: 1.5;
  color: ${theme.colors.white};
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${theme.spacing.lg};
`;

const ModalContent = styled(motion.div)`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
`;

const ModalImage = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: contain;
  object-position: center;
  background: ${theme.colors.gray[100]};
`;

const ModalBody = styled.div`
  padding: ${theme.spacing['2xl']};
`;

const ModalTitle = styled.h2`
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
  font-weight: ${theme.fontWeights.bold};
`;

const ModalDescription = styled.p`
  color: ${theme.colors.gray[600]};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
`;

const ModalClose = styled.button`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: ${theme.colors.gray[700]};
  color: ${theme.colors.white};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.full};
  cursor: pointer;
  font-size: ${theme.fontSizes.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${theme.colors.gray[800]};
  }
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(135deg, ${theme.colors.accent} 0%, ${theme.colors.secondary} 100%);
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing.lg} ${theme.spacing['2xl']};
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.bold};
  border-radius: ${theme.borderRadius.full};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  display: block;
  margin: 0 auto;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;



const Gallery: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const categories = [
    { id: 'all', label: t('gallery.all') },
    { id: 'service', label: t('gallery.serviceFilter') },
    { id: 'cleaning', label: t('gallery.cleaningFilter') },
    { id: 'logistics', label: t('gallery.logisticsFilter') }
  ];

  const galleryItems = [
    // Service Robots
    {
      id: 1,
      title: t('gallery.item1.title'),
      description: t('gallery.item1.description'),
      category: "service",
      image: `/images/gallery/service/${encodeURIComponent("autodoor on an event.png")}`
    },
    {
      id: 2,
      title: t('gallery.item2.title'),
      description: t('gallery.item2.description'),
      category: "service",
      image: `/images/gallery/service/${encodeURIComponent("lucki iena welcomming.png")}`
    },
    {
      id: 3,
      title: t('gallery.item3.title'),
      description: t('gallery.item3.description'),
      category: "service",
      image: `/images/gallery/service/${encodeURIComponent("luckipro vvip loung.png")}`
    },
    {
      id: 4,
      title: t('gallery.item4.title'),
      description: t('gallery.item4.description'),
      category: "service",
      image: `/images/gallery/service/${encodeURIComponent("mini aljouf.jpg")}`
    },
    {
      id: 5,
      title: t('gallery.item5.title'),
      description: t('gallery.item5.description'),
      category: "service",
      image: `/images/gallery/service/${encodeURIComponent("nova at helton.jpg")}`
    },
    // Cleaning Robots
    {
      id: 6,
      title: t('gallery.item6.title'),
      description: t('gallery.item6.description'),
      category: "cleaning",
      image: `/images/gallery/cleaning/${encodeURIComponent("phantas amc.png")}`
    },
    {
      id: 7,
      title: t('gallery.item7.title'),
      description: t('gallery.item7.description'),
      category: "cleaning",
      image: `/images/gallery/cleaning/${encodeURIComponent("50 alfanar.jpg")}`
    },
    {
      id: 8,
      title: t('gallery.item8.title'),
      description: t('gallery.item8.description'),
      category: "cleaning",
      image: `/images/gallery/cleaning/${encodeURIComponent("50 sab.jpg")}`
    },
    {
      id: 9,
      title: t('gallery.item9.title'),
      description: t('gallery.item9.description'),
      category: "cleaning",
      image: `/images/gallery/cleaning/${encodeURIComponent("50.jpg")}`
    },
    {
      id: 10,
      title: t('gallery.item10.title'),
      description: t('gallery.item10.description'),
      category: "cleaning",
      image: `/images/gallery/cleaning/${encodeURIComponent("75 roshen.jpg")}`
    },
    {
      id: 11,
      title: t('gallery.item11.title'),
      description: t('gallery.item11.description'),
      category: "cleaning",
      image: `/images/gallery/cleaning/${encodeURIComponent("75 wearhouse.jpg")}`
    },
    // Logistics Robots
    {
      id: 12,
      title: t('gallery.item12.title'),
      description: t('gallery.item12.description'),
      category: "logistics",
      image: `/images/gallery/logistecs/${encodeURIComponent("emma.png")}`
    },
    {
      id: 13,
      title: t('gallery.item13.title'),
      description: t('gallery.item13.description'),
      category: "logistics",
      image: `/images/gallery/logistecs/${encodeURIComponent("carry.png")}`
    },
    {
      id: 14,
      title: t('gallery.item14.title'),
      description: t('gallery.item14.description'),
      category: "logistics",
      image: `/images/gallery/logistecs/${encodeURIComponent("fola.png")}`
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const handleImageError = (itemId: number) => {
    setFailedImages(prev => new Set(prev).add(itemId));
  };

  const openTourModal = () => {
    // Go directly to WhatsApp
    const phoneNumber = '+966112225696';
    const message = encodeURIComponent('Hello! I would like to request a gallery tour for INC Robotics. Please provide me with more information.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };


  const openModal = (item: any) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <GalleryContainer>
      <HeroSection>
        <HeroTitle
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t('gallery.title')}
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t('gallery.description')}
        </HeroSubtitle>
      </HeroSection>

      <ContentSection>
        <FilterSection>
          <FilterButtons>
            {categories.map((category) => (
              <FilterButton
                key={category.id}
                $active={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </FilterButton>
            ))}
          </FilterButtons>
        </FilterSection>

        <GalleryGrid>
          {filteredItems.map((item, index) => (
            <GalleryItem
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              onClick={() => openModal(item)}
            >
              {failedImages.has(item.id) ? (
                <PlaceholderImage>
                  <div>🤖</div>
                  <PlaceholderText>Image format not supported<br/>Please convert HEIC to JPG/PNG</PlaceholderText>
                </PlaceholderImage>
              ) : (
                <GalleryImage
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  onError={() => handleImageError(item.id)}
                  onLoad={() => {
                    console.log('Successfully loaded image:', item.image);
                  }}
                />
              )}
              <GalleryOverlay>
                <GalleryTitle>{item.title}</GalleryTitle>
                <GalleryDescription>{item.description}</GalleryDescription>
              </GalleryOverlay>
            </GalleryItem>
          ))}
        </GalleryGrid>

        <CTAButton
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={openTourModal}
        >
          {t('gallery.requestTour')}
        </CTAButton>
      </ContentSection>

      <AnimatePresence>
        {selectedItem && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalClose onClick={closeModal}>×</ModalClose>
              <ModalImage
                src={selectedItem.image}
                alt={selectedItem.title}
              />
              <ModalBody>
                <ModalTitle>{selectedItem.title}</ModalTitle>
                <ModalDescription>{selectedItem.description}</ModalDescription>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>

    </GalleryContainer>
  );
};

export default Gallery;
