const WindowsBot = require('WindowsBot');//引用WindowsBot模块
const baiduSDK = require('baiduSDK');//引用WindowsBot模块
const fs = require('fs');

//注册主函数
WindowsBot.registerMain(windowsMain, "127.0.0.1", 26678);

let auth = {appid:"40142935",ak:"emN2mfzZ7qCgHUiNZSWYtkHn",sk:"YDMvXvyopNOj8Nus3RRWILGKHXe6bB1T"}
// let option = {region:[132, 237, 456, 283], mode:true}
let option = {region:[995, 366, 1321, 410], mode:true}
let imgbase64
async function windowsMain(windowsBot){
    // await windowsBot.initOcr("127.0.0.1");
    
    // let hwnd = await windowsBot.findWindow("ApplicationFrameWindow",null);
    // let hwnd = await windowsBot.findWindow("Chrome_WidgetWin_1",null);
    // console.log(hwnd)
    // let question = await windowsBot.getWords(hwnd, option)
    // console.log(question)

    let ocr =  new baiduSDK.ocr(auth.appid,auth.ak,auth.sk)
    // ocr.setAccessToken(token.access_token)

    let fileBase64 = await fs.readFileSync("pic/test1.png", 'base64');
    // console.log(fileBase64)
    let res = await ocr.generalBasic(fileBase64,null)
    console.log(res)
}