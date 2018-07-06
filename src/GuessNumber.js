
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
    isRun:true,
    answer: createAnswer(3),


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
            this.enter.x - this.enter.width/2,
            this.enter.y - this.enter.height/2,
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
            this.back.x - this.back.width/2,
            this.back.y - this.back.height/2,
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
                if(target.guess.length ==  3) {
                    if (cc.rectContainsPoint(target.enterrect, p)) {
                        var result = checkAB(target.answer, target.guess);
                        target.counter++;
                        target.guess = '';
                        cc.log(target.answer);

                        if (result === "3A0B") {
                            target.isRun = true;
                        }
                        else if (target.counter == 10) {
                            target.mesg.setString("Loser:" + target.answer);
                            target.isRun = false;
                        }
                        else {
                            target.mesg.setString(result);
                        }
                    }
                }

                else{
                    //讓0~~9案下去會輸入
                    for(var i=0;i < target.rects.length ; i ++){
                        if(cc.rectContainsPoint(target.rects[i],p)){
                            target.guess +=i;
                            target.input.setString(target.guess);
                            break;

                        }
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
// 創建三個隨機數字出問題
// 上面呼叫的時候把參數傳進去了 參數d是3
function createAnswer(d){
    var n = [0,1,2,3,4,5,6,7,8,9];
    n = shuffle(n);
    var  r = "";
    for(var i =0;i<d;i++){
        r+= n[i]; //因為每次的陣列都透過shuffle()打亂了
        // 所以我抽出的 n[0] n[1] n[2]都不一樣
    }
    return r;
};

//打亂陣列的方法
//用 a.length = 10跑迴圈
//

function shuffle(a){

    var i;
    //a.length=10 陣列是從第0項開始數
    //所以第一次的i-1就是再說a[9] 也就是 n[9]
    for(i=a.length;i;i--){
       var randow = parseInt((Math.random()*i));
        var x = a[i-1]; // 假設現在是跑第一圈 i=10 x=a[9]
        a[i-1] = a[randow]; // 把0~9的亂數存到 最後一項
        a[randow] = x; // 然後再把原本的a[9]放進去亂數那一項(交換位置的意思)
    }
    return a;
};
 function checkAB (ans,guess){
     var a =0; //這裡的AB代表幾A幾B 總共有三次 0 1 2
     var b =0;
     for(var i =0;i<guess.length;i++){
         //charAt表示字串符中的某個位置
         //如果第一個 第二個 或第三個的問題==使用者的答案
         //a++
         if(ans.charAt(i) == guess.charAt(i)){
             a++
         }
         //indexOf返回某個指定的字符串值在字符串中首次出現的位置
         else if (ans.indexOf(guess.charAt(i)) !== -1){
             b++
         }
     }
     return a  + "A" + b + "B"; // return回傳代表函式結束 回傳到呼叫的地方
 }



