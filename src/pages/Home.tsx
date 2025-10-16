import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { theme } from '../styles/theme';
import HeroRobotImage from '../components/HeroRobotImage';
import ClientsMarquee from '../components/ClientsMarquee';
import { useLanguage } from '../contexts/LanguageContext';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.black} 100%);
  overflow-x: hidden;
  position: relative;
`;

const HeroSection = styled.section`
  min-height: auto;
  position: relative;
  padding-top: 0;
`;

const HeroImageWrapper = styled.div`
  width: 100vw;
  margin: 0 calc(50% - 50vw);
`;

const HeroContent = styled.div`
  text-align: center;
  color: ${theme.colors.white};
  z-index: 2;
  max-width: 1000px;
  padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  margin: 0 auto;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl} ${theme.spacing.md};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.lg} ${theme.spacing.sm};
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, ${theme.fontSizes['8xl']});
  font-weight: ${theme.fontWeights.black};
  margin-bottom: ${theme.spacing.lg};
  background: linear-gradient(135deg, ${theme.colors.white} 0%, ${theme.colors.accent} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.gray[300]};
  margin-bottom: ${theme.spacing['2xl']};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.lg};
    margin-bottom: ${theme.spacing.xl};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes.base};
    margin-bottom: ${theme.spacing.lg};
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
  min-height: 48px;
  min-width: 200px;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md} ${theme.spacing.xl};
    font-size: ${theme.fontSizes.base};
    min-width: 180px;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    font-size: ${theme.fontSizes.sm};
    min-width: 160px;
    width: 100%;
    max-width: 300px;
  }
`;


const HeroLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
`;

const AnimatedBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;


const GridPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.3;
`;

const FeaturesSection = styled.section`
  padding: ${theme.spacing['5xl']} 0;
  background: ${theme.colors.white};
  position: relative;
  overflow: hidden;
`;


const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing['2xl']};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: ${theme.spacing.xl};
    padding: 0 ${theme.spacing.md};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
    padding: 0 ${theme.spacing.sm};
  }
`;

const FeatureCard = styled(motion.div)`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.lg};
  overflow: hidden;
  border: 1px solid ${theme.colors.gray[200]};
  transition: all ${theme.transitions.normal};
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows['2xl']};
  }
`;

const FeatureIcon = styled.div`
  height: 200px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.primary};
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transform: scale(0.9);
    z-index: 1;
  }
`;

const FeatureImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  text-align: center;
  padding: ${theme.spacing.lg};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
`;

const FeatureContent = styled.div`
  padding: ${theme.spacing['2xl']};
`;

const FeatureDescription = styled.p`
  color: ${theme.colors.gray[600]};
  line-height: 1.6;
`;


const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const navigate = useNavigate();

  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" });

  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgOpacity = useTransform(heroProgress, [0, 0.6, 1], [1, 0.3, 0]);

  const featureImages = [
    '/images/home/integration.jpg',
    '/images/home/performance.jpg', 
    '/images/home/custom.jpg',
    '/images/home/support.jpg'
  ];


  return (
    <HomeContainer ref={containerRef}>
      <HeroSection ref={heroRef}>
        <AnimatedBackground style={{ opacity: bgOpacity }}>
          <GridPattern />
        </AnimatedBackground>

        <HeroImageWrapper>
          <HeroRobotImage />
        </HeroImageWrapper>

        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('home.hero.title')}
          </HeroTitle>

          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {t('home.hero.subtitle')}
          </HeroSubtitle>

          <CTAButton
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/solutions')}
            style={{ 
              position: 'relative', 
              zIndex: 10
            }}
          >
            {t('home.hero.cta')}
          </CTAButton>

          <HeroLogo>
            <motion.img 
              src="/images/Robotics-logo-white-2.webp" 
              alt="Robotics Logo" 
              style={{ width: '200px', height: 'auto' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            />
          </HeroLogo>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('home.features.title')}
          </motion.h2>

          <FeaturesGrid ref={featuresRef}>
            {[0, 1, 2, 3].map((index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <FeatureIcon>
                  <img src={featureImages[index]} alt={t(`home.features.items.${index}.title`)} />
                  <FeatureImageOverlay>
                    {t(`home.features.items.${index}.title`)}
                  </FeatureImageOverlay>
                </FeatureIcon>
                <FeatureContent>
                  <FeatureDescription>{t(`home.features.items.${index}.description`)}</FeatureDescription>
                </FeatureContent>
              </FeatureCard>
            ))}
          </FeaturesGrid>




          {/* Clients Section */}
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ marginTop: '48px' }}
          >
            {t('home.clients.title')}
          </motion.h2>
          
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{ textAlign: 'center', marginBottom: '24px' }}
          >
            {t('home.clients.subtitle')}
          </motion.p>

          <div style={{ marginTop: '16px', marginBottom: '48px' }}>
                          <ClientsMarquee
                logos={[
                  '/images/clients/aramco.jpg',
                  '/images/clients/ksu.png',
                  '/images/clients/sab.png',
                  '/images/clients/ey.jpg',
                  '/images/clients/kafd.png',
                  '/images/clients/hrda.png',
                  '/images/clients/arasco.jpg',
                  '/images/clients/aljouf uni.jpg',
                  '/images/clients/jouf.png',
                  '/images/clients/naver.png',
                  '/images/clients/proven_robotics_logo.jpg',
                  '/images/clients/sedaq.jpg',
                  '/images/clients/alymama.png',
                  '/images/clients/crystal.svg',
                  '/images/clients/acadimy.png',
                  '/images/clients/sec.png',
                  '/images/clients/mefsco_logo.jpg',
                  '/images/clients/efsm.jpg',
                  '/images/clients/fmtech.png',
                  '/images/clients/rawabet.png',
                  '/images/clients/ha medecal.png'
                ]}
              />
          </div>
        </div>
      </FeaturesSection>
    </HomeContainer>
  );
};

export default Home;
