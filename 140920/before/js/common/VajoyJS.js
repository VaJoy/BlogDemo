/*VaJoyJS 1.0 
Based On jQuery and base.css
@author VaJoy Larn 
http://vajoy.cnblogs.com
NOTICE:
Here sets the minimum z-index as 1000.
*/
define(function () {
	var z_index0=1000, z_index1=1001, z_index2=1002, z_index3=1003;
	//FadeIn/Out SlidePics 淡出淡入式幻灯片
	return function VJ(container) { 
		container = container || $(window);
		
	return {

		slideFade:function(li_default_class, li_active_class, arrow_left, arrow_right, isAuto){
			var isAuto = isAuto===!1?isAuto:true, isArrow=!1;
			if(typeof(arrow_left)==="boolean"||arrow_left.toLowerCase()==="true"||arrow_left.toLowerCase()==="false")
			isAuto = arrow_left.toLowerCase()==="true"?true:arrow_left.toLowerCase()==="false"?false:arrow_left;
			else if(typeof(arrow_left)==="string") { 
				isArrow=!0 ; 
			}
			var auto_time = 5000,   //图片停显时间
				li_margin = "5px", li_bottom = 10,  //li之间的左右间距，和距离图片底部的距离
				arrow_margin = "10px"; //左右箭头分别距离两端的长度
			var $slide = container,
				$pic = $("a",container), $ul = $("<ul></ul>"),
				pic_w , pic_h = $slide.height(), pic_l = $pic.length;
			$ul.appendTo(container);
			$pic.css({"display":"block","position":"absolute","z-index":z_index0,"height":pic_h});
			var pl=pic_l; while(pl--){ $("<li></li>").appendTo($ul); }  //添加li按钮
			var $li = $("li",container),
			cirNum = 1, cirCount = pic_l-1;
			$("a:gt(0)",container).hide();
			$ul.addClass("clearfix").css({"position":"absolute","display":"inline","z-index":z_index2,"bottom":li_bottom});
			$li.css({"float":"left","margin":"0 "+li_margin,"cursor":"pointer"}).addClass(li_default_class).eq(0).removeClass(li_default_class).addClass(li_active_class);
			
			var addHover = function(obj){obj.removeClass(li_default_class).addClass(li_active_class);}    //鼠标移上li按钮
			var removeHover = function(obj){obj.removeClass(li_active_class).addClass(li_default_class);}     //鼠标移出li按钮
	
			$("li:gt(0)",container).on("mouseover",function(){addHover($(this));}).on("mouseleave",function(){removeHover($(this));})   //初始化绑定li的hover效果（激活状态的li不绑定）
			
			var UlMiddle = (function ResetVal(){   //窗口resize的时候调用
				pic_w = $slide.width();
				$pic.css("width",pic_w);
				$ul.css({"margin-left":-$ul.width()/2,"left":pic_w/2});
				return ResetVal;
			})();
			
			function changeimg(i){     //图片切换效果函数
					if(cirNum>cirCount){
							cirNum=0;
							i=0;
					}
					else if(cirNum<0){
							cirNum=cirCount;
							i=cirCount;
					}
					cirNum= i+1;
					$li.eq(i).removeClass(li_default_class).addClass(li_active_class)
					.off("mouseover").off("mouseleave")  //激活状态的li不绑定hover
					.siblings("li").removeClass(li_active_class).addClass(li_default_class)
					.on("mouseover",function(){addHover($(this));}).on("mouseleave",function(){removeHover($(this));})   //绑定非激活状态的li的hover效果
					
					
					if($pic.eq(i).css("z-index")!=z_index1)
					$pic.fadeOut(500).css("z-index",z_index0).eq(i).css("z-index",z_index1).fadeIn(500);
						if(isAuto){
							clearTimeout(st);
							st = setInterval("VJ_slideFade_autoPlay()",auto_time);
						}
				} 
				
				$li.each(function(index){     //绑定li的click事件
					$(this).click(function(){
						cirNum = index;
						changeimg(index);
					})
			})
			
			if(isArrow){      //左右箭头按钮
				var $arrows = $("<span></span><span></span>")
				$arrows.eq(0).addClass(arrow_left).css({"left":arrow_margin}).click(function(){ cirNum-=2; changeimg(cirNum);});
				$arrows.eq(1).addClass(arrow_right).css({"right":arrow_margin}).click(function(){ changeimg(cirNum);});
				$arrows.css({"display":"block","position":"absolute","z-index":z_index3,"cursor":"pointer","opacity":"0.7"}).appendTo(container);
				$arrows.hover(function(){$(this).css("opacity","1");},function(){$(this).css("opacity","0.7")});
				var arrow_t = pic_h/2 - $arrows.eq(0).height()/2;  //左右两箭头距离顶部的高度，默认居中
				$arrows.css("top",arrow_t);
			}
			
			if(isAuto){
			  VJ_slideFade_autoPlay = function(){  //自动播放函数（全局）
					  changeimg(cirNum);
				  }
			  st = setInterval("VJ_slideFade_autoPlay()",auto_time);
			}
			$(window).on("resize",function(){UlMiddle();});
	
		}//function slideFade结束
	}
	} //function VJ(container)结束
	 

});