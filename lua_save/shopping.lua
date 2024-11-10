goumaiPosition = {23715, 37117} -- 商品购买按钮位置
goumaiConfirmPosition = {23689, 32972} -- 确认购买按钮位置
nextPagePosition = {25430, 42263} -- 下一页位置
targetPagePosition = {26147, 42217} -- 目标页数字位置

nextNum = 1
testBuy = true
function shopping()
   -- for i = 1, nextNum, 1 do
    --    MoveMouseTo(targetPagePosition [1], targetPagePosition [2])
  --      Sleep(50)
    --    PressAndReleaseMouseButton(1)
    --    Sleep(50)
    --end
    MoveMouseTo(goumaiPosition[1], goumaiPosition[2])
    Sleep(50)
    PressAndReleaseMouseButton(1)
    Sleep(100)

    MoveMouseTo(goumaiConfirmPosition[1], goumaiConfirmPosition[2])
    Sleep(50)
    if (testBuy==false) then 
        PressAndReleaseMouseButton(1) 
        --OutputLogMessage("Mouse is at")
    end
    Sleep(800)
end

function printPostion()
    x, y = GetMousePosition()
    OutputLogMessage("Mouse is at %d, %d\n", x, y)
end

function OnEvent(event, arg)
    if (event == "MOUSE_BUTTON_PRESSED" and arg == 5 and
        IsModifierPressed("rctrl")) then
        -- 按住右ctrl并点击鼠标前进键 开始改造挂机

    elseif (event == "MOUSE_BUTTON_PRESSED" and arg == 2 and
        IsModifierPressed("lctrl")) then
        -- 按住右ctrl并点击鼠标右键 检测鼠标当前位置
        printPostion()
    elseif (event == "MOUSE_BUTTON_PRESSED" and arg == 2 and
        IsModifierPressed("rctrl")) then
        -- 按住L键并点击鼠标右键 切换主宠

    elseif (event == "MOUSE_BUTTON_PRESSED" and arg == 5) then
        -- 点击鼠标前进键 开始对第一个喇叭发送悄悄话
        shopping()
    else
    end
end
