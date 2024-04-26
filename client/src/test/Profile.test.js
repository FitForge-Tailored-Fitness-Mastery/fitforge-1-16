import renderer from 'react-test-renderer';
import React from 'react';
import Profile from '../components/Profile/Profile';

it('testing the testing feature', () => {
    const tree = renderer.create(<Profile />).toJSON();
    expect(tree).toMatchSnapshot();
  });