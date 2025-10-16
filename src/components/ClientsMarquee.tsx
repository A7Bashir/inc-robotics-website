import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { useLanguage } from '../contexts/LanguageContext';

const MarqueeContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  background: white;
  border-top: 1px solid rgba(0,0,0,0.06);
  border-bottom: 1px solid rgba(0,0,0,0.06);
  padding: 0 60px; /* Add padding to prevent logos from going under arrows */
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0 50px; /* Smaller padding on mobile */
  }
`;

const Track = styled.div<{ $translateX: number; $isRTL: boolean }>`
  display: flex;
  align-items: center;
  gap: 48px;
  width: 500%;
  padding: 32px 0;
  transform: translateX(${props => props.$translateX}px);
  transition: transform 0.3s ease;
  position: relative;
  direction: ${props => props.$isRTL ? 'rtl' : 'ltr'};
  
  @media (max-width: ${theme.breakpoints.md}) {
    gap: 40px;
    padding: 28px 0;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    gap: 32px;
    padding: 24px 0;
  }
`;

const Logo = styled.img`
  height: 64px;
  width: auto;
  object-fit: contain;
  filter: grayscale(0%);
  opacity: 1;
  transition: opacity 0.2s ease, filter 0.2s ease, transform 0.2s ease;

  &:hover {
    opacity: 0.8;
    filter: grayscale(100%);
    transform: scale(1.05);
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    height: 56px;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    height: 48px;
  }
`;

const NavigationContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  pointer-events: none;
  z-index: 10;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0 12px;
  }
`;

const NavButton = styled.button<{ disabled?: boolean }>`
  background: ${props => props.disabled ? 'rgba(200, 200, 200, 0.7)' : 'rgba(255, 255, 255, 0.95)'};
  border: 2px solid ${props => props.disabled ? theme.colors.gray[400] : theme.colors.primary};
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  pointer-events: all;
  transition: all 0.2s ease;
  box-shadow: ${props => props.disabled ? '0 2px 6px rgba(0, 0, 0, 0.1)' : '0 6px 16px rgba(0, 0, 0, 0.15)'};
  font-size: 18px;
  font-weight: bold;
  opacity: ${props => props.disabled ? 0.6 : 1};
  
  &:hover {
    background: ${props => props.disabled ? 'rgba(200, 200, 200, 0.7)' : theme.colors.primary};
    color: white;
    transform: ${props => props.disabled ? 'none' : 'scale(1.05)'};
    box-shadow: ${props => props.disabled ? '0 2px 6px rgba(0, 0, 0, 0.1)' : '0 8px 20px rgba(0, 0, 0, 0.2)'};
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
`;


interface ClientsMarqueeProps {
  logos: string[];
}

const ClientsMarquee: React.FC<ClientsMarqueeProps> = ({ logos }) => {
  const [translateX, setTranslateX] = useState(0);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoScrollRef = useRef<number | null>(null);
  const scrollAmount = 200; // Amount to scroll per click
  const autoScrollSpeed = 1; // Pixels per frame for smooth auto scroll
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  // Create multiple copies to ensure seamless looping
  // We need enough copies so that when one set moves out, another is already visible
  const items = [...logos, ...logos, ...logos, ...logos, ...logos];
  
  // Calculate the width of one complete set of logos
  const singleSetWidth = logos.length * (200 + 48);
  
  // Calculate the total width of all items (for future use)
  // const totalWidth = items.length * (200 + 48);

  // Auto scroll animation function
  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) {
      cancelAnimationFrame(autoScrollRef.current);
    }
    
    const animate = () => {
      setTranslateX(prev => {
        const newX = isRTL ? prev + autoScrollSpeed : prev - autoScrollSpeed;
        // Reset to 0 when we've scrolled through exactly one set
        // This creates the seamless loop effect where the next set is already visible
        if (isRTL) {
          if (newX >= singleSetWidth) {
            return 0; // Reset to start position for RTL
          }
        } else {
          if (newX <= -singleSetWidth) {
            return 0; // Reset to start position for LTR
          }
        }
        return newX;
      });
      autoScrollRef.current = requestAnimationFrame(animate);
    };
    
    autoScrollRef.current = requestAnimationFrame(animate);
  }, [singleSetWidth, isRTL]);

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      cancelAnimationFrame(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  // Start/stop auto scroll based on isAutoScroll state
  useEffect(() => {
    if (isAutoScroll) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }
    
    return () => stopAutoScroll();
  }, [isAutoScroll, startAutoScroll]);

  const handlePrevious = () => {
    if (isPreviousDisabled) return;
    
    setTranslateX(prev => {
      const newX = isRTL ? prev - scrollAmount : prev + scrollAmount;
      
      if (isRTL) {
        // For RTL: don't allow scrolling too far to the left (beyond first set)
        const maxLeft = 0;
        return Math.max(newX, maxLeft);
      } else {
        // For LTR: don't allow scrolling too far to the right (beyond first set)
        const maxRight = 0;
        return Math.min(newX, maxRight);
      }
    });
    setIsAutoScroll(false);
    
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set new timeout to resume auto scroll after 3 seconds
    timeoutRef.current = setTimeout(() => {
      setIsAutoScroll(true);
    }, 3000);
  };

  const handleNext = () => {
    if (isNextDisabled) return;
    
    setTranslateX(prev => {
      const newX = isRTL ? prev + scrollAmount : prev - scrollAmount;
      
      if (isRTL) {
        // For RTL: don't allow scrolling too far to the right (beyond last set)
        const maxRight = singleSetWidth;
        return Math.min(newX, maxRight);
      } else {
        // For LTR: don't allow scrolling too far to the left (beyond last set)
        const maxLeft = -singleSetWidth;
        return Math.max(newX, maxLeft);
      }
    });
    setIsAutoScroll(false);
    
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set new timeout to resume auto scroll after 3 seconds
    timeoutRef.current = setTimeout(() => {
      setIsAutoScroll(true);
    }, 3000);
  };

  // Calculate if buttons should be disabled
  const isPreviousDisabled = isRTL ? translateX <= 0 : translateX >= 0;
  const isNextDisabled = isRTL ? translateX >= singleSetWidth : translateX <= -singleSetWidth;

  // Reset position when language changes
  useEffect(() => {
    setTranslateX(0);
  }, [language]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      stopAutoScroll();
    };
  }, []);

  return (
    <MarqueeContainer>
      <Track 
        ref={trackRef}
        $translateX={translateX}
        $isRTL={isRTL}
      >
        {items.map((src, idx) => (
          <Logo key={`${src}-${idx}`} src={src} alt="Client logo" loading="lazy" />
        ))}
      </Track>
      
      <NavigationContainer>
        <NavButton 
          onClick={handlePrevious}
          disabled={isPreviousDisabled}
          title="Previous"
        >
          ‹
        </NavButton>
        <NavButton 
          onClick={handleNext}
          disabled={isNextDisabled}
          title="Next"
        >
          ›
        </NavButton>
      </NavigationContainer>
    </MarqueeContainer>
  );
};

export default ClientsMarquee;
