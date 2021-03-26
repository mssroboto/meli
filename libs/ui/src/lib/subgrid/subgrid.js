import styled from 'styled-components';

export const Subgrid = styled.div`
  display: grid;
  grid-column-gap: 6.67%;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin: 0;

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    grid-column-gap: 2.27%;
  }

  @media only screen and (min-width: 1024px) {
    grid-template-columns: repeat(10, minmax(0, 1fr));
    grid-column-gap: 2.19%;
  }
`;
