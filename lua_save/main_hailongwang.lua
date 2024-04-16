function windowsMain()
    local tasklist = {
        {func = function() return gotoPlace() end},
        {func = function() return toKillGuai() end}
    }
    -- choiceRoleAndExcute(tasklist)
    choiceRoleAndExcuteTest(tasklist)
end

function iscancel() return IsMouseButtonPressed(4) end

-- 可中断延迟器，每秒检测是否按下停止键
function delayMillsecond(millsecond)
    if millsecond >= 1000 then
        local count = millsecond // 1000
        local mill = millsecond % 1000
        for i = 1, count, 1 do
            Sleep(1000)
            if iscancel() then
                OutputLogMessage("cancel \n")
                return true
            end
        end
        if iscancel() then
            OutputLogMessage("cancel \n")
            return true
        end
        Sleep(mill)
    else
        if iscancel() then
            OutputLogMessage("cancel \n")
            return true
        end
        Sleep(millsecond)
    end
end

function choiceRoleAndExcuteTest(funcs)
    for c = 1,10 do
        for i = 1, #(funcs) do if funcs[i]["func"]() then return true end end
    end
end

function click(p)
    MoveMouseTo(p[1], p[2])
    Sleep(300)
    PressAndReleaseMouseButton(1)
end

function gotoPlace()
    OutputLogMessage("----第一步 去npc位置----")
    -- move to guangdian press ↑
    PlayMacro("youshang")
    if delayMillsecond(8000) then return true end
end

function toKillGuai()
    OutputLogMessage("----第三步 执行任务----")
    -- move to guangdian press ↑
    PlayMacro("dtoup")
    if delayMillsecond(10000) then return true end

end


function printPostion()
    x, y = GetMousePosition()
    OutputLogMessage("Mouse is at %d, %d\n", x, y)
end

function OnEvent(event, arg)
    if (event == "MOUSE_BUTTON_PRESSED" and arg == 5 and
        IsModifierPressed("rctrl")) then
        -- 按住右ctrl并点击鼠标前进键

    elseif (event == "MOUSE_BUTTON_PRESSED" and arg == 2 and
        IsModifierPressed("lctrl")) then
        -- 按住右ctrl并点击鼠标右键
        printPostion()
    elseif (event == "MOUSE_BUTTON_PRESSED" and arg == 2 and
        IsModifierPressed("rctrl")) then
        -- 按住L键并点击鼠标右键

    elseif (event == "MOUSE_BUTTON_PRESSED" and arg == 5) then
        -- 点击鼠标前进键

    elseif (event == "MOUSE_BUTTON_PRESSED" and arg == 3) then
        -- 点击鼠标中键 
        -- OutputLogMessage("1 \n")
        windowsMain()
    elseif (event == "MOUSE_BUTTON_PRESSED" and arg == 4) then
        -- 点击鼠标后退 
        -- printPostion()
    else
    end
end
