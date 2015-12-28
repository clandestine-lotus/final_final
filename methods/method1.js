/*eslint-disable*/
// ESLINT: Unused parameter, console.logs
export default function (obj) {
    if (this.isSimulation) {
      console.log('client');
    }
    if (!this.isSimulation) {
      console.log('Server:');
    }
    console.log('This is a test meteor method called from the client.');
    return 'some string';
  }
