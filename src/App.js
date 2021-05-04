import React, { useState } from 'react';
import './App.scss';
import SelectMenu from './components/select-menu/select-menu.component';

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

const OPTIONS_EXTENDED = [
  {
    name: 'Group 1',
    items: [
      { name: 'Hopper', value: 1, info: 'Grace Hopper was an American computer scientist and US Navy rear admiral.' },
      { name: 'Holberton', value: 2, info: 'Frances Elizabeth Holberton was one of the programmers of the first computer.' }
    ],
    id: 1
  },
  {
    name: 'Group 2',
    items: [
      { name: 'Antonelli', value: 3, info: 'Antonelli was one of the first computer programmers in the world.' },
      { name: 'Bartik', value: 4, info: 'Bartik was one of the first computer programmers in the world.' },
      { name: 'Teitelbaum', value: 5, info: 'Ruth Teitelbaum was one of the first computer programmers in the world' }
    ],
    id: 2
  }
];

function App() {
  const [selectedValue, setSelectedValue] = useState({ name: 'Hopper', value: 1 });

  const onSelectValue = (value) => {
    setSelectedValue(value);
  }

  return (
    <div className="app">
      <div>
        <p>Simple Select Menu (Light Theme)</p>
        <br />
        <SelectMenu
          options={OPTIONS}
          theme='light'
          type="normal"
          placeholder='Select Menu'
          selected={selectedValue}
          onChange={onSelectValue} />
        
        {selectedValue && <span className="selected-value">On Change: Selected Menu is <strong>{selectedValue.name}</strong> with value {selectedValue.value}</span>}
        <br/>
        <br/>
        
        <p>Extended Select Menu (Light Theme)</p>
        <br/>
        <SelectMenu
          options={OPTIONS_EXTENDED}
          theme='light'
          type="extended"
          placeholder='Select Menu'
          selected={{ name: 'Bartik', value: 4 }} />
      </div>
      <div>
        <p>Simple Select Menu (Dark Theme)</p>
        <br/>
        <SelectMenu
          options={OPTIONS}
          theme='dark' />
        
        <br/>
        <p>Extended Select Menu (Dark Theme)</p>
        <br/>
        
        <SelectMenu
          options={OPTIONS_EXTENDED}
          theme='dark'
          type="extended" />
      </div>
      
    </div>
  );
}

export default App;
