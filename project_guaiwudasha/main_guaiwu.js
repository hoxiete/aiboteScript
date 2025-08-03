const WindowsBot = require('WindowsBot'); //引用WindowsBot模块

//注册主函数
WindowsBot.registerMain(windowsMain, '127.0.0.1', 26678);
//全局常量
let gwindowsBot;
let hwnd;
let qqhwnd;
let winhwnd;

let cangku;
let jita_d;
let chuansong;
let myChuansong;
let confirmChuansong;
let xuandan;
let juexingFinishRegin;
let closeJuexingWindowButton;
let openJuexingWindowButton;
let zhuangbeiPos;

let roleArr = [
    [0, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0, 0],
];
let startRoleIndex = [1, 1]; //第一排第二个角色

// let resolution = "1920_1080"
let resolution = '2560_1440';
let time;
/**用作代码提示，windowsMain函数会被多次调用，注意使用全局变量
 * @param {WindowsBot} windowsBot
 */
async function windowsMain(windowsBot) {
    gwindowsBot = windowsBot;
    hwnd = await windowsBot.findWindow('LATALE_CLIENT', null);
    qqhwnd = await gwindowsBot.findWindow(null, 'QQ');
    winhwnd = await windowsBot.findWindow('CabinetWClass', null);
    await windowsBot.initOcr('192.168.100.6', { enableGPU: false, enableTensorrt: true });

    //设置隐式等待
    // await windowsBot.setImplicitTimeout(5000);

    let count = 0;
    let roleNum = roleArr.flat().filter(i => i == 1).length;
    console.log('共计 ' + roleNum + ' 个角色参与收鱼 ');
    resolutionHandle(resolution);
    let startTime;
    count = ++count;
    startTime = new Date();
    // await choiceRoleAndExcute(
    // await choiceRoleAndExcuteTest(
    //  () => gotoPlace(true)
    // ,
    // () => choiceTask()
    // ,
    // () => toKillGuai()
    // ,
    // () => gotoPlace(false)
    // ,
    // () => completeTask()
    // ,
    // () => quitToRoleFun()
    // )
    let confirmCheckBoxMsg = await gwindowsBot.getWords(hwnd, {
        ...confirmCheckBoxMsgRegin,
        mode: true,
    });
    let func = [() => jitaD()];
    globalTask();
    await frequencyExcute(func, 1000);
    let spendTime = parseInt(new Date() - startTime);
    console.log('耗时 ' + spendTime / 1000 + ' 秒');
    process.exit();
}

async function choiceRoleAndExcute(...funcs) {
    let count = 0;
    for (roleIndex1 = startRoleIndex[0] - 1; roleIndex1 < roleArr.length; roleIndex1++) {
        for (
            roleIndex2 = startRoleIndex[1] - 1;
            roleIndex2 < roleArr[roleIndex1].length;
            roleIndex2++
        ) {
            if (roleArr[roleIndex1][roleIndex2] == 1) {
                count = ++count;
                console.log('<<===第 ' + count + ' 个角色===>>');
                // console.group("<<===第 " + count + " 个角色===>>")
                let pos = [
                    firstRole[0] + roleStep[0] * roleIndex2,
                    firstRole[1] + roleStep[1] * roleIndex1,
                ];
                await gwindowsBot.clickMouse(hwnd, pos[0], pos[1], 1, { mode: true });
                await gwindowsBot.sleep(800);
                await gwindowsBot.clickMouse(hwnd, pos[0], pos[1], 1, { mode: true });
                await gwindowsBot.sleep(10000);
                for (let index = 0; index < funcs.length; index++) {
                    await funcs[index]();
                }
                // console.groupEnd()
            }
        }
        startRoleIndex[1] = 1;
    }
    startRoleIndex[0] = 1;
}

async function choiceRoleAndExcuteTest(...funcs) {
    for (let index = 0; index < funcs.length; index++) {
        await funcs[index]();
    }
}

async function frequencyExcute(funcs, count) {
    for (let i = 0; i < count; i++) {
        for (let index = 0; index < funcs.length; index++) {
            if (await funcs[index]()) {
                return;
            }
        }
    }
}

async function globalTask() {
    startTime = new Date();
    while (true) {
        if (await checkJuexing()) {
            break;
        }
    }
    let spendTime = parseInt(new Date() - startTime);
    console.log('耗时 ' + spendTime / 1000 + ' 秒');
    process.exit();
}

