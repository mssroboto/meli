import styled from 'styled-components';
import { BREAKPOINTS } from '../../constants/breakpoints';
import { COLORS } from '../../constants/colors';

export const StyledBreadcrumbs = styled.div`
  grid-column: 1/-1;
  padding-bottom: 16px;

  @media only screen and (min-width: ${BREAKPOINTS.desktop}) {
    grid-column: 2/-2;
  }
`;

export const Category = styled.div`
  color: ${COLORS.colorGreyThree};
  display: inline-block;
  font-size: 12px;
  line-height: 1.2;

  &:after {
    content: '>';
    padding: 0 10px;
  }

  &:last-child {
    content: '';
    font-weight: bold;

    &:after {
      content: '';
    }
  }

  @media only screen and (min-width: ${BREAKPOINTS.tablet}) {
    font-size: 14px;
  }
`;
