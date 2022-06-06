import Data from "./gameData.js"
const data = {tableDiv,buttonDiv,startBtn,stopBtn,resetBtn,counterBox,counter,redCounterBox,blueCounterBox,innerDiv ,winnerInfo,replayBtn,wrapper}
var initailCountdemo = counter.innerHTML
var initailCount = initailCountdemo
var redBox = new Set()
var blueBox = new Set()
var arr1 = new Set()
var flag=0
var count = 0;
var Tr=[7,7,7,7,7,7,7]

for(let j=1;j<=7;j++){
    var btn =  document.createElement('button')
    btn.id = `b${j}`
    btn.className = "btn"
    btn.innerHTML = "Click"
    btn.onclick = ()=>{
        initailCount=initailCountdemo
        mainFun(j,Tr[j-1])
        Tr[j-1]-=1
        count++
    }
    var newTr = document.createElement('tr')
    newTr.id = `r${j}`
for(let i=1;i<=7;i++){
        var newColumn = document.createElement('td')
        var innerDiv = document.createElement('div')
        innerDiv.id = `d${j}${i}`
        innerDiv.className = "innerBox"
        newColumn.id = `c${j}${i}`
        newColumn.className = "col"
        newTr.append(newColumn)
        newColumn.append(innerDiv)
    }
    tableDiv.append(newTr)
    buttonDiv.append(btn)
   
}

startBtn.onclick = ()=>{
    flag=0
    interval()
    startBtn.classList.add('hide')
    wrapper.classList.remove('hide')
    counterBox.classList.remove('hide') 
}

function interval(){
  var interval1 = setInterval(function(){
        if(flag==1){
            clearInterval(interval1)
        }
        else{
            if(initailCount>=0){ 
                counter.innerHTML = initailCount
            }else{
                count%2==0?counterRedColorDisable():counterBlueColorDisable()
                count++
                initailCount=11
            }
            initailCount--
        }
},1000)
}
stopBtn.onclick = ()=>{ 
        var result = confirm("Are you sure to quit the game?")
        if(result==true){
            startBtn.classList.remove('hide')
            wrapper.classList.add('hide')
            counterBox.classList.add('hide')
            stopRxn()
            flag=1
        }

}
resetBtn.onclick = stopRxn
replayBtn.onclick = ()=>{ stopRxn("replay")}
function stopRxn(arg){
    
    
    if(arg == "replay"){
        startBtn.classList.remove('hide')
        winnerDiv.classList.add('hide')
    }
   for(let i=7;i>=1;i--){
       for(let j=1;j<=7;j++){
           var div = document.getElementById(`d${i}${j}`)
           div.style.backgroundColor="rgba(239, 239, 239, 0.8)"
       }
   }
   document.body.style.backgroundColor = "rgb(233, 232, 232)"
        count=0
        Tr = [7,7,7,7,7,7,7]
        counterBlueColorDisable()
        redBox = new Set()
        blueBox = new Set()
        initailCount = initailCountdemo
}


function counterRedColorDisable(){
        redCounterBox.style.backgroundColor = "rgba(135,0,0,.5)"
        blueCounterBox.style.backgroundColor = "rgb(0,0,255)"
        blueCounterBox.style.borderColor = "rgb(30, 255, 30)"
        redCounterBox.style.borderColor = "#cccc"
}

function counterBlueColorDisable(){
        blueCounterBox.style.backgroundColor = "rgba(0,0,135,.5)"
        redCounterBox.style.backgroundColor = "rgb(255,0,0)"
        redCounterBox.style.borderColor = "rgb(30, 255, 30)"
        blueCounterBox.style.borderColor = "#cccc"
}
function mainFun(props,row){
    if(row<1){
        alert("choose another box")
        count--
    }
    else{
        var column = document.getElementById(`d${row}${props}`)
        var element = Number(`${row}${props}`)
       
            if(count%2==0){
                counterRedColorDisable()
                column.style.background = "red"
                redBox.add(element)
                var newredBox = new Set(redBox)
                checkFun(newredBox)
                }
            else{
                column.style.background = "blue"
                counterBlueColorDisable()
                blueBox.add(element)
                var newblueBox = new Set(blueBox)
                checkFun(newblueBox)
            }

 function checkFun(arg){   

                var cnt1 = [element+1,element-1,element+9,element-9,element+11,element-11]
                var cnt2 = [element+2,element-2,element+18,element-18,element+22,element-22]
                var cnt3 = [element+3,element-3,element+27,element-27,element+33,element-33]
                for(let i=0 ; i<cnt1.length;i++){
                    var checkElement1 = arg.has(cnt1[i]);
                    var checkElement2 = arg.has(cnt2[i]);
                    var checkElement3 = arg.has(cnt3[i]);
                    if(checkElement1== false && checkElement2 == true&& checkElement3==true){
                        arg.delete(cnt2[i])
                        arg.delete(cnt3[i])
                    }
                    else if(checkElement1==false && checkElement2 == true){
                        arg.delete(cnt2[i])
                    }
                }
                
            var checkArr1 =[[element-10,element+10,element-20,element+20,element-30,element+30],
                            [element-1,element+1,element-2,element+2,element-3,element+3],
                            [element+9,element-9,element+18,element-18,element+27,element-27],
                            [element+11,element-11,element+22,element-22,element+33,element-33]]
            
               checkArr1.forEach((val)=>{
                arg.forEach((v)=>{
                   val.forEach((ck)=>{
                       if(ck==v){
                           arr1.add(v).add(element)
                       }  
                   })
                })
                count%2==0?finalCall("Red",arr1):finalCall("Blue",arr1)
                blueBox.size == 25 || redBox.size == 25 ? finalCall("tie"):null
                arr1.clear()  
           })     
            }
            function finalResult(){
                document.body.style.backgroundColor = "rgba(0,0,0,.7)"
                wrapper.classList.add('hide')
                counterBox.classList.add('hide')
                winnerDiv.classList.remove('hide')
                winnerDiv.style.transition = "3s"
            }
            function finalCall(name,arg){
                if(name == "tie"){
                    winnerInfo.innerHTML = "Match Tied"
                    winnerDiv.style.color = "black"
                    setTimeout(finalResult,300)
                    flag=1
                }
                else{
                    if(arg.size>3){
                        winnerInfo.innerHTML = `${name} is Winner!!!`
                        winnerDiv.style.color = `${name}`
                        setTimeout(finalResult,300)
                        flag=1
                    }
                }
               
            }
            }
        }
        
           