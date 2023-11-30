const WindowsBot = require('WindowsBot');//引用WindowsBot模块
const { count } = require('console');
const fs = require('fs');

//注册主函数
WindowsBot.registerMain(windowsMain, "127.0.0.1", 26678);
//全局常量
let gwindowsBot
let hwnd
let firstBag
let bagStep
let bagGapStep
let oldAttributeRegion
let newAttributeRegion
let waitAttributeRegion

//打印装备level
let zhuangbeiImgOption = {sim:0.7, mode:true}
let strategys= {0:{name:"空",words:null}
            ,1:{name:"眉心贴",words:"道具",offset:0},
            // ,1:{name:"眉心贴",words:"彩虹",offset:0},
            2:{name:"戒指",words:"彩虹",offset:0},3:{name:"耳环",words:"彩虹",offset:0},
            4:{name:"披风",words:"物理",offset:0},5:{name:"眼镜",words:"命中",offset:-80},
            6:{name:"未知",words:null},}

let pattern = /\d{1,2}/
// let resolution = "1920_1080"
let resolution = "2560_1440"

/**用作代码提示，windowsMain函数会被多次调用，注意使用全局变量
* @param {WindowsBot} windowsBot
*/
async function windowsMain(windowsBot) {
    gwindowsBot = windowsBot
    hwnd = await windowsBot.findWindow("LATALE_CLIENT", null);

    resolutionHandle(resolution)
    // await windowsBot.initOcr("192.168.1.3")
    await windowsBot.initOcr("192.168.1.3",{enableGPU:true,enableTensorrt:true});
    let row = 3

    func_1to10(row)

    let n = 10
    let m = 13
    // func_10NtoM(n,m,row)
    
}

/**装备从lv0到10 连点
* @param {}
*/
async function func_1to10(row){
    const arr = Array.from(new Array(row), () => new Array(12).fill(0))
    for (bagRow = 0; bagRow < row; bagRow++) {
        let bagY = firstBag[1] + bagStep * bagRow
        for (bagCol = 0; bagCol < 12; bagCol++) {
            //监测是否有对应装备（是眉心就镶嵌掉落，耳环及戒指就钱掉，披风就暴击，眼镜就命中）
            let bagX = firstBag[0] + bagStep * bagCol + bagGapStep * Math.floor(bagCol / 4)
            
            let id = await findType(bagX,bagY)
            if(id == 0 || id == 6){
                console.log(`第${bagRow+1}排,第${bagCol+1}列 装备为空\t`);
                continue
            }
            console.log(`第${bagRow+1}排,第${bagCol+1}列 ${strategys[id]["name"]}`)
            //拖入镶嵌栏
            await dragToInlay(bagX,bagY)

            //获取目标属性当前lv
            let shuxingPosArr = await gwindowsBot.findWords(hwnd, strategys[id]["words"], {...oldAttributeRegion, mode:true});
            //点击超级镶嵌
            await gwindowsBot.clickMouse(hwnd, superXiangqian[0], superXiangqian[1], 1, { mode: true });

            let msg =  await preInlay(shuxingPosArr,id,10)
            arr[bagRow][bagCol] = msg
            if(msg !="Y"){
                continue
            }
            //     
            let waitShuxingPosArr = await gwindowsBot.findWords(hwnd, strategys[id]["words"],{...waitAttributeRegion,  mode:true})
            if(waitShuxingPosArr == null){
                arr[bagRow][bagCol] = "N5"
                console.log(`待镶嵌属性字段未找到`)
                continue
            }

            await gwindowsBot.clickMouse(hwnd, waitShuxingPosArr[0].x+20, waitShuxingPosArr[0].y, 1, { mode: true }); //这里选择属性时鼠标指针向右移一点，防止识别数字时失败
            for(let count = 0;count < 10;count ++){
                let res = await doInlay(waitShuxingPosArr,id,10)
                if(res!= "Y"){
                    arr[bagRow][bagCol] = res
                    break
                }
            }          
        }
    }
    fs.writeFile("./runResult.json",JSON.stringify(arr), err => {if (err) {console.error(err);}})
}

