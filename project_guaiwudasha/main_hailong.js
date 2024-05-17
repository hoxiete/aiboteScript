let xuandan = [48197, 45588];
let chuansong = [13701, 10930];
let myChuansong = [6710, 4099];
let confirmChuansong = [11038, 24729];
let npcPos = [24278, 30513];
let taskListPos = [12958, 32790];
let chioceTaskPos = [7683, 19128];
let jieshouPos = [21743, 38574];
let taskBackPos = [29067, 11978];
let toFloorPos = [13291, 33838];
let toDownFloorPos = [29016, 32016];
let to190Pos = [23638, 31652];
let toFloorConfirmPos = [24355, 33838];
let finishTaskPos = [11140, 38574];
let closeNpcPos = [46225, 15849];
let skillA = [18849, 46089];
let skillR = [31269, 46271];
let quitToRole = [15673, 22543];

let firstRole = [12000, 20000];
let roleStep = [5000, 8000];

let roleArr = [[1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1]];
let startRoleIndex = [1, 1]; // 第一排第二个角色

function main_guaiwu() {
    let tasklist = [
        {func: () => gotoPlace_dasha(false)},
        {func: () => choiceTask()},
        {func: () => toKillGuai_dasha()},
        {func: () => gotoPlace_dasha(true)},
        {func: () => completeTask()},
        {func: () => quitToRoleFun()}
    ];
    roleExcute(tasklist);
    console.log("---结束----");
}

function main_longwang() {
    let tasklist = [{func: () => toKillGuai_longwang()}];
    frequencyExcute(tasklist, 1);
}

function frequencyExcute(funcs, count) {
    for (let c = 1; c <= count; c++) {
        for (let i = 0; i < funcs.length; i++) {
            if (funcs[i]["func"]()) return true;
        }
    }
}

function roleExcute(funcs) {
    for (let roleIndex1 = startRoleIndex[0]; roleIndex1 < roleArr.length; roleIndex1++) {
        for (let roleIndex2 = startRoleIndex[1]; roleIndex2 < roleArr[roleIndex1].length; roleIndex2++) {
            if (roleArr[roleIndex1][roleIndex2] === 1) {
                let pos = [
                    firstRole[0] + roleStep[0] * (roleIndex2 - 1),
                    firstRole[1] + roleStep[1] * (roleIndex1 - 1)
                ];
                click(pos);
                Sleep(800);
                click(pos);
                if (delayMillsecond(12000)) return true;
                for (let i = 0; i < funcs.length; i++) {
                    if (funcs[i]["func"]()) return true;
                }
            }
        }
        startRoleIndex[1] = 0;
    }
    startRoleIndex[0] = 0;
}

function iscancel() { return IsMouseButtonPressed(4); }
function iscancel2() { return !IsMouseButtonPressed(5); }

function delayMillsecond(millsecond) {
    return originDelayMillsecond(millsecond, iscancel);
}

function delayMillsecond2(millsecond) {
    return originDelayMillsecond(millsecond, iscancel2);
}

function originDelayMillsecond(millsecond, cancelFunc) {
    if (millsecond >= 1000) {
        let count = Math.floor(millsecond / 1000);
        let mill = millsecond % 1000;
        for (let i = 1; i <= count * 2; i++) {
            Sleep(500);
            if (cancelFunc()) {
                console.log("cancel");
                return true;
            }
        }
        if (cancelFunc()) {
            console.log("cancel");
            return true;
        }
        Sleep(mill);
    } else {
        if (cancelFunc()) {
            console.log("cancel");
            return true;
        }
        Sleep(millsecond);
    }
}

function gotoPlace_dasha(wait) {
    console.log("----第一步 去npc位置----");
    if (openChuansong()) return true;
    click(myChuansong);
    Sleep(500);
    click(confirmChuansong);
    if (wait) {
        if (delayMillsecond(8000)) return true;
    } else {
        if (delayMillsecond(6500)) return true;
    }
}

function openEsc() {
    click(xuandan);
}

function openChuansong() {
    openEsc();
    if (delayMillsecond(500)) return true;
    click(chuansong);
    if (delayMillsecond(500)) return true;
}

function toKillGuai_longwang() {
    console.log("----开始----");
    PlayMacro("youshang");
    if (delayMillsecond(8000)) return true;
    PlayMacro("dtoup");
    if (delayMillsecond(10000)) return true;
    console.log("----结束----");
}



function quitToRoleFun() {
    console.log("----第五步 选择下一个角色----");
    click(xuandan);
    if (delayMillsecond(1000)) return true;
    click(quitToRole);
    if (delayMillsecond(10000)) return true;
}

function PressAndReleaseMacro(name) {
    PressMacro(name);
    while (true) if (delayMillsecond2(20000)) break;
    ReleaseMacro(name);
}

function click(p) {
    MoveMouseTo(p[0], p[1]);
    Sleep(300);
    PressAndReleaseMouseButton(1);
}

function printPostion() {
    let pos = GetMousePosition();
    console.log("Mouse is at " + pos[0] + ", " + pos[1]);
}

function OnEvent(event, arg) {
    if (event == "MOUSE_BUTTON_PRESSED" && arg == 5 && IsModifierPressed("ralt")) {
        main_guaiwu();
    } else if (event == "MOUSE_BUTTON_PRESSED" && arg == 2 && IsModifierPressed("ralt")) {
        printPostion();
    } else if (event == "MOUSE_BUTTON_PRESSED" && arg == 3 && IsModifierPressed("ralt")) {
        main_longwang();
    } else if (event == "MOUSE_BUTTON_PRESSED" && arg == 5) {
        PressAndReleaseMacro("右键循环");
    }
}
