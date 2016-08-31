---
title: 在Windows下，利用Hexo+GitHub Pages快速搭建个人站点
date: 2016-04-10 23:55:32
categories:
- Building Site
tags:
- Windows
- GitHub Pages
- hexo
---
<!-- toc -->
## 安装NodeJs
去[nodejs.org](https://nodejs.org/en/)下载以.msi为扩展名的安装包，如果不需要进行NodeJs相关开发的话选择LTS版本就够了，双击安装
## 安装GitHub Desktop
直接下载[GitHub Desketop](https://desktop.github.com/)，安装并登录即可
## 安装hexo
```
npm install -g hexo-cli
```
至此，即可使用hexo搭建站点了
## 搭建默认页面
**如果不是要将你的username.github.io整个页面搭建为博客站点建议不要以username.github.io这个repo作为站点部署的目标。如果只是要搭建博客站，可以直接在GitHub上新建一个叫blog的repo，后面的_config.yml配置的branch对应gh-pages，以后部署站点直接通过“hexo deploy”就会自动将本地内容push到GitHub上去。**

1. 打开Git Shell，依次输入以下命令：
  ```
hexo init blog # blog为博客目录，可以自定义；这条命令是用来使hexo自动添加站点需要的文件
cd blog # 切换到刚才创建并初始化的存放博客文件的站点目录
npm install # 安装包依赖
  ```

2. 至此，已经可以通过以下命令来搭建本地服务器，在浏览器中输入 http://localhost:4000/ 查看测试页面了
  ```
hexo server
  ```
  PS：添加`-p`加端口号作为参数，可以自定义端口，更多命令可查看hexo文档的[commands](https://hexo.io/docs/commands.html)部分

3. 在上一步创建的blog目录下，找到`_config.yml`文件，用文本编辑器打开（建议用notedpad++等编辑器，而不是系统自带的notedpad），做如下修改:
  ```
deploy:
      type: git
      repo: https://github.com/uolcano/blog.git
      branch: gh-pages
  ```
  PS：这里的`repo`关键字对应站点部署在GitHub上的目标repo的git地址；`branch`关键字对应的分支分两种情况：
  1. 就是上面示例的样子，我是要将另一个叫blog的仓库作为我的博客站，所以只需要当作项目demo站点。而内容push全部交给hexo，hexo根据这个`_config.yml`文件的`repo`和`branch`字段就会知道如何push到GitHub上去了。
  2. 如果你是要将站点直接部署在username.github.io这个repo上，则修改为如下形式：
  ```
  repo: https://github.com/uolcano/uolcano.github.io.git
  branch: master
  ```

  我刚开始是对uolcano.github.io直接部署的，结果导致整个repo都被覆盖了，然后就只能delete repo再创建并且把本地的repo数据push到新建的uolcano.github.io，才保证了原有的内容。

4. 一般在部署之前，都需要安装hexo-deployer-git，而后才能部署成功
  ```
npm install hexo-deployer-git --save
hexo deploy
  ```
  提示如下信息即表示部署成功，可以通过 http://uolcano.github.io/blog/ 来访问我搭建的个人博客：
  ```
  INFO Deploty done: git
  ```

5. 以后每次发文只需要进行如下操作：
  ```
hexo new "文章标题名"
hexo generate
hexo deploy # 后面这两条命令可以简写为 hexo g -d 或者 hexo d -g
  ```
  PS：因为在`_config.yml`中的default_layout字段默认是`post`的，即表示你默认是以post的方式发文的，所以新建的文章文件，存放在blog/source/_posts目录下。而hexo有多种发布方式：“_posts”对应`post`这种发布方式，其他的还有`draft`和`page`。

## 常用命令
```
hexo init <folder> # 创建并初始化一个站点文件夹
hexo clean # 用于主题切换等涉及到站点整体布局效果改变时清除hexo原有缓存
hexo new 'article title' # 新增一篇文章
hexo generate # 可以简写为 hexo g ，为文章自动生成静态页面的文件
hexo server # 可简写为 hexo s ，开启本地服务器，测试静态页面的效果
hexo deploy # 可简写为 hexo d ，将本地页面部署到GitHub Pages上
hexo generate -d # 生成静态页面的文件并直接部署
hexo deploy -g # 跟上一条命令相同作用
```

更多的信息建议去查hexo[文档](https://hexo.io/docs/index.html)和关注hexo的GitHub [issues](https://github.com/hexojs/hexo/issues)。

## bonus
如果是需要给你的站点安装NexT主题可以在[这里](http://theme-next.iissnan.com/getting-started.html)得到帮助。

## 参考资料
- [GitHub hexo](https://github.com/hexojs/hexo)
- [GitHub hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git)
- [hexo docs](https://hexo.io/docs/index.html)
- [如何利用GitHub Pages和Hexo快速搭建个人博客](http://sunwhut.com/2015/10/30/buildBlog/)