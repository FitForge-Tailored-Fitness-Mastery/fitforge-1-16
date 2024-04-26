import renderer from 'react-test-renderer';
import React from 'react';
import App from '../App';

it('testing the testing feature', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });