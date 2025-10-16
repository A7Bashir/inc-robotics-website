import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { theme } from '../styles/theme';
import { useLanguage } from '../contexts/LanguageContext';

const ProductsContainer = styled.div`
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
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
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

const HeroTitle = styled.h1`
  font-size: ${theme.fontSizes['6xl']};
  margin-bottom: ${theme.spacing.lg};
  background: linear-gradient(135deg, ${theme.colors.white} 0%, ${theme.colors.accent} 100%);
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
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.lg};
    padding: 0 ${theme.spacing.md};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes.base};
    padding: 0 ${theme.spacing.sm};
  }
`;

const CategoriesSection = styled.section`
  padding: ${theme.spacing['5xl']} 0;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['4xl']} 0;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing['3xl']} 0;
  }
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing['3xl']};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: ${theme.spacing['2xl']};
    padding: 0 ${theme.spacing.md};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
    padding: 0 ${theme.spacing.sm};
  }
`;

const CategoryCard = styled(motion.div)`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${theme.shadows.lg};
  border: 1px solid ${theme.colors.gray[200]};
  transition: all ${theme.transitions.normal};
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${theme.shadows['2xl']};
    border-color: ${theme.colors.accent};
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: contain;
  display: block;
  
  @media (max-width: ${theme.breakpoints.md}) {
    height: 200px;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    height: 180px;
  }
`;

const CategoryContent = styled.div`
  padding: ${theme.spacing['2xl']};
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.lg};
  }
`;

const CategoryTitle = styled.h3`
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
`;

const CategoryDescription = styled.p`
  color: ${theme.colors.gray[600]};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
`;

const CategoryFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: ${theme.spacing.lg};
`;

const CategoryFeature = styled.li`
  color: ${theme.colors.gray[700]};
  padding: ${theme.spacing.xs} 0;
  position: relative;
  padding-left: ${theme.spacing.lg};
  
  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: ${theme.colors.accent};
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
  min-height: 44px;
  width: 100%;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    font-size: ${theme.fontSizes.sm};
  }
`;



const Products: React.FC = () => {
  const navigate = useNavigate();
  const categoriesRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const isCategoriesInView = useInView(categoriesRef, { once: true, margin: "-100px" });

  const categories = [
    {
      title: t('products.serviceRobots.title'),
      description: t('products.serviceRobots.description'),
      image: "/images/products/Service/Service cover.jpg",
      features: [
        t('products.serviceRobots.features.1'),
        t('products.serviceRobots.features.2'),
        t('products.serviceRobots.features.3'),
        t('products.serviceRobots.features.4')
      ],
      route: "/products/service"
    },
    {
      title: t('products.cleaningRobots.title'),
      description: t('products.cleaningRobots.description'),
      image: "/images/products/Cleaning/cleaning cover.jpg",
      features: [
        t('products.cleaningRobots.features.1'),
        t('products.cleaningRobots.features.2'),
        t('products.cleaningRobots.features.3'),
        t('products.cleaningRobots.features.4')
      ],
      route: "/products/cleaning"
    },
    {
      title: t('products.logisticsRobots.title'),
      description: t('products.logisticsRobots.description'),
      image: "/images/products/Logistec/Logistec cover.jpg",
      features: [
        t('products.logisticsRobots.features.1'),
        t('products.logisticsRobots.features.2'),
        t('products.logisticsRobots.features.3'),
        t('products.logisticsRobots.features.4')
      ],
      route: "/products/logistics"
    }
  ];



  return (
    <ProductsContainer>
      <HeroSection>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>{t('products.title')}</HeroTitle>
            <HeroSubtitle>
              {t('products.subtitle')}
            </HeroSubtitle>
          </motion.div>
        </div>
      </HeroSection>

      <CategoriesSection>
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
{t('products.categories')}
          </motion.h2>
          
          <CategoriesGrid ref={categoriesRef}>
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isCategoriesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <CategoryImage src={category.image} alt={category.title} />
                <CategoryContent>
                  <CategoryTitle>{category.title}</CategoryTitle>
                  <CategoryDescription>{category.description}</CategoryDescription>
                  <CategoryFeatures>
                    {category.features.map((feature, featureIndex) => (
                      <CategoryFeature key={featureIndex}>{feature}</CategoryFeature>
                    ))}
                  </CategoryFeatures>
                  <LearnMoreButton onClick={() => navigate(category.route)}>{t('common.learnMore')}</LearnMoreButton>
                </CategoryContent>
              </CategoryCard>
            ))}
          </CategoriesGrid>
        </div>
      </CategoriesSection>
    </ProductsContainer>
  );
};

export default Products;
