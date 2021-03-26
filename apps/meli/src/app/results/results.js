import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchData } from '../../utils/fetchData';
import { URLS } from '../../constants/urls';
import { COLORS } from '../../constants/colors';
import { BREAKPOINTS } from '../../constants/breakpoints';
import { Grid } from '@meli/ui';
import { Card } from '../card/card';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';

const StyledResults = styled.div`
  background-color: ${COLORS.colorGreyFour};
  min-height: 100vh;
  padding: 16px 0;
  width: 100%;
`;

const Results = () => {
  const query = new URLSearchParams(location.search).get('search');
  const [results, setResults] = useState({});
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const categories = results.categories ? results.categories[0] : [];

  useEffect(() => {
    fetchData(URLS.resultsQuery, query)
      .then((data) => {
        setResults(data);
      });
  }, [query]);

  useEffect(() => {
    if (categories.category) {
      fetchData(URLS.categoriesQuery, categories.category)
        .then((data) => {
          const categoryList = data.path_from_root.map((item) => item.name);
          setBreadcrumbs(categoryList);
        });
    }
  }, [categories]);

  const setResultList = (results) => {
    const resultsList = results.items && results.items.slice(0, 4);
    return resultsList && resultsList.map((item) => (
      <Card key={item.id} item={item} />
    ))
  }

  return (
    <StyledResults>
      <Grid>
        <Breadcrumbs categories={breadcrumbs}/>
        {setResultList(results)}
      </Grid>
    </StyledResults>
  );
}

export default Results;
