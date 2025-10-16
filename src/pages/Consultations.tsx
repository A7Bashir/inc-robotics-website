import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { theme } from '../styles/theme';
import { useLanguage } from '../contexts/LanguageContext';

const ConsultationsContainer = styled.div`
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

const ServicesSection = styled.section`
  padding: ${theme.spacing['5xl']} 0;
  background: ${theme.colors.gray[100]};
`;

const ServicesGrid = styled.div`
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

const ServiceCard = styled(motion.div)`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.lg};
  overflow: hidden;
  border: 1px solid ${theme.colors.gray[200]};
  transition: all ${theme.transitions.normal};
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows['2xl']};
    border-color: ${theme.colors.accent};
  }
`;

const ServiceHeader = styled.div`
  height: 200px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.primary};
`;

const ServiceBackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

const ServiceImageOverlay = styled.div`
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

const ServiceTitle = styled.h3`
  font-size: ${theme.fontSizes['2xl']};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.white};
  font-weight: ${theme.fontWeights.bold};
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
`;

const ServiceContent = styled.div`
  padding: ${theme.spacing['2xl']};
`;

const ServiceDescription = styled.p`
  color: ${theme.colors.gray[600]};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: ${theme.spacing.lg};
`;

const ServiceFeature = styled.li`
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

const ContactButton = styled.a`
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
  text-decoration: none;
  display: inline-block;
  text-align: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
    color: ${theme.colors.white};
  }
`;


