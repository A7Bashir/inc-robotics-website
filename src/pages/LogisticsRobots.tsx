import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { theme } from '../styles/theme';
import { useLanguage } from '../contexts/LanguageContext';

const LogisticsContainer = styled.div`
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
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/products/Logistec/Logistec cover.jpg');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  color: ${theme.colors.white};
  padding: ${theme.spacing['5xl']} 0;
  text-align: center;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['4xl']} 0;
    background-attachment: scroll;
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing['3xl']} 0;
    background-size: cover;
  }
`;

const HeroTitle = styled.h1`
  font-size: ${theme.fontSizes['6xl']};
  margin-bottom: ${theme.spacing.lg};
  background: linear-gradient(135deg, ${theme.colors.white} 0%, #FCD34D 100%);
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

const SeriesSection = styled.section`
  padding: ${theme.spacing['5xl']} 0;
`;

const SeriesTitle = styled.h2`
  font-size: ${theme.fontSizes['4xl']};
  color: ${theme.colors.primary};
  text-align: center;
  margin-bottom: ${theme.spacing['3xl']};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(135deg, #F59E0B, #D97706);
    border-radius: 2px;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing['3xl']};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
  margin-bottom: ${theme.spacing['5xl']};
`;

const ProductCard = styled(motion.div)`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${theme.shadows.lg};
  border: 1px solid ${theme.colors.gray[200]};
  transition: all ${theme.transitions.normal};
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${theme.shadows['2xl']};
    border-color: #F59E0B;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
  display: block;
`;

const ProductContent = styled.div`
  padding: ${theme.spacing['2xl']};
`;

const ProductTitle = styled.h3`
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
`;

const ProductDescription = styled.p`
  color: ${theme.colors.gray[600]};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
`;

const ProductFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: ${theme.spacing.lg};
`;

const ProductFeature = styled.li`
  color: ${theme.colors.gray[700]};
  padding: ${theme.spacing.xs} 0;
  position: relative;
  padding-left: ${theme.spacing.lg};
  
  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #F59E0B;
    font-weight: ${theme.fontWeights.bold};
  }
`;

const BackButton = styled.button`
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.full};
  font-weight: ${theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  margin-bottom: ${theme.spacing['2xl']};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const BrochureButton = styled.button`
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.full};
  font-weight: ${theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  width: 100%;
  margin-top: ${theme.spacing.lg};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }
