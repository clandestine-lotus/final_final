Meteor.methods({
    doSomething: function (obj) {
        if(this.isSimulation) {
            console.log('client');
        }
        if(!this.isSimulation) {
            console.log('server');
        }
        console.log('both');
        return "some string";
    }
})
