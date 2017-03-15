SASS是Ruby语言写的，必须先安装Ruby（http://www.ruby-lang.org/zh_cn/downloads/），然后再安装SASS。

装完后直接运行：gem install sass


接下来就能使用sass啦

sass main.scss main.css // 将scss文件转换成css文件

sass --style compressed main.sass main.css // 将scss文件转换成压缩后的css文件

sass --watch --style compressed main.scss:main.css // SASS监听main.scss文件，若有变动直接输出




当然也能直接用gulp的sass插件


