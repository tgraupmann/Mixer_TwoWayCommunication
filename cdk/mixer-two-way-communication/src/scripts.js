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
      event.method != 'onParticipantJoin' ||
      event.params == undefined ||
      event.params.participants == undefined ||
      event.params.participants.length == undefined ||
      event.params.participants.length == 0 ||
      event.params.participants[0] == undefined ||
      event.params.participants[0].username == undefined) {
      return;
    } else {
      var divHello = document.getElementById('divHello');
      var msg = '! Click the button to send a message to the game client';
      divHello.innerText = 'Hello '+event.params.participants[0].username+msg;
    }
  });

  // Whenever someone clicks on "Hello World", we'll send an event
  // to the game client on the control ID which comes from the schema
  document.getElementById('hello-world').onclick = function(event) {
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
