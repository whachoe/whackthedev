var Hole = enchant.Class.create(enchant.Sprite,{
    initialize:function(x,y){
        //Call the Sprite class (super class) constructor
        enchant.Sprite.call(this,50,50);
        this.image = game.assets['img/driesuitgat.png'];
        this.x = x;
        this.y = y;
        this.addEventListener('enterframe',this.tick);
        this.addEventListener('touchstart',this.hit);
        this.mode = 2;
        this.nextMode = 0;
        this.waitFor =  game.frame+rand(100);
        this.currentlyWhacked = false;
    },
    tick:function(){
        if(game.frame%2!=0)return;
        switch(this.mode){
            // Dev is appearing from the hole
            case 0:
                this.frame++;
                //change mode after completely appearing
                if(this.frame>=6) {
                    this.mode=2;
                    this.nextMode=1;
                    this.waitFor = game.frame+rand(100);
                }
                break;
            // Dev is hiding in the hole
            case 1:
                this.frame--;
                //change mode after completely hiding
                if(this.frame<=0) {
                    this.mode=2;
                    this.nextMode=0;
                    this.waitFor = game.frame+rand(100);
                    this.currentlyWhacked = false;

                    //Reduce maximum amount of Dries
                    game.maxDries--;
                    //If the amount is exceeded the Dries should not appear
                    if(game.maxDries<=0) {
                        this.mode=3;
                        if(game.maxDries <= -1*game.totalDries + 1) {
                            // Game over
                            var gameoverscene = new GameOverScene();
                            game.replaceScene(gameoverscene);
                        }
                    }
                }
                break;
            case 2:
                if(game.frame>this.waitFor){
                    //Make a transition to the next mode
                    this.mode = this.nextMode;
                }
                break;
        }
    },
    //Whack The DEV
    hit:function(){
        if(this.currentlyWhacked) return;

        //only when Dev has appeared at least half-way
        if(this.frame>=2) {
            this.currentlyWhacked = true;
            game.assets['sounds/foemp.wav'].play();

            //Dries after being whacked
            this.frame=5;
            //Switch to waiting mode
            this.mode=2;
            this.nextMode=1;
            //Number of frames to wait is fixed at 10
            this.waitFor = game.frame+10;
            // Update score
            game.score++;
        }
    }
});