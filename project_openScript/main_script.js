const WindowsBot = require('WindowsBot');//引用WindowsBot模块

//注册主函数
WindowsBot.registerMain(windowsMain, "127.0.0.1", 26678);
//全局常量
let gwindowsBot
let hwnd


let xiugaidashiPos= [111, 624]

let latalePos=[181, 924]
let lataleStartPos=[493, 571]

let jiasuBtn=[148, 323]
let pwdPos=[883, 559]
let chdstartPos=[884, 654]



let resolution = "2560_1440"

/**用作代码提示，windowsMain函数会被多次调用，注意使用全局变量
* @param {WindowsBot} windowsBot
*/
async function windowsMain(windowsBot) {
    gwindowsBot = windowsBot

    //设置隐式等待
    await windowsBot.setImplicitTimeout(1000);

    let table = await windowsBot.findWindow("CEF-OSC-WIDGET", null);
    
    await gwindowsBot.clickMouse(table, xiugaidashiPos[0], xiugaidashiPos[1], 7); //双击左键
    await gwindowsBot.sleep(1500);
    let xiugai = await windowsBot.findWindow("#32770", "游戏乱码修正大师");
    await gwindowsBot.clickElement(xiugai,"Window/Button[3]", 1); 

    let chd 
    while (true) {
        await gwindowsBot.clickMouse(table, latalePos[0], latalePos[1], 7); //双击左键
        await gwindowsBot.sleep(3000);
        chd = await windowsBot.findWindow("#32770", "LaTale Launcher");
        await gwindowsBot.sleep(2000);
        let errBox = await gwindowsBot.getElementWindow(chd, "Window/Window");
        if(errBox == null){
            break
        }
        let errMsg = await windowsBot.getElementName(chd, "Window/Window/Text");
        let caseErrMsg = errMsg.substring(0,2)
        if(caseErrMsg == "資訊"){
            await gwindowsBot.clickElement(chd,"Window/Window/Button[1]", 1); 
            await gwindowsBot.clickElement(chd,"Window/Button[1]", 1); 
            // let errBox = await gwindowsBot.getElementWindow(chd, "Window/Window");
            await gwindowsBot.clickElement(chd,"Window/Window/Button", 1); 
            
            console.log("网络问题,需要重启chd,并打开vpn")
        }else if(caseErrMsg == "Up"){
            await gwindowsBot.clickElement(chd,"Window/Window/Button", 1); 
            console.log("网络问题,需要重启chd,并打开vpn")
        }
        await gwindowsBot.sleep(5000);
        
    }
    //等待游戏
    while (true) {
        //未准备好是#7d7d96，准备好是#7a4bf1
        let gameAready = await gwindowsBot.getColor(chd, lataleStartPos[0],lataleStartPos[1], {mode:true});
        if (gameAready!=null && gameAready=="#7a4bf1") {
            break
        }
        console.log("latale未准备好,等待2秒......")
        await gwindowsBot.sleep(2000);
    }
    await gwindowsBot.clickElement(chd,"Window/Button", 1); 
    await gwindowsBot.sleep(3000);
    await gwindowsBot.clickElement(xiugai, "List/ListItem",1); 
    await gwindowsBot.clickElement(xiugai, "Window/Window/Button[2]",1); 


    //加速器
    await gwindowsBot.sleep(2000);
    let funiu = await windowsBot.findWindow("CMainWnd", null);
    await gwindowsBot.clickMouse(funiu, jiasuBtn[0], jiasuBtn[1], 1,{mode:true}); 
    //登录
    let hwnd
    while (true) {
        await gwindowsBot.sleep(4000);
        hwnd = await windowsBot.findWindow("LATALE_CLIENT", null);
        if(hwnd==null){
            console.log("未检测到游戏窗口,等待3秒......")
            await gwindowsBot.sleep(3000);
            continue
        }
        //开始按钮颜色为#6767cd
        let gameAready = await gwindowsBot.getColor(hwnd, chdstartPos[0],chdstartPos[1], {mode:true});
        if (gameAready!=null && gameAready=="#6767cd") {
            break
        }
        console.log("游戏未准备好,等待2秒......")
        await gwindowsBot.sleep(2000);
    }
    await gwindowsBot.clickMouse(hwnd, pwdPos[0], pwdPos[1], 1,{mode:true});
    await windowsBot.sendKeysByHwnd(hwnd, "park1345113");
    await gwindowsBot.sleep(1000);
    await gwindowsBot.clickMouse(hwnd, chdstartPos[0], chdstartPos[1], 1,{mode:true});
}






