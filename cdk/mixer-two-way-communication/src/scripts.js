window.addEventListener('load', function initMixer() {
  // Move the video by a static offset amount
  const offset = 50;
  mixer.display.moveVideo({
    top: offset,
    bottom: offset,
    left: offset,
    right: offset,
  });
  
  mixer.socket.on('interactivePacket', function (event) {
    if (event == undefined ||
      event.params == undefined) {
      return;
    }
    console.log('interactivePacket', event);
    if (event.method == 'onParticipantJoin' &&
      event.params.participants !== undefined &&
      event.params.participants.length > 0 &&
      event.params.participants[0] != undefined &&
      event.params.participants[0].username != undefined) {
      var divHello = document.getElementById('divHello');
      var msg = '! Click the button to send a message to the game client';
      divHello.innerText = 'Hello '+event.params.participants[0].username+msg;
    } else if (event.method == 'event' &&
      event.params['my-control'] != undefined &&
      event.params['my-control'].with != undefined) {
      var divServer = document.getElementById('divServer');
      divServer.innerText = event.params['my-control'].with;
    }
  });

  // Whenever someone clicks on "Hello World", we'll send an event
  // to the game client on the control ID which comes from the schema
  document.getElementById('hello-world').onclick = function(event) {
    var divServer = document.getElementById('divServer');
    divServer.innerText = '[Waiting for server...]';
    mixer.socket.call('giveInput', {
      controlID: 'my-control',
      event: 'my-custom-event',
      dataFieldOne: 1,
      someOtherObject: {
        full: 'of exciting data!',
      },
    });
  };

  mixer.isLoaded();
});
