import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { theme } from '../styles/theme';
import { useLanguage } from '../contexts/LanguageContext';

const AboutContainer = styled.div`
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

const StorySection = styled.section`
  padding: ${theme.spacing['5xl']} 0;
`;

const StoryContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 0 ${theme.spacing.lg};
`;

const StoryText = styled.p`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.gray[600]};
  line-height: 1.8;
  margin-bottom: ${theme.spacing.lg};
`;

const MissionSection = styled.section`
  padding: ${theme.spacing['5xl']} 0;
  background: ${theme.colors.gray[100]};
`;

const MissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing['2xl']};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
`;

const MissionCard = styled(motion.div)`
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

const MissionIcon = styled.div`
  height: 200px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.primary};
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transform: scale(0.9);
    z-index: 1;
  }
`;

const MissionImageOverlay = styled.div`
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

const MissionContent = styled.div`
  padding: ${theme.spacing['2xl']};
`;

const MissionTitle = styled.h3`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
`;

const MissionDescription = styled.p`
  color: ${theme.colors.gray[600]};
  line-height: 1.6;
`;



const StatsSection = styled.section`
  padding: ${theme.spacing['5xl']} 0;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
  color: ${theme.colors.white};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing['2xl']};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
  text-align: center;
`;

const StatItem = styled(motion.div)`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: ${theme.fontSizes['6xl']};
  font-weight: ${theme.fontWeights.black};
  color: ${theme.colors.accent};
  margin-bottom: ${theme.spacing.sm};
`;

const StatLabel = styled.div`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.gray[200]};
  font-weight: ${theme.fontWeights.medium};
`;

const About: React.FC = () => {
  const storyRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const isStoryInView = useInView(storyRef, { once: true, margin: "-100px" });
  const isMissionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });

  // State for counting animation
  const [counts, setCounts] = useState({
    founded: 0,
    rnd: 0,
    partnerships: 0,
    robots: 0
  });

  // Counting animation effect
  useEffect(() => {
    if (isStatsInView) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;
      
      const timer = setInterval(() => {
        setCounts(prev => {
          const newCounts = { ...prev };
          if (newCounts.founded < 2021) newCounts.founded = Math.min(2021, newCounts.founded + Math.ceil(2021 / steps));
          if (newCounts.rnd < 200) newCounts.rnd = Math.min(200, newCounts.rnd + Math.ceil(200 / steps));
          if (newCounts.partnerships < 30) newCounts.partnerships = Math.min(30, newCounts.partnerships + Math.ceil(30 / steps));
          if (newCounts.robots < 70) newCounts.robots = Math.min(70, newCounts.robots + Math.ceil(70 / steps));
          
          return newCounts;
        });
      }, stepDuration);

      // Cleanup timer
      return () => clearInterval(timer);
    }
  }, [isStatsInView]);

  const missionItems = [
    {
      icon: "/images/about/mission.jpg",
      title: t('about.mission'),
      description: t('about.missionText')
    },
    {
      icon: "/images/about/vision.jpg",
      title: t('about.vision'),
      description: t('about.visionText')
    },
    {
      icon: "/images/about/values.jpg",
      title: t('about.values'),
      description: t('about.valuesText')
    }
  ];



  return (
    <AboutContainer>
      <HeroSection>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>{t('about.title')}</HeroTitle>
            <HeroSubtitle>
              {t('about.description')}
            </HeroSubtitle>
          </motion.div>
        </div>
      </HeroSection>

      <StorySection>
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('about.story')}
          </motion.h2>
          
          <StoryContent ref={storyRef}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isStoryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <StoryText>
                {t('about.storyText1')}
              </StoryText>
              
              <StoryText>
                {t('about.storyText2')}
              </StoryText>
              
              <StoryText>
                {t('about.storyText3')}
              </StoryText>
               
              <StoryText>
                {t('about.storyText4')}
              </StoryText>
            </motion.div>
          </StoryContent>
        </div>
      </StorySection>

      <MissionSection>
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('about.missionVision')}
          </motion.h2>
          
          <MissionGrid ref={missionRef}>
            {missionItems.map((item, index) => (
              <MissionCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isMissionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <MissionIcon>
                  <img src={item.icon} alt={item.title} />
                  <MissionImageOverlay>
                    {item.title}
                  </MissionImageOverlay>
                </MissionIcon>
                <MissionContent>
                  <MissionDescription>{item.description}</MissionDescription>
                </MissionContent>
              </MissionCard>
            ))}
          </MissionGrid>
        </div>
      </MissionSection>



      <StatsSection>
        <div className="container">
          <motion.h2
            className="section-title"
            style={{ color: theme.colors.white }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
{t('about.milestones')}
          </motion.h2>
          
                     <StatsGrid ref={statsRef}>
                           {[
                { number: counts.founded, label: t('about.founded'), suffix: "" },
                { number: counts.rnd, label: t('about.rnd'), suffix: "+" },
                { number: counts.partnerships, label: t('about.partnerships'), suffix: "+" },
                { number: counts.robots, label: t('about.robots'), suffix: "+" }
              ].map((stat, index) => (
              <StatItem
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                                 <StatNumber>{stat.number}{stat.suffix}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatItem>
            ))}
          </StatsGrid>
        </div>
      </StatsSection>
    </AboutContainer>
  );
};

export default About;
