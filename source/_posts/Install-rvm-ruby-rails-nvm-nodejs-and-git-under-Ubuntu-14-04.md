---
title: Install rvm, ruby, rails, nvm, nodejs and git under Ubuntu 14.04
date: 2016-04-10 23:34:25
categories:
- Building Site
tags:
- Ubuntu 14.04
- rvm
- ruby
- rails
- nvm
- nodejs
- git
---

1. 下载证书
  ```
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
  ```

2. 安装稳定版rvm以及最新版的ruby
  ```
curl -L https://get.rvm.io | bash -s stable --autolibs=enabled --ruby
  ```

3. 安装依赖，初始化并立即执行
    ``` 
sudo apt-get install libgdbm-dev libncurses5-dev automake libtool bison libffi-dev
source ~/.rvm/scripts/rvm
    ```

4. 修改rubygems的源为淘宝ruby源，并查看确认
    ```
gem sources --add https://ruby.taobao.org/ --remove https://rubygems.org/
gem sources -l
    ```
    PS：淘宝源如果有问题fetch error的话，可以改用 https://gems.ruby-china.org/ 替换。

5. 以sudo安装rubygems-update
    ```
gem install rubygems-update
update_rubygems
gem update --system
    ```

6. 安装bundler
    ```
gem install bundler
    ```

7. 安装rails
    ```
gem install rails
    ```

8. 安装nvm
    ```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
    ```
	安装最新版nodejs
    ```
nvm install 5.0
    ```

9. 安装及配置git
    ```
sudo apt-get install git
    ```
    配置git基本信息，并生成ssh公钥
    ```
git config --global color.ui true
git config --global user.name "YOUR NAME"
git config --global user.email "YOUR@EMAIL.com"
git config -l #查看配置信息
ssh-keygen -t rsa -C "YOUR@EMAIL.com" # 一直敲回车
    ```
    查看生成的公钥，并复制之
    ```
cat ~/.ssh/id_rsa.pub # id_rsa 应该是ubuntu系统分配的，只能用这个文件名
    ```
    到github settings->SSH and GPG keys->[SSH keys](https://github.com/settings/ssh)->new SSH key，给SSH key写个名字作为Title，在key下粘贴从id_rsa.pub里复制公钥。然后Add SSH key即可。
    
    将本地git与github账号建立连接
    ```
ssh -T git@github.com
    ```
    显示一下信息，即表示连接成功
    `Hi YOUR NAME! You've successfully authenticated, but GitHub does not provide shell access.`


## 参考链接
- https://rvm.io/rvm/install
- https://github.com/rvm/rvm
- https://gorails.com/setup/ubuntu/14.04
- https://ruby.taobao.org/
- http://gems.ruby-china.org/
- http://stackoverflow.com/questions/13626143/how-to-upgrade-rubygems
- https://github.com/creationix/nvm
- https://help.github.com/articles/set-up-git/