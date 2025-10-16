import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { theme } from '../styles/theme';
import { useLanguage } from '../contexts/LanguageContext';

const CleaningContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.white};
  padding-top: 100px;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding-top: 80px;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding-top: 70px;
  }
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/products/Cleaning/cleaning cover.jpg');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  color: ${theme.colors.white};
  padding: ${theme.spacing['5xl']} 0;
  text-align: center;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['4xl']} 0;
    background-attachment: scroll;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing['3xl']} 0;
    background-size: cover;
  }
`;

const HeroTitle = styled.h1`
  font-size: ${theme.fontSizes['6xl']};
  margin-bottom: ${theme.spacing.lg};
  background: linear-gradient(135deg, ${theme.colors.white} 0%, #A7F3D0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['4xl']};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.gray[200]};
  max-width: 600px;
  margin: 0 auto;
`;

const ProductsSection = styled.section`
  padding: ${theme.spacing['5xl']} 0;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing['3xl']};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
`;

const ProductCard = styled(motion.div)`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${theme.shadows.lg};
  border: 1px solid ${theme.colors.gray[200]};
  transition: all ${theme.transitions.normal};
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${theme.shadows['2xl']};
    border-color: #10B981;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
  display: block;
`;

const ProductContent = styled.div`
  padding: ${theme.spacing['2xl']};
`;

const ProductTitle = styled.h3`
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
`;

const ProductDescription = styled.p`
  color: ${theme.colors.gray[600]};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
`;

const ProductFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: ${theme.spacing.lg};
`;

const ProductFeature = styled.li`
  color: ${theme.colors.gray[700]};
  padding: ${theme.spacing.xs} 0;
  position: relative;
  padding-left: ${theme.spacing.lg};
  
  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #10B981;
    font-weight: ${theme.fontWeights.bold};
  }
`;

