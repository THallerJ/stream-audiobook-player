import React from 'react';
import MockupImg from '../../../assets/images/mockup.webp';
import MockupMobileImg from '../../../assets/images/mockup-mobile.webp';
import useIsLargeScreen from '../../../hooks/useIsLargeScreen';

const MockupImage = () => {
  const isLargeScreen = useIsLargeScreen();

  const renderImages = () => {
    if (isLargeScreen) return <img src={MockupImg} width="95%" alt="Mockup" />;
    return <img src={MockupMobileImg} width="100%" alt="Mobile mockup" />;
  };
  return renderImages();
};

export default MockupImage;
