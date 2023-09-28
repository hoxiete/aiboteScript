const WindowsBot = require('WindowsBot');//引用WindowsBot模块

//注册主函数
WindowsBot.registerMain(windowsMain, "127.0.0.1", 26678);
//全局常量
let gwindowsBot
let hwnd


let jiangtaigongNpc
let jiangtaigongNpcClose
let zhuangtai1
let zhuangtai2
let fishTong
let useFishTong
let quitToRole
let xuandan
let daoju
let cangku
let xiaohaoTab
let firstBag
let lingyaoBag

let lingyaoOptions
let bagTabStep


// let kongColorOptions = {subColors:[[5, 0, "#fdfcf7"], [18, 1, "#fbf9f0"], [18, 10, "#fbf9f0"], [10, 6, "#fbf9f0"]],sim:0.6};

let getFishBagStart
let getFishBagEnd

let bagStart
let bagEnd
let bagStep
let bagGapStep

let firstRole
let roleStep

let fishbagStep

let roleArr=[[0,1,1,1,1,1],
            [0,1,1,1,0,0]]
let startRoleIndex = [1,6] //第一排第二个角色
let kongColor="#ffffff"
let lingyaoColor="#641AFD"
let lingyaoTu = "./lingyao.png";
let kongColorOptions = {sim:0.95};


let resolution = "2560_1440"
let time
/**用作代码提示，windowsMain函数会被多次调用，注意使用全局变量
* @param {WindowsBot} windowsBot
*/
async function windowsMain(windowsBot){
    gwindowsBot=windowsBot
    hwnd = await windowsBot.findWindow("LATALE_CLIENT",null);
    //await windowsBot.initOcr("127.0.0.1");
    //设置隐式等待
    // await windowsBot.setImplicitTimeout(5000);
    // let bagIsEmpty = await gwindowsBot.compareColor(hwnd,232, 324, kongColor, kongColorOptions);
               
    // console.log("bagIndex:  "+bagIsEmpty)
    //一个角色一分钟
    let count = 0
    resolutionHandle(resolution)
    while (true) {
        count = ++count
        console.log("开始第 "+ count +" 波收鱼计划---"+Date.now())
        await choiceRoleAndExcute(
            ()=> getFish()
            ,
            ()=>  goFish()
            ,
            ()=>  putCangku()
            ,
            ()=>  quitToRoleFun()
        )
        await gwindowsBot.sleep(3*60000);
    }
}

async function choiceRoleAndExcute(...funcs){
    for (let index = 0; index < funcs.length; index++) {
        await funcs[index]();
    }
    // let count = 0
    // for(roleIndex1=startRoleIndex[0]-1;roleIndex1<roleArr[0].length-1;roleIndex1++){
    //     for(roleIndex2=startRoleIndex[1]-1;roleIndex2<roleArr[1].length-1;roleIndex2++){
    //         if(roleArr[roleIndex1][roleIndex2]==1){
    //             count = ++count
    //             console.log("第"+count+"个角色")
    //             await gwindowsBot.clickMouse(hwnd,firstRole[0]+roleStep[0]*roleIndex2, firstRole[1]+roleStep[1]*roleIndex1, 1 ,{mode:true});
    //             await gwindowsBot.sleep(800);
    //             await gwindowsBot.clickMouse(hwnd,firstRole[0]+roleStep[0]*roleIndex2, firstRole[1]+roleStep[1]*roleIndex1, 1 ,{mode:true});
    //             await gwindowsBot.sleep(10000);

    //             for (let index = 0; index < funcs.length; index++) {
    //                 await funcs[index]();
    //             }
    //         } 
    //     }
    //     startRoleIndex[1]=1
    // }
    // startRoleIndex[0]=1
}

