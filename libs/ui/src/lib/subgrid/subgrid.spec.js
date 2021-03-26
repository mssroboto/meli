import React from 'react';
import { render } from '@testing-library/react';
import Subgrid from './subgrid';
describe('Subgrid', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Subgrid />);
    expect(baseElement).toBeTruthy();
  });
});
