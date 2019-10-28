# solvesudoku.js
# 注意: **由于操作过于规律，现在使用此脚本会导致封设备**
solvesudoku.js 是依靠 [mod_solvesudoku](https://github.com/KLGJ/mod_solvesudoku) 模块自动解数独的 Auto.js 的 JavaScript 脚本

* Auto.js [主页](https://github.com/hyb1996/Auto.js) [下载页面](https://github.com/hyb1996/Auto.js/releases)
* 由于 Github 的 releases 时常下载很慢，所以将下载好的 Auto.js 上传到本项目里边了。[下载地址](https://github.com/KLGJ/solvesudoku.js/raw/master/Auto.js-4.0.5.Alpha.apk)

配置好 mod_solvesudoku，配置方法见 mod_solvesudoku 中的 README.md。将 solvesudoku.js 放到 Auto.js 的脚本文件夹里，开启 Auto.js 的无障碍服务，点击 solvesudoku.js 右侧的播放按钮，在 5 秒内切换到全民数独，Auto.js 将自动填完数独。

**脚本是依靠控件的坐标识别数字控件的，不同分辨率的手机控件的坐标不同，需要根据实际情况配置。** 配置过程如下。

## 配置
将 solvesudoku.js 中 url 的值改为 mod_solvesudoku 模块工作的 URL。

开启 Auto.js 的无障碍服务和截图权限

![image](https://github.com/KLGJ/solvesudoku.js/raw/master/Screenshots/00.png)

打开一局数独，点击 Auto.js 悬浮窗中的蓝色按钮，并点击布局范围分析

![image](https://github.com/KLGJ/solvesudoku.js/raw/master/Screenshots/01.png)
![image](https://github.com/KLGJ/solvesudoku.js/raw/master/Screenshots/02.png)
![image](https://github.com/KLGJ/solvesudoku.js/raw/master/Screenshots/03.png)

点击左上角的 9，点击查看控件信息

![image](https://github.com/KLGJ/solvesudoku.js/raw/master/Screenshots/04.png)
![image](https://github.com/KLGJ/solvesudoku.js/raw/master/Screenshots/05.png)

出现一个弹窗，其中 bounds 属性值分别是 控件左边缘与屏幕左边的距离、控件上边缘与屏幕上边的距离、控件右边缘与屏幕左边的距离、控件下边缘与屏幕上边的距离，四个值分别是 6,144,82,220，将 144,220 作为一个数组，填入代码中 rows 的第一个元素，将 6,82 作为一个数组，填入 columns 的第一个元素。

接着点 9 下边的6，查看控件信息

![image](https://github.com/KLGJ/solvesudoku.js/raw/master/Screenshots/06.png)
![image](https://github.com/KLGJ/solvesudoku.js/raw/master/Screenshots/07.png)

将 \[222, 298\] 作为 rows 的第二个元素。

接着点 6 右下角的 1，查看控件信息

![image](https://github.com/KLGJ/solvesudoku.js/raw/master/Screenshots/08.png)
![image](https://github.com/KLGJ/solvesudoku.js/raw/master/Screenshots/09.png)

将 \[84, 160\] 作为 columns 的第二个元素,将 \[300, 378\] 作为 rows 的第三个元素，以后元素依次类推。

接着点一个空白的地方，输入键盘会弹出，还点击悬浮窗中的布局范围分析，点击键盘中的 1，查看控件信息

![image](https://github.com/KLGJ/solvesudoku.js/raw/master/Screenshots/10.png)
![image](https://github.com/KLGJ/solvesudoku.js/raw/master/Screenshots/11.png)

bounds 的四个属性值是 4,928,148,1022，将 \[4,928,148,1022\] 作为 numBounds 的第一个元素。点击键盘 2

![image](https://github.com/KLGJ/solvesudoku.js/raw/master/Screenshots/12.png)
![image](https://github.com/KLGJ/solvesudoku.js/raw/master/Screenshots/13.png)

将 \[146,928,290,1022\] 作为 numBounds 的第二个元素，依次类推。设置完后保存。
