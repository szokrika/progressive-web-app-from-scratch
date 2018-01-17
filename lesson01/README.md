# 01 - webpack, webpack-dev-server, and babel

This lesson will introduce webpack, webpack-dev-server, and babel.


### Initialize the project ###
Create a directory with the name of the project, inside the directory intialize the npm:
```sh
mkdir progressive-web-app
cd progressive-web-app
npm init -y
```
  

Add `.gitignore` file and the following into it.  

```sh
.DS_Store
*.log
node_modules/
```

Before ES6's import statement, developers had to add all used javascript files into `<script>` tag.  
Let us start with this example, where we have code that is split into two files, and we are using one extra open-source library `lodash`, and see how our code is written:  

Add a file called `index.html` with the following code:
```html
<html>
  <head>
    <title>Getting Started</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <div id="abc">
    <script src="./src/person.js"></script>
    <script src="./src/index.js"></script>
  </body>
</html>
```

Add directory src, and add two files inside it `person.js and index.js`.  
Add the following code:

```js
// person.js
class Person {
  constructor(name) {
    this.name = name;
  }
  sayHello() {
    return `My name is ${this.name}`;
  }
}

module.exports = Person;
```

and in `index.js` add this:
```js
// index.js
function component() {
  var element = document.createElement('div');
  var person = new Person('John');
  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', person.sayName()], ' ');

  return element;
}

document.body.appendChild(component());
```

Open the html file in a web browser, and you should see the following:  

```sh
Hello My name is John
```

### Introducing Webpack ###
Now let us see the code using webpack.  
Let us install lodash and webpack.  
```sh
npm install lodash
npm install --save-dev webpack
```

<br />

Add a file called `webpack.config.js`
```js
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

Modify `package.json` file, and add the following into the `scripts` section:  
```json
// package.json
 "scripts": {
    "build": "webpack"
  },
```
Then run the following command:
```js
npm run build
```
This will create a folder called `dist`, with a file called `bundle.js`, which webpack produces.  
By reading webpack.config.js, you can see that webpack started with `src/index.js`, and found out all dependencies, and bundled them into one package, the final file: `dist/bundle.js`.  
<br />
Now, modify the `index.html` to be like this:
```html
<html>
  <head>
    <title>Getting Started</title>
  </head>
  <body>
    <div id="abc">
    <script src="./dist/bundle.js"></script>
  </body>
</html>
```

Change `index.js` to be like this:

```js
// index.js
import _ from 'lodash';
import Person from './person';

function component() {
  var element = document.createElement('div');
  var person = new Person('John');
  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', person.sayName()], ' ');

  return element;
}

document.body.appendChild(component());
```

Add in the last line of `person.js' the following line:

```js
// add on the last line of person.js
export default Person;
```

Run the `npm run build`, and open the web browser again with the page, and you should see the same result.  

<br />
add the `dist` folder to `.gitignore`.  

### Introducing Babel ###
Let us change the code before, and add new feature, where we have an array of names, and we check the name of the person, to find if it is in the array, and then we add the following text: `I am a member`, otherwise, we add the text: `I am a guest`.  
Change `person.js` code to be like this:  

```js
// person.js
let memberNames = ['Don', 'Dustin', 'Michael'];

class Person {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    const isMember = memberNames.includes(this.name);
    const memberText = isMember ? 'I am a member' : 'I am a guest';
    return `My name is ${this.name}, and ${memberText}` ;
  }
}

export default Person;
```

If you run the previous code, then you might , or might not get a result.  
The reason, is we are using ES7's [Array include](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes), and not all browsers support this.  
In order to make sure our website will run on all our browsers, let us add `babel`:  

```sh
npm i --save-dev babel-cli babel-preset-env  babel-loader babel-core
```

add file `.babelrc` and add this code
```json
{
  "presets": [
    "env"
  ]
}
```

Change the file `webpack.config.js`, to be as follow:

```js
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
    ],
  },
};
```


run again:  

```sh
npm run build
```

open the web browser to see the new result:

```
Hello My name is John, and I am a guest
```

Let us try something new, by using ES6, and ES7 into webpack.   
<br />
Let us rename `webpack.config.js` to the following: `webpack.config.babel.js`, and change the content to :

```js
// webpack.config.babel.js
import path from 'path';

export default {
  entry: './src',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist/'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
    ],
  },
};
```

The above will allow us to use ES6 and ES7 in webpack.  

### Introduce webpack-dev-server ###
```sh
npm i --save-dev webpack-dev-server
```

Add the following to `webpack.config.babel.js`:
```js
// add the following to webpack.config.babel.js
devServer: {
    contentBase: __dirname,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  historyApiFallback: true
```

add the following script in `package.json`:
```json
// add the following to package.json script section
"scripts": {
    "build": "webpack",
    "start": "webpack-dev-server --open"
  },
```

Run `npm start`, and you should see the result of webpack build, and the web server will be available on `http://localhost:8080`.

