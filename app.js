/* LOGIN */
let user = localStorage.getItem("habitUser")
if(!user){
user = prompt("Enter your name:")
localStorage.setItem("habitUser", user)
}
document.getElementById("title").innerText = user+"'s Habit Tracker"

/* DATA */
const todayDate = () => new Date().toISOString().slice(0,10)
let todayKey="day_"+todayDate()

let today = JSON.parse(localStorage.getItem(todayKey))
|| [false,false,false,false,false,false,false,false]

let history = JSON.parse(localStorage.getItem("habitHistory"))||[]

/* BUTTON TOGGLE */
function toggle(i){
today[i]=!today[i]
localStorage.setItem(todayKey,JSON.stringify(today))
renderButtons()
updateScore()
}

/* SHOW MARKED BUTTON */
function renderButtons(){
document.querySelectorAll(".habit").forEach((b,i)=>{
b.style.background=today[i]?"#4ade80":"#22c55e"
})
}

/* SCORE /
function updateScore(){
let done=today.filter(v=>v).length
document.getElementById("todayScore").innerText=
"Score: "+Math.round(done/8100)+"%"
}

/* SAVE DAY /
function saveDay(){
let date=todayDate()
if(history.some(d=>d.date===date)){
alert("Already saved today")
return
}
let done=today.filter(v=>v).length
let score=Math.round(done/8100)

history.push({date,score})
localStorage.setItem("habitHistory",JSON.stringify(history))

alert("Saved! "+score+"%")
drawCharts()
}

/* CHARTS */
function drawCharts(){

let labels=history.map(d=>d.date)
let scores=history.map(d=>d.score)

/* DAILY */
new Chart(document.getElementById("dailyChart"),{
type:'line',
data:{labels,datasets:[{data:scores,borderColor:'#22c55e',fill:true}]},
options:{scales:{y:{min:0,max:100}}}
})

/* WEEKLY */
let weeks={}
history.forEach(d=>{
let w=d.date.slice(0,7)+"-W"+Math.ceil(new Date(d.date).getDate()/7)
if(!weeks[w])weeks[w]=[]
weeks[w].push(d.score)
})
let wLabels=Object.keys(weeks)
let wScores=wLabels.map(w=>Math.round(
weeks[w].reduce((a,b)=>a+b,0)/weeks[w].length
))
new Chart(document.getElementById("weekChart"),{
type:'bar',
data:{labels:wLabels,datasets:[{data:wScores,backgroundColor:'#60a5fa'}]},
options:{scales:{y:{min:0,max:100}}}
})

/* MONTHLY */
let months={}
history.forEach(d=>{
let m=d.date.slice(0,7)
if(!months[m])months[m]=[]
months[m].push(d.score)
})
let mLabels=Object.keys(months)
let mScores=mLabels.map(m=>Math.round(
months[m].reduce((a,b)=>a+b,0)/months[m].length
))
new Chart(document.getElementById("monthChart"),{
type:'bar',
data:{labels:mLabels,datasets:[{data:mScores,backgroundColor:'#fbbf24'}]},
options:{scales:{y:{min:0,max:100}}}
})

}

renderButtons()
updateScore()
drawCharts()

if('serviceWorker' in navigator){
navigator.serviceWorker.register('sw.js')
}