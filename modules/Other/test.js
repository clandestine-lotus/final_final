/*eslint-disable*/
// ESLINT: Unused parameter, console.logs
Meteor.methods({
  doSomething: function(obj) {
    if (this.isSimulation) {
      console.log('client');
    }
    if (!this.isSimulation) {
      console.log('Server:');
    }
    console.log('This is a test meteor method called from the client.');
    return 'some string';
  }
});
