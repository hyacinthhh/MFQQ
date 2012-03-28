	var backgroundImg = new Image();//����ͼ   
    var maleQQImg = new Image();//������
	var femaleQQImg= new Image();//ĸ����
	var starImg=new Image(); //��Ʒ����
	
    var ctx;//2d����   
    var screenWidth;//��������   
    var screenHeight;//�����߶�   
	
	var speed =2;
	var angle =2;
	var horizontalSpeed= speed;
	var verticalSpeed= -speed;
	
       
    //���� ����һ����Ϸ����Ϸ����   
    function GameObject()   
    {   
        this.x = 0;   
        this.y = 0;   
        this.image = null;   
    }   
       
    //���幫����MaleQQ��ĸ����FamaleQQ�̳���Ϸ����GameObject   
    function MaleQQ() {};   
    MaleQQ.prototype = new GameObject();//��Ϸ����GameObject   
	function FemaleQQ() {};
	FemaleQQ.prototype = new GameObject();
	FemaleQQ.prototype.angle=0;//�ı�ĸ��������ת�Ƕ�
	
	//���影Ʒ����Prizes�Ͷ���Prize���̳���Ϸ����GameObject
	var prizes=new Array();
	function Prize() {};
	Prize.prototype=new GameObject();
	Prize.prototype.row=0;
	Prize.prototype.col=0;
	prize.prototype.hit=false;
	
       
    //ʵ��������  
    var maleQQ = new MaleQQ();   
	var femaleQQ = new FemaleQQ();
    //ѭ����������   
	
	//�����߽��Ĵ�������
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
	
	//������;������2�������Ƿ���ײ   
	//����object1������1   
	//����object1������2   
	//����overlap�����ص�������ֵ   
	//���ز���ֵ����ײ����true������ײ����false   
	function CheckIntersect(object1, object2, overlap)   
	{   
		//    x-��                      x-��   
		//  A1------>B1 C1              A2------>B2 C2   
		//  +--------+   ^              +--------+   ^   
		//  | object1|   | y-��         | object2|   | y-��   
		//  |        |   |              |        |   |   
		//  +--------+  D1              +--------+  D2   
		//  ��ͼ��֪��������4������λ��   
		A1 = object1.x + overlap;   
		B1 = object1.x + object1.image.width - overlap;   
		C1 = object1.y + overlap;   
		D1 = object1.y + object1.image.height - overlap;   
		
		A2 = object2.x + overlap;   
		B2 = object2.x + object2.image.width - overlap;   
		C2 = object2.y + overlap;   
		D2 = object2.y + object2.image.width - overlap;   
		
		//����������x-���ص�   
		if(A1 > A2 && A1 < B2   
		   || B1 > A2 && B1 < B2)   
		{   
			//�ж�y-���ص�   
			if(C1 > C2 && C1 < D1   
		   || D1 > C2 && D1 < D2)   
			{   
				//��ײ   
				return true;   
			}   
		}   
		return false;   
	}  
	
	//��ײ����ʱ���Լ�����
	function HasHitMaleQQ()
	{
			if(CheckIntersect(femaleQQ,maleQQ,5))
			{	
				if((femaleQQ.x+femaleQQ.width/2)<(maleQQ.x+maleQQ.image.width*0.25))
				{
					horizontalSpeed=-speed;//���·����ٶȷ���
				}
				else if ((femaleQQ.x+femaleQQ.image.width/2)<(maleQQ.x+maleQQ.image.width*0.5))
				{
					horizontalSpeed=-speed/2;//���Ϸ����ٶȷ�������
				}
				else if((femaleQQ.x+femaleQQ.image.width/2)<(maleQQ.x+maleQQ.image.width*0.75))
				{
					horizontalSpeed=speed/2;//���Ϸ����ٶȼ���
				}
				else
				{
					horizontalSpeed=speed;//���·����ٶȷ���
				}
				verticalSpeed=-speed;
			}
	}
	
	//ײ����Ʒ
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
	}*/
	
	//������Ʒ����
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
	
	//���ƽ�Ʒ
	function DrawPrizes()
	{
		for(var x=0;x<prizes.length;x++)
		{
			currentPrize=prizes[x];
		//	if(!currentPrize.hit)
		//	{
				ctx.drawImage(currentPrize.image,prizes[x].x,prizes[x].y);
		//	}
		//}
	}

    function gameLoop()   
    {   
        //������Ļ   
        ctx.clearRect(0, 0, screenWidth, screenHeight);   
        ctx.save();   
        //���Ʊ���   
        ctx.drawImage(backgroundImg, 0, 0);   
        //���ƹ����� 
        ctx.drawImage(maleQQ.image, maleQQ.x, maleQQ.y);   
		//����ĸ����
		//DrawPrizes();//���ƽ�Ʒ
		
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
    //����ͼƬ   
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
    //��ʼ��   
    $(window).ready(function(){   
		addEventHandlers();//�����¼�����
        loadImages();           
        ctx = document.getElementById('canvas').getContext('2d'); //��ȡ2d����      
        screenWidth = parseInt($("#canvas").attr("width")); //�������� 
        screenHeight = parseInt($("#canvas").attr("height"));   
          
        maleQQ.x = parseInt(screenWidth/2);// ������X����  
        maleQQ.y = screenHeight - 40;//������Y����
		
		//��ʼ��ĸ����
		femaleQQ.x=parseInt(screenWidth/2);
		femaleQQ.y=parseInt(screenHeight/2);
		//InitPrizes();
        setInterval(gameLoop, 10);   
    });   