`;

const LogisticsRobots: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const folaRef = useRef<HTMLDivElement>(null);
  const emmaKRef = useRef<HTMLDivElement>(null);
  const emmaLRef = useRef<HTMLDivElement>(null);
  const omniRef = useRef<HTMLDivElement>(null);
  const moraRef = useRef<HTMLDivElement>(null);
  const lunaRef = useRef<HTMLDivElement>(null);
  const emmaTRef = useRef<HTMLDivElement>(null);
  const carryBotRef = useRef<HTMLDivElement>(null);
  
  const isFolaInView = useInView(folaRef, { once: true, margin: "-100px" });
  const isEmmaKInView = useInView(emmaKRef, { once: true, margin: "-100px" });
  const isEmmaLInView = useInView(emmaLRef, { once: true, margin: "-100px" });
  const isOmniInView = useInView(omniRef, { once: true, margin: "-100px" });
  const isMoraInView = useInView(moraRef, { once: true, margin: "-100px" });
  const isLunaInView = useInView(lunaRef, { once: true, margin: "-100px" });
  const isEmmaTInView = useInView(emmaTRef, { once: true, margin: "-100px" });
  const isCarryBotInView = useInView(carryBotRef, { once: true, margin: "-100px" });

  const folaProducts = [
    {
      title: "FOLA BN2001",
      description: t('logistics.fola.bn2001.description'),
      image: "/images/products/Logistec/1-FOLA-BN-2001.webp",
      features: [
        `${t('features.size')}: 160.8×98.2×203.6 cm, ${t('features.weight')}: 585 kg`,
        `${t('features.payload')}: 2,000 kg`,
        `${t('features.gravityCenter')}: 60 cm`,
        `${t('features.liftStroke')}: 20.5 cm`,
        `${t('features.runtime')}: ≥8h`,
        t('features.laserSlam')
      ]
    },
    {
      title: "FOLA BN1501T",
      description: t('logistics.fola.bn1501t.description'),
      image: "/images/products/Logistec/1-FOLA-BN-2001.webp",
      features: [
        t('logistics.fola.bn1501t.specs.size'),
        t('logistics.fola.bn1501t.specs.payload'),
        t('logistics.fola.bn1501t.specs.gravityCenter'),
        t('logistics.fola.bn1501t.specs.liftStroke'),
        t('logistics.fola.bn1501t.specs.runtime'),
        t('logistics.fola.bn1501t.specs.navigation')
      ]
    },
    {
      title: "FOLA BN3001",
      description: t('logistics.fola.bn3001.description'),
      image: "/images/products/Logistec/1-FOLA-BN-2001.webp",
      features: [
        t('logistics.fola.bn3001.specs.size'),
        t('logistics.fola.bn3001.specs.payload'),
        t('logistics.fola.bn3001.specs.gravityCenter'),
        t('logistics.fola.bn3001.specs.liftStroke'),
        t('logistics.fola.bn3001.specs.runtime'),
        t('logistics.fola.bn3001.specs.navigation')
      ]
    },
    {
      title: "FOLA DN1416",
      description: t('logistics.fola.dn1416.description'),
      image: "/images/products/Logistec/2-FOLA-DN-1416.webp",
      features: [
        t('logistics.fola.dn1416.specs.size'),
        t('logistics.fola.dn1416.specs.payload'),
        t('logistics.fola.dn1416.specs.gravityCenter'),
        t('logistics.fola.dn1416.specs.liftStroke'),
        t('logistics.fola.dn1416.specs.runtime'),
        t('logistics.fola.dn1416.specs.navigation')
      ]
    },
    {
      title: "FOLA DN2030",
      description: t('logistics.fola.dn2030.description'),
      image: "/images/products/Logistec/2-FOLA-DN-1416.webp",
      features: [
        t('logistics.fola.dn2030.specs.size'),
        t('logistics.fola.dn2030.specs.payload'),
        t('logistics.fola.dn2030.specs.gravityCenter'),
        t('logistics.fola.dn2030.specs.liftStroke'),
        t('logistics.fola.dn2030.specs.runtime'),
        t('logistics.fola.dn2030.specs.navigation')
      ]
    },
    {
      title: "FOLA QN1416",
      description: t('logistics.fola.qn1416.description'),
      image: "/images/products/Logistec/3-FOLA-QN-1416.webp",
      features: [
        t('logistics.fola.qn1416.specs.size'),
        t('logistics.fola.qn1416.specs.payload'),
        t('logistics.fola.qn1416.specs.gravityCenter'),
        t('logistics.fola.qn1416.specs.liftStroke'),
        t('logistics.fola.qn1416.specs.runtime'),
        t('logistics.fola.qn1416.specs.navigation')
      ]
    },
    {
      title: "FOLA QN2030",
      description: t('logistics.fola.qn2030.description'),
      image: "/images/products/Logistec/5-FOLA-QN2030.webp",
      features: [
        t('logistics.fola.qn2030.specs.size'),
        t('logistics.fola.qn2030.specs.payload'),
        t('logistics.fola.qn2030.specs.gravityCenter'),
        t('logistics.fola.qn2030.specs.liftStroke'),
        t('logistics.fola.qn2030.specs.runtime'),
        t('logistics.fola.qn2030.specs.navigation')
      ]
    },
    {
      title: "FOLA PN1530",
      description: t('logistics.fola.pn1530.description'),
      image: "/images/products/Logistec/4-FOLA-PN1530.webp",
      features: [
        t('logistics.fola.pn1530.specs.size'),
        t('logistics.fola.pn1530.specs.payload'),
        t('logistics.fola.pn1530.specs.gravityCenter'),
        t('logistics.fola.pn1530.specs.liftStroke'),
        t('logistics.fola.pn1530.specs.runtime'),
        t('logistics.fola.pn1530.specs.navigation')
      ]
    },
    {
      title: "FOLA SN300",
      description: t('logistics.fola.sn300.description'),
      image: "/images/products/Logistec/1-FOLA-BN-2001.webp",
      features: [
        t('logistics.fola.sn300.specs.size'),
        t('logistics.fola.sn300.specs.payload'),
        t('logistics.fola.sn300.specs.gravityCenter'),
        t('logistics.fola.sn300.specs.liftStroke'),
        t('logistics.fola.sn300.specs.runtime'),
        t('logistics.fola.sn300.specs.navigation')
      ]
    },
    {
      title: "FOLA SN600",
      description: t('logistics.fola.sn600.description'),
      image: "/images/products/Logistec/1-FOLA-BN-2001.webp",
      features: [
        t('logistics.fola.sn600.specs.size'),
        t('logistics.fola.sn600.specs.payload'),
        t('logistics.fola.sn600.specs.gravityCenter'),
        t('logistics.fola.sn600.specs.liftStroke'),
        t('logistics.fola.sn600.specs.runtime'),
        t('logistics.fola.sn600.specs.navigation')
      ]
    }
  ];

  const emmaKProducts = [
    {
      title: "EMMA 400K",
      description: t('logistics.emma.400k.description'),
      image: "/images/products/Logistec/7-EMMA-400K.webp",
      features: [
        t('logistics.emma.400k.specs.size'),
        t('logistics.emma.400k.specs.payload'),
        t('logistics.emma.400k.specs.pivoting'),
        t('logistics.emma.400k.specs.maxSpeed'),
        t('logistics.emma.400k.specs.accuracy'),
        t('logistics.emma.400k.specs.lifting'),
        t('logistics.emma.400k.specs.battery'),
        t('logistics.emma.400k.specs.navigation'),
        t('logistics.emma.400k.specs.sensors')
      ]
    },
    {
      title: "EMMA 600K",
      description: t('logistics.emma.600k.description'),
      image: "/images/products/Logistec/9-EMMA-600K.webp",
      features: [
        t('logistics.emma.600k.specs.size'),
        t('logistics.emma.600k.specs.payload'),
        t('logistics.emma.600k.specs.pivoting'),
        t('logistics.emma.600k.specs.maxSpeed'),
        t('logistics.emma.600k.specs.accuracy'),
        t('logistics.emma.600k.specs.lifting'),
        t('logistics.emma.600k.specs.battery'),
        t('logistics.emma.600k.specs.navigation'),
        t('logistics.emma.600k.specs.sensors')
      ]
    },
    {
      title: "EMMA 1000K",
      description: t('logistics.emma.1000k.description'),
      image: "/images/products/Logistec/11-EMMA-1000K.webp",
      features: [
        t('logistics.emma.1000k.specs.size'),
        t('logistics.emma.1000k.specs.payload'),
        t('logistics.emma.1000k.specs.pivoting'),
        t('logistics.emma.1000k.specs.maxSpeed'),
        t('logistics.emma.1000k.specs.accuracy'),
        t('logistics.emma.1000k.specs.lifting'),
        t('logistics.emma.1000k.specs.battery'),
        t('logistics.emma.1000k.specs.navigation'),
        t('logistics.emma.1000k.specs.sensors')
      ]
    },
    {
      title: "EMMA 1500K",
      description: t('logistics.emma.1500k.description'),
      image: "/images/products/Logistec/12-EMMA-1500K.webp",
      features: [
        t('logistics.emma.1500k.specs.size'),
        t('logistics.emma.1500k.specs.payload'),
        t('logistics.emma.1500k.specs.pivoting'),
        t('logistics.emma.1500k.specs.maxSpeed'),
        t('logistics.emma.1500k.specs.accuracy'),
        t('logistics.emma.1500k.specs.lifting'),
        t('logistics.emma.1500k.specs.battery'),
        t('logistics.emma.1500k.specs.navigation'),
        t('logistics.emma.1500k.specs.sensors')
      ]
    }
  ];

  const emmaLProducts = [
    {
      title: "EMMA 400L",
      description: t('logistics.emma.400l.description'),
      image: "/images/products/Logistec/8-EMMA-400L.webp",
      features: [
        t('logistics.emma.400l.specs.size'),
        t('logistics.emma.400l.specs.payload'),
        t('logistics.emma.400l.specs.pivoting'),
        t('logistics.emma.400l.specs.maxSpeed'),
        t('logistics.emma.400l.specs.accuracy'),
        t('logistics.emma.400l.specs.lifting'),
        t('logistics.emma.400l.specs.battery'),
        t('logistics.emma.400l.specs.navigation'),
        t('logistics.emma.400l.specs.sensors')
      ]
    },
    {
      title: "EMMA 600L",
      description: t('logistics.emma.600l.description'),
      image: "/images/products/Logistec/10-EMMA-600L.webp",
      features: [
        t('logistics.emma.600l.specs.size'),
        t('logistics.emma.600l.specs.payload'),
        t('logistics.emma.600l.specs.pivoting'),
        t('logistics.emma.600l.specs.maxSpeed'),
        t('logistics.emma.600l.specs.accuracy'),
        t('logistics.emma.600l.specs.lifting'),
        t('logistics.emma.600l.specs.battery'),
        t('logistics.emma.600l.specs.navigation'),
        t('logistics.emma.600l.specs.sensors')
      ]
    },
    {
      title: "EMMA 1000L",
      description: t('logistics.emma.1000l.description'),
      image: "/images/products/Logistec/13-EMMA-1500L.webp",
      features: [
        t('logistics.emma.1000l.specs.size'),
        t('logistics.emma.1000l.specs.payload'),
        t('logistics.emma.1000l.specs.pivoting'),
        t('logistics.emma.1000l.specs.maxSpeed'),
        t('logistics.emma.1000l.specs.accuracy'),
        t('logistics.emma.1000l.specs.lifting'),
        t('logistics.emma.1000l.specs.battery'),
        t('logistics.emma.1000l.specs.navigation'),
        t('logistics.emma.1000l.specs.sensors')
      ]
    },
    {
      title: "EMMA 1500L",
      description: t('logistics.emma.1500l.description'),
      image: "/images/products/Logistec/13-EMMA-1500L.webp",
      features: [
        t('logistics.emma.1500l.specs.size'),
        t('logistics.emma.1500l.specs.payload'),
        t('logistics.emma.1500l.specs.pivoting'),
        t('logistics.emma.1500l.specs.maxSpeed'),
        t('logistics.emma.1500l.specs.accuracy'),
        t('logistics.emma.1500l.specs.lifting'),
        t('logistics.emma.1500l.specs.battery'),
        t('logistics.emma.1500l.specs.navigation'),
        t('logistics.emma.1500l.specs.sensors')
      ]
    },
    {
      title: "EMMA 2000L",
      description: t('logistics.emma.2000l.description'),
      image: "/images/products/Logistec/13-EMMA-1500L.webp",
      features: [
        t('logistics.emma.2000l.specs.size'),
        t('logistics.emma.2000l.specs.payload'),
        t('logistics.emma.2000l.specs.pivoting'),
        t('logistics.emma.2000l.specs.maxSpeed'),
        t('logistics.emma.2000l.specs.accuracy'),
        t('logistics.emma.2000l.specs.lifting'),
        t('logistics.emma.2000l.specs.battery'),
        t('logistics.emma.2000l.specs.navigation'),
        t('logistics.emma.2000l.specs.sensors')
      ]
    }
  ];

  const omniProducts = [
    {
      title: "OMNI 1.5T",
      description: t('logistics.omni.1.5t.description'),
      image: "/images/products/Logistec/14-OMNI-1.5T.webp",
      features: [
        t('logistics.omni.1.5t.specs.size'),
        t('logistics.omni.1.5t.specs.payload'),
        t('logistics.omni.1.5t.specs.lifting'),
        t('logistics.omni.1.5t.specs.accuracy'),
        t('logistics.omni.1.5t.specs.drive'),
        t('logistics.omni.1.5t.specs.navigation'),
        t('logistics.omni.1.5t.specs.runtime'),
        t('logistics.omni.1.5t.specs.operations'),
        t('logistics.omni.1.5t.specs.solution')
      ]
    },
    {
      title: "OMNI 2.5T",
      description: t('logistics.omni.2.5t.description'),
      image: "/images/products/Logistec/15-OMNI-2.5T.webp",
      features: [
        t('logistics.omni.2.5t.specs.size'),
        t('logistics.omni.2.5t.specs.payload'),
        t('logistics.omni.2.5t.specs.lifting'),
        t('logistics.omni.2.5t.specs.accuracy'),
        t('logistics.omni.2.5t.specs.drive'),
        t('logistics.omni.2.5t.specs.navigation'),
        t('logistics.omni.2.5t.specs.runtime'),
        t('logistics.omni.2.5t.specs.operations'),
        t('logistics.omni.2.5t.specs.solution')
      ]
    },
    {
      title: "OMNI 3.5T",
      description: t('logistics.omni.3.5t.description'),
      image: "/images/products/Logistec/16-OMNI-3.5T.webp",
      features: [
        t('logistics.omni.3.5t.specs.size'),
        t('logistics.omni.3.5t.specs.payload'),
        t('logistics.omni.3.5t.specs.lifting'),
        t('logistics.omni.3.5t.specs.accuracy'),
        t('logistics.omni.3.5t.specs.drive'),
        t('logistics.omni.3.5t.specs.navigation'),
        t('logistics.omni.3.5t.specs.runtime'),
        t('logistics.omni.3.5t.specs.operations'),
        t('logistics.omni.3.5t.specs.solution')
      ]
    },
    {
      title: "OMNI 5T",
      description: t('logistics.omni.5t.description'),
      image: "/images/products/Logistec/17-OMNI-5T.webp",
      features: [
        t('logistics.omni.5t.specs.size'),
        t('logistics.omni.5t.specs.payload'),
        t('logistics.omni.5t.specs.lifting'),
        t('logistics.omni.5t.specs.accuracy'),
        t('logistics.omni.5t.specs.drive'),
        t('logistics.omni.5t.specs.navigation'),
        t('logistics.omni.5t.specs.runtime'),
        t('logistics.omni.5t.specs.operations'),
        t('logistics.omni.5t.specs.solution')
      ]
    }
  ];

  const moraProducts = [
    {
      title: t('logistics.mora.12uf.title'),
      description: t('logistics.mora.12uf.description'),
      image: "/images/products/Logistec/mora.png",
      features: [
        t('logistics.mora.12uf.specs.size'),
        t('logistics.mora.12uf.specs.payload'),
        t('logistics.mora.12uf.specs.pivoting'),
        t('logistics.mora.12uf.specs.precision'),
        t('logistics.mora.12uf.specs.armRange'),
        t('logistics.mora.12uf.specs.vibration'),
        t('logistics.mora.12uf.specs.drive'),
        t('logistics.mora.12uf.specs.navigation'),
        t('logistics.mora.12uf.specs.runtime'),
        t('logistics.mora.12uf.specs.arm'),
        t('logistics.mora.12uf.specs.handling'),
        t('logistics.mora.12uf.specs.hybrid'),
        t('logistics.mora.12uf.specs.execution'),
        t('logistics.mora.12uf.specs.reach'),
        t('logistics.mora.12uf.specs.lowVibration')
      ]
    }
  ];

  const lunaProducts = [
    {
      title: t('logistics.luna.5t.title'),
      description: t('logistics.luna.5t.description'),
      image: "/images/products/Logistec/LUNA 5T.png",
      features: [
        t('logistics.luna.5t.specs.payload'),
        t('logistics.luna.5t.specs.navigation'),
        t('logistics.luna.5t.specs.accuracy'),
        t('logistics.luna.5t.specs.siteArea'),
        t('logistics.luna.5t.specs.runtime'),
        t('logistics.luna.5t.specs.applications'),
        t('logistics.luna.5t.specs.coverage')
      ]
    },
    {
      title: t('logistics.luna.20t.title'),
      description: t('logistics.luna.20t.description'),
      image: "/images/products/Logistec/LUNA 20T.png",
      features: [
        t('logistics.luna.20t.specs.payload'),
        t('logistics.luna.20t.specs.navigation'),
        t('logistics.luna.20t.specs.accuracy'),
        t('logistics.luna.20t.specs.siteArea'),
        t('logistics.luna.20t.specs.runtime'),
        t('logistics.luna.20t.specs.applications'),
        t('logistics.luna.20t.specs.coverage')
      ]
    },
    {
      title: t('logistics.luna.30t.title'),
      description: t('logistics.luna.30t.description'),
      image: "/images/products/Logistec/LUNA 30T.png",
      features: [
        t('logistics.luna.30t.specs.payload'),
        t('logistics.luna.30t.specs.navigation'),
        t('logistics.luna.30t.specs.accuracy'),
        t('logistics.luna.30t.specs.siteArea'),
        t('logistics.luna.30t.specs.runtime'),
        t('logistics.luna.30t.specs.applications'),
        t('logistics.luna.30t.specs.coverage')
      ]
    }
  ];

  const emmaTProducts = [
    {
      title: "EMMA-T",
      description: t('logistics.emma.t.description'),
      image: "/images/products/Logistec/8-EMMA-400L.webp",
      features: [
        t('logistics.emma.t.specs.size'),
        t('logistics.emma.t.specs.payload'),
        t('logistics.emma.t.specs.groundClearance'),
        t('logistics.emma.t.specs.accuracy'),
        t('logistics.emma.t.specs.rotation'),
        t('logistics.emma.t.specs.runtime'),
        t('logistics.emma.t.specs.navigation'),
        t('logistics.emma.t.specs.battery'),
        t('logistics.emma.t.specs.tugging'),
        t('logistics.emma.t.specs.safety'),
        t('logistics.emma.t.specs.environment')
      ]
    }
  ];


  const carryBotProducts = [
    {
      title: t('logistics.carry.1.title'),
      description: t('logistics.carry.1.description'),
      image: "/images/products/Logistec/carry one.png",
      features: [
        t('logistics.carry.1.specs.size'),
        t('logistics.carry.1.specs.screen'),
        t('logistics.carry.1.specs.capacity'),
        t('logistics.carry.1.specs.navigation'),
        t('logistics.carry.1.specs.audio'),
        t('logistics.carry.1.specs.processor'),
        t('logistics.carry.1.specs.battery'),
        t('logistics.carry.1.specs.charging'),
        t('logistics.carry.1.specs.sensors'),
        t('logistics.carry.1.specs.os'),
        t('logistics.carry.1.specs.network')
      ]
    },
    {
      title: t('logistics.carry.2.title'),
      description: t('logistics.carry.2.description'),
      image: "/images/products/Logistec/carry two.png",
      features: [
        t('logistics.carry.2.specs.size'),
        t('logistics.carry.2.specs.screen'),
        t('logistics.carry.2.specs.capacity'),
        t('logistics.carry.2.specs.navigation'),
        t('logistics.carry.2.specs.audio'),
        t('logistics.carry.2.specs.processor'),
        t('logistics.carry.2.specs.battery'),
        t('logistics.carry.2.specs.charging'),
        t('logistics.carry.2.specs.sensors'),
        t('logistics.carry.2.specs.os'),
        t('logistics.carry.2.specs.network')
      ]
    },
    {
      title: t('logistics.carry.3.title'),
      description: t('logistics.carry.3.description'),
      image: "/images/products/Logistec/carry three.png",
      features: [
        t('logistics.carry.3.specs.size'),
        t('logistics.carry.3.specs.weight'),
        t('logistics.carry.3.specs.screen'),
        t('logistics.carry.3.specs.capacity'),
        t('logistics.carry.3.specs.navigation'),
        t('logistics.carry.3.specs.audio'),
        t('logistics.carry.3.specs.processor'),
        t('logistics.carry.3.specs.battery'),
        t('logistics.carry.3.specs.charging'),
        t('logistics.carry.3.specs.sensors'),
        t('logistics.carry.3.specs.os'),
        t('logistics.carry.3.specs.network')
      ]
    }
  ];

  const handleBackClick = () => {
    navigate('/products');
  };

  return (
    <LogisticsContainer>
      <HeroSection>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>{t('logistics.title')}</HeroTitle>
            <HeroSubtitle>
              {t('logistics.subtitle')}
            </HeroSubtitle>
          </motion.div>
        </div>
      </HeroSection>

      <SeriesSection>
        <div className="container">
          <BackButton onClick={handleBackClick}>
            ← {t('common.backToProducts')}
          </BackButton>
          
          {/* FOLA Series */}
          <SeriesTitle>{t('logistics.fola.title')}</SeriesTitle>
          <ProductsGrid ref={folaRef}>
            {folaProducts.map((product, index) => (
              <ProductCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isFolaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <ProductImage src={product.image} alt={product.title} />
                <ProductContent>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductFeatures>
                    {product.features.map((feature, featureIndex) => (
                      <ProductFeature key={featureIndex}>{feature}</ProductFeature>
                    ))}
                  </ProductFeatures>
                  <BrochureButton onClick={() => window.open('/images/brochures/Logistics Catalog.pdf', '_blank')}>
                    {t('common.downloadBrochure')}
                  </BrochureButton>
                </ProductContent>
              </ProductCard>
            ))}
          </ProductsGrid>

          {/* EMMA K Series */}
          <SeriesTitle>{t('logistics.emma.k.title')}</SeriesTitle>
          <ProductsGrid ref={emmaKRef}>
            {emmaKProducts.map((product, index) => (
              <ProductCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isEmmaKInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <ProductImage src={product.image} alt={product.title} />
                <ProductContent>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductFeatures>
                    {product.features.map((feature, featureIndex) => (
                      <ProductFeature key={featureIndex}>{feature}</ProductFeature>
                    ))}
                  </ProductFeatures>
                  <BrochureButton onClick={() => window.open('/images/brochures/Logistics Catalog.pdf', '_blank')}>
                    {t('common.downloadBrochure')}
                  </BrochureButton>
                </ProductContent>
              </ProductCard>
            ))}
          </ProductsGrid>

          {/* EMMA L Series */}
          <SeriesTitle>{t('logistics.emma.l.title')}</SeriesTitle>
          <ProductsGrid ref={emmaLRef}>
            {emmaLProducts.map((product, index) => (
              <ProductCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isEmmaLInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <ProductImage src={product.image} alt={product.title} />
                <ProductContent>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductFeatures>
                    {product.features.map((feature, featureIndex) => (
                      <ProductFeature key={featureIndex}>{feature}</ProductFeature>
                    ))}
                  </ProductFeatures>
                  <BrochureButton onClick={() => window.open('/images/brochures/Logistics Catalog.pdf', '_blank')}>
                    {t('common.downloadBrochure')}
                  </BrochureButton>
                </ProductContent>
              </ProductCard>
            ))}
          </ProductsGrid>

          {/* EMMA-T Series */}
          <SeriesTitle>{t('logistics.emma.t.title')}</SeriesTitle>
          <ProductsGrid ref={emmaTRef}>
            {emmaTProducts.map((product, index) => (
              <ProductCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isEmmaTInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <ProductImage src={product.image} alt={product.title} />
                <ProductContent>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductFeatures>
                    {product.features.map((feature, featureIndex) => (
                      <ProductFeature key={featureIndex}>{feature}</ProductFeature>
                    ))}
                  </ProductFeatures>
                  <BrochureButton onClick={() => window.open('/images/brochures/Logistics Catalog.pdf', '_blank')}>
                    {t('common.downloadBrochure')}
                  </BrochureButton>
                </ProductContent>
              </ProductCard>
            ))}
          </ProductsGrid>

          {/* OMNI Series */}
          <SeriesTitle>{t('logistics.omni.title')}</SeriesTitle>
          <ProductsGrid ref={omniRef}>
            {omniProducts.map((product, index) => (
              <ProductCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isOmniInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <ProductImage src={product.image} alt={product.title} />
                <ProductContent>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductFeatures>
                    {product.features.map((feature, featureIndex) => (
                      <ProductFeature key={featureIndex}>{feature}</ProductFeature>
                    ))}
                  </ProductFeatures>
                  <BrochureButton onClick={() => window.open('/images/brochures/Logistics Catalog.pdf', '_blank')}>
                    {t('common.downloadBrochure')}
                  </BrochureButton>
                </ProductContent>
              </ProductCard>
            ))}
          </ProductsGrid>

          {/* MORA Series */}
          <SeriesTitle>{t('logistics.mora.title')}</SeriesTitle>
          <ProductsGrid ref={moraRef}>
            {moraProducts.map((product, index) => (
              <ProductCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isMoraInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <ProductImage src={product.image} alt={product.title} />
                <ProductContent>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductFeatures>
                    {product.features.map((feature, featureIndex) => (
                      <ProductFeature key={featureIndex}>{feature}</ProductFeature>
                    ))}
                  </ProductFeatures>
                  <BrochureButton onClick={() => window.open('/images/brochures/Logistics Catalog.pdf', '_blank')}>
                    {t('common.downloadBrochure')}
                  </BrochureButton>
                </ProductContent>
              </ProductCard>
            ))}
          </ProductsGrid>

          {/* LUNA Series */}
          <SeriesTitle>{t('logistics.luna.title')}</SeriesTitle>
          <ProductsGrid ref={lunaRef}>
            {lunaProducts.map((product, index) => (
              <ProductCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isLunaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <ProductImage src={product.image} alt={product.title} />
                <ProductContent>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductFeatures>
                    {product.features.map((feature, featureIndex) => (
                      <ProductFeature key={featureIndex}>{feature}</ProductFeature>
                    ))}
                  </ProductFeatures>
                  <BrochureButton onClick={() => window.open('/images/brochures/Logistics Catalog.pdf', '_blank')}>
                    {t('common.downloadBrochure')}
                  </BrochureButton>
                </ProductContent>
              </ProductCard>
            ))}
          </ProductsGrid>

          {/* CarryBot Series */}
          <SeriesTitle>{t('logistics.carry.title')}</SeriesTitle>
          <ProductsGrid ref={carryBotRef}>
            {carryBotProducts.map((product, index) => (
              <ProductCard
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isCarryBotInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <ProductImage src={product.image} alt={product.title} />
                <ProductContent>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductFeatures>
                    {product.features.map((feature, featureIndex) => (
                      <ProductFeature key={featureIndex}>{feature}</ProductFeature>
                    ))}
                  </ProductFeatures>
                  <BrochureButton onClick={() => window.open('/images/brochures/Logistics Catalog.pdf', '_blank')}>
                    {t('common.downloadBrochure')}
                  </BrochureButton>
                </ProductContent>
              </ProductCard>
            ))}
          </ProductsGrid>
        </div>
      </SeriesSection>
    </LogisticsContainer>
  );
};

export default LogisticsRobots;
