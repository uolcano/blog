---
title: Windows batch脚本编程学习笔记
date: 2016-09-03
update: 2016-09-05
author: uolcano
categories: 
tags: 
---

## 简介
Windows批处理编程，专指在Windows NT、Windows XP、Windows Vista、Windows 7已经更新版本的操作系统上自带的命令解释器，其他比较低的微软操作系统并不支持，可以通过以下命令来查看操作系统版本

Windows Batch Scripting有多种别名：batch programming、batch file programming、batch file scripting、Windows batch command、Windows batch file、Windows command line、Windows command prompt以及Windows shell scripting。

以下统称batch编程。

## CMD命令行与batch的区别与联系
batch可以转换为命令行，在转换的时候有些字符会被转义（比如`%`和一些命令行本身会转义的字符）

## `echo`和`@echo`的区别
在batch中，`echo off`会命令行关闭交互模式，不显示命令只显示标准输出的结果，但是第一行`echo off`命令会被显示出来
`@echo off`则连`echo off`本身都不显示

## 特殊符号
主要是指用于batch命令中的条件处理符号

| 字符     | 语法                    | 定义                                          |
| -------- | ----------------------- | --------------------------------------------- |
| `&`      | command1 & command2     | 用于分隔多命令，前一个执行完毕，然后执行下一个|
| `&&`     | command1 && command2    | 后一个命令只有在前一个命令执行成功后才会执行  |
| `||`     | command1 \|\| command2  | 后一个命令只有在前一个命令执行失败后才会执行  |
| `(`和`)` | (command1 & command2)   | 用于聚合或者嵌套多个命令                      |
| `;`或`,` | command1 parameter1;parameter2 | 用于分隔命令参数列表                   |

## 重定向

输入输出

| 表示符号 | 说明   |
| -------- | ------ |
| 0        | stdin  |
| 1        | stdout |
| 2        | stderr |
| con      | 控制台输入，ctrl+z结束 |
| NUL      | 空     |

重定向符号

| 符号 | 说明 |
| ---- | ---- |
| <    | 读取文件       |
| >    | 写入或覆盖文件 |
| >>   | 写入或填充文件 |
| >&h 和 <&h  | h标示batch的IO标示符号，如`2>&1`标示标准错误信息归入标准输出中 |

## batch重载
命令解释器在执行完一行或者一个被圆括号包裹的命令集合后，都会重载batch文件的内容，这样容易出现后续内容被篡改的风险。可以对整个代码使用一个圆括号包裹起来

```bat
@echo off
for /L %%i in (1,1,10) do (
  echo A
  ping -n 2 127.0.0.1 >nul & REM wait
)
```

或这样

```bat
@echo off
(
ping -n 6 127.0.0.1 >nul & REM wait
echo A
)
```

## 设置命令行提示

默认的命令提示是`$P$G`，所以每个命令行都是显示为如下：

```bat
C:Windows\system32>
```

如果经过如下修改，在每行命令提示后都会多个空格

```bat
SETX PROMPT $P$G$S
```

