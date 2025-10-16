import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { theme } from '../styles/theme';
import { useLanguage } from '../contexts/LanguageContext';

const RobotContainer = styled.div`
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
  position: relative;
  overflow: hidden;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['4xl']} 0;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing['3xl']} 0;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
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
  margin: 0 auto ${theme.spacing['2xl']};
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.lg};
    padding: 0 ${theme.spacing.md};
  }
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: ${theme.colors.white};
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.full};
  font-weight: ${theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }
`;

const ContentSection = styled.section`
  padding: ${theme.spacing['5xl']} 0;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['4xl']} 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing.md};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0 ${theme.spacing.sm};
  }
`;

const RobotImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.xl};
  margin: 0 auto ${theme.spacing['3xl']};
  display: block;
`;

const ChargerImage = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};
  margin: ${theme.spacing.lg} auto;
  display: block;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing['2xl']};
  margin: ${theme.spacing['3xl']} 0;
  align-items: start;
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`;

const LeftImageSection = styled.div`
  text-align: left;
  
  @media (max-width: ${theme.breakpoints.md}) {
    text-align: center;
  }
`;

const RightImageSection = styled.div`
  text-align: right;
  margin-top: ${theme.spacing['2xl']};
  
  @media (max-width: ${theme.breakpoints.md}) {
    text-align: center;
    margin-top: 0;
  }
`;

const ImageSection = styled.div`
  text-align: center;
`;

const ImageLabel = styled.h4`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.primary};
  margin-top: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.sm};
`;

const ChargingSection = styled.div`
  background: ${theme.colors.gray[100]};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['2xl']};
  margin: ${theme.spacing['3xl']} 0;
  border-left: 4px solid ${theme.colors.accent};
  text-align: center;
  
  @media (max-width: ${theme.breakpoints.md}) {
    margin: ${theme.spacing['2xl']} 0;
    padding: ${theme.spacing.xl};
  }
`;

const ChargingTitle = styled.h3`
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  &::before {
    content: '⚡';
    font-size: ${theme.fontSizes.xl};
  }
`;

const ChargingFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
`;

const ChargingFeature = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.gray[700]};
  
  &::before {
    content: '✓';
    color: ${theme.colors.accent};
    font-weight: ${theme.fontWeights.bold};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${theme.fontSizes['4xl']};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing['2xl']};
  text-align: center;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['3xl']};
  }
`;

const Description = styled.p`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.gray[700]};
  line-height: 1.8;
  margin-bottom: ${theme.spacing['2xl']};
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing['2xl']};
  margin: ${theme.spacing['3xl']} 0;
`;

const FeatureCard = styled(motion.div)`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['2xl']};
  text-align: center;
  box-shadow: ${theme.shadows.md};
  transition: all ${theme.transitions.normal};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
    border-color: ${theme.colors.accent};
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.secondary});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing.lg};
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.white};
`;

const FeatureTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
`;

const FeatureDescription = styled.p`
  color: ${theme.colors.gray[600]};
  line-height: 1.6;
`;

const SpecificationsSection = styled.div`
  background: ${theme.colors.gray[100]};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['3xl']};
  margin: ${theme.spacing['3xl']} 0;
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing['2xl']};
`;

const SpecItem = styled.div`
  text-align: center;
`;

const SpecLabel = styled.div`
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const SpecValue = styled.div`
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSizes.lg};
`;

const BrochureSection = styled.div`
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
  color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['3xl']};
  margin: ${theme.spacing['3xl']} 0;
  text-align: center;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']};
    margin: ${theme.spacing['2xl']} 0;
  }
`;

const BrochureDescription = styled.p`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.gray[200]};
  margin-bottom: ${theme.spacing['2xl']};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled.button`
  background: ${theme.colors.white};
  color: ${theme.colors.primary};
  border: none;
  padding: ${theme.spacing.lg} ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.full};
  font-weight: ${theme.fontWeights.semibold};
  font-size: ${theme.fontSizes.lg};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin: ${theme.spacing['2xl']} auto;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${theme.shadows.xl};
    background: ${theme.colors.gray[100]};
  }
