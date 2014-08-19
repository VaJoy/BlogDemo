require.config({
    paths: {    //相对这个js文件的路径
        avalon: '../common/avalon'
    }
});

require(['avalon'], function ($) {
	var reg = avalon.define("reg", function(vm) {
		 vm.username = "";
    })
});

