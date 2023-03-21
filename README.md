# Messages Application

Simple app that allows bulletin-board style posting of images, text, and audio clips.

Messages can be uploaded via form at bottom of page. Message data is stored in a
Firebase datastore, and message media is stored using Firebase storage.

Messages can be "reacted" to in an iOS style - messages count their reacts and show a
badge relating to the react style with the highest count.

Messages are shuffled together on page load. Intention is to create a UI that is
familiar to someone used to interacting with an iOS text thread.

Technologies used in this app

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/)
- [CSS Modules](https://github.com/css-modules/css-modules)
