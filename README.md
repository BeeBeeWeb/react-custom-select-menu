# Custom Select Menu Component

## Quick Links:
- [How to run, build and test project?](#scripts)
- [Quick Preview](#quick-preview)
- [Usage](#usage)
- [API](#api)

---

## How to run, build and test project?

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## #Scripts

In the project directory, you can run:

 `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

`npm test`

Launches the test runner in the interactive watch mode.

`npm run build`

Builds the app for production to the `build` folder.

---

## #Quick Preview
![Email table UI](custom_select_menu_demo.gif)

---

## #Usage

```javascript
import SelectMenu from './components/select-menu/select-menu.component';

// simple select menu
<SelectMenu
    options={OPTIONS}
    theme='light'
    type="simple"
    placeholder='Select Menu'
    selected={{ name: 'Bartik', value: 4 }}
    onChange={onSelectValue} />

// extended select menu
<SelectMenu
    options={OPTIONS_EXTENDED}
    type="extended" />
```

The shape array of objects for `OPTIONS` should be as follows.
### Simple Options Object

```javascript
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
```
### Extended Options Object

```javascript
const OPTIONS_EXTENDED = [
  {
    name: 'Group 1',
    items: [
      { name: 'Hopper', value: 1, info: 'info text' },
      { name: 'Holberton', value: 2, info: 'info text' }
    ],
    id: 1
  },
  {
    name: 'Group 2',
    items: [
      { name: 'Antonelli', value: 3, info: 'info text' },
      { name: 'Bartik', value: 4, info: 'info text' },
      { name: 'Teitelbaum', value: 5, info: 'info text' }
    ],
    id: 2
  }
];
```

---

## #API
### Props

| prop          | type     | default  | isRequired | description                                                                                                               |
|---------------|----------|----------|------------|---------------------------------------------------------------------------------------------------------------------------|
| `options`     | `array`  | -        | true       | Please follow the array object shape as defined above for `OPTIONS`                                                       |
| `selected`    | `object` | -        | false      | You can provide selected value.  e.g `{ name: 'Bartik', value: 4}`                                                        |
| `placeholder` | `string` | 'Select' | false      | You can provide a string as placeholder to be shown in select box. It will be replaced by selected value after selection. |
| `theme`       | `string` | 'light'  | false      | Possible values: `'light' \|\| 'dark'`                                                                                    |
| `type`        | `string` | 'normal' | false      | Possible values: `'normal' \|\| 'extended'`                                                                               |

### Callback Prop


`onChange` : On values change callback, returns selected value object

### Selected Value

The shape object for `selected` should be as follows.

`selected={{ name: 'Bartik', value: 4 }}`




