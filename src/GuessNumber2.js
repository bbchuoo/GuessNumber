

var GuessNumber2Layer = cc.Layer.extend({
        sprite:null,
        title:null,
        please:null,
        dx:0,
        dy:0,
        nums :new Array(10),


        ctor:function () {

            this._super();

            this.title= new cc.LabelTTF("猜數字遊戲","","48");
            this.title.attr({
               x: cc.winSize.width /2,
               y:cc.winSize.height *7/8
            });
            this.title.setColor(cc.color(255,255,0));
            this.addChild(this.title);

            this.please= new cc.LabelTTF("請輸入三位數","","38");
            this.please.attr({
                x: cc.winSize.width /2,
                y:cc.winSize.height *5/8
            });
            this.addChild(this.please);

            cc.spriteFrameCache.addSpriteFrames(res.number_plist, res.number_png);



            for(var i=0;i < this.nums.length;i++){

                this.nums[i]=new cc.Sprite("#number" + i + ".png");

                if(i==0){
                    this.dx = 3;
                    this.dy = 1;
                }
                else{
                    this.dx = (i-1)%3+2;
                    this.dy = parseInt((i-1)/3)+2;
                }

                this.nums[i].x = cc.winSize.width *this.dx/6;
                this.nums[i].y = cc.winSize.height *this.dy/8;

                this.addChild(this.nums[i]);






            }





            return true;
        }
    });

var GuessNumber2Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GuessNumber2Layer();
        this.addChild(layer);
    }
});

