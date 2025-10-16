import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { theme } from '../styles/theme';
import { useLanguage } from '../contexts/LanguageContext';

// Import custom contact images
import addressImg from '../assets/images/address.jpg';
import boxImg from '../assets/images/box.jpg';
import infoImg from '../assets/images/info.jpg';
import projectsImg from '../assets/images/projects.jpg';
import salesImg from '../assets/images/sales.jpg';
import whatsappImg from '../assets/images/whatsapp.jpg';

const ContactContainer = styled.div`
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
`;

const ContactSection = styled.section`
  padding: ${theme.spacing['5xl']} 0;
  background: ${theme.colors.gray[100]};
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${theme.spacing['2xl']};
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    max-width: 600px;
  }
`;

const ContactCard = styled(motion.div)`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.lg};
  border: 1px solid ${theme.colors.gray[200]};
  text-align: center;
  transition: all ${theme.transitions.fast};
  position: relative;
  overflow: hidden;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.xl};
    border-color: ${theme.colors.accent};
  }
`;

const ImageBackground = styled.div<{ backgroundImage: string }>`
  flex: 1;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100%);
    border-radius: ${theme.borderRadius.xl} ${theme.borderRadius.xl} 0 0;
  }
`;

const ImageOverlay = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: ${theme.colors.white};
  padding: ${theme.spacing.lg};
`;

const ImageTitle = styled.h3`
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  margin-bottom: ${theme.spacing.sm};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

const ImageDescription = styled.p`
  color: ${theme.colors.gray[200]};
  font-size: ${theme.fontSizes.base};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
`;

const ContactContent = styled.div`
  padding: ${theme.spacing['2xl']};
  background: ${theme.colors.white};
  border-radius: 0 0 ${theme.borderRadius.xl} ${theme.borderRadius.xl};
`;

const ContactTitle = styled.h3`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  margin-bottom: ${theme.spacing.md};
`;

const ContactValue = styled.div`
  color: ${theme.colors.gray[700]};
  font-size: ${theme.fontSizes.base};
  line-height: 1.6;
  
  a {
    color: ${theme.colors.accent};
    text-decoration: none;
    font-weight: ${theme.fontWeights.semibold};
    transition: color ${theme.transitions.fast};
    
    &:hover {
      color: ${theme.colors.primary};
    }
  }
`;

const ContactDescription = styled.p`
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSizes.sm};
  margin-top: ${theme.spacing.sm};
  font-style: italic;
`;

const SocialSection = styled.section`
  padding: ${theme.spacing['5xl']} 0;
  background: ${theme.colors.white};
`;

const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing['2xl']};
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
`;

const SocialCard = styled(motion.a)`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  text-align: center;
  text-decoration: none;
  color: inherit;
  box-shadow: ${theme.shadows.md};
  border: 1px solid ${theme.colors.gray[200]};
  transition: all ${theme.transitions.fast};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.lg};
    border-color: ${theme.colors.accent};
  }
`;

const SocialIcon = styled.img`
  width: 48px;
  height: 48px;
  margin-bottom: ${theme.spacing.md};
  object-fit: contain;
`;

const SocialTitle = styled.h4`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const SocialDescription = styled.p`
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSizes.sm};
`;

const Contact: React.FC = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const isContactInView = useInView(contactRef, { once: true, margin: "-100px" });
  const isSocialInView = useInView(socialRef, { once: true, margin: "-100px" });

  const contactInfo = [
    {
      icon: addressImg,
      title: t('contact.info.address'),
      value: "2449 Said ibn Zayd Rd, Qurtubah, 6582, Riyadh 13248, Saudi Arabia",
      description: t('contact.address.description')
    },
    {
      icon: boxImg,
      title: t('contact.info.poBox'),
      value: "P.O. Box 4528 Riyadh 12482-7021",
      description: t('contact.pobox.description')
    },
    {
      icon: infoImg,
      title: t('contact.general.title'),
      value: "info@incrobotics.com",
      description: t('contact.general.description'),
      isEmail: true
    },
    {
      icon: projectsImg,
      title: t('contact.projects.title'),
      value: "projects@incrobotics.com",
      description: t('contact.projects.description'),
      isEmail: true
    },
    {
      icon: salesImg,
      title: t('contact.sales.title'),
      value: "sales@incrobotics.com",
      description: t('contact.sales.description'),
      isEmail: true
    },
    {
      icon: whatsappImg,
      title: t('contact.info.whatsapp'),
      value: "+966 11 222 5696",
      description: t('contact.whatsapp.description'),
      isWhatsApp: true
    }
  ];

  const socialLinks = [
    {
      icon: "/images/social/x.avif",
      title: t('contact.social.x'),
      description: t('contact.social.xDesc'),
      url: "https://x.com/inc_robotics"
    },
    {
      icon: "/images/social/linkdin.webp",
      title: t('contact.social.linkedin'),
      description: t('contact.social.linkedinDesc'),
      url: "https://www.linkedin.com/company/incrobotics/posts/?feedView=all"
    },
    {
      icon: "/images/social/instagram.jpg",
      title: t('contact.social.instagram'),
      description: t('contact.social.instagramDesc'),
      url: "https://www.instagram.com/inc.robotics/"
    },
    {
      icon: "/images/social/youtube.png",
      title: t('contact.social.youtube'),
      description: t('contact.social.youtubeDesc'),
      url: "https://www.youtube.com/@INC-Robotics"
    }
  ];

  return (
    <ContactContainer>
      <HeroSection>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>{t('contact.title')}</HeroTitle>
            <HeroSubtitle>
              {t('contact.description')}
            </HeroSubtitle>
          </motion.div>
        </div>
      </HeroSection>

      <ContactSection>
        <div className="container">
          <ContactGrid ref={contactRef}>
            {contactInfo.map((info, index) => (
              <ContactCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isContactInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ImageBackground backgroundImage={info.icon}>
                  <ImageOverlay>
                    <ImageTitle>{info.title}</ImageTitle>
                    <ImageDescription>{info.description}</ImageDescription>
                  </ImageOverlay>
                </ImageBackground>
                <ContactContent>
                  <ContactValue>
                    {info.isWhatsApp ? (
                      <a href={`https://wa.me/966112225696`}>{info.value}</a>
                    ) : info.isEmail ? (
                      <a href={`mailto:${info.value}`}>{info.value}</a>
                    ) : (
                      info.value
                    )}
                  </ContactValue>
                </ContactContent>
              </ContactCard>
            ))}
          </ContactGrid>
        </div>
      </ContactSection>

      <SocialSection>
        <div className="container">
          <SocialGrid ref={socialRef}>
            {socialLinks.map((social, index) => (
              <SocialCard
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={isSocialInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SocialIcon src={social.icon} alt={social.title} />
                <SocialTitle>{social.title}</SocialTitle>
                <SocialDescription>{social.description}</SocialDescription>
              </SocialCard>
            ))}
          </SocialGrid>
        </div>
      </SocialSection>
    </ContactContainer>
  );
};

export default Contact;