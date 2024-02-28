import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

function GradientTitle(props) {
  const { sidenavColor } = selectMuiSettings();
  const { children } = props;
  const boxRef = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const handleTitleHeight = () => {
      if (boxRef) {
        setHeight(boxRef.current?.clientHeight);
      }
    };
    window.addEventListener('resize', handleTitleHeight);
    handleTitleHeight();
    return () =>
      window.removeEventListener(
        'resize',
        handleTitleHeight,
      );
  }, [boxRef]);
  return (
    <>
      <MDBox
        variant="gradient"
        bgColor={sidenavColor}
        borderRadius="lg"
        coloredShadow={sidenavColor}
        position="absolute"
        left="1rem"
        right="1rem"
        top="-1rem"
        zIndex={2}
        py={2}
        ref={boxRef}
      >
        <MDTypography
          variant="h3"
          color="white"
          textAlign="center"
        >
          {children}
        </MDTypography>
      </MDBox>
      <MDBox height={height} mt="-1rem"></MDBox>
    </>
  );
}

GradientTitle.propTypes = {
  children: PropTypes.any,
};

export default GradientTitle;
