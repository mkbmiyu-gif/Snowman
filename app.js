let meigiData =
JSON.parse(localStorage.getItem("meigiData")) || [];

function saveData() {
  localStorage.setItem(
    "meigiData",
    JSON.stringify(meigiData)
  );
}

function renderMeigi() {

const list = document.getElementById("meigiList");

list.innerHTML = "";

meigiData.forEach((item,index)=>{

const card = document.createElement("div");

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
<span>入会 ${item.joinDate || "-"}</span>
<span>
最終当選
${lastHistory ? lastHistory.title : "なし"}
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

document.getElementById("detailPage").innerHTML = `

<button onclick="backToList()">
← 戻る
</button>

<div class="card">

<div class="card-top">

<div class="icon">❄️</div>

<div>
<h2>${item.name}</h2>
<p>${item.memberNo || ""}</p>
</div>

</div>

<p>入会 ${item.joinDate || ""}</p>

<p>${item.memo || ""}</p>

<h3>履歴</h3>

${(item.histories || []).map((history,hIndex)=>`

<div class="history">

<p>${history.title}</p>

<p>${history.venue}</p>

<p>${history.date}</p>

<button
onclick="deleteHistory(${index},${hIndex})">

履歴削除

</button>

</div>

`).join("")}

<button onclick="addHistory(${index})">

＋履歴追加

</button>

<button onclick="editMeigi(${index})">

編集

</button>

<button onclick="deleteMeigi(${index})">

削除

</button>

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

const title = prompt("公演名");

if(!title) return;

const venue = prompt("会場");

const date = prompt("日付");

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

const item = meigiData[index];

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

const name = prompt("名前");

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