const Consultations: React.FC = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const isServicesInView = useInView(servicesRef, { once: true, margin: "-100px" });

  const services = [
    {
      title: t('cybersecurity.services.governance.title'),
      description: t('cybersecurity.services.governance.description'),
      image: '/images/products/Consultations/Security Governance & Policy.jpg',
      features: [
        t('cybersecurity.services.governance.features.1'),
        t('cybersecurity.services.governance.features.2'),
        t('cybersecurity.services.governance.features.3'),
        t('cybersecurity.services.governance.features.4'),
        t('cybersecurity.services.governance.features.5')
      ]
    },
    {
      title: t('cybersecurity.services.asset.title'),
      description: t('cybersecurity.services.asset.description'),
      image: '/images/products/Consultations/Asset & Vulnerability Management.jpg',
      features: [
        t('cybersecurity.services.asset.features.1'),
        t('cybersecurity.services.asset.features.2'),
        t('cybersecurity.services.asset.features.3'),
        t('cybersecurity.services.asset.features.4'),
        t('cybersecurity.services.asset.features.5')
      ]
    },
    {
      title: t('cybersecurity.services.training.title'),
      description: t('cybersecurity.services.training.description'),
      image: '/images/products/Consultations/Security Awareness & Training.png',
      features: [
        t('cybersecurity.services.training.features.1'),
        t('cybersecurity.services.training.features.2'),
        t('cybersecurity.services.training.features.3'),
        t('cybersecurity.services.training.features.4'),
        t('cybersecurity.services.training.features.5')
      ]
    },
    {
      title: t('cybersecurity.services.edr.title'),
      description: t('cybersecurity.services.edr.description'),
      image: '/images/products/Consultations/Endpoint Detection & Response (EDR).jpg',
      features: [
        t('cybersecurity.services.edr.features.1'),
        t('cybersecurity.services.edr.features.2'),
        t('cybersecurity.services.edr.features.3'),
        t('cybersecurity.services.edr.features.4'),
        t('cybersecurity.services.edr.features.5')
      ]
    },
    {
      title: t('cybersecurity.services.soc.title'),
      description: t('cybersecurity.services.soc.description'),
      image: '/images/products/Consultations/Security Monitoring (SOC).jpg',
      features: [
        t('cybersecurity.services.soc.features.1'),
        t('cybersecurity.services.soc.features.2'),
        t('cybersecurity.services.soc.features.3'),
        t('cybersecurity.services.soc.features.4'),
        t('cybersecurity.services.soc.features.5')
      ]
    },
    {
      title: t('cybersecurity.services.ot.title'),
      description: t('cybersecurity.services.ot.description'),
      image: '/images/products/Consultations/OT Security Assessment & Hardening.jpg',
      features: [
        t('cybersecurity.services.ot.features.1'),
        t('cybersecurity.services.ot.features.2'),
        t('cybersecurity.services.ot.features.3'),
        t('cybersecurity.services.ot.features.4'),
        t('cybersecurity.services.ot.features.5')
      ]
    },
    {
      title: t('cybersecurity.services.ir.title'),
      description: t('cybersecurity.services.ir.description'),
      image: '/images/products/Consultations/Incident Response (IR) Plan & Playbooks.jpg',
      features: [
        t('cybersecurity.services.ir.features.1'),
        t('cybersecurity.services.ir.features.2'),
        t('cybersecurity.services.ir.features.3'),
        t('cybersecurity.services.ir.features.4'),
        t('cybersecurity.services.ir.features.5')
      ]
    },
    {
      title: t('cybersecurity.services.iam.title'),
      description: t('cybersecurity.services.iam.description'),
      image: '/images/products/Consultations/Identity & Access Management (IAM).jpg',
      features: [
        t('cybersecurity.services.iam.features.1'),
        t('cybersecurity.services.iam.features.2'),
        t('cybersecurity.services.iam.features.3'),
        t('cybersecurity.services.iam.features.4'),
        t('cybersecurity.services.iam.features.5')
      ]
    },
    {
      title: t('cybersecurity.services.appsec.title'),
      description: t('cybersecurity.services.appsec.description'),
      image: '/images/products/Consultations/Application Security Testing.jpg',
      features: [
        t('cybersecurity.services.appsec.features.1'),
        t('cybersecurity.services.appsec.features.2'),
        t('cybersecurity.services.appsec.features.3'),
        t('cybersecurity.services.appsec.features.4'),
        t('cybersecurity.services.appsec.features.5')
      ]
    },
    {
      title: t('cybersecurity.services.redteam.title'),
      description: t('cybersecurity.services.redteam.description'),
      image: '/images/products/Consultations/Red Teaming & Penetration Testing.jpg',
      features: [
        t('cybersecurity.services.redteam.features.1'),
        t('cybersecurity.services.redteam.features.2'),
        t('cybersecurity.services.redteam.features.3'),
        t('cybersecurity.services.redteam.features.4'),
        t('cybersecurity.services.redteam.features.5')
      ]
    },
    {
      title: t('cybersecurity.services.supply.title'),
      description: t('cybersecurity.services.supply.description'),
      image: '/images/products/Consultations/Supply Chain Risk Management.jpg',
      features: [
        t('cybersecurity.services.supply.features.1'),
        t('cybersecurity.services.supply.features.2'),
        t('cybersecurity.services.supply.features.3'),
        t('cybersecurity.services.supply.features.4'),
        t('cybersecurity.services.supply.features.5')
      ]
    }
  ];


  return (
    <ConsultationsContainer>
      <HeroSection>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>{t('consultations.title')}</HeroTitle>
            <HeroSubtitle>
              {t('consultations.subtitle')}
            </HeroSubtitle>
          </motion.div>
        </div>
      </HeroSection>

      <ServicesSection>
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('cybersecurity.services.title')}
          </motion.h2>
          
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ textAlign: 'center', marginBottom: '48px' }}
          >
            {t('cybersecurity.services.subtitle')}
          </motion.p>
          
          <ServicesGrid ref={servicesRef}>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ServiceHeader>
                  <ServiceBackgroundImage src={service.image} alt={service.title} />
                  <ServiceImageOverlay>
                    <ServiceTitle>{service.title}</ServiceTitle>
                  </ServiceImageOverlay>
                </ServiceHeader>
                <ServiceContent>
                  <ServiceDescription>{service.description}</ServiceDescription>
                  <ServiceFeatures>
                    {service.features.map((feature, featureIndex) => (
                      <ServiceFeature key={featureIndex}>{feature}</ServiceFeature>
                    ))}
                  </ServiceFeatures>
                  <ContactButton href="/contact">
                    {t('contact.button')}
                  </ContactButton>
                </ServiceContent>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </div>
      </ServicesSection>
    </ConsultationsContainer>
  );
};

export default Consultations;
