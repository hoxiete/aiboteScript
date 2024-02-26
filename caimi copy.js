// const WindowsBot = require('WindowsBot');//引用WindowsBot模块
// const baiduSDK = require('baiduSDK');//引用WindowsBot模块
// const fs = require('fs');

console.log("sadasd\b")
console.log("")



strategys = {
    caseType: 1, //精确判断类型
    origin:{// 1: { name: "眉心贴", words: "道具", offset: 0, path: "./project_xiangqian/pic/meixin.png" },
    1: { name: "眉心贴", words: "彩虹", offset: 0, path: "./project_xiangqian/pic/meixin.png" },
    2: { name: "戒指", words: "彩虹", offset: 0, path: "./project_xiangqian/pic/jiezhi.png" }, 3: { name: "耳环", words: "彩虹", offset: 0, path: "./project_xiangqian/pic/erhuan.png" },
    4: { name: "披风", words: "物理", offset: 0, path: "./project_xiangqian/pic/pifeng.png" }, 5: { name: "眼镜", words: "命中", offset: -80, path: "./project_xiangqian/pic/yanjing.png" }
}}
for (let key in strategys) {
    let value = strategys[key];
    console.log(`Key: ${key}, Value: ${value}`);
}