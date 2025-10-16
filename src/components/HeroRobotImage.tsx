import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

const ImageContainer = styled.div`
  width: 100vw;
  height: 80vh;
  min-height: 400px;
  max-height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0A0A0A 0%, #1A1A2E 50%, #16213E 100%);
  border: none;
  box-shadow: none;
  margin: 0;
  padding: 0;
`;

const RobotImage = styled(motion.img)`
  width: 100vw;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  display: block;
  transform-origin: center center;
`;

const ImageOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 255, 255, 0.08) 0%,
    transparent 30%,
    transparent 70%,
    rgba(0, 255, 255, 0.08) 100%
  );
  pointer-events: none;
`;

const GlowEffect = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120vw;
  height: 120vh;
  background: radial-gradient(
    circle,
    rgba(0, 255, 255, 0.08) 0%,
    transparent 70%
  );
  pointer-events: none;
`;


const HeroRobotImage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const glowOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <ImageContainer>
      <RobotImage
        src="/images/first.jpg"
        alt="Advanced Humanoid Robot"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1.05, opacity: 1 }}
        transition={{ 
          duration: 1.2, 
          delay: 0.4,
          ease: "easeOut"
        }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.25 }
        }}
      />
      <ImageOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      />
      <GlowEffect
        style={{ opacity: glowOpacity }}
        animate={{
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </ImageContainer>
  );
};

export default HeroRobotImage;
