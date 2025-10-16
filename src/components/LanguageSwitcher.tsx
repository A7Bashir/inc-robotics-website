import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-left: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    margin-left: ${theme.spacing.md};
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    margin-left: ${theme.spacing.sm};
  }
`;

const LanguageButton = styled.button<{ $isActive: boolean }>`
  background: ${props => props.$isActive ? theme.colors.primary : 'transparent'};
  color: ${props => props.$isActive ? theme.colors.white : theme.colors.gray[300]};
  border: 1px solid ${props => props.$isActive ? theme.colors.primary : theme.colors.gray[600]};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  min-width: 40px;
  min-height: 36px;
  
  &:hover {
    background: ${props => props.$isActive ? theme.colors.primary : theme.colors.gray[700]};
    color: ${theme.colors.white};
    border-color: ${props => props.$isActive ? theme.colors.primary : theme.colors.gray[500]};
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    font-size: ${theme.fontSizes.xs};
    min-width: 36px;
    min-height: 32px;
  }
`;

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <LanguageContainer>
      <LanguageButton
        $isActive={true}
        onClick={toggleLanguage}
        aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      >
        {language === 'en' ? 'ع' : 'EN'}
      </LanguageButton>
    </LanguageContainer>
  );
};

export default LanguageSwitcher;
