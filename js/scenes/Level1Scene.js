var Level1Scene = enchant.Class.create(enchant.Scene, {
    // The main gameplay scene.
    initialize: function() {
        // 1 - Call superclass constructor
        Scene.apply(this);

        // ScoreLabel
        var scoreLabel = new ScoreLabel(5, 5);
        scoreLabel.on("enterframe", function() {
            if (this.age % 5 == 0) {
                this.score = game.score;
            }
        });
        this.addChild(scoreLabel);

        // All the holes
        for(var y=0;y<4;y++){
            for(var x=0;x<4;x++){
                var pit = new Hole(x*50,y*50);
                this.addChild(pit);
            }
        }
    }
});