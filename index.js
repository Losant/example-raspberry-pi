var five = require('johnny-five');
var raspi = require('raspi-io');
var Device = require('losant-sdk-js').Device;

// Construct Losant device.
var device = new Device({
  id: 'my-device-id',
  key: 'my-access-key',
  secret: 'my-access-secret'
});

// Connect the device to Losant.
device.connect();

var board = new five.Board({
  io: new raspi()
});

board.on('ready', function() {

  var led = new five.Led('GPIO23');
  var button = new five.Button('GPIO21');

  button.on('down', function() {
    // When the button is pressed, send the state to Losant.
    device.sendState({ button: true });
  });

  // Listen for commands from Losant.
  device.on('command', function(command) {
    if(command.name === 'toggle') {
      led.toggle();
    }
  });
});
