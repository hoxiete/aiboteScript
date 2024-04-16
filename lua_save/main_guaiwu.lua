xuandan = {48197, 45588}
chuansong = {13701, 10930}
myChuansong = {6710, 4099}
confirmChuansong = {11038, 24729}
npcPos = {24278, 30513}
taskListPos = {12958, 32790}
chioceTaskPos = {7683, 19128}
jieshouPos = {21743, 38574}
taskBackPos = {29067, 11978}
toFloorPos = {13291, 33838}
toDownFloorPos = {29016, 32016}
to190Pos = {23638, 31652}
toFloorConfirmPos = {24355, 33838}
finishTaskPos = {11140, 38574}
closeNpcPos = {46225, 15849}
skillA = {18849, 46089}
quitToRole = {15673, 22543}

firstRole = {12000, 20000}
roleStep = {5000, 8000}

roleArr = {{1, 1, 1, 1, 1, 0}, {0, 1, 1, 1, 1, 1}}
startRoleIndex = {1, 1} -- 第一排第二个角色

function main_guaiwu()
    local tasklist = {
        {func = function() return gotoPlace_dasha(false) end},
        {func = function() return choiceTask() end},
        {func = function() return toKillGuai_dasha() end},
        {func = function() return gotoPlace_dasha(true) end},
        {func = function() return completeTask() end},
        {func = function() return quitToRoleFun() end}
    }
    -- roleExcute(tasklist)
    frequencyExcute(tasklist, 1)
end

function main_longwang()
    local tasklist = {{func = function() return toKillGuai_longwang() end}}
    frequencyExcute(tasklist, 1)
end

function frequencyExcute(funcs, count)
    for c = 1, count do
        for i = 1, #(funcs) do if funcs[i]["func"]() then return true end end
    end
end
function roleExcute(funcs)
    for roleIndex1 = startRoleIndex[1], #roleArr do
        for roleIndex2 = startRoleIndex[2], #roleArr[roleIndex1] do
            if roleArr[roleIndex1][roleIndex2] == 1 then
                local pos = {
                    firstRole[1] + roleStep[1] * (roleIndex2 - 1),
                    firstRole[2] + roleStep[2] * (roleIndex1 - 1)
                }
                click(pos)
                Sleep(800)
                click(pos)
                if delayMillsecond(12000) then return true end
                for i = 1, #(funcs) do
                    if funcs[i]["func"]() then return true end
                end
            end
        end
        startRoleIndex[2] = 1
    end
    startRoleIndex[1] = 1
end

function iscancel() return IsMouseButtonPressed(4) end
function iscancel2()
    if not IsMouseButtonPressed(5) then
        return true
    else
        return false
    end
end

function delayMillsecond(millsecond)
    if originDelayMillsecond(millsecond, function() return iscancel() end) then
        return true
    end
end
function delayMillsecond2(millsecond)
    if originDelayMillsecond(millsecond, function() return iscancel2() end) then
        return true
    end
end

-- 可中断延迟器，每秒检测是否按下停止键
function originDelayMillsecond(millsecond, cancelFunc)
    if millsecond >= 1000 then
        local count = millsecond // 1000
        local mill = millsecond % 1000
        for i = 1, count * 2, 1 do
            Sleep(500)
            if cancelFunc() then
                OutputLogMessage("cancel \n")
                return true
            end
        end
        if cancelFunc() then
            OutputLogMessage("cancel \n")
            return true
        end
        Sleep(mill)
    else
        if cancelFunc() then
            OutputLogMessage("cancel \n")
            return true
        end
        Sleep(millsecond)
    end
end

function gotoPlace_dasha(wait)
    OutputLogMessage("----第一步 去npc位置----\n")
    if openChuansong() then return true end
    click(myChuansong)
    Sleep(500)
    click(confirmChuansong)
    if (wait) then
        if delayMillsecond(8000) then return true end
    else
        if delayMillsecond(6500) then return true end

    end