async function getFish(){
    console.log("--姜太公收鱼--")
    // await gwindowsBot.clickMouse(hwnd,jiangtaigongNpc[0], jiangtaigongNpc[1], 1 ,{mode:true});
    // await gwindowsBot.sleep(2000);
    // await gwindowsBot.clickMouse(hwnd,zhuangtai2[0], zhuangtai2[1], 1 ,{mode:true});
    // await gwindowsBot.sleep(1000);
    for(row =0;row<2;row++){
        for(col= 3 ;col<8;col++){
            let fishX = getFishBagStart[0]+fishbagStep*col
            let fishY = row==0 ? getFishBagStart[1]:getFishBagEnd[1]
            let fishIsEmpty = await gwindowsBot.compareColor(hwnd, fishX, fishY, kongColor,kongColorOptions);
            if(fishIsEmpty) {
                console.log("找不到鱼获，退出")
                break;
            }else{
                console.log("fish:  "+row+"  "+col)
            }
            await gwindowsBot.clickMouse(hwnd,fishX, fishY, 3 ,{mode:true});
            await gwindowsBot.sleep(500);
            await gwindowsBot.moveMouse(hwnd, bagEnd[0], bagEnd[1], {mode:true});
            await gwindowsBot.sleep(800);
            let bagX =0
            for(bagIndex=0;bagIndex<8;bagIndex++){
                bagX = bagStart[0]+bagStep*bagIndex+ bagGapStep*Math.floor(bagIndex/4)
                let bagIsEmpty = await gwindowsBot.compareColor(hwnd, bagX, bagStart[1], kongColor, kongColorOptions);
                if(bagIsEmpty) {
                    console.log("bagIndex:  "+bagIndex)
                    break;}
            }
            await gwindowsBot.moveMouse(hwnd, bagX, bagStart[1], {mode:true});
            await gwindowsBot.clickMouse(hwnd,bagX, bagStart[1], 4 ,{mode:true});
        }
    }
    await gwindowsBot.sleep(1000);
    await gwindowsBot.clickMouse(hwnd,jiangtaigongNpcClose[0], jiangtaigongNpcClose[1], 1 ,{mode:true});
    await gwindowsBot.sleep(1000);
}

async function putCangku(){
    console.log("--鱼获存仓--")
    await gwindowsBot.clickMouse(hwnd,xuandan[0], xuandan[1], 1 ,{mode:true});
    await gwindowsBot.sleep(1000);
    await gwindowsBot.clickMouse(hwnd,cangku[0], cangku[1], 1 ,{mode:true});
    await gwindowsBot.sleep(1000);
    await gwindowsBot.clickMouse(hwnd,xuandan[0], xuandan[1], 1 ,{mode:true});
    await gwindowsBot.sleep(1000);
    await gwindowsBot.clickMouse(hwnd,daoju[0], daoju[1], 1 ,{mode:true});


    let bagX =0
    for(bagTabIndex = 0;bagTabIndex<3;bagTabIndex++){
        await gwindowsBot.clickMouse(hwnd,xiaohaoTab[0]+bagTabIndex*bagTabStep, xiaohaoTab[1], 1 ,{mode:true});
        await gwindowsBot.sleep(500);
        await gwindowsBot.moveMouse(hwnd, bagEnd[0], bagEnd[1], {mode:true});
        await gwindowsBot.sleep(1000);
        for(bagIndex=0;bagIndex<8;bagIndex++){
            bagX = firstBag[0]+bagStep*bagIndex+ bagGapStep*Math.floor(bagIndex/4)
            let bagIsEmpty = await gwindowsBot.compareColor(hwnd, bagX, firstBag[1], kongColor, kongColorOptions);
            if(bagIsEmpty) break;
            await gwindowsBot.sleep(400);
            await gwindowsBot.clickMouse(hwnd,bagX, firstBag[1], 2 ,{mode:true});
        }
    }
    let bagIsLingyao = await gwindowsBot.findColor(hwnd, lingyaoColor, lingyaoOptions);
    // let bagIsLingyao = await gwindowsBot.findImage(hwnd, lingyaoTu,lingyaoOptions);
    console.log(bagIsLingyao)
    if(bagIsLingyao != null){
        // await gwindowsBot.clickMouse(hwnd,bagIsLingyao[0].x, bagIsLingyao[0].y, 3 ,{mode:true});
        await gwindowsBot.clickMouse(hwnd,bagIsLingyao.x, bagIsLingyao.y, 3 ,{mode:true});
        await gwindowsBot.sleep(800);
        await gwindowsBot.moveMouse(hwnd, lingyaoBag[0], lingyaoBag[1], {mode:true});
        await gwindowsBot.sleep(200);
        await gwindowsBot.clickMouse(hwnd,lingyaoBag[0], lingyaoBag[1], 4 ,{mode:true});
        await gwindowsBot.sleep(800);
    } else{
        console.log("未找到灵药")
    }  

}