async function jitaD() {
    console.log('执行吉他D');
    await gwindowsBot.clickMouse(hwnd, jita_d[0], jita_d[1], 1, { mode: true });
    await gwindowsBot.sleep(6500);
    return false;
}

/**
 * 自动觉醒，需打开qq我的文件对话框，截屏目录文件夹
 * @returns 
 */
async function checkJuexing() {
    let finishTab = await gwindowsBot.findColor(hwnd, '#7d5d09', {
        region: juexingFinishRegin,
        sim: 0.5,
        mode: true,
    });
    // finishTab = true;
    if (finishTab != null) {
        // 点击finishTab;
        await gwindowsBot.clickMouse(hwnd, juexingFinishRegin[0], juexingFinishRegin[1], 1, {
            mode: true,
        });
        await gwindowsBot.sleep(1000);
        //点击开始随觉醒
        await gwindowsBot.clickMouse(hwnd, startJuexingButton[0], startJuexingButton[1], 1, {
            mode: true,
        });
        await gwindowsBot.sleep(1000);
        //关闭道具栏
        await gwindowsBot.clickMouse(
            hwnd,
            closeJuexingWindowButton[0],
            closeJuexingWindowButton[1],
            1,
            { mode: true }
        );
        await gwindowsBot.sleep(1000);
        // 打开觉醒栏
        await gwindowsBot.clickMouse(
            hwnd,
            openJuexingWindowButton[0],
            openJuexingWindowButton[1],
            1,
            { mode: true }
        );
        await gwindowsBot.sleep(1000);
        await dragToInlay(zhuangbeiPos[0], zhuangbeiPos[1]);
        //截图装备属性发送到qq文件
        await gwindowsBot.saveScreenshot(hwnd, savePath, {
            region: screenCutRegin,
            mode: true,
        });
        await gwindowsBot.sleep(1000);
        await gwindowsBot.clickElement(winhwnd, 'ListItem/Image', 2);
        await gwindowsBot.sleep(200);
        await gwindowsBot.sendVkByHwnd(winhwnd, 0x43, 1);
        await gwindowsBot.sleep(200);
        await gwindowsBot.clickElement(qqhwnd, 'Document/Window[1]', 2);
        await gwindowsBot.sleep(200);
        await gwindowsBot.clickElement(qqhwnd, 'Menu/MenuItem[2]', 1);
        await gwindowsBot.sleep(200);
        await gwindowsBot.clickElement(qqhwnd, 'Document/Button[5]', 1);
        //等待消息2or结束  识别到2 重置属性  识别到结束 结束进程
        while (true) {
            let confirmFlag = await gwindowsBot.getWords(qqhwnd, {
                ...confirmRegin,
                mode: true,
            });
            if (confirmFlag == '2') {
                console.log('找到重置标志进行重置');
                await gwindowsBot.clickMouse(hwnd, refreshJuexing[0], refreshJuexing[1], 1, {
                    mode: true,
                });
                await gwindowsBot.sleep(200);
                //防止装备丢弃
                let confirmCheckBoxMsg = await gwindowsBot.getWords(hwnd, {
                    ...confirmCheckBoxMsgRegin,
                    mode: true,
                });
                //确认重置提示框如果没检测到属性字段就点否
                if (confirmCheckBoxMsg != '扽俶') {
                    await gwindowsBot.clickMouse(
                        hwnd,
                        confirmRefreshNo[0],
                        confirmRefreshNo[1],
                        1,
                        {
                            mode: true,
                        }
                    );
                    console.log('未检测到确认重置属性提示框，退出');
                    return true;
                } else {
                    await gwindowsBot.clickMouse(
                        hwnd,
                        confirmRefreshYes[0],
                        confirmRefreshYes[1],
                        1,
                        {
                            mode: true,
                        }
                    );

                    await gwindowsBot.sleep(500);
                    await dragToInlay(zhuangbeiPos[0], zhuangbeiPos[1]);
                    await gwindowsBot.sleep(3000);
                    await gwindowsBot.clickMouse(
                        hwnd,
                        fourLevelJuexing[0],
                        fourLevelJuexing[1],
                        1,
                        {
                            mode: true,
                        }
                    );
                    await gwindowsBot.sleep(200);
                    await gwindowsBot.clickMouse(
                        hwnd,
                        excuteJuexingCount[0],
                        excuteJuexingCount[1],
                        1,
                        {
                            mode: true,
                        }
                    );
                }
                break;
            } else if (confirmFlag == '賦旰') {
                console.log('洗成功了结束');
                return true;
            } else {
                console.log('用户未确认，等待中。。');
                await gwindowsBot.sleep(3000);
            }
        }
    } else {
        console.log('未找到觉醒成功标识');
    }
    await gwindowsBot.sleep(8000);
}

