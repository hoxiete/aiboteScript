fenjiePosition= {16734, 44399}  --分解装备按钮位置
zhuangbeiPosition={12704, 21258} --需分解的装备格位置
guangboPosition={8538, 60190} --聊天框中发喇叭的第一个人id的位置
qqhPosition={10450, 57700}--点击该id出现选项框里悄悄话按钮的位置
masterPetPosition={20968, 21501}--主宠的位置
slavePetPosition={22983, 21076}--副宠的位置
taskSecond=0 --全局定时器计时变量

function fenjie()
   PressAndReleaseKey("escape")
   Sleep(200)
   PlayMacro("press I")
   Sleep(500)
   MoveMouseTo(fenjiePosition[1],fenjiePosition[2])
   Sleep(500)   
   PressAndReleaseMouseButton(1)
   Sleep(500)   
   MoveMouseTo(zhuangbeiPosition[1], zhuangbeiPosition[2])
   --MoveMouseRelative(0,-130)
   Sleep(500)
   PressAndReleaseMouseButton(1)
   Sleep(500)
   PressAndReleaseKey("enter")
   Sleep(500)
   PressAndReleaseKey("escape")
   Sleep(500)
   PressAndReleaseKey("escape")
end

function iscancel()
  return IsMouseButtonPressed(4)
end

-- 可中断延迟器，每秒检测是否按下停止键
function delaysecond(count)
  for i=1,count,1 do
    Sleep(1000)
    taskSecond = taskSecond +1
    --OutputLogMessage("second :")
    --OutputLogMessage(taskSecond)
    --OutputLogMessage("\n")
    if iscancel() then
     OutputLogMessage("cancel \n")
     return true
    end
  end
end

function gaizaoauto()
  PlayMacro("gaizhaojiqi")
  if delaysecond(3) then return true end --宏在同一时间只能执行一个,所以给宏3秒时间执行
end

function taskExecute(tasklist)
  while(true)
  do
    if delaysecond(1) then return end
    for i=1,#(tasklist) do
      if taskSecond %tasklist[i]["times"]==0 then
        --OutputLogMessage(tasklist[i]["times"])
        --OutputLogMessage(":")
        --OutputLogMessage(taskSecond)
        --OutputLogMessage("\n")
        if tasklist[i]["func"]() then return end
      end
    end
  end
end

function guaji()
  local tasklist = {
                    {times=15,func=function() return gaizaoauto() end},
                    {times=7,func=function() return fenjie() end}
                    }              
  taskExecute(tasklist)
end

function hanhuadd()
  Sleep(100)
  MoveMouseTo(guangboPosition[1],guangboPosition[2])
  Sleep(100)
  PressAndReleaseMouseButton(1)
  Sleep(100)
  MoveMouseTo(qqhPosition[1],qqhPosition[2])
  Sleep(100)
  PressAndReleaseMouseButton(1)
  Sleep(200)
  PressAndReleaseKey("d")
  Sleep(80)
  PressAndReleaseKey("d")
  Sleep(80)
  PressAndReleaseKey("d")
  Sleep(80)
  PressAndReleaseKey("enter")
  Sleep(80)
  PressAndReleaseKey("enter")
end

function changePet()
   PlayMacro("press L")
   Sleep(100)
   MoveMouseTo(masterPetPosition[1],masterPetPosition[2])
   Sleep(100)   
   PressMouseButton(1)
   Sleep(200)   
   MoveMouseTo(slavePetPosition[1], slavePetPosition[2])
   Sleep(200)
   ReleaseMouseButton(1)
   Sleep(800)
   PressAndReleaseKey("escape")
end

function printPostion()
  x, y = GetMousePosition()
  OutputLogMessage("Mouse is at %d, %d\n", x, y)
end

function OnEvent(event, arg)
  if (event == "MOUSE_BUTTON_PRESSED" and arg == 5 and IsModifierPressed("rctrl")) then
   --按住右ctrl并点击鼠标前进键 开始改造挂机
    guaji()
  elseif(event == "MOUSE_BUTTON_PRESSED" and arg == 2 and IsModifierPressed("lctrl")) then
   --按住右ctrl并点击鼠标右键 检测鼠标当前位置
    printPostion()
  elseif(event == "MOUSE_BUTTON_PRESSED" and arg == 2 and IsModifierPressed("rctrl")) then
   --按住L键并点击鼠标右键 切换主宠
    changePet()
  elseif(event == "MOUSE_BUTTON_PRESSED" and arg == 5) then
   --点击鼠标前进键 开始对第一个喇叭发送悄悄话
    hanhuadd()
  else 
  end
end