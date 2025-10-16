import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';
import { useLanguage } from '../contexts/LanguageContext';

const FooterContainer = styled.footer`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  padding: ${theme.spacing['4xl']} 0 ${theme.spacing['2xl']};
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['3xl']} 0 ${theme.spacing.xl};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing['2xl']} 0 ${theme.spacing.lg};
  }
`;

const FooterContent = styled.div`
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

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: ${theme.spacing['3xl']};
  margin-bottom: ${theme.spacing['3xl']};
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${theme.spacing['2xl']};
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    gap: ${theme.spacing.xl};
    text-align: center;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const CompanySection = styled.div``;

const Logo = styled.div`
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const LogoImage = styled.img`
  height: 50px;
  width: auto;
  object-fit: contain;
  
  @media (max-width: ${theme.breakpoints.md}) {
    height: 45px;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    height: 40px;
  }
`;

const CompanyDescription = styled.p`
  color: ${theme.colors.gray[300]};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
  max-width: 300px;
  
  @media (max-width: ${theme.breakpoints.md}) {
    max-width: 100%;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: ${theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all ${theme.transitions.fast};
  overflow: hidden;
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 44px;
    height: 44px;
  }
`;

const SocialIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all ${theme.transitions.fast};
  
  ${SocialLink}:hover & {
    transform: scale(1.1);
  }
`;

const FooterSection = styled.div``;

const FooterTitle = styled.h4`
  color: ${theme.colors.white};
  margin-bottom: ${theme.spacing.lg};
  font-size: ${theme.fontSizes.lg};
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
`;

const FooterLink = styled.li`
  margin-bottom: ${theme.spacing.sm};
`;

const FooterLinkItem = styled(Link)`
  color: ${theme.colors.gray[300]};
  text-decoration: none;
  transition: color ${theme.transitions.fast};
  
  &:hover {
    color: ${theme.colors.accent};
  }
`;

const FooterExternalLink = styled.a`
  color: ${theme.colors.gray[300]};
  text-decoration: none;
  transition: color ${theme.transitions.fast};
  
  &:hover {
    color: ${theme.colors.accent};
  }
`;

const ContactItem = styled.div`
  color: ${theme.colors.gray[300]};
  font-size: ${theme.fontSizes.sm};
`;

const PhoneNumber = styled(FooterExternalLink)`
  direction: ltr;
  unicode-bidi: bidi-override;
  display: inline-block;
  white-space: nowrap;
`;

const EmailAddress = styled(FooterExternalLink)`
  direction: ltr;
  unicode-bidi: bidi-override;
  display: inline-block;
  white-space: nowrap;
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${theme.colors.gray[700]};
  padding-top: ${theme.spacing.lg};
  text-align: center;
  color: ${theme.colors.white} !important;
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  opacity: 0.95;
  
  p {
    color: ${theme.colors.white} !important;
    margin: 0;
    font-weight: ${theme.fontWeights.medium};
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
`;



const Footer: React.FC = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.products'), path: '/products' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.contact'), path: '/contact' }
  ];

  const services = [
    { label: t('footer.serviceRobots'), path: '/products/service' },
    { label: t('footer.cleaningRobots'), path: '/products/cleaning' },
    { label: t('footer.logisticsRobots'), path: '/products/logistics' },
    { label: t('footer.caseStudies'), path: '/case-studies' }
  ];

  const company = [
    { label: t('footer.aboutUs'), path: '/about' },
    { label: t('footer.gallery'), path: '/gallery' }
  ];

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <CompanySection>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Logo>
                <LogoImage src="/images/Robotics-logo-white-2.webp" alt="Robotics Logo" />
              </Logo>
            </Link>
            <CompanyDescription>
              {t('footer.description')}
            </CompanyDescription>
            <SocialLinks>
              <SocialLink
                href="https://x.com/inc_robotics"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Follow us on X (Twitter)"
              >
                <SocialIcon src="/images/social/x.avif" alt="X (Twitter)" />
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/company/incrobotics/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Follow us on LinkedIn"
              >
                <SocialIcon src="/images/social/linkdin.webp" alt="LinkedIn" />
              </SocialLink>
              <SocialLink
                href="https://www.instagram.com/inc.robotics/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Follow us on Instagram"
              >
                <SocialIcon src="/images/social/instagram.jpg" alt="Instagram" />
              </SocialLink>
              <SocialLink
                href="https://www.youtube.com/@INC-Robotics"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Subscribe to our YouTube channel"
              >
                <SocialIcon src="/images/social/youtube.png" alt="YouTube" />
              </SocialLink>
            </SocialLinks>
          </CompanySection>

          <FooterSection>
            <FooterTitle>{t('footer.quickLinks')}</FooterTitle>
            <FooterLinks>
              {quickLinks.map((link, index) => (
                <FooterLink key={index}>
                  <FooterLinkItem to={link.path}>{link.label}</FooterLinkItem>
                </FooterLink>
              ))}
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <FooterTitle>{t('footer.products')}</FooterTitle>
            <FooterLinks>
              {services.map((service, index) => (
                <FooterLink key={index}>
                  <FooterLinkItem to={service.path}>{service.label}</FooterLinkItem>
                </FooterLink>
              ))}
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <FooterTitle>{t('footer.company')}</FooterTitle>
            <FooterLinks>
              {company.map((item, index) => (
                <FooterLink key={index}>
                  {item.path === '#' ? (
                    <FooterExternalLink href={item.path}>{item.label}</FooterExternalLink>
                  ) : (
                    <FooterLinkItem to={item.path}>{item.label}</FooterLinkItem>
                  )}
                </FooterLink>
              ))}
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <FooterTitle>{t('footer.contactInfo')}</FooterTitle>
            <FooterLinks>
              <FooterLink>
                <EmailAddress href="mailto:info@incrobotics.com">
                  📧 info@incrobotics.com
                </EmailAddress>
              </FooterLink>
              <FooterLink>
                <EmailAddress href="mailto:projects@incrobotics.com">
                  📧 projects@incrobotics.com
                </EmailAddress>
              </FooterLink>
              <FooterLink>
                <EmailAddress href="mailto:sales@incrobotics.com">
                  📧 sales@incrobotics.com
                </EmailAddress>
              </FooterLink>
              <FooterLink>
                <PhoneNumber href="https://wa.me/966112225696">
                  📱 +966 11 222 5696
                </PhoneNumber>
              </FooterLink>
              <FooterLink>
                <ContactItem>
                  📍 {t('footer.address')}
                </ContactItem>
              </FooterLink>
              <FooterLink>
                <ContactItem>
                  📮 {t('footer.poBox')}
                </ContactItem>
              </FooterLink>
            </FooterLinks>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <p>
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
