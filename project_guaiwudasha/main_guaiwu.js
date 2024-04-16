const WindowsBot = require('WindowsBot');//引用WindowsBot模块
// var ks = require('node-key-sender');
// const robot = require("robotjs")

//注册主函数
WindowsBot.registerMain(windowsMain, "127.0.0.1", 26678);
//全局常量
let gwindowsBot
let hwnd


let cangku
let chuansong
let myChuansong
let confirmChuansong
let xuandan
let npcPos
let taskListPos
let chioceTaskPos
let jieshouPos
let taskBackPos
let toFloorPos
let toFloorConfirmPos
let finishTaskPos
let closeNpcPos
let toDownFloorPos
let to190Pos

let roleArr = [[0, 1, 1, 1, 1, 1],
[0, 1, 1, 1, 0, 0]]
let startRoleIndex = [1, 1] //第一排第二个角色

// let resolution = "1920_1080"
let resolution = "2560_1440"
let time
/**用作代码提示，windowsMain函数会被多次调用，注意使用全局变量
* @param {WindowsBot} windowsBot
*/
async function windowsMain(windowsBot) {
    gwindowsBot = windowsBot
    hwnd = await windowsBot.findWindow("LATALE_CLIENT", null);

    //设置隐式等待
    // await windowsBot.setImplicitTimeout(5000);

    let count = 0
    let roleNum = roleArr.flat().filter(i => i == 1).length
    console.log("共计 " + roleNum + " 个角色参与收鱼 ")
    resolutionHandle(resolution)
    let startTime
        count = ++count
        startTime = new Date()
        // await choiceRoleAndExcute(
            await choiceRoleAndExcuteTest(
            //  () => gotoPlace(true)
            // ,
            // () => choiceTask()
            // ,
            () => toKillGuai()
            // ,
            // () => gotoPlace(false)
            // ,
            // () => completeTask()
            // ,
            // () => quitToRoleFun()
        )
        let spendTime = parseInt(new Date - startTime)
        // console.log("收鱼结束,耗时 " + spendTime / 1000 + " 秒")
}

async function choiceRoleAndExcute(...funcs) {
    let count = 0
    for (roleIndex1 = startRoleIndex[0] - 1; roleIndex1 < roleArr.length; roleIndex1++) {
        for (roleIndex2 = startRoleIndex[1] - 1; roleIndex2 < roleArr[roleIndex1].length; roleIndex2++) {
            if (roleArr[roleIndex1][roleIndex2] == 1) {
                count = ++count
                console.log("<<===第 " + count + " 个角色===>>")
                // console.group("<<===第 " + count + " 个角色===>>")
                await gwindowsBot.clickMouse(hwnd, firstRole[0] + roleStep[0] * roleIndex2, firstRole[1] + roleStep[1] * roleIndex1, 1, { mode: true });
                await gwindowsBot.sleep(800);
                await gwindowsBot.clickMouse(hwnd, firstRole[0] + roleStep[0] * roleIndex2, firstRole[1] + roleStep[1] * roleIndex1, 1, { mode: true });
                await gwindowsBot.sleep(10000);
                for (let index = 0; index < funcs.length; index++) {
                    await funcs[index]();
                }
                // console.groupEnd()
            }
        }
        startRoleIndex[1] = 1
    }
    startRoleIndex[0] = 1
}

async function choiceRoleAndExcuteTest(...funcs) {
    for (let index = 0; index < funcs.length; index++) {
        await funcs[index]();
    }
}

async function gotoPlace(wait) {
    console.log("----第一步 去npc位置----")
        openChuansong()
        await gwindowsBot.clickMouse(hwnd, myChuansong[0], myChuansong[1], 1, { mode: true });
        await gwindowsBot.sleep(500);
        await gwindowsBot.clickMouse(hwnd, confirmChuansong[0], confirmChuansong[1], 1, { mode: true });
        if(wait){
            await gwindowsBot.sleep(5000);
        }
}
async function openEsc(){
    await gwindowsBot.clickMouse(hwnd, xuandan[0], xuandan[1], 1, { mode: true });
    await gwindowsBot.sleep(500);
}
async function openChuansong(){
    openEsc()
    await gwindowsBot.clickMouse(hwnd, chuansong[0], chuansong[1], 1, { mode: true });
    await gwindowsBot.sleep(500);
}

