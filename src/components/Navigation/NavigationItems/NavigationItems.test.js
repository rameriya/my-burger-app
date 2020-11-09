// import React from 'react';
// import Adapter from 'enzyme-adapter-react-16';
// import {configure, shallow} from 'enzyme';

// import NavigationItem from './NavigationItem/NavigationItem';
// import {navigationItems} from './NavigationItems';

// configure({adapter: new Adapter()});

// describe('<NavigationItems />', () => {
// 		let wrapper;
// 	beforeEach(() => {
// 		wrapper = shallow(<navigationItems />);
// 	});

// 	it('should render two <NavigationItem /> elements if not authenticated.', () => {
// 		//const wrapper = shallow(<NavigationItems />);
// 		expect(wrapper.find(NavigationItem)).toHaveLength(2);
// 	});

// 	it('should render three <NavigationItem /> elements if authenticated.', () => {
// 		//const wrapper = shallow(<NavigationItems />);
// 		wrapper.setProps({isAuthenticated: true});
// 		expect(wrapper.find(NavigationItem)).toHaveLength(3);
// 	});

// 	it('should render <NavigationItem>Logout</NavigationItem> elements if authenticated.', () => {
// 		//const wrapper = shallow(<NavigationItems />);
// 		wrapper.setProps({isAuthenticated: true});
// 		expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
// 	});
// });