const BackButton = styled.button`
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.full};
  font-weight: ${theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  margin-bottom: ${theme.spacing['2xl']};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const LearnMoreButton = styled.button`
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.full};
  font-weight: ${theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  width: 100%;
  margin-top: ${theme.spacing.lg};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const CleaningRobots: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const productsRef = useRef<HTMLDivElement>(null);
  const isProductsInView = useInView(productsRef, { once: true, margin: "-100px" });

  const cleaningProducts = [
    {
      title: t('cleaning.beetle.title'),
      description: t('cleaning.beetle.description'),
      image: "/images/products/Cleaning/beetle.png",
      features: [
        t('cleaning.beetle.features.size'),
        t('cleaning.beetle.features.weight'),
        t('cleaning.beetle.features.cleaningWidth'),
        t('cleaning.beetle.features.efficiency'),
        t('cleaning.beetle.features.airFlow'),
        t('cleaning.beetle.features.trashBin'),
        t('cleaning.beetle.features.edgeCleaning'),
        t('cleaning.beetle.features.gradeability'),
        t('cleaning.beetle.features.maneuverability'),
        t('cleaning.beetle.features.maxSpeed'),
        t('cleaning.beetle.features.battery'),
        t('cleaning.beetle.features.runtime'),
        t('cleaning.beetle.features.charging'),
        t('cleaning.beetle.features.sensors')
      ]
    },
    {
      title: t('cleaning.omnie.title'),
      description: t('cleaning.omnie.description'),
      image: "/images/products/Cleaning/omnie.png",
      features: [
        t('cleaning.omnie.features.size'),
        t('cleaning.omnie.features.cleaningModes'),
        t('cleaning.omnie.features.cleaningWidth'),
        t('cleaning.omnie.features.efficiency'),
        t('cleaning.omnie.features.runtime'),
        t('cleaning.omnie.features.charging'),
        t('cleaning.omnie.features.waterTanks'),
        t('cleaning.omnie.features.gradeability'),
        t('cleaning.omnie.features.maneuverability'),
        t('cleaning.omnie.features.uTurn'),
        t('cleaning.omnie.features.maxSpeed'),
        t('cleaning.omnie.features.sensors'),
        t('cleaning.omnie.features.safety')
      ]
    },
    {
      title: t('cleaning.scrubber75.title'),
      description: t('cleaning.scrubber75.description'),
      image: "/images/products/Cleaning/75.webp",
      features: [
        t('cleaning.scrubber75.features.size'),
        t('cleaning.scrubber75.features.cleaningWidth'),
        t('cleaning.scrubber75.features.brushPressure'),
        t('cleaning.scrubber75.features.efficiency'),
        t('cleaning.scrubber75.features.runtime'),
        t('cleaning.scrubber75.features.waterTanks'),
        t('cleaning.scrubber75.features.navigation'),
        t('cleaning.scrubber75.features.sensors'),
        t('cleaning.scrubber75.features.slopes')
      ]
    },
    {
      title: t('cleaning.scrubber50pro.title'),
      description: t('cleaning.scrubber50pro.description'),
      image: "/images/products/Cleaning/50 Pro.webp",
      features: [
        t('cleaning.scrubber50pro.features.size'),
        t('cleaning.scrubber50pro.features.brushPressure'),
        t('cleaning.scrubber50pro.features.efficiency'),
        t('cleaning.scrubber50pro.features.runtime'),
        t('cleaning.scrubber50pro.features.waterTanks'),
        t('cleaning.scrubber50pro.features.navigation'),
        t('cleaning.scrubber50pro.features.sensors'),
        t('cleaning.scrubber50pro.features.inclines')
      ]
    },
    {
      title: t('cleaning.phantas.title'),
      description: t('cleaning.phantas.description'),
      image: "/images/products/Cleaning/Phantas.webp",
      features: [
        t('cleaning.phantas.features.size'),
        t('cleaning.phantas.features.cleaningModes'),
        t('cleaning.phantas.features.efficiency'),
        t('cleaning.phantas.features.battery'),
        t('cleaning.phantas.features.waterTanks'),
        t('cleaning.phantas.features.dustBag'),
        t('cleaning.phantas.features.sensors'),
        t('cleaning.phantas.features.navigation')
      ]
    },
    {
      title: t('cleaning.vacum40.title'),
      description: t('cleaning.vacum40.description'),
      image: "/images/products/Cleaning/Vacum 40.webp",
      features: [
        t('cleaning.vacum40.features.size'),
        t('cleaning.vacum40.features.cleaningWidth'),
        t('cleaning.vacum40.features.efficiency'),
        t('cleaning.vacum40.features.runtime'),
        t('cleaning.vacum40.features.charging'),
        t('cleaning.vacum40.features.trashTray'),
        t('cleaning.vacum40.features.navigation'),
        t('cleaning.vacum40.features.sensors'),
        t('cleaning.vacum40.features.diffuser')
      ]
    }
  ];

  const handleBackClick = () => {
    navigate('/products');
  };

  return (
    <CleaningContainer>
      <HeroSection>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>{t('cleaning.title')}</HeroTitle>
            <HeroSubtitle>
              {t('cleaning.subtitle')}
            </HeroSubtitle>
          </motion.div>
        </div>
      </HeroSection>

      <ProductsSection>
        <div className="container">
          <BackButton onClick={handleBackClick}>
            ← {t('common.backToProducts')}
          </BackButton>
          
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('cleaning.solutions.title')}
          </motion.h2>
          
          <ProductsGrid ref={productsRef}>
            {cleaningProducts.map((product, index) => (
              <ProductCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isProductsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <ProductImage src={product.image} alt={product.title} />
                <ProductContent>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductFeatures>
                    {product.features.map((feature, featureIndex) => (
                      <ProductFeature key={featureIndex}>{feature}</ProductFeature>
                    ))}
                  </ProductFeatures>
                  {product.title === t('cleaning.beetle.title') && (
                    <LearnMoreButton onClick={() => navigate('/robots/beetle')}>
                      {t('common.learnMore')}
                    </LearnMoreButton>
                  )}
                  {product.title === t('cleaning.omnie.title') && (
                    <LearnMoreButton onClick={() => navigate('/robots/omnie')}>
                      {t('common.learnMore')}
                    </LearnMoreButton>
                  )}
                  {product.title === t('cleaning.scrubber75.title') && (
                    <LearnMoreButton onClick={() => navigate('/robots/scrubber-75')}>
                      {t('common.learnMore')}
                    </LearnMoreButton>
                  )}
                  {product.title === t('cleaning.scrubber50pro.title') && (
                    <LearnMoreButton onClick={() => navigate('/robots/scrubber-50-pro')}>
                      {t('common.learnMore')}
                    </LearnMoreButton>
                  )}
                  {product.title === t('cleaning.phantas.title') && (
                    <LearnMoreButton onClick={() => navigate('/robots/phantas')}>
                      {t('common.learnMore')}
                    </LearnMoreButton>
                  )}
                  {product.title === t('cleaning.vacum40.title') && (
                    <LearnMoreButton onClick={() => navigate('/robots/vacum-40')}>
                      {t('common.learnMore')}
                    </LearnMoreButton>
                  )}
                </ProductContent>
              </ProductCard>
            ))}
          </ProductsGrid>
        </div>
      </ProductsSection>
    </CleaningContainer>
  );
};

export default CleaningRobots;
