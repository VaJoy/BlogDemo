require.config({
    paths: {    //相对这个js文件的路径
        jquery: '../common/jq',
		VJ:'../common/VajoyJS'
    }
});

require(['jquery'], function ($) {
	$("#outside2").html("下面是一个幻灯片");
});


require(['jquery','VJ'], function ($,VJ) {
	VJ($("#outside")).slideFade("li_df","li_ac","arrow_left","arrow_right");
});