requirejs.config({
	baseUrl : '.', //index.html的路径
	paths : {
		app : '../out/test' //app的路径
	}
});

requirejs(['../out/test/main.js']); 
//requirejs(['../out/test.js']); //app入口文件