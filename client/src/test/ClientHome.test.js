import renderer from 'react-test-renderer';
import React from 'react';
import clientHome from '../clientHome';

it('testing the testing feature', () => {
    const tree = renderer.create(<clientHome />).toJSON();
    expect(tree).toMatchSnapshot();
});