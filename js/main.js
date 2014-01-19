
enchant();
rand = function(n){
    return Math.floor(Math.random()*n);
}

window.onload = function() {
    game = new Game(320,320);
    game.score = 0;
    game.maxDries = 30;
    game.totalDries = 10;

    // Image assets
    game.preload('img/icon0.png', 'img/a-32.png', 'img/effect0.png', 'img/game-over.jpg', 'img/start.png', 'img/driesuitgat.png');

    // Sound assets
    game.preload('sounds/johnson-long-version.mp3', 'sounds/foemp.wav');

    // Styling
    game.fps = 15;
    game.scale = 2;

    game.onload = function() {
        // Load the title screen
        var titlescreen = new TitleScene();
        game.pushScene(titlescreen);
    };

    game.start(); //Begin the game
    window.scrollTo(0, 0);
}

