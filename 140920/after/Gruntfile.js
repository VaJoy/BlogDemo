module.exports = function(grunt) {
  grunt.initConfig({ 
    pkg: grunt.file.readJSON('package.json'),
    //上面是固定好的，不用管它，照搬即可。
	//下面是各插件事务的配置，顺序不分先后
	sass: { // grunt-contrib-sass的事务定义
	  tocss: {
		options: {       
		  style: 'compressed', //以压缩模式编译css，这样咱们也没必要使用grunt-contrib-cssmin插件了
		  sourcemap:'none'  //设置不要配套输出map文件
		},
		files: [{
			expand:true,
			cwd:'css',//css目录下
			src:'**/*.scss',//所有css文件
			dest: 'css',//输出到此目录下
			ext: '.css'
		}]
	  }
	},
    uglify: {  // grunt-contrib-uglify的事务定义
      compressjs: {
        files: [{
			expand:true,
			cwd:'js',//js目录下
			src:'**/*.js',//所有js文件
			dest: 'output/js'//输出到此目录下
		}]
      }
	},
	watch: {  // grunt-contrib-watch的事务定义
      all: {
        files: ['css/**/*.scss','js/**/*.js'],
        tasks: ['newer:sass','newer:uglify']
      }
    }
  });
  //grunt.loadNpmTasks() 是告诉Grunt，咱们要使用哪些插件，顺序不分先后
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-newer');
  //grunt.registerTask('default', [])是告诉Grunt，我们在node命令行输入grunt指令后要执行哪些事务
  grunt.registerTask('default', ['newer:sass','newer:uglify','watch']);  //注意 "newer:XXX"是插件grunt-newer的事件定义，表示对冒号后面的事务生效
};

