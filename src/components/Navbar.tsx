import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9998;
  background: rgba(10, 25, 41, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
  transition: all ${theme.transitions.normal};
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing.md};
    height: 70px;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0 ${theme.spacing.sm};
    height: 65px;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  
  &:hover {
    transform: scale(1.05);
  }
`;

const LogoImage = styled.img`
  height: 60px;
  width: auto;
  object-fit: contain;
  
  @media (max-width: ${theme.breakpoints.md}) {
    height: 50px;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    height: 45px;
  }
`;


const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  color: ${props => props.$isActive ? theme.colors.accent : theme.colors.white};
  text-decoration: none;
  font-weight: ${theme.fontWeights.medium};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  transition: all ${theme.transitions.fast};
  position: relative;
  
  &:hover {
    color: ${theme.colors.accent};
    background: rgba(59, 130, 246, 0.1);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: ${props => props.$isActive ? '100%' : '0'};
    height: 2px;
    background: ${theme.colors.accent};
    transition: all ${theme.transitions.fast};
    transform: translateX(-50%);
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const ProductsDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const ProductsLink = styled.div<{ $isActive: boolean }>`
  color: ${props => props.$isActive ? theme.colors.accent : theme.colors.white};
  text-decoration: none;
  font-weight: ${theme.fontWeights.medium};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  transition: all ${theme.transitions.fast};
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  
  &:hover {
    color: ${theme.colors.accent};
    background: rgba(59, 130, 246, 0.1);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: ${props => props.$isActive ? '100%' : '0'};
    height: 2px;
    background: ${theme.colors.accent};
    transition: all ${theme.transitions.fast};
    transform: translateX(-50%);
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.xl};
  padding: ${theme.spacing.md} 0;
  min-width: 200px;
  z-index: 1000;
  border: 1px solid ${theme.colors.gray[200]};
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  color: ${theme.colors.gray[700]};
  text-decoration: none;
  font-weight: ${theme.fontWeights.medium};
  transition: all ${theme.transitions.fast};
  
  &:hover {
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.xl};
  cursor: pointer;
  padding: ${theme.spacing.sm};
  min-width: 44px;
  min-height: 44px;
  z-index: 1001;
  border-radius: ${theme.borderRadius.md};
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &:active {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(0.95);
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed !important;
  top: 80px !important;
  left: 0 !important;
  right: 0 !important;
  background: rgba(10, 25, 41, 0.98) !important;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
  padding: ${theme.spacing.lg};
  z-index: 99999 !important;
  width: 100vw !important;
  max-width: 100vw !important;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  
  @media (max-width: ${theme.breakpoints.md}) {
    top: 70px !important;
    padding: ${theme.spacing.md};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    top: 65px !important;
    padding: ${theme.spacing.sm};
  }
  
  @media (min-width: ${theme.breakpoints.md}) {
    display: none !important;
  }
`;

const MobileNavLink = styled(Link)<{ $isActive: boolean }>`
  display: block;
  color: ${props => props.$isActive ? theme.colors.accent : theme.colors.white};
  text-decoration: none;
  font-weight: ${theme.fontWeights.medium};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.sm};
  transition: all ${theme.transitions.fast};
  min-height: 44px;
  display: flex;
  align-items: center;
  
  &:hover {
    color: ${theme.colors.accent};
    background: rgba(59, 130, 246, 0.1);
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.lg} ${theme.spacing.md};
    font-size: ${theme.fontSizes.lg};
  }
`;

const navItems = [
  { path: '/', labelKey: 'nav.home' },
  { path: '/solutions', labelKey: 'nav.solutions', hasDropdown: true },
  { path: '/case-studies', labelKey: 'nav.caseStudies' },
  { path: '/gallery', labelKey: 'nav.gallery' },
  { path: '/about', labelKey: 'nav.about' },
  { path: '/contact', labelKey: 'nav.contact' },
];

const solutionsCategories = [
  { path: '/consultations', labelKey: 'nav.consultations' },
  { path: '/products', labelKey: 'nav.roboticsSolutions' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSolutionsDropdown, setShowSolutionsDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const solutionsDropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Close mobile menu if clicking outside
      if (isOpen && 
          mobileMenuRef.current && 
          !mobileMenuRef.current.contains(target) &&
          !target.closest('[data-mobile-menu]')) {
        setIsOpen(false);
      }
      
      // Close solutions dropdown if clicking outside
      if (showSolutionsDropdown && 
          solutionsDropdownRef.current && 
          !solutionsDropdownRef.current.contains(target)) {
        setShowSolutionsDropdown(false);
      }
    };

    if (isOpen || showSolutionsDropdown) {
      // Use a small delay to prevent immediate closing when opening
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
      
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, showSolutionsDropdown]);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      <NavContainer
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          background: scrolled ? 'rgba(10, 25, 41, 0.98)' : 'rgba(10, 25, 41, 0.95)',
          boxShadow: scrolled ? theme.shadows.lg : 'none'
        }}
        onClick={(e) => {
          // Close menu if clicking on navbar but not on the button or menu
          const target = e.target as HTMLElement;
          if (isOpen && 
              !target.closest('[data-mobile-menu]') && 
              !target.closest('nav')) {
            setIsOpen(false);
          }
        }}
      >
        <NavContent>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo>
              <LogoImage src="/images/Robotics-logo-white-2.webp" alt="Robotics Logo" />
            </Logo>
          </Link>
          
          <NavLinks>
            {navItems.map((item) => {
              if (item.hasDropdown) {
                return (
                  <ProductsDropdown
                    key={item.path}
                    ref={solutionsDropdownRef}
                    onMouseEnter={() => setShowSolutionsDropdown(true)}
                    onMouseLeave={() => setShowSolutionsDropdown(false)}
                  >
                    <ProductsLink
                      $isActive={location.pathname.startsWith(item.path)}
                      onClick={() => {
                        setShowSolutionsDropdown(!showSolutionsDropdown);
                        // Navigate to solutions page on click
                        navigate('/solutions');
                      }}
                    >
                      {t(item.labelKey)}
                      <span style={{ fontSize: '12px' }}>▼</span>
                    </ProductsLink>
                    <AnimatePresence>
                      {showSolutionsDropdown && (
                        <DropdownMenu
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {solutionsCategories.map((category) => (
                            <DropdownItem
                              key={category.path}
                              to={category.path}
                              onClick={() => setShowSolutionsDropdown(false)}
                            >
                              {t(category.labelKey)}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      )}
                    </AnimatePresence>
                  </ProductsDropdown>
                );
              }
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  $isActive={location.pathname === item.path}
                >
                  {t(item.labelKey)}
                </NavLink>
              );
            })}
          </NavLinks>
          
          <LanguageSwitcher />
          
          <MobileMenuButton 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleMenu();
            }}
            data-mobile-menu
            aria-label="Toggle mobile menu"
            type="button"
          >
            {isOpen ? '✕' : '☰'}
          </MobileMenuButton>
        </NavContent>
      </NavContainer>

      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            ref={mobileMenuRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            data-mobile-menu
            style={{
              display: 'block',
              position: 'fixed',
              top: '80px',
              left: '0',
              right: '0',
              zIndex: 99999,
              opacity: 1,
              backgroundColor: 'rgba(10, 25, 41, 0.98)',
              width: '100vw',
              maxWidth: '100vw'
            }}
          >
            {navItems.map((item) => (
              <MobileNavLink
                key={item.path}
                to={item.path}
                $isActive={location.pathname === item.path}
                onClick={() => setIsOpen(false)}
              >
                {t(item.labelKey)}
              </MobileNavLink>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
