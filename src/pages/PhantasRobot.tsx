import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
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

const SectionTitle = styled.h2`
  font-size: ${theme.fontSizes['4xl']};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing['2xl']};
  text-align: center;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['3xl']};
  }
`;

const WorkStationSection = styled.div`
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

const WorkStationTitle = styled.h3`
  font-size: ${theme.fontSizes['2xl']};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  &::before {
    content: '🏭';
    font-size: ${theme.fontSizes.xl};
  }
`;

const WorkStationFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
`;

const WorkStationFeature = styled.div`
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
  box-shadow: ${theme.shadows.md};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const PhantasRobot: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const featuresRef = useRef<HTMLDivElement>(null);
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" });

  const specifications = [
    { label: 'Size', value: '70×50×45 cm' },
    { label: 'Weight', value: '65 kg' },
    { label: 'Cleaning Width', value: '40 cm' },
    { label: 'Water Tank Capacity', value: '60 L' },
    { label: 'Detergent Tank', value: '4 L' },
    { label: 'Battery Capacity', value: '30 Ah' },
    { label: 'Runtime', value: '3-4 hours' },
    { label: 'Max Speed', value: '1.2 m/s' },
    { label: 'Cleaning Modes', value: 'Vacuum & Mopping' },
    { label: 'Navigation', value: 'Advanced AI navigation' },
    { label: 'Gradeability', value: '6° slope handling' },
    { label: 'Maneuverability', value: '100 cm minimum U-turn width' }
  ];

  const features = [
    {
      icon: '🏠',
      title: 'Compact Design',
      description: 'Compact autonomous cleaning robot designed for small to medium-sized spaces with versatile cleaning capabilities.'
    },
    {
      icon: '🧭',
      title: 'Advanced Navigation',
      description: 'Advanced navigation system for efficient cleaning patterns and obstacle avoidance in complex environments.'
    },
    {
      icon: '🧽',
      title: 'Versatile Cleaning',
      description: 'Combines vacuuming and mopping capabilities for comprehensive floor cleaning solutions.'
    },
    {
      icon: '⚡',
      title: 'Efficient Operation',
      description: 'Optimized for 3-4 hours of continuous operation with efficient battery management.'
    }
  ];

  const workStationFeatures = [
    'Dedicated charging and maintenance station',
    'Automatic battery charging system',
    'Water and detergent refill capabilities',
    'Maintenance and cleaning tools storage',
    'Status monitoring and diagnostics',
    'Easy access for service personnel'
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
              <BackButton onClick={() => navigate('/products/cleaning')}>
                ← {t('common.backToProducts')}
              </BackButton>
              <HeroTitle>Phantas</HeroTitle>
              <HeroSubtitle>
                Compact autonomous cleaning robot designed for small to medium-sized spaces, offering versatile cleaning capabilities with advanced navigation.
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
                src="/images/products/Cleaning/Phantas.webp" 
                alt="Phantas Cleaning Robot"
              />
              <Description>
                The Phantas is a compact autonomous cleaning robot designed for small to medium-sized spaces. 
                With versatile cleaning capabilities and advanced navigation, it delivers efficient cleaning 
                performance for various commercial environments.
              </Description>
            </motion.div>

            {/* Specifications Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <SpecificationsSection>
                <SectionTitle>Technical Specifications</SectionTitle>
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

            {/* Work Station Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <WorkStationSection>
                <WorkStationTitle>Work Station</WorkStationTitle>
                <p>Dedicated work station for charging, maintenance, and service operations.</p>
                <img 
                  src="/images/Chargers/Phantas.png" 
                  alt="Phantas Charging Dock"
                  style={{ 
                    width: '100%', 
                    maxWidth: '400px', 
                    height: 'auto', 
                    borderRadius: '12px',
                    margin: '20px auto',
                    display: 'block',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }}
                />
                <WorkStationFeatures>
                  {workStationFeatures.map((feature, index) => (
                    <WorkStationFeature key={index}>
                      {feature}
                    </WorkStationFeature>
                  ))}
                </WorkStationFeatures>
                <div style={{ marginTop: '20px' }}>
                  <button 
                    onClick={() => window.open('/images/workstation/Brochure_WS-03-S-Phantas-Workstation_250318.pdf', '_blank')}
                    style={{
                      background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '25px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                      marginRight: '10px'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
                    }}
                  >
                    📄 Work Station Brochure
                  </button>
                  <button 
                    onClick={() => window.open('/images/workstation/CD-04-Charging-Dock-for-Phantas.pdf', '_blank')}
                    style={{
                      background: 'linear-gradient(135deg, #10B981, #059669)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '25px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                      marginRight: '10px'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
                    }}
                  >
                    🔌 Charging Dock Brochure
                  </button>
                  <button 
                    onClick={() => window.open('/images/workstation/Brochure-Mobile-Water-Tank-240815.pdf', '_blank')}
                    style={{
                      background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '25px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';
                    }}
                  >
                    💧 Mobile Water Tank Brochure
                  </button>
                </div>
              </WorkStationSection>
            </motion.div>

            {/* Features Section */}
            <motion.div
              ref={featuresRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <SectionTitle>Key Features</SectionTitle>
              <FeaturesGrid>
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <FeatureCard>
                      <FeatureIcon>{feature.icon}</FeatureIcon>
                      <FeatureTitle>{feature.title}</FeatureTitle>
                      <FeatureDescription>{feature.description}</FeatureDescription>
                    </FeatureCard>
                  </motion.div>
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
                <SectionTitle style={{ color: 'white' }}>Download Brochure</SectionTitle>
                <BrochureDescription>
                  Get detailed technical specifications, features, and performance data for the Phantas cleaning robot.
                </BrochureDescription>
                <CTAButton onClick={() => window.open('/images/brochures/Phantas.pdf', '_blank')}>
                  📄 Download Phantas Brochure
                </CTAButton>
              </BrochureSection>
            </motion.div>
          </motion.div>
        </Container>
      </ContentSection>
    </RobotContainer>
  );
};

export default PhantasRobot;
