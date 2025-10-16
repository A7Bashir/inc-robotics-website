import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { theme } from '../styles/theme';
import { useLanguage } from '../contexts/LanguageContext';

const ServiceContainer = styled.div`
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
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/products/Service/Service cover.jpg');
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
  background: linear-gradient(135deg, ${theme.colors.white} 0%, #93C5FD 100%);
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
    border-color: #3B82F6;
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
    color: #3B82F6;
    font-weight: ${theme.fontWeights.bold};
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

const ServiceRobots: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const productsRef = useRef<HTMLDivElement>(null);
  const isProductsInView = useInView(productsRef, { once: true, margin: "-100px" });

  const serviceProducts = [
    {
      title: t('service.nova.title'),
      description: t('service.nova.description'),
      image: "/images/products/Service/1-NOVA.webp",
      features: [
        t('service.nova.features.display'),
        t('service.nova.features.cpu'),
        t('service.nova.features.microphones'),
        t('service.nova.features.cameras'),
        t('service.nova.features.voiceRange'),
        t('service.nova.features.navigation'),
        t('service.nova.features.battery'),
        t('service.nova.features.operation'),
        t('service.nova.features.languages'),
        t('service.nova.features.capabilities')
      ]
    },
    {
      title: t('service.mini.title'),
      description: t('service.mini.description'),
      image: "/images/products/Service/6-Mini.webp",
      features: [
        t('service.mini.features.display'),
        t('service.mini.features.cpu'),
        t('service.mini.features.microphones'),
        t('service.mini.features.cameras'),
        t('service.mini.features.voiceRange'),
        t('service.mini.features.navigation'),
        t('service.mini.features.battery'),
        t('service.mini.features.operation'),
        t('service.mini.features.languages'),
        t('service.mini.features.capabilities')
      ]
    },
    {
      title: t('service.luckiPro.title'),
      description: t('service.luckiPro.description'),
      image: "/images/products/Service/Pro.webp",
      features: [
        t('service.luckiPro.features.size'),
        t('service.luckiPro.features.display'),
        t('service.luckiPro.features.camera'),
        t('service.luckiPro.features.lighting'),
        t('service.luckiPro.features.loading'),
        t('service.luckiPro.features.cpu'),
        t('service.luckiPro.features.microphones'),
        t('service.luckiPro.features.battery'),
        t('service.luckiPro.features.navigation'),
        t('service.luckiPro.features.voiceRecognition'),
        t('service.luckiPro.features.deployment')
      ]
    },
    {
      title: t('service.luckiPlus.title'),
      description: t('service.luckiPlus.description'),
      image: "/images/products/Service/Plus.webp",
      features: [
        t('service.luckiPlus.features.size'),
        t('service.luckiPlus.features.display'),
        t('service.luckiPlus.features.cpu'),
        t('service.luckiPlus.features.microphones'),
        t('service.luckiPlus.features.operation'),
        t('service.luckiPlus.features.charging'),
        t('service.luckiPlus.features.os'),
        t('service.luckiPlus.features.navigation'),
        t('service.luckiPlus.features.network'),
        t('service.luckiPlus.features.customization'),
        t('service.luckiPlus.features.capabilities')
      ]
    },
    {
      title: t('service.luckiAutodoor.title'),
      description: t('service.luckiAutodoor.description'),
      image: "/images/products/Service/Autodoor.webp",
      features: [
        t('service.luckiAutodoor.features.size'),
        t('service.luckiAutodoor.features.display'),
        t('service.luckiAutodoor.features.door'),
        t('service.luckiAutodoor.features.lock'),
        t('service.luckiAutodoor.features.loading'),
        t('service.luckiAutodoor.features.cpu'),
        t('service.luckiAutodoor.features.microphones'),
        t('service.luckiAutodoor.features.battery'),
        t('service.luckiAutodoor.features.navigation'),
        t('service.luckiAutodoor.features.voiceRecognition'),
        t('service.luckiAutodoor.features.deployment')
      ]
    },
    {
      title: t('service.luckibot.title'),
      description: t('service.luckibot.description'),
      image: "/images/products/Service/5-LuckiBot.webp",
      features: [
        t('service.luckibot.features.display'),
        t('service.luckibot.features.cpu'),
        t('service.luckibot.features.microphones'),
        t('service.luckibot.features.cameras'),
        t('service.luckibot.features.voiceRange'),
        t('service.luckibot.features.navigation'),
        t('service.luckibot.features.loadingSpace'),
        t('service.luckibot.features.trayCapacity'),
        t('service.luckibot.features.battery'),
        t('service.luckibot.features.operation'),
        t('service.luckibot.features.languages'),
        t('service.luckibot.features.capabilities')
      ]
    }
  ];

  const handleBackClick = () => {
    navigate('/products');
  };

  return (
    <ServiceContainer>
      <HeroSection>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>{t('service.title')}</HeroTitle>
            <HeroSubtitle>
              {t('service.subtitle')}
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
            {t('service.solutions.title')}
          </motion.h2>
          
          <ProductsGrid ref={productsRef}>
            {serviceProducts.map((product, index) => (
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
                  {product.title === t('service.nova.title') && (
                    <LearnMoreButton onClick={() => navigate('/robots/nova')}>
                      {t('common.learnMore')}
                    </LearnMoreButton>
                  )}
                  {product.title === t('service.mini.title') && (
                    <LearnMoreButton onClick={() => navigate('/robots/mini')}>
                      {t('common.learnMore')}
                    </LearnMoreButton>
                  )}
                  {product.title === t('service.luckiPro.title') && (
                    <LearnMoreButton onClick={() => navigate('/robots/lucki-pro')}>
                      {t('common.learnMore')}
                    </LearnMoreButton>
                  )}
                  {product.title === t('service.luckiPlus.title') && (
                    <LearnMoreButton onClick={() => navigate('/robots/lucki-plus')}>
                      {t('common.learnMore')}
                    </LearnMoreButton>
                  )}
                  {product.title === t('service.luckiAutodoor.title') && (
                    <LearnMoreButton onClick={() => navigate('/robots/lucki-autodoor')}>
                      {t('common.learnMore')}
                    </LearnMoreButton>
                  )}
                  {product.title === t('service.luckibot.title') && (
                    <LearnMoreButton onClick={() => navigate('/robots/luckibot')}>
                      {t('common.learnMore')}
                    </LearnMoreButton>
                  )}
                </ProductContent>
              </ProductCard>
            ))}
          </ProductsGrid>
        </div>
      </ProductsSection>
    </ServiceContainer>
  );
};

export default ServiceRobots;
