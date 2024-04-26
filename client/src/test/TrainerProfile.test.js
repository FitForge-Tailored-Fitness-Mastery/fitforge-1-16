import renderer from 'react-test-renderer';
import React from 'react';
import TrainerProfile from '../components/TrainerProfile/TrainerProfile';

it('testing the testing feature', () => {
    const tree = renderer.create(<TrainerProfile />).toJSON();
    expect(tree).toMatchSnapshot();
  });