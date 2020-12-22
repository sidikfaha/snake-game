# SNAKE GAME
Just for fun... I just wanted to realise something but I want to do somethig different of the classic game that every body know.

# Usage
## HTML
You just need to import the javascript file and follow these steps :
1. Import css and js files 
2. A div element with `id="table"` and you give him both width and height. It'll be used to display the game
3. A span or any other element with `id="score"` to display score
4. A span or any element with `id="level"` to display level

## JS
Just create a new Snake object by giving the level in parameter

```js
const game = new Snake( {level: 2} ) // For normal level

// Overriding gameOver function
game.gameOver = () => {
    alert('Custom game over function')
    game.stop() // Do never forget this line
}

// When all is ok, just star de game
game.start()
```

## Code example

```html
<!doctyle html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Snake Game</title>
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
        <p>Level : <span id="level"> </p>
        <p>Score : <span id="score"> </p>
        <!-- width=100% and height=400px (very important) -->
        <div style="height: 400px;" id="table"></div>

        <script src="js/snake.ts"></script>
        <script>
            const game = new Snake( {level: 3} ).start()
        </script>
    </body>
</html>
```
