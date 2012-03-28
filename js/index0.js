	var backgroundImg = new Image();//背景图   
    var maleQQImg = new Image();//公企鹅
	var femaleQQImg= new Image();//母企鹅
	//var starImg=new Image(); //奖品星星
	
    var ctx;//2d画布   
    var screenWidth;//画布宽度   
    var screenHeight;//画布高度   
	
	var speed =2;
	var angle =2;
	var horizontalSpeed= speed;
	var verticalSpeed= -speed;
	
       
    //公用 定义一个游戏物体戏对象   
    function GameObject()   
    {   
        this.x = 0;   
        this.y = 0;   
        this.image = null;   
    }   
       
    //定义公企鹅MaleQQ和母企鹅FamaleQQ继承游戏对象GameObject   
    function MaleQQ() {};   
    MaleQQ.prototype = new GameObject();//游戏对象GameObject   
	function FemaleQQ() {};
	FemaleQQ.prototype = new GameObject();
	FemaleQQ.prototype.angle=0;//改变母企鹅的旋转角度
	
	//定义奖品数组Prizes和对象Prize，继承游戏对象GameObject
	/*var prizes=new Array();
	function Prize() {};
	Prize.prototype=new GameObject();
	Prize.prototype.row=0;
	Prize.prototype.col=0;
	prize.prototype.hit=false;*/
	
       
    //实例化对象  
    var maleQQ = new MaleQQ();   
	var femaleQQ = new FemaleQQ();
    //循环描绘物体   
	
	//碰到边界的处理函数
	function HasHitEdge()
	{
		if(femaleQQ.x>screenWidth-femaleQQ.image.width)
		{
			if(horizontalSpeed>0)
				horizontalSpeed=-horizontalSpeed;
		}
		if(femaleQQ.x<-10)
		{
			if(horizontalSpeed<0)
				horizontalSpeed=-horizontalSpeed;
		}
		if(femaleQQ.y>screenHeight-femaleQQ.image.height)
		{
			setTimeout(function(){
				horizontalSpeed=speed;
				verticalSpeed=-speed;
				femaleQQ.x=parseInt(screenWidth/2);
				femaleQQ.y=parseInt(screenHeight/2);
				gameLoop();
			},2000);
		}
		if(femaleQQ.y<0)
		{
			verticalSpeed=-verticalSpeed;
		}
	}
	
	//方法用途：检测2个物体是否碰撞   
	//参数object1：物体1   
	//参数object1：物体2   
	//参数overlap：可重叠的区域值   
	//返回布尔值：碰撞返回true，不碰撞返回false   
	function CheckIntersect(object1, object2, overlap)   
	{   
		//    x-轴                      x-轴   
		//  A1------>B1 C1              A2------>B2 C2   
		//  +--------+   ^              +--------+   ^   
		//  | object1|   | y-轴         | object2|   | y-轴   
		//  |        |   |              |        |   |   
		//  +--------+  D1              +--------+  D2   
		//  看图可知两物体各4个点的位置   
		A1 = object1.x + overlap;   
		B1 = object1.x + object1.image.width - overlap;   
		C1 = object1.y + overlap;   
		D1 = object1.y + object1.image.height - overlap;   
		
		A2 = object2.x + overlap;   
		B2 = object2.x + object2.image.width - overlap;   
		C2 = object2.y + overlap;   
		D2 = object2.y + object2.image.width - overlap;   
		
		//假如他们在x-轴重叠   
		if(A1 > A2 && A1 < B2   
		   || B1 > A2 && B1 < B2)   
		{   
			//判断y-轴重叠   
			if(C1 > C2 && C1 < D1   
		   || D1 > C2 && D1 < D2)   
			{   
				//碰撞   
				return true;   
			}   
		}   
		return false;   
	}  
	
	//碰撞发生时间以及处理
	function HasHitMaleQQ()
	{
			if(CheckIntersect(femaleQQ,maleQQ,5))
			{	
				if((femaleQQ.x+femaleQQ.width/2)<(maleQQ.x+maleQQ.image.width*0.25))
				{
					horizontalSpeed=-speed;//左下方，速度反向
				}
				else if ((femaleQQ.x+femaleQQ.image.width/2)<(maleQQ.x+maleQQ.image.width*0.5))
				{
					horizontalSpeed=-speed/2;//左上方，速度反弹减半
				}
				else if((femaleQQ.x+femaleQQ.image.width/2)<(maleQQ.x+maleQQ.image.width*0.75))
				{
					horizontalSpeed=speed/2;//右上方，速度减半
				}
				else
				{
					horizontalSpeed=speed;//右下方，速度反向
				}
				verticalSpeed=-speed;
			}
	}
	
	//撞到奖品
	/*function HasHitPrize()
	{
		for(var x=0;x<prizes.length;x++)
		{
			var prize=prizes[x];
			if(!prize.hit)
			{
				if(CheckIntersect(prize,animal,0))
				{
					prize.hit=true;
					verticalSpeed=speed;
				}
			}
		}
	}
	
	//创建奖品数组
	function InitPrizes()
	{
		var count=0;
		for(var x=0;x<3;x++)
		{
			for(var y=0;y<23;y++)
			{
				prize=new Prize();
				prize.image=starImg;
				prize.row=x;
				prize.col=y;
				prize.x=20*prize.col+10;
				prize.y=30*prize.row+20;
				prizes[count]=prize;
				count++;
			}
		}
	}
	
	//绘制奖品
	function DrawPrizes()
	{
		for(var x=0;x<prizes.length;x++)
		{
			currentPrize=prizes[x];
			if(!currentPrize.hit)
			{
				ctx.drawImage(currentPrize.image,prizes[x].x,prizes[x].y);
			}
		}
	}*/

    function gameLoop()   
    {   
        //清除屏幕   
        ctx.clearRect(0, 0, screenWidth, screenHeight);   
        ctx.save();   
        //绘制背景   
        ctx.drawImage(backgroundImg, 0, 0);   
        //绘制公企鹅 
        ctx.drawImage(maleQQ.image, maleQQ.x, maleQQ.y);   
		//绘制母企鹅
		//DrawPrizes();//绘制奖品
		
		femaleQQ.x+=horizontalSpeed;
		femaleQQ.y+=verticalSpeed;
		femaleQQ.angle+=angle;
		ctx.translate(femaleQQ.x+(femaleQQ.image.width/2),femaleQQ.y+(femaleQQ.image.height/2));
		ctx.rotate(femaleQQ.angle*Math.PI/180);
		ctx.drawImage(femaleQQ.image,-(femaleQQ.image.width/2),-(femaleQQ.image.height/2));
        ctx.restore();   
		HasHitEdge();
		HasHitMaleQQ();
		//HasHitPrize();
        }   
    //加载图片   
    function loadImages()   
    {   
        maleQQImg.src = "images/mq.png"; 
        backgroundImg.src = "images/background.jpg";
		femaleQQImg.src="images/fq.png";
		//starImg.src="images/star.png";
		
		maleQQ.image = maleQQImg; 
		femaleQQ.image=femaleQQImg;
    }      
	function addEventHandlers()
	{
		$("#container").mousemove(function(e){
			maleQQ.x=e.pageX-(maleQQ.image.width/2);
		});
	}
    //初始化   
    $(window).ready(function(){   
		addEventHandlers();//加上事件处理
        loadImages();           
        ctx = document.getElementById('canvas').getContext('2d'); //获取2d画布      
        screenWidth = parseInt($("#canvas").attr("width")); //画布宽度 
        screenHeight = parseInt($("#canvas").attr("height"));   
          
        maleQQ.x = parseInt(screenWidth/2);// 公企鹅X坐标  
        maleQQ.y = screenHeight - 40;//公企鹅Y坐标
		
		//初始化母企鹅
		femaleQQ.x=parseInt(screenWidth/2);
		femaleQQ.y=parseInt(screenHeight/2);
		//InitPrizes();
        setInterval(gameLoop, 10);   
    });   