更多信息请参考[PROMPT](http://ss64.com/nt/prompt.html)

## 常用命令
Windows的命令不区分大小写，大写为了方便理解这是命令

VER
	检查当前系统版本

SET

	```bat
	SET              # 查看所有临时环境变量
	SET P            # 查找所有P开头的环境变量
	SET var=str      # 添加环境变量var，其值为str
	SET var=         # 删除环境变量var
	SET /A expr      # 对expr这个表达式求值，算数运算、位运算和赋值运算，如SET /A 1+1 ，返回2
	SET /P var=prompt # 请求给var赋值前，打印一段提示信息，用于交互式信息输入
	```

	`SET`给变量赋的值可以有三种分隔方式：空格` `、逗号`,`和分号`;`

	```bat
	set var=a b,c;d
	```

	字符串操作

	获取子串substring：`%var:~start,length%`

	```bat
	set a=abcd
	echo %a:~0,1%  # a
	echo %a:~1,1%  # b
	echo %a:~-2%   # cd
	echo $a:~1,-1% # bc
	```

	子串替换replace：`%var:part=replace%`

	```bat
	set a=abcd & echo %a:c=%  # 删除c
	set a=abcd & echo %a:c=e% # 用e替换c
	set a=abcd & echo %a:*c=% % 删除变量a中的c以及c前面的所有字符
	```

	检查包含contain

	```bat
	set a=abcd
	if not "%a:bc=%"=="%a%" echo yes # 检查变量a是否包含bc这个子串
	set a=abcd
	if %a:~0,2%==ab echo yes         # 检查变量a是否以ab这个子串开头
	```

	延迟扩展

	相较于`%var%`的载入即扩展，`!var!`可实现延迟扩展，方便流控制

	```bat
	set VAR=before
	if "%VAR%" == "before" (
	    set VAR=after
	    if "!VAR!" == "after" @echo If you see this, it worked
	)
	```

FOR

	在batch文件中使用`FOR`时，参数变量要转义，如：`%%i`，而不是命令行中的`%i`；变量名是单一字母、区分大小写的全局变量

	```bat
	FOR %i IN (set) DO command [command-parameters] # 遍历文件，(set)可以用通配符
	FOR /D %i IN (set) DO command [command-parameters] # 遍历目录
	FOR /R [[drive:]path] %i IN (set) DO command [command-parameters] # 遍历以[drive:]path为根目录的树
	FOR /L %i IN (start,step,end) DO command [command-parameters] # 递增或递减遍历
	FOR /F ["eol=c skip=n delims=xxx tokens=x,y,m-n usebackq"] %i IN (file-set/"string"/`command`) DO command [command-parameters] # 可扩展遍历
	```

	如下，列出到当前目录下的子目录

	```bat
	FOR /D %d IN (*) DO (echo %d >> out.o)
	```

	FOR的参数变量的replace已被增强

	| 变量语法    | 描述                        |
	| ----------- | --------------------------- |
	| `%~I`       | 删除任何引号(`"`)，扩展`%I` |
	| `%~fI`      | 将%I扩展到一个完整路径      |
	| `%~dI`      | 仅将%I扩展到一个驱动器号    |
	| `%~pI`      | 仅将%I扩展到一个路径        |
	| `%~nI`      | 仅将%I扩展到一个文件名      |
	| `%~xI`      | 仅将%I扩展到一个文件扩展名  |
	| `%~sI`      | 扩展的路径只含有短名        |
	| `%~aI`      | 将%I扩展到文件的文件属性    |
	| `%~tI`      | 将%I扩展到文件的日期/时间   |
	| `%~zI`      | 将%I扩展到文件的大小        |
	| `%~$PATH:1` | 查找列在PATH环境变量的目录，并将%I扩展到找到的第一个完成的路径。如果环境变量名未被定义，或没有找到文件，此组合键会扩展到空字符串 |
	| `%~dpI`     | 混合使用，将%I扩展到一个驱动器号和路径 |

	以上%I和PATH都可替换为其他有效数值，使用大写是为了明显区分。








## 变量
Windows command解释器的变量分两种：

1. 环境变量
	以下`PATH`是系统自带的环境变量，也可以通过`SET`命令，自己设置临时的环境变量
	```bat
	PATH
	```

2. 参数变量
	假设有个batch文件内有以下代码
	```bat
	%1
	```
	`%1`表示这个bacth文件接收到的第一个参数

## 标准环境变量名
以下是Windows XP的系统和本地环境变量

| 变量名               | 类型   | 描述                                                 |
| ------------------- | ------ | ---------------------------------------------------- |
| `%ALLUSERSPROFILE%` | Local  | 返回存储所有用户的程序数据的文件夹路径               |
| `%APPDATA%`         | Local  | 返回存储当用户的程序数据的文件夹路径                 |
| `%CD%`              | Local  | 返回当前所在路径                                     |
| `%CMDCMDLINE%`      | Local  | 返回命令行程序绝对路径的字符串，用于启动`Cmd.exe`    |
| `%CMDEXTVERSION%`   | System | 返回命令行处理扩展的版本号（并不明白具体是干嘛的     |
| `%COMPUTERNAME%`    | System | 返回计算机名                                         |
| `%COMSPEC%`         | System | 返回命令行程序的绝对路径（注意跟`%CMDCMDLINE%`区别） |
| `%DATE%`            | System | 返回当前日期，跟`date /t`命令的结果一样              |
| `%ERRORLEVEL%`      | System | 返回最近一次使用的命令的错误码，非零表示有错误       |
| `%HOMEDRIVE%`       | System | 返回本地工作站得驱动盘符                             |
| `%HOMEPATH%`        | System | 返回当前用户主目录的全路径（不包括盘符的绝对路径）   |
| `%LOGONSERVER%`     | Local  | 返回当前登录回话的域名控制器名称，就是计算机名前名多两个反斜杠`\\` |
| `%NUMBER_OF_PROCESSORS%` | System | 指定安装于计算机上的处理器的数量                |
| `%OS%`              | System | 返回操作系统名，如：Windows 7上就是`Windows_NT`      |
| `%PATH%`            | System | 指定可执行文件的全局搜索路径，就是环境变量里的`PATH` |
| `%PATHEXT%`         | System | 返回改操作系统可执行程序的文件扩展名列表             |
| `%PROCESSOR_ARCHITECTURE%` | System | 返回处理器的芯片架构，如`AMD64`               |
| `%PROCESSOR_IDENTIFIER%` | System | 返回处理的其描述                                |
| `%PROCESSOR_LEVEL%` | System | 返回处理器型号                                       |
| `%PROCESSOR_REVISION%` | System | 返回处理器版本号                                  |
| `%PROMPT%`          | Local  | 返回当前解释器的命令提示设置，由`Cmd.exe`生成        |
| `%RANDOM%`          | System | 返回一个0到32767之间的随机十进制数，由`Cmd.exe`生成  |
| `%SYSTEMDRIVE%`     | System | 返回当前系统的根目录所在驱动盘符                     |
| `%SYSTEMROOT%`      | System | 返回当前系统根目录的绝对路径                         |
| `%TEMP%` 和 `%TMP%` | System 和 User | 返回默认的存储用户应用数据的暂存路径         |
| `%TIME%`            | System | 返回当前时间，跟`time /t`命令的结果一样              |
| `%USERDOMAIN%`      | Local  | 返回包含当前用户的域的名称                           |
| `%USERNAME%`        | Local  | 返回当前用户名                                       |
| `%USERPROFILE%`     | Local  | 返回当前用户的主要数据存储的绝对路径，跟`%HOMEPATH%`相同 |
| `%WINDIR%`          | System | 返回操作系统的绝对路径，跟`%SYSTEMROOT%`相同         |

可以通过`SET`命令列出以上大部分命令

```bat
SET
```

## 特殊变量名
特殊变量名是不能通过单独一个`SET`命令访问到期值的标准变量名
`%CD%` 、`%TIME%` 、`%DATE%` 、`%RANDOM%` 、`%ERRORLEVEL%` 、`%CMDEXTVERSION%` 、`%CMDCMDLINE%`

## 引用和字符转义
每种编程语言都会使用一定的字符作为命令执行的特殊字符，在这些特殊字符不需要其命令功能的时候，就需要转义。

batch也提供了通过引用来取消特殊字符命令功能的方法，如下就表示纯粹的字符串，不过引用符号也会作为字符串整体的一部分

```bat
echo 'Tom & Jerry'
```

batch中的特殊字符的转义，主要是以上脱字符`^`来完成

| 字符     | 实例                 | 输出          |
| -------- | -------------------- | ------------- |
| `<`和`>` | `echo a ^< b`        | `a < b`       |
| `&`      | `echo Tom ^& Jerry`  | `Tom & Jerry` |
| `|`      | `echo you ^| he`     | `you | he`    |
| `^`      | `echo 2^^4 = 16`     | `2^4 = 16`    |

换行符转义CR和LF

```bat
if 1 equ 1 ^
echo Equal &^
echo Indeed, equal
```

以上因为有行末的转义字符`^`，所以三行并做一行执行

百分符号比较特殊，即可以表示参数的操作（`%2`)，也可以引用环境变量（`%PATH%`），但是如果你想把他作为求模符号来使用或者只是输出为百分符号呢？

运行一个batch文件，其中的代码如下：

```bat
echo The ratio was 47%%.
set /a modulo=14%%3
for %%i in (1,2,3) do echo %%i
echo %temp%
```

以上batch文件的运行结果可以看出，batch文件的执行时会先转换为命令行命令，然后执行，而batch到命令行的转换过程中又会有部分字符串被转义。



- [Windows Batch Scripting](https://en.wikibooks.org/wiki/Windows_Batch_Scripting)
- [Command shell overview](https://technet.microsoft.com/en-us/library/bb490954.aspx#)