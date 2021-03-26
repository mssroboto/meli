import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { COLORS } from '../../constants/colors';
import { BREAKPOINTS } from '../../constants/breakpoints';
import { Link } from 'react-router-dom';
import shipment from '../../assets/shipment.png';

const StyledCard = styled.div`
  background-color: ${COLORS.colorWhite};
  display: flex;
  flex-direction: row;
  grid-column: 1/-1;
  padding: 16px;
  position: relative;

  ::after {
    background-color: ${COLORS.colorGreyFour};
    bottom: 0;
    content: '';
    height: 1px;
    left: 16px;
    position: absolute;
    right: 16px;
  }

  @media only screen and (min-width: ${BREAKPOINTS.desktop}) {
    grid-column: 2/-2;
  }
`;

const LinkWrapper = styled(Link)`
  align-items: center;
  display: flex;
  position: relative;
  width: 100%;

  @media only screen and (min-width: ${BREAKPOINTS.desktop}) {
    align-items: flex-start;
  }
`;

const ImageWrapper = styled.div`
  background-color: ${COLORS.colorGreyFour};
  border-radius: 4px;
  height: 120px;
  min-width: 120px;
  overflow: hidden;
  width: 120px;

  @media only screen and (min-width: ${BREAKPOINTS.tablet}) {
    height: 180px;
    min-width: 180px;
    width: 180px;
  }
`;

const Image = styled.img`
  border-radius: 4px;
  min-height: 100%;
  object-fit: cover;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  width: 100%;

  @media only screen and (min-width: ${BREAKPOINTS.desktop}) {
    margin-top: 16px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;

  @media only screen and (min-width: ${BREAKPOINTS.desktop}) {
    flex-direction: row;
    margin-bottom: 32px;
  }
`;

const Title = styled.div`
  color: ${COLORS.colorGreyOne};
  font-size: 12px;
  position: relative;

  @media only screen and (min-width: ${BREAKPOINTS.desktop}) {
    font-size: 18px;
    max-width: 79%;
  }
`;

const Price = styled.div`
  align-items: center;
  color: ${COLORS.colorGreyOne};
  display: flex;
  font-size: 18px;

  @media only screen and (min-width: ${BREAKPOINTS.desktop}) {
    font-size: 24px;
    width: 100%;
  }
`;

const Location = styled.div`
  align-items: flex-end;
  color: ${COLORS.colorGreyThree};
  display: flex;
  font-size: 12px;
  position: relative;

  @media only screen and (min-width: ${BREAKPOINTS.desktop}) {
    width: 26%;
  }
`;

const Shipment = styled.img`
  height: 25px;
  margin-left: 16px;
  width: 25px;
`;

export const Card = (props) => {
  const { id } = props.item;

  // TODO: Set the currency region dinamycally.
  const price = props.item.price
    ? new Intl.NumberFormat('es-AR',
      { style: 'currency', currency: props.item.price.currency })
      .format(props.item.price.amount)
    : '';

  return (
    <StyledCard>
      <LinkWrapper to={`/items/${id}`}>
        <ImageWrapper>
          <Image src={props.item.picture}></Image>
        </ImageWrapper>
        <Content>
          <Info>
            <Price>
              {price}
              {props.item.freeShipping && (
                <Shipment src={shipment}/>
              )}
            </Price>
            <Location>
              {props.item.location}
            </Location>
          </Info>
          <Title>
            {props.item.title}
          </Title>
        </Content>
      </LinkWrapper>
    </StyledCard>
  );
}

Card.propTypes = {
  item: PropTypes.shape().isRequired,
};