/**
 * 拖入镶嵌栏
 */
async function dragToInlay(x, y) {
    await gwindowsBot.clickMouse(hwnd, x + 10, y + 10, 3, { mode: true });
    await gwindowsBot.sleep(200);
    await gwindowsBot.moveMouse(hwnd, xiangqiancao[0], xiangqiancao[1], { mode: true });
    await gwindowsBot.clickMouse(hwnd, xiangqiancao[0], xiangqiancao[1], 4, { mode: true });
    await gwindowsBot.sleep(200);
}

async function gotoPlace(wait) {
    console.log('----第一步 去npc位置----');
    openChuansong();
    await gwindowsBot.clickMouse(hwnd, myChuansong[0], myChuansong[1], 1, { mode: true });
    await gwindowsBot.sleep(500);
    await gwindowsBot.clickMouse(hwnd, confirmChuansong[0], confirmChuansong[1], 1, { mode: true });
    if (wait) {
        await gwindowsBot.sleep(5000);
    }
}
async function openEsc() {
    await gwindowsBot.clickMouse(hwnd, xuandan[0], xuandan[1], 1, { mode: true });
    await gwindowsBot.sleep(500);
}
async function openChuansong() {
    openEsc();
    await gwindowsBot.clickMouse(hwnd, chuansong[0], chuansong[1], 1, { mode: true });
    await gwindowsBot.sleep(500);
}

async function sendKey(vk) {
    await gwindowsBot.sendVkByHwnd(hwnd, vk, 2);
    await gwindowsBot.sleep(102);
    await gwindowsBot.sendVkByHwnd(hwnd, vk, 3);
}

async function quitToRoleFun() {
    console.log('----第五步 选择下一个角色----');
    await gwindowsBot.clickMouse(hwnd, xuandan[0], xuandan[1], 1, { mode: true });
    await gwindowsBot.sleep(1000);
    await gwindowsBot.clickMouse(hwnd, quitToRole[0], quitToRole[1], 1, { mode: true });
    await gwindowsBot.sleep(8000);
}

function resolutionHandle(resolution) {
    //分辨率处理
    switch (resolution) {
        case '1920_1080':
            break;
        case '2560_1440':
            quitToRole = [617, 453];
            xuandan = [1879, 988];

            chuansong = [526, 239];
            jita_d = [802, 1016];
            myChuansong = [265, 89];
            confirmChuansong = [435, 541];
            juexingFinishRegin = [1788, 848, 1811, 853];
            startJuexingButton = [861, 611];
            closeJuexingWindowButton = [983, 54];
            openJuexingWindowButton = [310, 553];
            zhuangbeiPos = [372, 334];
            xiangqiancao = [804, 199];
            savePath = 'F:\\obsvideo\\juex\\1.png';
            screenCutRegin = [628, 130, 982, 497];
            confirmRegin = { region: [358, 410, 388, 435] };
            confirmCheckBoxMsgRegin = { region: [928, 445, 952, 464] };
            refreshJuexing = [797, 609];
            confirmRefreshCheckBoxTextRegin = [891, 430, 944, 450];
            confirmRefreshYes = [953, 506];
            confirmRefreshNo = [1014, 497];
            fourLevelJuexing = [865, 273];
            excuteJuexingCount = [802, 606];

            // getFishBagStart = [845, 369] //右上角
            getFishBagStart = [817, 364]; //下居中
            getFishBagEnd = [1070, 401];

            bagStart = [255, 398]; //定位于奶牛色鲫鱼的尾巴沟里面的蓝色背景
            bagEnd = [643, 398];
            bagStep = 40;

            bagGapStep = 12;

            firstRole = [453, 424];
            roleStep = [200, 300];
            break;
        default:
    }
    fishbagStep = (getFishBagEnd[0] - getFishBagStart[0]) / 7;
}
