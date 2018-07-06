
var GuessNumberLayer = cc.Layer.extend({
    sprite:null,
    guessnumber:null,
    dx:3,
    nums:new Array(10),
    rects: new Array(10),
    enter:null,
    enterrect:null,
    back:null,
    backrect:null,
    guess:"",
    counter:0,


    ctor:function () {
        this._super();

        //猜數字遊戲文字
        this.guessnumber = new cc.LabelTTF("猜數字遊戲","",48);
        //第一種寫法
        // this.guessnumber.x = cc.winSize.width /2;
        // this.guessnumber.y = cc.winSize.height *7/8
        //第二種寫法 利用attr返回屬性值的方法去設定xy
        this.guessnumber.attr({
            x : cc.winSize.width /2,
            y : cc.winSize.height *7/8
        });
        this.guessnumber.setColor(cc.color(255, 255, 0));
        this.addChild(this.guessnumber,0,"mytitle");


        this.scheduleUpdate();
        this.initLayout();
        this.setUpMouse();

        return true;
    },
    //左右滑動
    update: function () {

        var title = this.guessnumber;
        //第二種寫法 get小朋友
        // var title = this.getChildByName("mytitle");

        if (title.x + title.width / 2 >= cc.winSize.width ||
            title.x - title.width / 2 <= 0) {
            this.dx *= -1;
        }
        title.x += this.dx;

    },
    //導入0~9的圖片
    initLayout: function () {

        //spriteFrameCache把圖片導進來


        var frameCache = cc.spriteFrameCache;

        frameCache.addSpriteFrames(res.number_plist, res.number_png);

        for (i = 0; i < this.nums.length; i++) {

            this.nums[i] = new cc.Sprite("#number" + i + ".png");

            if (i == 0) {
                px = 3;
                py = 1;

            }
            else {
                px = (i - 1) % 3 + 2;
                py = parseInt((i - 1) / 3) + 2;

            }


            this.nums[i].x = cc.winSize.width * px / 6;
            this.nums[i].y = cc.winSize.height * py / 8;


            this.rects[i] = new cc.Rect(
                this.nums[i].x - this.nums[i].width / 2,
                this.nums[i].y - this.nums[i].height / 2,
                this.nums[i].width,
                this.nums[i].height
            )


            this.addChild(this.nums[i]);
        }
        this.enter =  new cc.Sprite(res.enter_png);
        this.enter.attr({
            x : cc.winSize.width *4/6,
            y : cc.winSize.height *1/8
        });
        this.addChild(this.enter);

        this.enterrect = new cc.Rect(
            this.enter.x - this.enter.width,
            this.enter.y - this.enter.height,
            this.enter.width,
            this.enter.height
        );
        this.back =  new cc.Sprite(res.back_png);
        this.back.attr({
            x : cc.winSize.width *2/6,
            y : cc.winSize.height *1/8
        });
        this.addChild(this.back);

        this.backrect = new cc.Rect(
            this.back.x - this.back.width,
            this.back.y - this.back.height,
            this.back.width,
            this.back.height
        );


        this.input = new cc.LabelTTF("", "", 48);
        this.input.x = cc.winSize.width * 3 / 6;
        this.input.y = cc.winSize.height * 6 / 8;
        this.addChild(this.input);

        this.mesg = new cc.LabelTTF("輸入三位數", "", 48);
        this.mesg.x = cc.winSize.width * 3 / 6;
        this.mesg.y = cc.winSize.height * 5 / 8;
        this.addChild(this.mesg);

    },
    //設定滑鼠
    setUpMouse: function(){

        cc.eventManager.addListener({


            event : cc.EventListener.MOUSE,

            onMouseDown:function(e){
                var target = e.getCurrentTarget();
                var x = e.getLocationX();
                var y = e.getLocationY();
                var p = new cc.Point(x,y);

                //back
                if (target.guess.length> 0){
                    if(cc.rectContainsPoint(target.backrect,p)){
                        target.guess =  target.guess.substr(0,target.guess.length-1);
                        target.input.setString(target.guess);
                        return;
                    }
                }
                // if(target.guess.length ==  3){
                //     if(cc.rectContainsPoint(target.enterrect,p)){
                //
                //     }


                //讓0~~9案下去會輸入
                for(var i=0;i < target.rects.length ; i ++){
                    if(cc.rectContainsPoint(target.rects[i],p)){
                        target.guess +=i;
                        target.input.setString(target.guess);
                        break;

                    }
                }




            },
            onMouseUp:function(e){
                var target = e.getCurrentTarget();
            },



        },this);

    },

});

var GuessNumberScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GuessNumberLayer();
        this.addChild(layer);
    }
});

function createAnswer(d){
    var n = [0,1,2,3,4,5,6,7,8,9];
    n = shuffle(n);

    return
};

function shuffle(a){

    var i;

    for(i=a.length;i;i--){
       var randow = parseInt((Math.random()*i));
        var x = a[i-1];
        a[i-1] = a[randow];
        a[randow] = x;
    }
    return a;
};



