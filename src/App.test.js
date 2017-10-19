import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import App from './App';

const state = {
    auth: {},
    feed: [],
    form: {}
};

const mockStore = configureStore();
const dispatch = jest.fn();

Enzyme.configure({adapter: new Adapter()});

describe('App', () => {
    it('should match snapshot', () => {
      expect(shallow(<App dispatch={dispatch} store={mockStore(state)}/>)).toMatchSnapshot();
    });
});