`;

const NovaRobot: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const featuresRef = useRef<HTMLDivElement>(null);
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" });

  const features = [
    {
      icon: '🤖',
      title: t('nova.features.ai.title'),
      description: t('nova.features.ai.description')
    },
    {
      icon: '💬',
      title: t('nova.features.communication.title'),
      description: t('nova.features.communication.description')
    },
    {
      icon: '🎯',
      title: t('nova.features.precision.title'),
      description: t('nova.features.precision.description')
    },
    {
      icon: '⚡',
      title: t('nova.features.efficiency.title'),
      description: t('nova.features.efficiency.description')
    }
  ];

  const specifications = [
    { label: t('nova.specs.height'), value: t('nova.specs.height.value') },
    { label: t('nova.specs.weight'), value: t('nova.specs.weight.value') },
    { label: t('nova.specs.battery'), value: t('nova.specs.battery.value') },
    { label: t('nova.specs.speed'), value: t('nova.specs.speed.value') },
    { label: t('nova.specs.languages'), value: t('nova.specs.languages.value') },
    { label: t('nova.specs.operation'), value: t('nova.specs.operation.value') }
  ];

  return (
    <RobotContainer>
      <HeroSection>
        <Container>
          <HeroContent>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <BackButton onClick={() => navigate('/products/service')}>
                ← {t('common.backToProducts')}
              </BackButton>
              <HeroTitle>{t('nova.title')}</HeroTitle>
              <HeroSubtitle>
                {t('nova.subtitle')}
              </HeroSubtitle>
            </motion.div>
          </HeroContent>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Robot Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <RobotImage 
                src="/images/products/Service/1-NOVA.webp" 
                alt={t('nova.robotImage')}
              />
              <Description>
                {t('nova.description')}
              </Description>
            </motion.div>

            {/* Specifications Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <SpecificationsSection>
                <SectionTitle>{t('nova.specifications.title')}</SectionTitle>
                <SpecsGrid>
                  {specifications.map((spec, index) => (
                    <SpecItem key={index}>
                      <SpecLabel>{spec.label}</SpecLabel>
                      <SpecValue>{spec.value}</SpecValue>
                    </SpecItem>
                  ))}
                </SpecsGrid>
              </SpecificationsSection>
            </motion.div>

            {/* Charger Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <ChargingSection>
                <ChargingTitle>{t('nova.charging.title')}</ChargingTitle>
                <p>{t('nova.charging.description')}</p>
                <ChargerImage 
                  src="/images/Chargers/nova_charger.jpg" 
                  alt={t('nova.chargerImage')} 
                />
                <ImageLabel>{t('nova.chargerImage')}</ImageLabel>
                <ChargingFeatures>
                  <ChargingFeature>{t('nova.charging.features.1')}</ChargingFeature>
                  <ChargingFeature>{t('nova.charging.features.2')}</ChargingFeature>
                  <ChargingFeature>{t('nova.charging.features.3')}</ChargingFeature>
                  <ChargingFeature>{t('nova.charging.features.4')}</ChargingFeature>
                </ChargingFeatures>
              </ChargingSection>
            </motion.div>
          </motion.div>

          <motion.div
            ref={featuresRef}
            initial={{ opacity: 0, y: 50 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <SectionTitle>{t('nova.features.title')}</SectionTitle>
            <FeaturesGrid>
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureCard>
              ))}
            </FeaturesGrid>
          </motion.div>

          {/* Brochure Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <BrochureSection>
              <SectionTitle style={{ color: 'white' }}>{t('nova.brochure.title')}</SectionTitle>
              <BrochureDescription>
                {t('nova.brochure.description')}
              </BrochureDescription>
              <CTAButton onClick={() => window.open('/images/brochures/Nova.pdf', '_blank')}>
                📄 {t('nova.downloadBrochure')}
              </CTAButton>
            </BrochureSection>
          </motion.div>
        </Container>
      </ContentSection>
    </RobotContainer>
  );
};

export default NovaRobot;
