let meigiData =
JSON.parse(localStorage.getItem("meigiData")) || [];

function saveData() {
  localStorage.setItem(
    "meigiData",
    JSON.stringify(meigiData)
  );
}

function renderMeigi() {

const list =
document.getElementById("meigiList");

list.innerHTML = "";

meigiData.forEach((item,index)=>{

const card =
document.createElement("div");

card.className = "card";

const lastHistory =
(item.histories && item.histories.length)
? item.histories[item.histories.length-1]
: null;

card.innerHTML = `

<div class="card-top">

<div class="icon">❄️</div>

<div>
<h2>${item.name}</h2>
<p>${item.memberNo || ""}</p>
</div>

</div>

<div class="meta">

<span>
当選回数 ${(item.histories || []).length}回
</span>

<span>
${lastHistory ? lastHistory.title : "当選なし"}
</span>

</div>

`;

card.onclick = ()=>{
showDetail(index);
};

list.appendChild(card);

});

}

function showDetail(index){

const item = meigiData[index];

document.getElementById("listPage")
.classList.add("hidden");

document.getElementById("detailPage")
.classList.remove("hidden");

document.getElementById("detailPage")
.innerHTML = `

<button onclick="backToList()">
← 戻る
</button>

<div class="card">

<div style="
display:flex;
justify-content:space-between;
align-items:flex-start;
">

<div class="card-top">

<div class="icon">❄️</div>

<div>
<h2>${item.name}</h2>
<p>${item.memberNo || ""}</p>
</div>

</div>

<details class="menu">

<summary>⋯</summary>

<button onclick="addHistory(${index})">
＋履歴追加
</button>

<button onclick="editMeigi(${index})">
編集
</button>

<button onclick="deleteMeigi(${index})">
削除
</button>

</details>

</div>

<p>入会 ${item.joinDate || ""}</p>

<p>${item.memo || ""}</p>

<h3>履歴</h3>

${(item.histories || []).map((history,hIndex)=>`

<div class="history">
<div class="history-content">
<p><strong>${history.title}</strong></p>
<p>${history.venue}</p>
<p>${history.date}</p>
</div>
<div class="delete-area"
onclick="deleteHistory(${index},${hIndex})">

削除

</div>
</div>
`).join("")}

</div>

`;

}
function backToList(){

document.getElementById("detailPage")
.classList.add("hidden");

document.getElementById("listPage")
.classList.remove("hidden");

renderMeigi();

}

function addHistory(index){

const title =
prompt("公演名");

if(!title) return;

const venue =
prompt("会場");

const date =
prompt("日付");

if(!meigiData[index].histories){
meigiData[index].histories = [];
}

meigiData[index].histories.push({
title,
venue,
date
});

saveData();

showDetail(index);

}

function deleteHistory(meigiIndex,historyIndex){

if(!confirm("履歴を削除しますか？")){
return;
}

meigiData[meigiIndex].histories.splice(
historyIndex,
1
);

saveData();

showDetail(meigiIndex);

}

function editMeigi(index){

const item =
meigiData[index];

item.name =
prompt("名前",item.name);

item.memberNo =
prompt("会員番号",item.memberNo);

item.joinDate =
prompt("入会日",item.joinDate);

item.memo =
prompt("メモ",item.memo);

saveData();

showDetail(index);

}

function deleteMeigi(index){

if(!confirm("削除しますか？")){
return;
}

meigiData.splice(index,1);

saveData();

backToList();

}
document.getElementById("addBtn")
.addEventListener("click",()=>{
const name =
prompt("名前");
if(!name) return;
const memberNo =
prompt("会員番号");
const joinDate =
prompt("入会日");
const memo =
prompt("メモ");
meigiData.push({
name,
memberNo,
joinDate,
memo,
histories:[]
});
saveData();
renderMeigi();
});
document.getElementById("exportBtn")
.addEventListener("click",()=>{
const blob = new Blob(
[JSON.stringify(meigiData)],
{
type:"application/json"
}
);
const a =
document.createElement("a");
a.href =
URL.createObjectURL(blob);
a.download =
"meigi-backup.json";
a.click();
});

if("serviceWorker" in navigator){
navigator.serviceWorker.register(
"./service-worker.js"
);
}
renderMeigi();
document.addEventListener(“touchstart”,(e)=>{

const history =
e.target.closest(”.history”);

if(!history) return;

history.startX =
e.touches[0].clientX;

});

document.addEventListener(“touchmove”,(e)=>{

const history =
e.target.closest(”.history”);

if(!history || history.startX===undefined) return;

const moveX =
e.touches[0].clientX;

const diff =
moveX-history.startX;

if(diff<-30){

history.querySelector(
“.history-content”
).style.transform =
“translateX(-80px)”;

}

if(diff>30){

history.querySelector(
“.history-content”
).style.transform =
“translateX(0px)”;

}

});

document.addEventListener(“touchend”,()=>{

document.querySelectorAll(
“.history”
).forEach(history=>{

history.startX =
undefined;

});

});
