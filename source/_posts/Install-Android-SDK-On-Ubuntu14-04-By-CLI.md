---
title: Install Android SDK On Ubuntu14.04 By CLI
date: 2016-05-18 14:46:05
tags:
---
## Installing Steps
```
# install jdk
sudo apt-get install openjdk-7-jdk
# or install jdk by default
sudo apt-get install default-jdk
# download android sdk
wget http://dl.google.com/android/android-sdk_r24.2.1-linux.tgz 
# or download from https://developer.android.com/studio/index.html
# then unzip
tar -xvf android-sdk_r24.2.1-linux.tgz
# chang directory to sdk/tools
cd android-sdk-linux/tools
# install all sdk packages
./android update sdk --no-ui
# set path. skip to next step if not work.
vi ~/.zshrc << EOT
export PATH=${PATH}:$HOME/sdk/android-sdk-linux/platform-tools:$HOME/sdk/android-sdk-linux/tools:$HOME/sdk/android-sdk-linux/build-tools/22.0.1/
EOT
# install 32-bit libraries on 64-bit Ubuntu
sudo apt-get install lib32z1 lib32ncurses5 lib32bz2-1.0 lib32stdc++6
```

## Ref
- [ubuntu14.04-command-line-install-android-sdk](https://gist.github.com/wenzhixin/43cf3ce909c24948c6e7#file-ubuntu14-04-command-line-install-android-sdk-L4-L5)
- [Install Android Studio](https://developer.android.com/studio/install.html)
- [resolve the SDK LOCATION ERROR in Answer one](http://stackoverflow.com/questions/19794200/gradle-android-and-the-android-home-sdk-location)
- [How To Install Java on Ubuntu with Apt-Get](https://www.digitalocean.com/community/tutorials/how-to-install-java-on-ubuntu-with-apt-get)