import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../../constants/colors';
import { BREAKPOINTS } from '../../constants/breakpoints';
import { URLS } from '../../constants/urls';
import { Grid } from '@meli/ui';
import logo from '../../assets/logo.png';
import icon from '../../assets/search.png';

const StyledHeader = styled.header`
  background-color: ${COLORS.colorYellow};
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  grid-column: 1/-1;
  height: 60px;
  padding: 10px 0;

  @media only screen and (min-width: ${BREAKPOINTS.desktop}) {
    grid-column: 2/-2;
  }
`;

const Logo = styled.img`
  cursor: pointer;
  margin-right: 20px;
  position: relative;
`;

const Search = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
`;

const SearchBox = styled.input`
  background: ${COLORS.colorWhite};
  border-radius: 3px 0 0 3px;
  color: ${COLORS.colorGreyTwo},
  font-size: 18px;
  padding: 12px;
  position: relative;
  width: 100%;

  ::placeholder {
    color: ${COLORS.colorGreyThree};
  }
`;

const SearchButton = styled.button`
  align-items: center;
  background: ${COLORS.colorGreyFour};
  border-radius: 0 3px 3px 0;
  display: flex;
  justify-content: center;
  position: relative;
  width: 40px;
`;

const Icon = styled.img`
  height: 20px;
  position: relative;
  width: 20px;
`;

const placeholderText = 'Nunca dejes de buscar';

/**
 * Creates the header component.
 */
const Header = () => {
  const [query, setQuery] = useState('');
  const history = useHistory();
  const validQuery = query !== '';
  const search = () => {
    if (validQuery) {
      history.push(`${URLS.search}${encodeURI(query)}`);
    }
  }
  const onKeyPress = (event) => {
    const isEnter = event.charCode === 13;
    if (isEnter) {
      search();
    }
  };
  const goBack = () => {
    setQuery('');
    history.push(`${URLS.root}`);
  }

  return (
    <StyledHeader>
      <Grid>
        <Content>
          <Logo src={logo} onClick={goBack}></Logo>
          <Search>
            <SearchBox
              type="text"
              placeholder={placeholderText}
              value={query}
              onChange={(event)=> setQuery(event.target.value)}
              onKeyPress={onKeyPress}
            ></SearchBox>
            <SearchButton type="submit" onClick={search}>
              <Icon src={icon}></Icon>
            </SearchButton>
          </Search>
        </Content>
      </Grid>
    </StyledHeader>
  );
}

export default Header;