async function func_10NtoM(n,m,row){
    // const arr = Array.from(new Array(3), () => new Array(12).fill(0))
    let frequency = m - n
    for (let count = 0; count < frequency; count++) {
        console.log(`。。。第${count+1}锤。。。`);
        for (bagRow = 0; bagRow < row; bagRow++) {
            let bagY = firstBag[1] + bagStep * bagRow
            for (bagCol = 0; bagCol < 12; bagCol++) {
                //监测是否有对应装备（是眉心就镶嵌掉落，耳环及戒指就钱掉，披风就暴击，眼镜就命中）
                let bagX = firstBag[0] + bagStep * bagCol + bagGapStep * Math.floor(bagCol / 4)
                
                let id = await findType(bagX,bagY)
                if(id == 0 || id == 6){
                    console.log(`第${bagRow+1}排,第${bagCol+1}列 装备为空\t`);
                    continue
                }
                console.log(`第${bagRow+1}排,第${bagCol+1}列 ${strategys[id]["name"]}`)

                //拖入镶嵌栏
                await dragToInlay(bagX,bagY)

                //获取目标属性当前lv
                let shuxingPosArr = await gwindowsBot.findWords(hwnd, strategys[id]["words"], {...oldAttributeRegion, mode:true});
                //点击超级镶嵌
                await gwindowsBot.clickMouse(hwnd, superXiangqian[0], superXiangqian[1], 1, { mode: true });

                let msg =  await preInlay(shuxingPosArr,id,m)
                // arr[bagRow][bagCol] = msg
                if(msg !="Y"){
                    continue
                }
                //     
                shuxingPosArr = await gwindowsBot.findWords(hwnd, strategys[id]["words"],{...waitAttributeRegion,  mode:true})
                if(shuxingPosArr == null){
                    // arr[bagRow][bagCol] = "N3"
                    console.log(`待镶嵌属性未找到`)
                    continue
                }

                await gwindowsBot.clickMouse(hwnd, shuxingPosArr[0].x+20, shuxingPosArr[0].y, 1, { mode: true }); //这里选择属性时鼠标指针向右移一点，防止识别数字时失败

                let res = await doInlay(shuxingPosArr,id,m)
                if(res!= "Y"){
                    // arr[bagRow][bagCol] = res
                    continue
                }
            }
        }
    }
    //fs.writeFile("./runResult.json",JSON.stringify(arr), err => {if (err) {console.error(err);}})
}



async function doInlay(posArr,id,targetLevel){
    let waitRegion = [posArr[0].x-45+ strategys[id]["offset"],posArr[0].y-10,posArr[0].x+25,posArr[0].y+15]
    let waitlevelStr = await gwindowsBot.getWords(hwnd, {region:waitRegion,  mode:true})
    if(waitlevelStr==null){
        //重试
        await gwindowsBot.sleep(1000);
        waitlevelStr = await gwindowsBot.getWords(hwnd, {region:waitRegion,  mode:true})
        if(waitlevelStr==null){
            console.log(`待镶嵌属性等级识别为空, 跳过`)
            return "N5"
        }
    }
    // let waitLevel = waitlevelStr.replace(/[^0-9]/ig,"")
    let waitLevel = getMatch(waitlevelStr)
    if(waitLevel==null){
        if(waitlevelStr=="Lv.了￥"){
            waitLevel = 7
            console.log(`识别字符串为：${waitlevelStr},将等级置为7`)
        }else{
            console.log(`待镶嵌属性等级识别错误, 跳过,识别字符串为：${waitlevelStr}`)
            return "N6"
        }
    }
    if(Number.parseInt(waitLevel) < targetLevel){
        await gwindowsBot.clickMouse(hwnd, execute[0], execute[1], 1, { mode: true }); //点击执行
        await gwindowsBot.sleep(1300);
    }else if(Number.parseInt(waitLevel) == targetLevel){
        await gwindowsBot.clickMouse(hwnd, execute[0], execute[1], 1, { mode: true }); //点击执行
        await gwindowsBot.sleep(1300);
        return waitLevel
    }else{
        arr[bagRow][bagCol] = waitLevel
        console.log(`成功镶嵌至${waitLevel} , ${waitlevelStr}`)
        return waitLevel
    }

    return "Y"
}

