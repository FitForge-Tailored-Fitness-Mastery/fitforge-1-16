import renderer from 'react-test-renderer';
import React from 'react';
import ClientHome from '../components/ClientHome';

it('testing the testing feature', () => {
    const tree = renderer.create(<ClientHome />).toJSON();
    expect(tree).toMatchSnapshot();
});