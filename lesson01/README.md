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
&lt;html>
  &lt;head>
    &lt;title>Getting Started&lt;/title>
    &lt;script src="https://unpkg.com/lodash@4.16.6">&lt;/script>
  &lt;/head>
  &lt;body>
    &lt;div id="abc">
    &lt;script src="./src/person.js">&lt;/script>
    &lt;script src="./src/index.js">&lt;/script>
  &lt;/body>
&lt;/html>
```

Add directory src, and add two files inside it `person.js and index.js`.  
Add the following code:

<pre><code class="language-javascript">// person.js
class Person {
  constructor(name) {
    this.name = name;
  }
  sayHello() {
    return `My name is ${this.name}`;
  }
}

module.exports = Person;
</code></pre>
and in `index.js` add this:
<pre><code class="language-javascript">// index.js
function component() {
  var element = document.createElement('div');
  var person = new Person('John');
  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', person.sayName()], ' ');

  return element;
}

document.body.appendChild(component());
</code></pre>

Open the html file in a web browser, and you should see the following:  

<pre><code class="language-bash">Hello My name is John
</code></pre>

### Introducing Webpack ###
Now let us see the code using webpack.  
Let us install lodash and webpack.  
<pre><code class="language-bash">npm install lodash
npm install --save-dev webpack
</code></pre>

<br />

Add a file called `webpack.config.js`
<pre><code class="language-javascript">// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
</code></pre>
Modify `package.json` file, and add the following into the `scripts` section:  
<pre><code class="language-javascript">// package.json
 "scripts": {
    "build": "webpack"
  },
</code></pre>
Then run the following command:
<pre><code class="language-bash">npm run build</code></pre>
This will create a folder called `dist`, with a file called `bundle.js`, which webpack produces.  
By reading webpack.config.js, you can see that webpack started with `src/index.js`, and found out all dependencies, and bundled them into one package, the final file: `dist/bundle.js`.  
<br />
Now, modify the `index.html` to be like this:
<pre><code class="language-html">&lt;html>
  &lt;head>
    &lt;title>Getting Started&lt;/title>
  &lt;/head>
  &lt;body>
    &lt;div id="abc">
    &lt;script src="./dist/bundle.js">&lt;/script>
  &lt;/body>
&lt;/html>
</code></pre>
Change `index.js` to be like this:
<pre><code class="language-javascript">// index.js
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
</code></pre>
Add in the last line of `person.js' the following line:
<pre><code class="language-javascript">// add on the last line of person.js
export default Person;
</code></pre>
Run the `npm run build`, and open the web browser again with the page, and you should see the same result.  

<br />
add the `dist` folder to `.gitignore`.  

### Introducing Babel ###
Let us change the code before, and add new feature, where we have an array of names, and we check the name of the person, to find if it is in the array, and then we add the following text: `I am a member`, otherwise, we add the text: `I am a guest`.  
Change `person.js` code to be like this:  

<pre><code class="language-javascript">// person.js
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
</code></pre>
If you run the previous code, then you might , or might not get a result.  
The reason, is we are using ES7's [Array include](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes), and not all browsers support this.  
In order to make sure our website will run on all our browsers, let us add `babel`:  

<pre><code class="language-bash">npm i --save-dev babel-cli babel-preset-env  babel-loader babel-core</code></pre>

add file `.babelrc` and add this code
<pre><code class="language-javascript">{
  "presets": [
    "env"
  ]
}
</code></pre>

Change the file `webpack.config.js`, to be as follow:
<pre><code class="language-javascript">// webpack.config.js
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
</code></pre>


run again:  

* npm run build
* open the web browser

to see the new result:
<pre><code class="language-bash">Hello My name is John, and I am a guest
</code></pre>

Let us try something new, by using ES6, and ES7 into webpack.   
<br />
Let us rename `webpack.config.js` to the following: `webpack.config.babel.js`, and change the content to :

<pre><code class="language-javascript">// webpack.config.babel.js
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
</code></pre>

The above will allow us to use ES6 and ES7 in webpack.  

### Introduce webpack-dev-server ###
<pre><code class="language-bash">npm i --save-dev webpack-dev-server
</code></pre>
Add the following to `webpack.config.babel.js`:
<pre><code class="language-javascript">// add the following to webpack.config.babel.js
devServer: {
    contentBase: __dirname,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  historyApiFallback: true
</code></pre>
add the following script in `package.json`:
<pre><code class="language-javascript">// add the following to package.json script section
"scripts": {
    "build": "webpack",
    "start": "webpack-dev-server"
  },
</code></pre>
Run `npm start`, and you should see the result of webpack build, and the web server will be available on `http://localhost:8080`.

## Finding Code ##
To find the code go to the [github repo](https://github.com/gkarwchan/progressive_web_app_from_scratch), and make sure you are getting the [Part1 branch](https://github.com/gkarwchan/progressive_web_app_from_scratch/tree/part1)

## Find all parts ##
Go to [the main post]({% post_url 2017-12-29-Build-Progressive-web-app-from-scratch %}) where I track all parts.