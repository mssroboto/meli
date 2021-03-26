import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import {COLORS} from '../../constants/colors';
import {BREAKPOINTS} from '../../constants/breakpoints';
import {URLS} from '../../constants/urls';
import { Grid, Subgrid } from '@meli/ui';
import { fetchData } from '../../utils/fetchData';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs'

const StyledProduct = styled.div`
  background-color: ${COLORS.colorGreyFour};
  min-height: 100vh;
  padding: 16px 0;
  width: 100%;
`;

const Content = styled.div`
  background-color: ${COLORS.colorWhite};
  grid-column: 1/-1;

  @media only screen and (min-width: ${BREAKPOINTS.desktop}) {
    grid-column: 2/-2;
  }
`;

const ImageWrapper = styled.div`
  align-items: center;
  display: flex;
  grid-column: 1/-1;
  grid-row: 1;
  justify-content: center;
  padding: 32px;
  min-height: 40vh;
  width: 100%;

  @media only screen and (min-width: ${BREAKPOINTS.tablet}) {
    grid-column: 1/7;
  }

  @media only screen and (min-width: ${BREAKPOINTS.desktop}) {
    min-height: 50vh;
  }
`;

const DetailsHeading = styled.div`
  color: ${COLORS.colorGreyOne};
  font-size: 28px;
`;

const DetailsDescription = styled.div`
  color: ${COLORS.colorGreyOne};
  font-size: 16px;
  margin: 32px 0;
  line-height: 1.5;
`;

const Image = styled.img`
  width: 100%;
`;

const Info = styled.div`
  grid-column: 1/-1;
  padding: 32px;
`;

const InfoSecondary = styled.div`
  grid-column: 1/-1;
  grid-row: 2;
  padding: 32px;

  @media only screen and (min-width: ${BREAKPOINTS.tablet}) {
    grid-column: 7/-1;
    grid-row: 1;
  }
`;

const Price = styled.div`
  color: ${COLORS.colorGreyOne};
  position: relative;
  margin: 32px 0;
  font-size: 46px;
`;

const Title = styled.h1`
  color: ${COLORS.colorGreyOne};
  font-size: 24px;
  line-height: 1.2;
  position: relative;
`;

const Button = styled.button`
  background-color: ${COLORS.colorBlue};
  color: ${COLORS.colorWhite};
  padding: 12px 0;
  position: relative;
  width: 100%;
  border-radius: 3px;
  font-size: 18px;
`;

const Condition = styled.div`
  position: relative;

  &:after {
    content: '-';
    padding: 0 5px;
  }
`;

const InfoTertiary = styled.div`
  position: relative;
  display: flex;
  text-transform: capitalize;
  margin-bottom: 16px;
  color: ${COLORS.colorGreyOne};
  font-size: 14px;
`;

const action = 'Comprar';
const detailsHeading = 'Detalles del producto';

const Product = (props) => {
  const { productId } = useParams();
  const [details, setDetails] = useState({});
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    fetchData(URLS.itemsQuery, productId)
      .then((data) => {
        setDetails(data.item);
      });
  }, [details]);

  useEffect(() => {
    if (details.category) {
      fetchData(URLS.categoriesQuery, details.category)
        .then((data) => {
          const categoryList = data.path_from_root.map((item) => item.name);
          setBreadcrumbs(categoryList);
        });
    }
  }, [details]);

  // TODO: Set the currency region dinamycally.
  const price = details.price
    ? new Intl.NumberFormat('es-AR',
      { style: 'currency', currency: details.price.currency })
      .format(details.price.amount)
    : '';

  return (
    <StyledProduct>
      <Grid>
        <Breadcrumbs categories={breadcrumbs} />
        <Content>
          <Subgrid>
            <ImageWrapper>
              <Image src={details.picture}></Image>
            </ImageWrapper>
            <Info>
              <DetailsHeading>{detailsHeading}</DetailsHeading>
              <DetailsDescription>{details.description}</DetailsDescription>
            </Info>
            <InfoSecondary>
              <InfoTertiary>
                <Condition>{details.condition}</Condition>
                {details.soldQuantity}
              </InfoTertiary>
              <Title>{details.title}</Title>
              <Price>{price}</Price>
              <Button>{action}</Button>
            </InfoSecondary>
          </Subgrid>
        </Content>
      </Grid>
    </StyledProduct>
  );
}

export default Product;
