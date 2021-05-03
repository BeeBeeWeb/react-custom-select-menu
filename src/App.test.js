import { render, screen } from '@testing-library/react';
import App from './App';
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<App />);
});
