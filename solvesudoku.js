const url = "http://192.168.0.2/solvesudoku"; // 主机接收数据的 URL，根据实际情况更改
const pressTime = 50; // 一次按压的时间
const jiangeTime = 100; // 两次按压间隔的时间

// 一列中数字小部件的上、下边界，根据手机情况自行更改
const rows = [[144, 220], [222, 298], [300, 378], [380, 458], [460, 536], [538, 616], [618, 696], [698, 774], [776, 852]];

// 一行中数字小部件的左、右边界，根据手机情况自行更改
const columns = [[6, 82], [84, 160], [162, 240], [242, 320], [322, 398], [400, 478], [480, 558], [560, 636], [638, 714]];

// 填的数字的左、上、右、下边界，根据手机情况自行更改
const numBounds = [
    [4, 928, 148, 1022],
    [146, 928, 290, 1022],
    [288, 928, 432, 1022],
    [430, 928, 574, 1022],
    [572, 928, 716, 1022],
    [4, 1020, 148, 1116],
    [146, 1020, 290, 1116],
    [288, 1020, 432, 1116],
    [430, 1020, 574, 1116]
];

const round = Math.round;
if (prepared()) main();

function prepared() {
    auto(); // 确保无障碍服务开启
    toast("请在5秒内打开游戏，并点击开始按钮");
    let qie = false;
    let thread1 = threads.start(function () { sleep(5000); });
    let thread2 = threads.start(function () { waitForPackage("cn.flytalk.shudu"); qie = true; });
    thread1.waitFor();
    thread2.waitFor();
    while (thread1.isAlive() && thread2.isAlive()) sleep(50);
    threads.shutDownAll();
    if (!qie) {
        toast("未打开游戏，已停止执行！");
        return false;
    }
    return true;
}

function main() {
    if (currentPackage() === "cn.flytalk.shudu") { // 当前应用是“全民数独”
        let txt = '';
        let que = new Array();
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++) {
                let selector = bounds(columns[x][0], rows[y][0], columns[x][1], rows[y][1]); // 根据窗口小部件边界创建选择器
                if (selector.exists()) { // 这个地方有数字
                    txt += selector.findOnce().text(); // 获取数字
                    que[y * 9 + x] = false;
                }
                else { // 这个地方没有数字
                    txt += '.'; // 没有数字的地方记为“.”
                    que[y * 9 + x] = true;
                }
            }
            txt += ';'; // 每两行数字之间用“;”分隔
        }
        /* 由于 http.post 的第二个参数类型是对象, 传输的过程中对象名和对象内容之间有个等号
         * 模块接收的数据第一个“;”(传输过程中编码为“%3B”)前边可以有注释，注释以“#”(传输过程中编码为“%23”)开头
         * 所以对象名设置为“#”，在数字之前加一个“;”
         */
        let res = http.post(url, {
            '#': ';' + txt
        });
        res = res.body.string();
        res = res.split('\n', 9);
        for (let y = 0; y < 9; y++)
            for (let x = 0; x < 9; x++)
                if (que[y * 9 + x]) { // 这个地方没有数字，需要填
                    if (currentPackage() !== "cn.flytalk.shudu") return;
                    mclick(x, y);
                    sleep(jiangeTime); // 按得太快会导致成绩上传不了，需要间隔一段时间
                    if (currentPackage() !== "cn.flytalk.shudu") return;
                    clickNumber(parseInt(res[y].charAt(x)) - 1);
                    sleep(jiangeTime); // 按得太快会导致成绩上传不了，需要间隔一段时间
                }
    }
}

function clickNumber(n) {
    press(round((numBounds[n][0] + numBounds[n][2]) / 2), round((numBounds[n][1] + numBounds[n][3]) / 2), pressTime);
}

function mclick(x, y) {
    press(round((columns[x][0] + columns[x][1]) / 2), round((rows[y][0] + rows[y][1]) / 2), pressTime);
}
