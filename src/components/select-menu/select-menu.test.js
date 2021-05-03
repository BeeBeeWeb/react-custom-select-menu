import React from 'react';
import { shallow } from 'enzyme';
import SelectMenu from './select-menu.component';
import { render, unmountComponentAtNode  } from "react-dom";
import { act } from "react-dom/test-utils";
import renderer from 'react-test-renderer';


const MockComponent = () => (<div className="mock">Mock Component</div>);

const OPTIONS = [
    {
        name: 'Group 1',
        items: [
            { name: 'Hopper', value: 1 },
            { name: 'Holberton', value: 2 }
        ],
        id: 1
    },
    {
        name: 'Group 2',
        items: [
            { name: 'Antonelli', value: 3 },
            { name: 'Bartik', value: 4 },
            { name: 'Teitelbaum', value: 5 }
        ],
        id: 2
    }
];

describe('SelectMenu component', () => {

    it('matches the snapshot', () => {
        const tree = renderer.create(<SelectMenu options={OPTIONS} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('select box is rendered with default placeholder', () => {
        const wrapper = shallow(<SelectMenu options={OPTIONS} />);
        const placeholder = wrapper.find('.placeholder').text();
        expect(placeholder).toEqual('Select');
    });

    it('dark theme is applied', () => {
        const wrapper = shallow(<SelectMenu options={OPTIONS} theme='dark' />);
        const selectMenu = wrapper.find('.adjust-select-menu');
        expect(selectMenu.hasClass('dark')).toEqual(true);

    });

    it('on select box click, dropdown is opened', () => {
        const wrapper = shallow(<SelectMenu options={OPTIONS} />);
        const selectBox = wrapper.find('.select-box');
        selectBox.simulate('click');
        const dropdown = wrapper.find('.dropdown');

        expect(dropdown).toBeTruthy();
        expect(dropdown.length).toEqual(1);
    });

    it('dropdown renders all the options', () => {
        const wrapper = shallow(<SelectMenu options={OPTIONS} />);
        const selectBox = wrapper.find('.select-box');
        selectBox.simulate('click');
        const option = wrapper.find('.option');

        expect(option.length).toEqual(5);
    });

    it('dropdown renders option text', () => {
        const wrapper = shallow(<SelectMenu options={OPTIONS} />);
        const selectBox = wrapper.find('.select-box');
        selectBox.simulate('click');
        const option = wrapper.find('.option');

        expect(option.at(0).text()).toEqual('Hopper');
    });

    it('on select box click, dropdown is closed', () => {
        const wrapper = shallow(<SelectMenu options={OPTIONS} />);
        const selectBox = wrapper.find('.select-box');
        selectBox.simulate('click');
        selectBox.simulate('click');
        const dropdown = wrapper.find('.dropdown');

        expect(dropdown.length).toEqual(0);
    });

    it('selected option is rendered on init', () => {
        const wrapper = shallow(<SelectMenu options={OPTIONS} selected={{ name: 'Hopper', value: 1 }} />);
        const selectText = wrapper.find('.selected-text').text();

        expect(selectText).toEqual('Hopper');
    });

    it('selected option is rendered on click', () => {
        const wrapper = shallow(<SelectMenu options={OPTIONS} />);
        const selectBox = wrapper.find('.select-box');
        selectBox.simulate('click');
        const option = wrapper.find('.option').at(1);
        option.simulate('click', { stopPropagation: () => {} });
        const selectText = wrapper.find('.selected-text').text();

        expect(selectText).toEqual('Holberton');
    });

    it('clicked option has selected-option class', () => {
        const wrapper = shallow(<SelectMenu options={OPTIONS} />);
        const selectBox = wrapper.find('.select-box');
        selectBox.simulate('click');
        let option = wrapper.find('.option').at(1);
        option.simulate('click', { stopPropagation: () => { } });
        selectBox.simulate('click');
        // re-find the updated options
        option = wrapper.find('.option').at(1);

        expect(option.hasClass('selected-option')).toEqual(true);
    });

    it('dropdown is closed when clicked elsewhere', () => {
        let container = document.createElement("div");
        document.body.appendChild(container);

        act(() => {
            render([<MockComponent />, <SelectMenu options={OPTIONS} />], container);
        });

        const mockComp = container.querySelector(".mock");
        const selectBox = container.querySelector(".select-box");

        // click on select box to open the dropdown
        selectBox.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        // click on mock component
        mockComp.dispatchEvent(new MouseEvent("click", { bubbles: true }));

        const dropdown = container.querySelector(".dropdown");
        
        
        // clicking on mock component should close the dropdown
        expect(dropdown).toBeFalsy();

        // clean up
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });
});