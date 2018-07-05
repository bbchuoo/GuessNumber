
var GuessNumberLayer = cc.Layer.extend({
    sprite:null,
    guessnumber:null,
    dx:3,

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

        return true;
    },
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
});

var GuessNumberScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GuessNumberLayer();
        this.addChild(layer);
    }
});

