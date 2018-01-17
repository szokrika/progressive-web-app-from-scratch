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
