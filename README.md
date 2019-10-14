H4 Bouncing balls Test
===

Installation
---
`npm i`

Running
---
To run the local webserver use
`npm start`

To run the tests
`npm test`

Logic
---
A standard ReactJS setup is used to inject the _Window_ component which acts as a container for the balls. The _Window_ tracks browser resize events and mouse clicks within itself. The _Window_ always has the dimensions of the browsers inner viewport.
When a click event occurs a new _Ball_ is created at the click location with random velocity. The _Ball_ state is added to _Window_ and is rendered using the dumb component _BallView_.
The coordinate system used to describe the balls is _x_ and _h_, where _h_ is the height in pixels from the bottom of the screen. _y_ is included and updated too for rendering purposes. I chose to take this approach because the ball iteraction is defined in terms of the bottom of the screen, it also makes it easier to redraw the balls relative to the bottom of the screen if the browser is resized. The spacial coordinates of the system are in pixels.
The _Window_ container also manages the interval timer used to iterate the _Ball_ state. The "game loop" is called from the _tick_ function in _Window_.
The logic for iterating the balls during the game loop is in _iterateBallArray_ which uses _iterateBallFn_ and _outOfBoundsFilter_.
_iterateBallFn_ simulates effects of gravity and velocity using simple linear iteration. It also handles bounce, rolling and stopping logic. Making the effect visually pleasing was prioritized over making an accurate simulation.
_outOfBoundsFilter_ is used to remove balls that have gone off the side edges of the browser window.
The parameters used for the simulation are kept in _settings_ and can be editted to change the feel of the simulation.

Further work
---
If there was a state where there were no balls or no balls were in motion then the interval timer could be stopped. The interval timer could be then started the next time the screen was clicked.

Attribution
---
normalize.css taken from https://necolas.github.io/normalize.css/
Webpack setup strongly influenced the blog of [Robin Wieruch](https://www.robinwieruch.de/webpack-setup-tutorial)
All npm packages listed in _package.json_ are from their corresponding repository.
