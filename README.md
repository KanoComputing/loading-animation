# Loading animation

A loading animation to display while users wait

## API

index.js is a ES6 module exporting `LoadingAnimation`;

```js
import { LoadingAnimation } from '@kano/loading-animation';

// Only parameter to contructor is parent element
const animation = new LoadingAnimation(document.getElementById('container'));

// Starts
animation.start();

// Stops
animation.stop();

// Removes from the dom
animation.delete();
```