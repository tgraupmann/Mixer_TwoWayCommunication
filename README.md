# Mixer Two Way Communication - Custom HTML5 Control

This sample project shows how to have a custom control send messages to a game client and have the game client return messages.

![image_1](images/image_1.png)

## References

* [Mixer - Getting Started with HTML](https://dev.mixer.com/guides/mixplay/customcontrols/gettingstartedwithhtml)

* [Mixer - Custom Controls / Game Clients](https://dev.mixer.com/guides/mixplay/customcontrols/gameclients)

## Getting Started


**The interactivePacket event**

In the custom control `scripts.js` subscribe to the `interactivePacket` to get socket events.

```
  mixer.socket.on('interactivePacket', function (event) {
    console.log(event);
  });
```

When the custom control loads, you'll see the first events that fire when the page loads.

* onSceneCreate
* onWorldUpdate
* onGroupCreate
* onParticipantJoin
* onReady


**The onParticipantJoin event**

The page username is available in the `onParticipantJoin` event. The username can be set in a div from the `index.html` page.

![image_2](images/image_2.png)

```
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
```

**Read Game client docs**

Take a look at the [game client docs](https://dev.mixer.com/guides/mixplay/customcontrols/gameclients).

**Sending data to the game client when the Hello button is clicked**

The `script.js` can use the button event to send data to the game client. The [giveInput](https://dev.mixer.com/guides/mixplay/protocol/specification#giveinput) method is from the MixPlay specifications.

```
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
```

Update the schema so the control ID matches. See that `my-control`  is the same in the schema and in `scripts.js`.

```
{
  "scenes": [
    {
      "sceneID": "default",
      "controls": [
        {
          "controlID": "my-control",
          "kind": "button",
          "text": "My First Button",
          "position": [
            {
              "width": 10,
              "height": 8,
              "size": "large",
              "x": 0,
              "y": 0
            }
          ]
        }
      ]
    }
  ]
}
```
