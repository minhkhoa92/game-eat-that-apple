## Implementing difficulty (open ToDo)
* the snake lengthens
* the duration of a tick can be changed and changes the speed of the snake

## Setup dev env on windows
It has been a while that I installed this in windows
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
Nowadays I recommend running it on Linux WSL when on Window. On windows a containerized solution could also help, because in Linux it feels better to change the libraries, and to me it is faster to run performance checking.\
For productive environment, choose a Operating System, which feels more reliable for you.

```
npm install
npm run dev
```



## Credits
* Stage.js, the main library [Page](https://piqnt.com/stage.js/) / [github](https://github.com/piqnt/stage.js)
* Snake sprite:  [Page](https://opengameart.org/content/snake-sprite-sheet), Artist: [Blooming Pixels](https://opengameart.org/users/blooming-pixels)
* Apple sprite: [Page](https://opengameart.org/content/jabolko-apfel-apple-imagespriteicon), Artist: Lamoot
* Wall sprite: [Page](https://opengameart.org/content/wall-0), Artist: [Alekei](https://opengameart.org/users/alekei)
* Brick sprite: [Page](https://opengameart.org/content/bricks-tiled-texture-64x64), Artist: [alpa\_rats](https://opengameart.org/users/alpharats)
* A lot of tiles sprite (with grass): [Page](https://opengameart.org/content/top-down-grass-beach-and-water-tileset), Artist: Matiaan
