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