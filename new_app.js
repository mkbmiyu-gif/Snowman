let meigiData =
JSON.parse(
localStorage.getItem("meigiData")
) || [];

function saveData(){

localStorage.setItem(
"meigiData",
JSON.stringify(meigiData)
);

}

function renderMeigi(){

const list =
document.getElementById(
"meigiList"
);

list.innerHTML = "";

let displayData =
[...meigiData];

const sort =
document.getElementById(
"sortSelect"
)?.value || "default";

if(sort==="win"){

displayData.sort(
(a,b)=>
(b.histories?.length||0)
-
(a.histories?.length||0)
);

}

if(sort==="member"){

displayData.sort(
(a,b)=>
(a.memberNo||"")
.localeCompare(
b.memberNo||""
)
);

}

if(sort==="name"){

displayData.sort(
(a,b)=>
(a.name||"")
.localeCompare(
b.name||""
)
);

}

if(sort==="join"){

displayData.sort(
(a,b)=>
(a.joinDate||"")
.localeCompare(
b.joinDate||""
)
);

}

displayData.forEach((item)=>{

const card =
document.createElement("div");

card.className =
"card";

const winCount =
(item.histories||[])
.length;

const entryCount =
item.entryCount || 0;

const rate =
entryCount
?
Math.round(
winCount
/
entryCount
*100
)
:
0;

const lastHistory =
winCount
?
item.histories[
winCount-1
]
:
null;

card.innerHTML = `

<div class="card-top">

<div class="icon">

❄️

</div>

<div class="card-title">

<h2>

${item.name}

</h2>

<p>

${item.memberNo || ""}

</p>

</div>

<button
class="copy-btn"
onclick="
copyMemberNo(
event,
'${item.memberNo || ""}'
)
"
>

IDコピー

</button>

</div>

<div class="meta">

<span>

当選 ${winCount}回

</span>

<span>

${rate}%

</span>

</div>

<div class="meta">

<span>

${lastHistory
?
lastHistory.title
:
"当選なし"}

</span>

</div>

`;

card.addEventListener(
"click",
()=>{

showDetail(
meigiData.indexOf(item)
);

});

list.appendChild(
card
);

});

}

function copyMemberNo(
event,
memberNo
){

event.stopPropagation();

if(!memberNo){
return;
}

navigator.clipboard
.writeText(
memberNo
);

const toast =
document.getElementById(
"toast"
);

toast.classList.add(
"show"
);

setTimeout(()=>{

toast.classList.remove(
"show"
);

},1500);

}

function showDetail(index){

const item =
meigiData[index];

document
.getElementById(
"listPage"
)
.classList.add(
"hidden"
);

document
.getElementById(
"detailPage"
)
.classList.remove(
"hidden"
);

document
.getElementById(
"detailPage"
)
.innerHTML = `

<button
onclick="backToList()">

← 戻る

</button>

<div class="card">

<div class="card-top">

<div class="icon">

❄️

</div>

<div class="card-title">

<h2>

${item.name}

</h2>

<p>

${item.memberNo || ""}

</p>

</div>

<button
class="copy-btn"
onclick="
copyMemberNo(
event,
'${item.memberNo || ""}'
)
">

IDコピー

</button>

</div>

<p>

入会
${item.joinDate || ""}

</p>

<h3>

履歴

</h3>

${(item.histories || [])
.map((history,hIndex)=>`

<div class="history">

<p>

${history.title}

</p>

<p>

${history.venue || ""}

</p>

<p>

${history.date || ""}

</p>

<button
onclick="
deleteHistory(
${index},
${hIndex}
)
">

履歴削除

</button>

</div>

`)
.join("")}

<button
onclick="
addHistory(
${index}
)
">

＋履歴追加

</button>

<button
onclick="
editMeigi(
${index}
)
">

編集

</button>

<button
onclick="
deleteMeigi(
${index}
)
">

削除

</button>

</div>

`;

}

function backToList(){

document
.getElementById(
"detailPage"
)
.classList.add(
"hidden"
);

document
.getElementById(
"listPage"
)
.classList.remove(
"hidden"
);

renderMeigi();

}

function addHistory(index){

const title =
prompt(
"公演名"
);

if(!title){
return;
}

const venue =
prompt(
"会場"
);

const date =
prompt(
"日付"
);

if(
!meigiData[index]
.histories
){

meigiData[index]
.histories = [];

}

meigiData[index]
.histories.push({

title,
venue,
date

});

saveData();

showDetail(index);

}

function deleteHistory(
meigiIndex,
historyIndex
){

if(
!confirm(
"履歴を削除しますか？"
)
){
return;
}

meigiData[
meigiIndex
]
.histories.splice(
historyIndex,
1
);

saveData();

showDetail(
meigiIndex
);

}

function editMeigi(index){

const item =
meigiData[index];

item.name =
prompt(
"名前",
item.name
);

item.memberNo =
prompt(
"会員番号",
item.memberNo
);

item.joinDate =
prompt(
"入会日",
item.joinDate
);

saveData();

showDetail(index);

}

function deleteMeigi(index){

if(
!confirm(
"削除しますか？"
)
){
return;
}

meigiData.splice(
index,
1
);

saveData();

backToList();

}

document
.getElementById(
"addBtn"
)
.addEventListener(
"click",
()=>{

const name =
prompt(
"名前"
);

if(!name){
return;
}

const memberNo =
prompt(
"会員番号"
);

const joinDate =
prompt(
"入会日"
);

meigiData.push({

name,
memberNo,
joinDate,
entryCount:0,
histories:[]

});

saveData();

renderMeigi();

}
);

document
.getElementById(
"exportBtn"
)
.addEventListener(
"click",
()=>{

const blob =
new Blob(

[
JSON.stringify(
meigiData
)
],

{
type:
"application/json"
}

);

const a =
document
.createElement(
"a"
);

a.href =
URL.createObjectURL(
blob
);

a.download =
"meigi-backup.json";

a.click();

}
);

document
.getElementById(
"importBtn"
)
.addEventListener(
"click",
()=>{

document
.getElementById(
"importFile"
)
.click();

}
);

document
.getElementById(
"importFile"
)
.addEventListener(
"change",
(e)=>{

const file =
e.target.files[0];

if(!file){
return;
}

const reader =
new FileReader();

reader.onload =
()=>{

meigiData =
JSON.parse(
reader.result
);

saveData();

renderMeigi();

};

reader.readAsText(
file
);

}
);

document
.getElementById(
"sortSelect"
)
.addEventListener(
"change",
()=>{

renderMeigi();

}
);

if(
"serviceWorker"
in navigator
){

navigator
.serviceWorker
.register(
"./service-worker.js"
);

}

renderMeigi();