async function goFish(){
    console.log("--申请钓鱼--")
    await gwindowsBot.clickMouse(hwnd,jiangtaigongNpc[0], jiangtaigongNpc[1], 1 ,{mode:true});
    await gwindowsBot.sleep(2000);
    await gwindowsBot.clickMouse(hwnd,zhuangtai1[0], zhuangtai1[1], 1 ,{mode:true});
    await gwindowsBot.sleep(1000); 
    await gwindowsBot.clickMouse(hwnd,fishTong[0], fishTong[1], 1 ,{mode:true});
    await gwindowsBot.sleep(500);
    await gwindowsBot.clickMouse(hwnd,useFishTong[0], useFishTong[1], 1 ,{mode:true});
    await gwindowsBot.sleep(1000);
}
async function quitToRoleFun(){
    console.log("--重新选择下一个角色--")
    await gwindowsBot.clickMouse(hwnd,xuandan[0], xuandan[1], 1 ,{mode:true});
    await gwindowsBot.sleep(1000);
    await gwindowsBot.clickMouse(hwnd,quitToRole[0], quitToRole[1], 1 ,{mode:true});
    await gwindowsBot.sleep(8000);
}

function resolutionHandle(resolution){
    //分辨率处理
    switch(resolution){
        case "1920_1080":
            jiangtaigongNpc= [442, 575]
            jiangtaigongNpcClose= [933, 247]
            zhuangtai1= [359, 577]
            zhuangtai2= [359, 598]
            fishTong= [768, 517]
            useFishTong= [797, 600]
            quitToRole= [617, 453]
            xuandan= [1564, 813]
            daoju= [ 85, 170]
            cangku= [ 99, 284]
            xiaohaoTab = [114, 85]
            firstBag = [64, 123]
            lingyaoBag = [60, 172]

            lingyaoOptions = {region:[44, 116, 166, 152], sim:0.5};  //范围是任务栏的前三个框
            bagTabStep = 70

            getFishBagStart = [670, 290]
            getFishBagEnd = [926, 327]

            bagStart = [126, 313] //定位于奶牛色鲫鱼的尾巴沟里面的蓝色背景
            bagEnd = [583, 325]
            bagStep = 40
            bagGapStep = 12

            firstRole=[291, 354]
            roleStep=[200, 250]
            break;
        case "2560_1440":
            jiangtaigongNpc= [456, 788]
            jiangtaigongNpcClose= [1095, 337]
            zhuangtai1= [510, 685]
            zhuangtai2= [512, 709]
            fishTong= [939, 606]
            useFishTong= [957, 690]
            quitToRole= [607, 447]
            xuandan= [1885, 995]
            daoju= [87, 169]
            cangku= [92, 281]
            xiaohaoTab = [114, 85]
            firstBag = [68, 121]
            lingyaoBag = [60, 172]

            lingyaoOptions = {region:[44, 116, 166, 152], sim:0.5};  //范围是任务栏的前三个框
            bagTabStep = 70

            // getFishBagStart = [845, 369] //右上角
            getFishBagStart = [845, 374] //下居中
            getFishBagEnd = [1097, 405]

            bagStart = [283, 405] //定位于奶牛色鲫鱼的尾巴沟里面的蓝色背景
            bagEnd = [570, 417]
            bagStep = 40
            bagGapStep = 12

            firstRole=[453, 424]
            roleStep=[200, 300]
            break;
        default:
            
    }
    fishbagStep = (getFishBagEnd[0]-getFishBagStart[0])/7
}

