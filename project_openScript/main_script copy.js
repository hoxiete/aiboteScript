const WindowsBot = require('WindowsBot');//引用WindowsBot模块
const { count } = require('console');
const fs = require('fs');

//注册主函数
WindowsBot.registerMain(windowsMain, "127.0.0.1", 26678);
//全局常量
let gwindowsBot
let hwnd


let xiugaidashiPos= [111, 624]

let latalePos=[181, 924]
let lataleStartPos=[493, 571]

let chdstartPos=[884, 654]


let resolution = "2560_1440"

/**用作代码提示，windowsMain函数会被多次调用，注意使用全局变量
* @param {WindowsBot} windowsBot
*/
async function windowsMain(windowsBot) {
    gwindowsBot = windowsBot
    hwnd = await windowsBot.findWindow("LATALE_CLIENT", null);
    // await windowsBot.sendKeys("sdjx3210");
    let gameAready = await gwindowsBot.getColor(hwnd, chdstartPos[0],chdstartPos[1], {mode:true});
    let gameAready1 = await gwindowsBot.getColor(hwnd, chdstartPos[0],chdstartPos[1], {mode:true});



    
    
}






