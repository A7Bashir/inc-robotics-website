import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  html[dir="rtl"] {
    direction: rtl;
  }

  html[dir="ltr"] {
    direction: ltr;
  }

  body {
    font-family: ${theme.fonts.primary};
    font-size: ${theme.fontSizes.base};
    line-height: 1.6;
    color: ${theme.colors.black};
    background-color: ${theme.colors.white};
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  /* RTL Support */
  html[dir="rtl"] body {
    font-family: 'Cairo', 'Tajawal', 'Noto Sans Arabic', sans-serif;
  }

  html[dir="rtl"] h1, 
  html[dir="rtl"] h2, 
  html[dir="rtl"] h3, 
  html[dir="rtl"] h4, 
  html[dir="rtl"] h5, 
  html[dir="rtl"] h6 {
    font-family: 'Cairo', 'Tajawal', 'Noto Sans Arabic', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    font-weight: ${theme.fontWeights.bold};
    line-height: 1.2;
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.primary};
  }

  h1 {
    font-size: ${theme.fontSizes['6xl']};
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes['4xl']};
    }
  }

  h2 {
    font-size: ${theme.fontSizes['5xl']};
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes['3xl']};
    }
  }

  h3 {
    font-size: ${theme.fontSizes['4xl']};
    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes['2xl']};
    }
  }

  h4 {
    font-size: ${theme.fontSizes['3xl']};
  }

  h5 {
    font-size: ${theme.fontSizes['2xl']};
  }

  h6 {
    font-size: ${theme.fontSizes.xl};
  }

  p {
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.gray[700]};
  }

  a {
    color: ${theme.colors.accent};
    text-decoration: none;
    transition: color ${theme.transitions.fast};
    
    &:hover {
      color: ${theme.colors.secondary};
    }
  }

  ul, ol {
    margin-bottom: ${theme.spacing.md};
    padding-left: ${theme.spacing.xl};
  }

  html[dir="rtl"] ul, 
  html[dir="rtl"] ol {
    padding-left: 0;
    padding-right: ${theme.spacing.xl};
  }

  li {
    margin-bottom: ${theme.spacing.xs};
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    transition: all ${theme.transitions.fast};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.lg};
    
    @media (max-width: ${theme.breakpoints.md}) {
      padding: 0 ${theme.spacing.md};
    }
    
    @media (max-width: ${theme.breakpoints.sm}) {
      padding: 0 ${theme.spacing.sm};
    }
  }

  .section {
    padding: ${theme.spacing['4xl']} 0;
    
    @media (max-width: ${theme.breakpoints.md}) {
      padding: ${theme.spacing['3xl']} 0;
    }
    
    @media (max-width: ${theme.breakpoints.sm}) {
      padding: ${theme.spacing['2xl']} 0;
    }
  }

  .section-title {
    text-align: center;
    margin-bottom: ${theme.spacing['3xl']};
  }

  .section-subtitle {
    text-align: center;
    color: ${theme.colors.gray[600]};
    font-size: ${theme.fontSizes.lg};
    margin-bottom: ${theme.spacing['2xl']};
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.gray[100]};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: ${theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.secondary};
  }

  /* Animation classes */
  .fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;
  }

  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .slide-in-left {
    opacity: 0;
    transform: translateX(-50px);
    transition: all 0.6s ease-out;
  }

  .slide-in-left.visible {
    opacity: 1;
    transform: translateX(0);
  }

  .slide-in-right {
    opacity: 0;
    transform: translateX(50px);
    transition: all 0.6s ease-out;
  }

  .slide-in-right.visible {
    opacity: 1;
    transform: translateX(0);
  }

  /* Utility classes */
  .text-center { text-align: center; }
  .text-left { text-align: left; }
  .text-right { text-align: right; }
  
  .mb-0 { margin-bottom: 0; }
  .mb-1 { margin-bottom: ${theme.spacing.xs}; }
  .mb-2 { margin-bottom: ${theme.spacing.sm}; }
  .mb-3 { margin-bottom: ${theme.spacing.md}; }
  .mb-4 { margin-bottom: ${theme.spacing.lg}; }
  .mb-5 { margin-bottom: ${theme.spacing.xl}; }
  
  .mt-0 { margin-top: 0; }
  .mt-1 { margin-top: ${theme.spacing.xs}; }
  .mt-2 { margin-top: ${theme.spacing.sm}; }
  .mt-3 { margin-top: ${theme.spacing.md}; }
  .mt-4 { margin-top: ${theme.spacing.lg}; }
  .mt-5 { margin-top: ${theme.spacing.xl}; }
  
  /* Responsive utility classes */
  .hidden-mobile {
    @media (max-width: ${theme.breakpoints.md}) {
      display: none !important;
    }
  }
  
  .hidden-desktop {
    @media (min-width: ${theme.breakpoints.md}) {
      display: none !important;
    }
  }
  
  .mobile-only {
    @media (min-width: ${theme.breakpoints.md}) {
      display: none !important;
    }
  }
  
  .desktop-only {
    @media (max-width: ${theme.breakpoints.md}) {
      display: none !important;
    }
  }
  
  /* Mobile-first responsive text */
  .responsive-text {
    font-size: ${theme.fontSizes.base};
    
    @media (min-width: ${theme.breakpoints.sm}) {
      font-size: ${theme.fontSizes.lg};
    }
    
    @media (min-width: ${theme.breakpoints.md}) {
      font-size: ${theme.fontSizes.xl};
    }
  }
  
  /* Touch-friendly buttons */
  .touch-friendly {
    min-height: 44px;
    min-width: 44px;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    
    @media (max-width: ${theme.breakpoints.md}) {
      min-height: 48px;
      padding: ${theme.spacing.md} ${theme.spacing.lg};
    }
  }
  
  /* Mobile-specific improvements */
  @media (max-width: ${theme.breakpoints.sm}) {
    /* Improve touch targets */
    button, a, input, select, textarea {
      min-height: 44px;
      min-width: 44px;
    }
    
    /* Prevent zoom on input focus */
    input, select, textarea {
      font-size: 16px;
    }
    
    /* Improve scrolling on iOS */
    * {
      -webkit-overflow-scrolling: touch;
    }
  }
  
  /* Tablet-specific improvements */
  @media (min-width: ${theme.breakpoints.sm}) and (max-width: ${theme.breakpoints.lg}) {
    /* Optimize for tablet landscape/portrait */
    .container {
      padding: 0 ${theme.spacing.xl};
    }
  }
  
  /* Large screen optimizations */
  @media (min-width: ${theme.breakpoints['2xl']}) {
    .container {
      max-width: 1400px;
    }
  }
`;

export default GlobalStyles;