end
function openEsc() click(xuandan) end
function openChuansong()
    openEsc()
    if delayMillsecond(500) then return true end
    click(chuansong)
    if delayMillsecond(500) then return true end
end

function choiceTask()
    OutputLogMessage("----第二步 接受任务----\n")
    click(npcPos)
    if delayMillsecond(2000) then return true end
    click(taskListPos)
    Sleep(500)
    click(chioceTaskPos)
    if delayMillsecond(500) then return true end
    click(jieshouPos)
    Sleep(500)
    click(taskBackPos)
    if delayMillsecond(3500) then return true end
    click(toFloorPos)
    Sleep(500)
    click(to190Pos)
    if delayMillsecond(1000) then return true end
    for index = 0, 10, 1 do
        MoveMouseWheel(-1)
        Sleep(200)
    end
    if delayMillsecond(1000) then return true end
    click(to190Pos)
    if delayMillsecond(1000) then return true end
    click(toFloorConfirmPos)
    if delayMillsecond(1000) then return true end

end

function completeTask()
    OutputLogMessage("----第四步 完成任务----\n")
    click(npcPos)
    if delayMillsecond(2000) then return true end
    click(taskListPos)
    Sleep(500)
    click(finishTaskPos)
    Sleep(500)
    click(closeNpcPos)
    if delayMillsecond(500) then return true end
end
function toKillGuai_longwang()
    OutputLogMessage("----开始----")
    PlayMacro("youshang")
    if delayMillsecond(8000) then return true end
    PlayMacro("dtoup")
    if delayMillsecond(10000) then return true end
    OutputLogMessage("----结束----")
end

function toKillGuai_dasha()
    OutputLogMessage("----第三步 执行任务----\n")
    -- move to guangdian press →↑
    PlayMacro("youshang")
    if delayMillsecond(10000) then return true end
    PlayMacro("youshang")
    if delayMillsecond(4000) then return true end
    -- use skill A
    if delayMillsecond(500) then return true end
    click(skillA)
    click(skillA)
    click(skillA)
end
function quitToRoleFun()
    OutputLogMessage("----第五步 选择下一个角色----\n")
    click(xuandan)
    if delayMillsecond(1000) then return true end
    click(quitToRole)
    if delayMillsecond(10000) then return true end
end

function PressAndReleaseMacro(name)
    PressMacro(name)
    while (true) do if delayMillsecond2(20000) then break end end
    ReleaseMacro(name)
end

function click(p)
    MoveMouseTo(p[1], p[2])
    Sleep(300)
    PressAndReleaseMouseButton(1)
end

function printPostion()
    x, y = GetMousePosition()
    OutputLogMessage("Mouse is at %d, %d\n", x, y)
end

function OnEvent(event, arg)
    -- 1:左键; 2:右键; 3:中滚轮键; 4:后退键; 5:前进键;
    if (event == "MOUSE_BUTTON_PRESSED" and arg == 5 and
        IsModifierPressed("ralt")) then
        -- 按住右alt并点击鼠标前进键
        main_guaiwu()
    elseif (event == "MOUSE_BUTTON_PRESSED" and arg == 2 and
        IsModifierPressed("ralt")) then
        -- 按住右alt并点击鼠标右键
        printPostion()
    elseif (event == "MOUSE_BUTTON_PRESSED" and arg == 3 and
        IsModifierPressed("ralt")) then
        -- 按住右alt并点击鼠标中键
        main_longwang()
    elseif (event == "MOUSE_BUTTON_PRESSED" and arg == 5) then
        -- 点击鼠标前进键
        PressAndReleaseMacro("右键循环")
    elseif (event == "MOUSE_BUTTON_PRESSED" and arg == 3) then
        -- 点击鼠标中键 

    elseif (event == "MOUSE_BUTTON_PRESSED" and arg == 4) then
        -- 点击鼠标后退 
        -- printPostion()
    else
    end
end
