
require(['jquery'], function ($) {
	$("#outside2").html("下面是一个幻灯片");
});


require(['jquery','VJ'], function ($,VJ) {
	VJ($("#outside")).slideFade("li_df","li_ac","arrow_left","arrow_right");
});