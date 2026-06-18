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
