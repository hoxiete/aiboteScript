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

firstRole = {11601, 19902}
roleStep = {5000, 8000}

roleArr = {{1, 1, 1, 1, 1, 0}, {0, 1, 1, 1, 1, 1}}
startRoleIndex = {1, 5} -- 第一排第二个角色

function windowsMain()
    local tasklist = {
       {func = function() return gotoPlace(false) end},
        {func = function() return choiceTask() end},
        {func = function() return toKillGuai() end},
        {func = function() return gotoPlace(true) end},
        {func = function() return completeTask() end}
        ,
        {func = function() return quitToRoleFun() end}
    }
    choiceRoleAndExcute(tasklist)
    --choiceRoleAndExcuteTest(tasklist)
end

function choiceRoleAndExcute(funcs)
    for roleIndex1 = startRoleIndex[1], #roleArr do
        for roleIndex2 = startRoleIndex[2], #roleArr[roleIndex1] do
         clickArr(firstRole[1] + roleStep[1] * roleIndex2,
                         firstRole[2] + roleStep[2] * roleIndex1)
                         Sleep(800)
            if roleArr[roleIndex1][roleIndex2] == 1 then
               
                        
                
                --clickArr(firstRole[0] + roleStep[0] * roleIndex2,
                         --firstRole[1] + roleStep[1] * roleIndex1)
                --Sleep(10000)
                --for i = 1, #(funcs) do funcs[i]["func"]() end
            end
        end
        startRoleIndex[2] = 1
    end
    startRoleIndex[1] = 1
end

function choiceRoleAndExcuteTest(funcs)
    for i = 1, #(funcs) do funcs[i]["func"]() end
end

function click(p)
   
    MoveMouseTo(p[1], p[2])
    Sleep(300)
    PressAndReleaseMouseButton(1)
end
function clickArr(x, y)
   OutputLogMessage("a: %d,%d/n",x, y)
    MoveMouseTo(x, y)
    --Sleep(300)
    --PressAndReleaseMouseButton(1)
end

function gotoPlace(wait)
    OutputLogMessage("----第一步 去npc位置----")
    openChuansong()
    click(myChuansong)
    Sleep(500)
    click(confirmChuansong)
    if (wait) then Sleep(6500) 
    else Sleep(5000) 
    end
end
function openEsc()
    click(xuandan)
    Sleep(500)
end
function openChuansong()
    openEsc()
    click(chuansong)
    Sleep(500)
end

function choiceTask()
    OutputLogMessage("----第二步 接受任务----")
    click(npcPos)
    Sleep(2000)
    click(taskListPos)
    Sleep(1000)
    click(chioceTaskPos)
    Sleep(1000)
    click(jieshouPos)
    Sleep(500)
    click(taskBackPos)
    Sleep(2000)
    click(toFloorPos)
    Sleep(1000)
    click(to190Pos)
    Sleep(1000)
    for index = 0, 10, 1 do
        MoveMouseWheel(-1)
        Sleep(200)
    end
    Sleep(1000)
    click(to190Pos)
    Sleep(1000)
    click(toFloorConfirmPos)
    Sleep(1000)

end

function completeTask()
    OutputLogMessage("----第四步 完成任务----")
    click(npcPos)
    Sleep(2000)
    click(taskListPos)
    Sleep(500)
    click(finishTaskPos)
    Sleep(500)
    click(closeNpcPos)
    Sleep(500)
end

function toKillGuai()
    OutputLogMessage("----第三步 执行任务----")
    -- move to guangdian press ↑
    for index = 0, 16, 1 do
        PlayMacro("右上移动")
        Sleep(500)
    end
    Sleep(5000)
    for index = 0, 12, 1 do
        PlayMacro("右上移动")
        Sleep(500)
    end
    -- use skill A
    click(skillA)
    click(skillA)
    click(skillA)
end
function quitToRoleFun()
    OutputLogMessage("----第五步 选择下一个角色----")
    click(xuandan)
    Sleep(1000)
    click(quitToRole)
    Sleep(8000)
end

function printPostion()
    x, y = GetMousePosition()
    OutputLogMessage("Mouse is at %d, %d\n", x, y)
end

function OnEvent(event, arg)
    if (event == "MOUSE_BUTTON_PRESSED" and arg == 5 and
        IsModifierPressed("rctrl")) then
        -- 按住右ctrl并点击鼠标前进键 开始改造挂机
        guaji()
    elseif (event == "MOUSE_BUTTON_PRESSED" and arg == 2 and
        IsModifierPressed("lctrl")) then
        -- 按住右ctrl并点击鼠标右键 检测鼠标当前位置
        printPostion()
    elseif (event == "MOUSE_BUTTON_PRESSED" and arg == 2 and
        IsModifierPressed("rctrl")) then
        -- 按住L键并点击鼠标右键 切换主宠
        changePet()
    elseif (event == "MOUSE_BUTTON_PRESSED" and arg == 5) then
        -- 点击鼠标前进键 开始对第一个喇叭发送悄悄话
        -- hanhuadd()
        -- moveAndOpenxiangqian()  --镶嵌
        -- moveAndDo()  --强化
        -- petqianneng()
    elseif (event == "MOUSE_BUTTON_PRESSED" and arg == 3) then
        OutputLogMessage("1 \n")
        windowsMain()
    elseif (event == "MOUSE_BUTTON_PRESSED" and arg == 4) then
        -- 点击鼠标前进键 开始对第一个喇叭发送悄悄话
        OutputLogMessage("2 \n")
        -- doxiangqian()
        printPostion()
    else
    end
end