async function choiceTask() {
    console.log("----第二步 接受任务----")
    await gwindowsBot.clickMouse(hwnd, npcPos[0], npcPos[1], 1,{ mode: true });
    await gwindowsBot.sleep(2000);
    await gwindowsBot.clickMouse(hwnd, taskListPos[0], taskListPos[1], 1, { mode: true });
    await gwindowsBot.sleep(1000);
    await gwindowsBot.clickMouse(hwnd, chioceTaskPos[0], chioceTaskPos[1], 1,{ mode: true });
    await gwindowsBot.sleep(1000);
    await gwindowsBot.clickMouse(hwnd, jieshouPos[0], jieshouPos[1], 1, { mode: true });
    await gwindowsBot.sleep(500);
    await gwindowsBot.clickMouse(hwnd, taskBackPos[0], taskBackPos[1], 1, { mode: true });
    await gwindowsBot.sleep(2000);
    await gwindowsBot.clickMouse(hwnd, toFloorPos[0], toFloorPos[1], 1, { mode: true });
    await gwindowsBot.sleep(1000);
    for (let index = 0; index < 10; index++) {
        await gwindowsBot.clickMouse(hwnd, toDownFloorPos[0], toDownFloorPos[1], 1, { mode: true });
        await gwindowsBot.sleep(200);
    }
    await gwindowsBot.clickMouse(hwnd, to190Pos[0], to190Pos[1], 1, { mode: true });
    await gwindowsBot.sleep(1000);
    await gwindowsBot.clickMouse(hwnd, toFloorConfirmPos[0], toFloorConfirmPos[1], 1, { mode: true });
    await gwindowsBot.sleep(1000);

}

async function completeTask() {
    console.log("----第四步 完成任务----")
    await gwindowsBot.clickMouse(hwnd, npcPos[0], npcPos[1], { mode: true });
    await gwindowsBot.sleep(2000);
    await gwindowsBot.clickMouse(hwnd, taskListPos[0], taskListPos[1], 1, { mode: true });
    await gwindowsBot.sleep(500);
    await gwindowsBot.clickMouse(hwnd, finishTaskPos[0], finishTaskPos[1], { mode: true });
    await gwindowsBot.sleep(500);
    await gwindowsBot.clickMouse(hwnd, closeNpcPos[0], closeNpcPos[1], { mode: true });
    await gwindowsBot.sleep(500);
}

async function toKillGuai() {
    console.log("----第三步 执行任务----")
    // for(let i=1;i<11;i++){
    //     ks.sendKeys(['right','right','up']);
    //     await gwindowsBot.sleep(500);
    // }a
    // await gwindowsBot.sleep(5000);
    // for(let i=1;i<11;i++){
    //     ks.sendKeys(['right','right','up']);
    //     await gwindowsBot.sleep(500);
    // }
    //move to guangdian press ↑
    //for press → ↑    break by find 200 level
    //use skill A
    // robot.keyTap('a')
    // ks.sendKey('a');
    // ks.sendKeys(['right','right','up']);
    console.log("-------")
}
async function quitToRoleFun() {
    console.log("----第五步 选择下一个角色----")
    await gwindowsBot.clickMouse(hwnd, xuandan[0], xuandan[1], 1, { mode: true });
    await gwindowsBot.sleep(1000);
    await gwindowsBot.clickMouse(hwnd, quitToRole[0], quitToRole[1], 1, { mode: true });
    await gwindowsBot.sleep(8000);
}

function resolutionHandle(resolution) {
    //分辨率处理
    switch (resolution) {
        case "1920_1080":
            break;
         case "2560_1440":
            quitToRole = [617, 453]
            xuandan = [1879, 988]

            chuansong = [526, 239]
            myChuansong = [265, 89]
            confirmChuansong = [435, 541]
            npcPos = [954, 652]
            taskListPos = [501, 725]
            chioceTaskPos = [264, 422]
            jieshouPos = [844, 847]
            taskBackPos = [1133, 255]
            toFloorPos = [507, 747]
            toDownFloorPos = [1133, 703]
            to190Pos = [946, 691]
            toFloorConfirmPos = [962, 744]
            finishTaskPos = [427, 852]
            closeNpcPos = [1810, 342]

            // getFishBagStart = [845, 369] //右上角
            getFishBagStart = [817, 364] //下居中
            getFishBagEnd = [1070, 401]

            bagStart = [255, 398] //定位于奶牛色鲫鱼的尾巴沟里面的蓝色背景
            bagEnd = [643, 398]
            bagStep = 40
            
            bagGapStep = 12

            firstRole = [453, 424]
            roleStep = [200, 300]
            break;
        default:

    }
    fishbagStep = (getFishBagEnd[0] - getFishBagStart[0]) / 7
}

