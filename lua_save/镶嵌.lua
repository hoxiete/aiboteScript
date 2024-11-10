fenjiePosition= {16734, 44399}  --分解装备按钮位置
zhuangbeiPosition={12704, 21258} --需分解的装备格位置
guangboPosition={10654, 57520} --聊天框中发喇叭的第一个人id的位置
qqhPosition={12088, 55926}--点击该id出现选项框里悄悄话按钮的位置
masterPetPosition={20968, 21501}--主宠的位置
slavePetPosition={22983, 21076}--副宠的位置
taskSecond=0 --全局定时器计时变量



function click(p)
   MoveMouseTo(p[1],p[2])
   Sleep(300)   
   PressAndReleaseMouseButton(1)
end

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

function moveAndDo()
  PlayMacro("press I")
  Sleep(500)
  dragZhuangbeiToSlot()
  Sleep(100)
  dragPeiziToSlot()
  --doxiangqian()

end
function moveAndOpenxiangqian()
  MoveMouseTo(20206, 9291)
  PressMouseButton(1)
  MoveMouseTo(20206, 9291)  --装备强化所需材料的槽
  Sleep(200)
  ReleaseMouseButton(1)
end
function dragZhuangbeiToSlot()
  click({2202, 23226})
  MoveMouseTo(1690, 9837)
  Sleep(200)
  PressMouseButton(1)
  MoveMouseTo(20206, 9291)  --装备强化所需材料的槽
  Sleep(200)
  ReleaseMouseButton(1)
end
function dragPeiziToSlot()
  MoveMouseTo(2561, 9837)
  PressMouseButton(1)
  MoveMouseTo(18285, 14209)  --装备强化所需材料的槽
  Sleep(200)
  ReleaseMouseButton(1)
  Sleep(100)
end

function doxiangqian()
  click({19054, 27371})  --点击 执行按钮
  --MoveMouseTo(5276, 9017) --鼠标移到装备附近
end

function petqianneng()
  click({20411, 27462})
  Sleep(100)
  click({20411, 27462})  --点击 活动觉醒剂 2次
  Sleep(100)
  click({20001, 30194})
  Sleep(100)
  click({20001, 30194}) --点击填满
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
   --按住左ctrl并点击鼠标右键 检测鼠标当前位置
    printPostion()
  elseif(event == "MOUSE_BUTTON_PRESSED" and arg == 2 and IsModifierPressed("rctrl")) then
   --按住L键并点击鼠标右键 切换主宠
    changePet()
  elseif(event == "MOUSE_BUTTON_PRESSED" and arg == 5) then
   --点击鼠标前进键 
    --hanhuadd()
    OutputLogMessage("5 \n")
    --moveAndOpenxiangqian()
    --moveAndDo()
    --petqianneng()
  elseif(event == "MOUSE_BUTTON_PRESSED" and arg == 3) then
   --点击鼠标中键 
    OutputLogMessage("3 \n")
    moveAndDo()
  elseif(event == "MOUSE_BUTTON_PRESSED" and arg == 4) then
   --点击鼠标后退键 
   OutputLogMessage("4 \n")
   --doxiangqian()
  else 
  end
end
