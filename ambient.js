// ip: 192.168.4.237:8080

var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
var servolib = require('servo-pca9685');
var rp = require('request-promise')
var options = {
	method: 'POST',
	uri : 'http://192.168.4.237/loud',
	port: 8080
}


var servo = servolib.use(tessel.port['A']);
var ambient = ambientlib.use(tessel.port['B']);

ambient.on('ready', function () {
 // Get points of light and sound data.
  setInterval( function () {

    ambient.getLightLevel( function(err, lightdata) {
      if (err) throw err;
      ambient.getSoundLevel( function(err, sounddata) {
        if (err) throw err;
        	
        console.log("Listening. Sound level: " + sounddata.toFixed(4))
        	if(sounddata.toFixed(4) > 0.45){

        		console.log("\nKeep it low, bro! You're at: " + sounddata + "\n")
        		rp(options)
        			// .then(function(request){
        			// 	console.log(request + " // request made")
        			// })
        			.catch(function(error){
        				console.log("You're not welcome", error)
        			})
        	} 
        	// else if (sounddata.toFixed(0) < 0.1) {
        	// 	console.log("\nDon't forget to discuss your thought process with your partner!")
        	// }
        // console.log("Light level:", lightdata.toFixed(8), " ", "Sound Level:", sounddata.toFixed(8));
      });
    });
  }, 350); // The readings will happen every .5 seconds
});

ambient.on('error', function (err) {
  console.log(err);
});


///// Servo



// var servo1 = 1; // We have a servo plugged in at position 1

// servo.on('ready', function () {
//   var position = 0;  //  Target position of the servo between 0 (min) and 1 (max).

//   //  Set the minimum and maximum duty cycle for servo 1.
//   //  If the servo doesn't move to its full extent or stalls out
//   //  and gets hot, try tuning these values (0.05 and 0.12).
//   //  Moving them towards each other = less movement range
//   //  Moving them apart = more range, more likely to stall and burn out
//   servo.configure(servo1, 0.05, 0.12, function () {
//     setInterval(function () {
//       console.log('Position (in range 0-1):', position);
//       //  Set servo #1 to position pos.
//       servo.move(servo1, position);

//       // Increment by 10% (~18 deg for a normal servo)
//       position += 0.2;
//       if (position > 1) {
//         position = 0; // Reset servo position
//       }
//     }, 500); // Every 500 milliseconds
//   });
// });