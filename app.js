let meigiData =
JSON.parse(localStorage.getItem("meigiData")) || [];
function saveData() {
  localStorage.setItem(
    "meigiData",
    JSON.stringify(meigiData)
  );
}

function renderMeigi() {

const list =document.getElementById("meigiList");

list.innerHTML = "";

meigiData.forEach((item,index)=>{

const card =
document.createElement("div");

card.className = "card";
  card.innerHTML = `

<div class="card-top">
  <div class="icon">❄️</div>
  <div>
    <h2>${item.name}</h2>
    <p>${item.memberNo || ""}</p>
  </div>
</div>
<div class="meta">
  <span>${item.joinDate || "-"}</span>
  <span>${item.memo || "-"}</span>
</div>


      <h3>履歴</h3>
${(item.histories || []).map((history,hIndex) => `
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
    履歴追加
  </button>

  <button onclick="editMeigi(${index})">
    編集
  </button>

  <button onclick="deleteMeigi(${index})">
    削除
  </button>
`;

list.appendChild(card);

});

}

function editMeigi(index){

const item = meigiData[index];

item.name =prompt("名前", item.name);

item.memberNo =prompt("会員番号", item.memberNo);

item.joinDate =prompt("入会日", item.joinDate);

item.memo =prompt("メモ", item.memo || "");

saveData();

renderMeigi();

}

function deleteMeigi(index){

if(!confirm("削除しますか？")){return;}

meigiData.splice(index,1);

saveData();

renderMeigi();

}

document.getElementById("addBtn").addEventListener("click",()=>{

const name =prompt("名前");

if(!name) return;

const memberNo =prompt("会員番号");

const joinDate =prompt("入会日");

const memo =prompt("メモ");

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

document.getElementById("searchInput").addEventListener("input",(e)=>{

const keyword =e.target.value.toLowerCase();

document.querySelectorAll(".card").forEach(card=>{

const text =
card.innerText.toLowerCase();

card.style.display =
text.includes(keyword)
? "block"
: "none";

});

});

document.getElementById("exportBtn").addEventListener("click",()=>{

const blob =new Blob([JSON.stringify(meigiData)],{type:"application/json"});

const a =document.createElement("a");

a.href =URL.createObjectURL(blob);

a.download ="meigi-backup.json";

a.click();

});

document.getElementById("importBtn").addEventListener("click",()=>{

document.getElementById("importFile").click();

});

document.getElementById("importFile").addEventListener("change",(e)=>{

const file =e.target.files[0];

if(!file) return;

const reader =new FileReader();

reader.onload = ()=>{

meigiData =
JSON.parse(reader.result);

saveData();

renderMeigi();

};

reader.readAsText(file);

});

if("serviceWorker" in navigator){

navigator.serviceWorker.register("./service-worker.js");

}
renderMeigi();
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

renderMeigi();

}
function deleteHistory(meigiIndex, historyIndex){

if(!confirm("履歴を削除しますか？")){
return;
}

meigiData[meigiIndex].histories.splice(
historyIndex,
1
);

saveData();

renderMeigi();

}

