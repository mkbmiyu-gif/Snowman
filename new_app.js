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

  let displayData = [...meigiData];

  const sort =
  document.getElementById("sortSelect")
  ?.value || "default";

  // 当選回数順
  if (sort === "win") {

    displayData.sort(
      (a, b) =>
      (b.histories?.length || 0)
      -
      (a.histories?.length || 0)
    );

  }

  // 会員番号順
  if (sort === "member") {

    displayData.sort(
      (a, b) =>
      (a.memberNo || "")
      .localeCompare(
        b.memberNo || ""
      )
    );

  }

  // 名前順
  if (sort === "name") {

    displayData.sort(
      (a, b) =>
      (a.name || "")
      .localeCompare(
        b.name || ""
      )
    );

  }

  // 入会日順
  if (sort === "join") {

    displayData.sort(
      (a, b) =>
      (a.joinDate || "")
      .localeCompare(
        b.joinDate || ""
      )
    );

  }

  displayData.forEach((item) => {

    const card =
    document.createElement("div");

    card.className = "card";

    const winCount =
    (item.histories || []).length;

    const entryCount =
    item.entryCount || 0;

    const rate =
    entryCount
    ?
    Math.round(
      winCount /
      entryCount * 100
    )
    :
    0;

    const lastHistory =
    winCount
    ?
    item.histories[winCount - 1]
    :
    null;

    card.innerHTML = `
<div class="card-top">
  <div class="card-title">
    <h2>${item.name}</h2>
    <p>${item.memberNo || ""}</p>
  </div>

  <button
    onclick="copyMemberNo(event,'${item.memberNo || ""}')"
  >
    IDコピー
  </button>

</div>

<div class="meta">
<span>当選 ${winCount}回</span>
<span>${rate}%</span>
</div>

<div class="meta">
<span>
${lastHistory ? lastHistory.title : "当選なし"}
</span>
</div>
`;

    card.onclick = () => {
      showDetail(
        meigiData.indexOf(item)
      );
    };

    list.appendChild(card);

  });

}
function copyMemberNo(event, memberNo) {

  event.stopPropagation();

  if (!memberNo) return;

  navigator.clipboard.writeText(memberNo);

  alert("会員番号をコピーしました");

}

function showDetail(index) {

  const item =
  meigiData[index];

  document
  .getElementById("listPage")
  .classList.add("hidden");

  document
  .getElementById("detailPage")
  .classList.remove("hidden");

  document
  .getElementById("detailPage")
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

<div class="card-title">

<h2>${item.name}</h2>

<p>${item.memberNo || ""}</p>

</div>

<details class="menu">

<summary>⋯</summary>

<button onclick="addHistory(${index})">
履歴追加
</button>

<button onclick="editMeigi(${index})">
編集
</button>

<button onclick="deleteMeigi(${index})">
削除
</button>

</details>

</div>

<p>
入会 ${item.joinDate || ""}
</p>

<p>
応募回数 ${item.entryCount || 0}回
</p>

<p>
${item.memo || ""}
</p>

<h3>
履歴
</h3>

${(item.histories || []).map((history,hIndex)=>`

<div class="history">

<div
class="delete-area"
onclick="deleteHistory(${index},${hIndex})">

削除

</div>

<div class="history-content">

<p>
<strong>
${history.title}
</strong>
</p>

<p>
${history.venue}
</p>

<p>
${history.date}
</p>

<p>
${history.seat || ""}
</p>

</div>

</div>

`).join("")}

</div>

`;

  enableSwipe();

}
function backToList() {

  document
  .getElementById("detailPage")
  .classList.add("hidden");

  document
  .getElementById("listPage")
  .classList.remove("hidden");

  renderMeigi();

}

function addHistory(index) {

  const title =
  prompt("公演名");

  if (!title) return;

  const venue =
  prompt("会場");

  const date =
  prompt("公演日");

  const seat =
  prompt("座席");

  if (!meigiData[index].histories) {

    meigiData[index].histories = [];

  }

  meigiData[index].histories.push({

    title,
    venue,
    date,
    seat

  });

  saveData();

  showDetail(index);

}

function editMeigi(index) {

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
    "入会日（YY/MM）",
    item.joinDate
  );

  item.entryCount =
  Number(
    prompt(
      "応募回数",
      item.entryCount || 0
    )
  );

  item.memo =
  prompt(
    "メモ",
    item.memo
  );

  saveData();

  showDetail(index);

}

function deleteHistory(meigiIndex, historyIndex) {

  if (
    !confirm("履歴を削除しますか？")
  ) {
    return;
  }

  meigiData[
    meigiIndex
  ].histories.splice(
    historyIndex,
    1
  );

  saveData();

  showDetail(meigiIndex);

}

function deleteMeigi(index) {

  if (
    !confirm("削除しますか？")
  ) {
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
.getElementById("addBtn")
.addEventListener(
"click",
()=>{

const name =
prompt("名前");

if(!name) return;

const memberNo =
prompt("会員番号");

const joinDate =
prompt(
"入会日（YY/MM）",
"21/01"
);

const entryCount =
Number(
prompt(
"応募回数",
0
)
);

const memo =
prompt("メモ");

meigiData.push({

name,
memberNo,
joinDate,
entryCount,
memo,
histories:[]

});

saveData();

renderMeigi();

}
);

document
.getElementById("exportBtn")
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
document.createElement("a");

a.href =
URL.createObjectURL(blob);

a.download =
"meigi-backup.json";

a.click();

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

function enableSwipe(){

document
.querySelectorAll(".history")
.forEach(card=>{

let startX = 0;

card.addEventListener(
"touchstart",
e=>{

startX =
e.touches[0].clientX;

}
);

card.addEventListener(
"touchmove",
e=>{

const moveX =
e.touches[0].clientX;

const diff =
startX - moveX;

if(diff > 40){

document
.querySelectorAll(
".history"
)
.forEach(
h=>
h.classList.remove(
"swiped"
)
);

card.classList.add(
"swiped"
);

}

if(diff < -40){

card.classList.remove(
"swiped"
);

}

}
);

});

}

document
.getElementById("sortSelect")
?.addEventListener(
"change",
renderMeigi
);

renderMeigi();
