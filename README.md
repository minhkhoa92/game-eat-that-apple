## Loading the sprites
* loaded the sprites of blocks and snakes
* debug messages
* not a good idea to load blocks 32x32 pixel for each tile on the map
* still no menu highlights and fonts

## Creating the map
* scale down to 16x16px blocks at least for mobile
* fun fact, in old mobile phones the width was wider than the height
* game screen: 375:211 ratio
* long side (width) 1040 screen
* short side (height) 585 screen
* 20x24 map

## Creating the loop
* recognizes when the time of the game goes on (after a certain amount of milliseconds Elapsed)
* loop is quite fast
* at the start every part of the snake is in a line
* quite fascinating having the snake run

## Implementing difficulty
* the snake lengthens
* the duration of a tick can be changed and changes the speed of the snake

## Setup dev env on windows
```
npm install
open in a VisualStudioCode with a few react extensions installed
npm run
```
### Make ESLint work in VisualStudio Code
* install ESLint-Plugin
* in project directory run
```
npm install --save-dev eslint
```
* in vscode change settings (File->Preferences->Settings), or add lines to settings.json:
```
// activates eslint for editing the format
"eslint.format.enable": true,
"[javascript]": {
  "editor.codeActionsOnSave": {
    // tells eslint to change on save, isn't recommended
    "source.fixAll.eslint": true
  },
  // tells eslint to format javascript files
  "editor.defaultFormatter": "dbaeumer.vscode-eslint"
},
"eslint.lintTask.enable": true,
```
* in vscode check the developer log and select ESLint
* setup an eslint-config
* profit from eslint format in eslint code environment and from learning about a lot of problems which you may not be aware of

## Setup dev env on Linux
```
npm install
npm run
```
Edit every require left-side part (example: `const a = require(...)` - the a is the important left-side part).
Change it from `const variableName` to `const {variableName}`
<br>
use vim

## Credits
* Snake sprite:  [Page](https://opengameart.org/content/snake-sprite-sheet), Artist: [Blooming Pixels](https://opengameart.org/users/blooming-pixels)
* Apple sprite: [Page](https://opengameart.org/content/jabolko-apfel-apple-imagespriteicon), Artist: Lamoot
* Wall sprite: [Page](https://opengameart.org/content/wall-0), Artist: [Alekei](https://opengameart.org/users/alekei)
* Brick sprite: [Page](https://opengameart.org/content/bricks-tiled-texture-64x64), Artist: [alpa\_rats](https://opengameart.org/users/alpharats)
* A lot of tiles sprite (with grass): [Page](https://opengameart.org/content/top-down-grass-beach-and-water-tileset), Artist: Matiaan
