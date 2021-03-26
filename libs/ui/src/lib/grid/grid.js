import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-column-gap: 6.67%;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin: 0 16px;

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    grid-column-gap: 2.27%;
    margin: 0 24px;
  }

  @media only screen and (min-width: 1024px) {
    margin: 0 80px;
    grid-column-gap: 2.19%;
  }

  @media only screen and (min-width: 1440px) {
    margin: 0 auto;
    max-width: 1280px;
  }
`;
