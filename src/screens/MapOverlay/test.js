/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable prefer-template */
/* eslint-disable no-empty */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-bitwise */
/* eslint-disable no-throw-literal */
/* eslint-disable no-unused-vars */
/* eslint-disable no-cond-assign */
/* eslint-disable no-global-assign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// <div id="myid" style="position:absolute;left: 44px;top: 186px;width: 3px;height: 3px;background: red;"></div>
// c.getImageData(44, 186, 3, 3).data.reduce((o,n)=>(n+o),0);

function simulateKey(node, keyCode) {
  if (!node) {
    node = document;
  }
  let keyboardEvent = document.createEvent('KeyboardEvent');
  let initMethod =
    typeof keyboardEvent.initKeyboardEvent !== 'undefined'
      ? 'initKeyboardEvent'
      : 'initKeyEvent';

  keyboardEvent[initMethod](
    'keypress', // event type: keydown, keyup, keypress
    true, // bubbles
    true, // cancelable
    null, // view: should be window
    false, // ctrlKey
    false, // altKey
    true, // shiftKey
    false, // metaKey
    keyCode, // keyCode: unsigned long - the virtual key code, else 0
    0 // charCode: unsigned long - the Unicode character associated with the depressed key, else 0
  );
  node.dispatchEvent(keyboardEvent);
  // console.log('fired');
}

function createElementFromHTML(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}

htmlStr =
  '<canvas class="canvas2" width="1200" height="300" style="width: 600px;height: 150px;background: red;"></canvas>';
n = createElementFromHTML(htmlStr);
parent = $('#main-frame-error');
try {
  parent.removeChild(n);
} catch (e) {}
parent.appendChild(n);

function findPos(obj) {
  let curleft = 0;
  let curtop = 0;
  if (obj.offsetParent) {
    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    } while ((obj = obj.offsetParent));
    return { x: curleft, y: curtop };
  }
  return undefined;
}

function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255) throw 'Invalid color component';
  return ((r << 16) | (g << 8) | b).toString(16);
}

t = $('.runner-canvas');
c = t.getContext('2d');
t2 = $('.canvas2');
c2 = t2.getContext('2d');

interval = null;

function eventListener(e) {
  const pos = findPos(this);
  const x = e.pageX - pos.x;
  const y = e.pageY - pos.y;
  const c = this.getContext('2d');

  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    let boundSize = 1;
    const testBS = 0;
    const p = c.getImageData(x - testBS, y + 50 - testBS, boundSize, boundSize);
    c2.putImageData(p, x - testBS, y + 50 - testBS);
    let hex = '';
    /* hex =
      '#' + ('000000' + rgbToHex(p.data[0], p.data[1], p.data[2])).slice(-6); */

    if (p.data[0] + p.data[1] + p.data[2] !== 0) {
      console.log('spacebar!!');
      simulateKey(t, 32);
      boundSize = 130;
      const p2 = c.getImageData(
        x - testBS,
        y + 50 - testBS,
        boundSize,
        boundSize
      );
      c2.putImageData(p2, x - testBS, y + 50 - testBS);
    }
    // console.log(pos, x, y, hex);
  }, 10);
}

t.removeEventListener('mousemove', eventListener);
t.addEventListener('mousemove', eventListener);


t2.addEventListener('keypress', (evt) => {
  console.log('hi', evt);
});