async function preInlay(shuxingPosArr,id,targetLevel){
    if(shuxingPosArr == null){
        //不存在则去待镶嵌栏中选择对应属性并开始镶嵌
        await gwindowsBot.sleep(200);
        shuxingPosArr = await gwindowsBot.findWords(hwnd, strategys[id]["words"], {...newAttributeRegion, mode:true});
        
        if(shuxingPosArr == null){
            console.log(`目标镶嵌属性未找到`)
            return "N1"
        }
        if(targetLevel==10){
            await gwindowsBot.clickMouse(hwnd, shuxingPosArr[0].x, shuxingPosArr[0].y, 1, { mode: true }); //点击属性
            await gwindowsBot.sleep(200);
            await gwindowsBot.clickMouse(hwnd, execute[0], execute[1], 1, { mode: true }); //点击执行
            await gwindowsBot.sleep(1500);
        }
    }else{
        let oldRegion = [shuxingPosArr[0].x-70+ strategys[id]["offset"],shuxingPosArr[0].y-10,shuxingPosArr[0].x+15,shuxingPosArr[0].y+15]
        let oldLevelStr = await gwindowsBot.getWords(hwnd, {region:oldRegion,  mode:true})
        if(oldLevelStr==null){
            //重试
            await gwindowsBot.sleep(1000);
            oldLevelStr = await gwindowsBot.getWords(hwnd, {region:oldRegion,  mode:true})
            if(oldLevelStr==null){
                console.log(`原属性识别错误, 跳过`)
                return "N2"
            }
        }
        //大于10就切换
        let oldLevel = getMatch(oldLevelStr)
        if(oldLevel==null){
            console.log(`原属性等级识别错误, 跳过,识别字符串为：${oldLevelStr}`)
            return "N3"
        }
        if(Number.parseInt(oldLevel) >= targetLevel){
            console.log(`已镶嵌至 ${oldLevel}`)
            return oldLevel
        }
    }
    return "Y"
}

function getMatch(str){
    let mcArr  = str.match(pattern) 
    if(mcArr!=null){
        return mcArr[0]
    }
    return null
}

/**
 * 拖入镶嵌栏
 */
async function dragToInlay(x,y){
    await gwindowsBot.clickMouse(hwnd, x+10, y+10, 3, { mode: true });
    await gwindowsBot.sleep(200);
    await gwindowsBot.moveMouse(hwnd, xiangqiancao[0],xiangqiancao[1], { mode: true });
    await gwindowsBot.clickMouse(hwnd, xiangqiancao[0],xiangqiancao[1], 4, { mode: true });
    await gwindowsBot.sleep(200);
}

/**装备从lv10到n <20 一锤就换
* @param {}
*/

async function findType(x, y) {
    let option =  {region: [x, y, x + 40, y + 40],...zhuangbeiImgOption}
    //是否为空
    if(await gwindowsBot.findImage(hwnd, "./project_xiangqian/pic/kong.png",option)){
        return 0
    }else if(await gwindowsBot.findImage(hwnd, "./project_xiangqian/pic/meixin.png",option)!=null){ 
        return 1 //眉心
    }else if(await gwindowsBot.findImage(hwnd, "./project_xiangqian/pic/jiezhi.png",option)!=null){
        return 2 //戒指
    }else if(await gwindowsBot.findImage(hwnd, "./project_xiangqian/pic/erhuan.png",option)!=null){
        return 3 //耳环
    }else if(await gwindowsBot.findImage(hwnd, "./project_xiangqian/pic/pifeng.png",option)!=null){
        return 4 //披风
    }else if(await gwindowsBot.findImage(hwnd, "./project_xiangqian/pic/yanjing.png",option)!=null){
        return 5 //眼镜
    }else{
        return 6
    }
}


function resolutionHandle(resolution) {
    //分辨率处理
    switch (resolution) {
        case "1920_1080":

        case "2560_1440":
            xiangqiancao=[790, 202]
            firstBag = [47, 117]
            superXiangqian = [747, 523]
            execute = [747, 602]
            bagStart = [255, 398] //定位于奶牛色鲫鱼的尾巴沟里面的蓝色背景
            bagEnd = [643, 398]
            bagStep = 40
            bagGapStep = 12
            oldAttributeRegion = {region:[626, 371, 798, 473]}
            newAttributeRegion = {region:[1074, 314, 1227, 434]}
            waitAttributeRegion = {region:[1075, 141, 1259, 258]}
            break;
        default:

    }
}

