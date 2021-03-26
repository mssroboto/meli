import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants/colors';

const StyledHome = styled.header`
  background-color: ${COLORS.colorGreyFour};
  height: 100vh;
  width: 100vw;
`;

const Home = () => {
  return(
    <StyledHome></StyledHome>
  )
};

export default Home;
