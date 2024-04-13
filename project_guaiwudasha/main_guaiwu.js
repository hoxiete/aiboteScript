const WindowsBot = require('WindowsBot');//引用WindowsBot模块

//注册主函数
WindowsBot.registerMain(windowsMain, "127.0.0.1", 26678);
//全局常量
let gwindowsBot
let hwnd


let cangku
let chuansong
let xuandan
let npcPos
let taskPos
let jieshouPos
let taskBackPos
let toFloorPos
let toFloorConfirmPos
let finishTaskPos
let closeNpcPos

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
    while (true) {
        count = ++count
        startTime = new Date()
        // console.group("开始第 " + count + " 波收鱼计划---" + startTime)
        console.log("开始第 " + count + " 波收鱼计划---" + startTime)
        await choiceRoleAndExcute(
            // await choiceRoleAndExcuteTest(
            () => gotoPlace(true)
            ,
            () => choiceTask()
            ,
            () => toKillGuai()
            ,
            () => gotoPlace(false)
            ,
            () => completeTask()
            ,
            () => quitToRoleFun()
        )
        let spendTime = parseInt(new Date - startTime)
        // console.log("收鱼结束,耗时 " + spendTime / 1000 + " 秒")

    }
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
        await gwindowsBot.clickMouse(hwnd, 265, 89, 3, { mode: true });
        await gwindowsBot.sleep(500);
        await gwindowsBot.moveMouse(hwnd, 436, 548, { mode: true });
        if(wait){
            await gwindowsBot.sleep(5000);
        }
}
async function openEsc(){
    await gwindowsBot.clickMouse(hwnd, xuandan[0], xuandan[1], 1, { mode: true });
}
async function openChuansong(){
    openEsc()
    await gwindowsBot.clickMouse(hwnd, chuansong[0], chuansong[1], 1, { mode: true });
}

async function choiceTask() {
    console.log("----第二步 接受任务----")
    await gwindowsBot.clickMouse(hwnd, npcPos[0], npcPos[1], { mode: true });
    await gwindowsBot.sleep(2000);
    await gwindowsBot.clickMouse(hwnd, taskPos[0], taskPos[1], 1, { mode: true });
    await gwindowsBot.sleep(1000);
    await gwindowsBot.clickMouse(hwnd, jieshouPos[0], jieshouPos[1], { mode: true });
    await gwindowsBot.sleep(500);
    await gwindowsBot.clickMouse(hwnd, taskBackPos[0], taskBackPos[1], 1, { mode: true });
    await gwindowsBot.sleep(1000);
    await gwindowsBot.clickMouse(hwnd, toFloorPos[0], toFloorPos[1], 1, { mode: true });
    await gwindowsBot.sleep(1000);
    await gwindowsBot.clickMouse(hwnd, toFloorConfirmPos[0], toFloorConfirmPos[1], 1, { mode: true });
    await gwindowsBot.sleep(1000);

}

async function completeTask() {
    console.log("----第四步 完成任务----")
    await gwindowsBot.clickMouse(hwnd, npcPos[0], npcPos[1], { mode: true });
    await gwindowsBot.sleep(2000);
    await gwindowsBot.clickMouse(hwnd, taskPos[0], taskPos[1], 1, { mode: true });
    await gwindowsBot.sleep(1000);
    await gwindowsBot.clickMouse(hwnd, finishTaskPos[0], finishTaskPos[1], { mode: true });
    await gwindowsBot.sleep(500);
    await gwindowsBot.clickMouse(hwnd, closeNpcPos[0], closeNpcPos[1], { mode: true });
    await gwindowsBot.sleep(500);
}

async function toKillGuai() {
    console.log("----第三步 接受任务----")
    //move to guangdian press ↑
    //for press → ↑    break by find 200 level
    //use skill A
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
            quitToRole = [617, 453]
            xuandan = [1564, 813]

            chuansong = [526, 239]
            npcPos = [954, 652]
            taskPos = [501, 725]
            jieshouPos = [260, 418]
            taskBackPos = [844, 847]
            toFloorPos = []
            toFloorConfirmPos = []
            finishTaskPos = []
            closeNpcPos = []


            daoju = [85, 170]
            cangku = [1337, 899]
            xiaohaoTab = [114, 85]
            firstBag = [41, 114]
            lingyaoBag = [60, 172]

            lingyaoOptions = { region: [44, 116, 166, 152], sim: 0.5, mode: true };  //范围是任务栏的前三个框
            bagTabStep = 70

            getFishBagStart = [661, 279]
            getFishBagEnd = [914, 316]

            bagStart = [94, 311] //定位于奶牛色鲫鱼的尾巴沟里面的蓝色背景
            bagEnd = [390, 311]
            bagStep = 40
            bagGapStep = 12

            firstRole = [291, 354]
            roleStep = [200, 250]
            break;
         case "2560_1440":
            jiangtaigongNpc = [442, 741]
            jiangtaigongNpcClose = [1095, 337]
            destoryFishBag = [955, 531]
            destoryFishBagConfirm = [952, 497]
            zhuangtai1 = [510, 685]
            zhuangtai2 = [512, 709]
            fishTong = [939, 606]
            useFishTong = [957, 690]
            quitToRole = [1193, 725]
            xuandan = [1889, 993]
            daoju = [661, 449]
            cangku = [1656, 1085]
            xiaohaoTab = [114, 85]
            firstBag = [41, 113]
            lingyaoBag = [60, 172]

            lingyaoOptions = { region: [44, 116, 166, 152], sim: 0.5, mode: true };  //范围是任务栏的前三个框
            bagTabStep = 70

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

