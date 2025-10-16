import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { useLanguage } from '../contexts/LanguageContext';

const CaseStudiesContainer = styled.div`
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

const SectionTitle = styled(motion.h2)`
  font-size: ${theme.fontSizes['4xl']};
  color: ${theme.colors.primary};
  text-align: center;
  margin-bottom: ${theme.spacing['3xl']};
  font-weight: ${theme.fontWeights.bold};
`;

const CaseStudiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing['2xl']};
  margin-bottom: ${theme.spacing['4xl']};
`;

const CaseStudyCard = styled(motion.div)`
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

const CaseStudyImageContainer = styled.div`
  height: 200px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.primary}; /* Fallback color */
`;

const CaseStudyBackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

const CaseStudyImageOverlay = styled.div`
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

const CaseStudyContent = styled.div`
  padding: ${theme.spacing['2xl']};
`;

const CaseStudyTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
  font-weight: ${theme.fontWeights.bold};
`;

const CaseStudyDescription = styled.p`
  color: ${theme.colors.gray[600]};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
`;

const CaseStudyStats = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.gray[200]};
`;

const Stat = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.accent};
`;

const StatLabel = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.gray[500]};
  text-transform: uppercase;
  letter-spacing: 0.5px;
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

const CaseStudies: React.FC = () => {
  const { t } = useLanguage();
  
  const caseStudies = [
    {
      id: 1,
      title: t('caseStudies.study1.title'),
      description: t('caseStudies.study1.description'),
      displayText: t('caseStudies.study1.displayText'),
      backgroundImage: process.env.PUBLIC_URL + '/images/case studies/events.jpg'
    },
    {
      id: 2,
      title: t('caseStudies.study2.title'),
      description: t('caseStudies.study2.description'),
      displayText: t('caseStudies.study2.displayText'),
      backgroundImage: process.env.PUBLIC_URL + '/images/case studies/cleaning.jpg'
    },
    {
      id: 3,
      title: t('caseStudies.study3.title'),
      description: t('caseStudies.study3.description'),
      displayText: t('caseStudies.study3.displayText'),
      backgroundImage: process.env.PUBLIC_URL + '/images/case studies/logistic.jpg'
    },
    {
      id: 4,
      title: t('caseStudies.study4.title'),
      description: t('caseStudies.study4.description'),
      displayText: t('caseStudies.study4.displayText'),
      backgroundImage: process.env.PUBLIC_URL + '/images/case studies/fm.jpg'
    },
    {
      id: 5,
      title: t('caseStudies.study5.title'),
      description: t('caseStudies.study5.description'),
      displayText: t('caseStudies.study5.displayText'),
      backgroundImage: process.env.PUBLIC_URL + '/images/case studies/consultaion.jpg'
    }
  ];

  return (
    <CaseStudiesContainer>
      <HeroSection>
        <HeroTitle
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t('caseStudies.title')}
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t('caseStudies.description')}
        </HeroSubtitle>
      </HeroSection>

      <ContentSection>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
{t('caseStudies.successStories')}
        </SectionTitle>

        <CaseStudiesGrid>
          {caseStudies.map((study, index) => (
            <CaseStudyCard
              key={study.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
            >
              <CaseStudyImageContainer>
                <CaseStudyBackgroundImage 
                  src={study.backgroundImage}
                  alt={study.title}
                />
                <CaseStudyImageOverlay>
                  {study.displayText}
                </CaseStudyImageOverlay>
              </CaseStudyImageContainer>
              <CaseStudyContent>
                <CaseStudyTitle>{study.title}</CaseStudyTitle>
                <CaseStudyDescription>{study.description}</CaseStudyDescription>
              </CaseStudyContent>
            </CaseStudyCard>
          ))}
        </CaseStudiesGrid>

        <CTAButton
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            const phoneNumber = '+966112225696'; // Remove spaces for WhatsApp URL
            const message = encodeURIComponent('Hello! I\'d like to start my success story with your robotics solutions.');
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
          }}
        >
{t('caseStudies.startStory')}
        </CTAButton>
      </ContentSection>
    </CaseStudiesContainer>
  );
};

export default CaseStudies;
