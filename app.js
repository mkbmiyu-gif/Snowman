alert("app.js loaded");

const PASSCODE = "0517";

const lockScreen = document.getElementById("lockScreen");
const app = document.getElementById("app");

function unlockApp() {
  const pin = document.getElementById("pinInput").value;

  if (pin === PASSCODE) {
    lockScreen.classList.add("hidden");
    app.classList.remove("hidden");
    renderMeigi();
  } else {
    alert("パスコードが違います");
  }
}

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

    card.innerHTML = `
      <h2>${item.name}</h2>

      <p>
      会員番号
      ${item.memberNo || ""}
      </p>

      <p>
      入会
      ${item.joinDate || ""}
      </p>

      <button onclick="deleteMeigi(${index})">
      削除
      </button>
    `;

    list.appendChild(card);

  });

}

function deleteMeigi(index){

  if(!confirm("削除しますか？")){
    return;
  }

  meigiData.splice(index,1);

  saveData();

  renderMeigi();

}

document
.getElementById("addBtn")
.addEventListener("click",()=>{

  const name =
  prompt("名前");

  if(!name) return;

  const memberNo =
  prompt("会員番号");

  const joinDate =
  prompt("入会日");

  meigiData.push({

    name,
    memberNo,
    joinDate,
    histories:[]

  });

  saveData();

  renderMeigi();

});

document
.getElementById("searchInput")
.addEventListener("input",(e)=>{

  const keyword =
  e.target.value.toLowerCase();

  document
  .querySelectorAll(".card")
  .forEach(card=>{

    const text =
    card.innerText.toLowerCase();

    card.style.display =
    text.includes(keyword)
    ? "block"
    : "none";

  });

});

document
.getElementById("exportBtn")
.addEventListener("click",()=>{

  const blob =
  new Blob(
    [JSON.stringify(meigiData)],
    {type:"application/json"}
  );

  const a =
  document.createElement("a");

  a.href =
  URL.createObjectURL(blob);

  a.download =
  "meigi-backup.json";

  a.click();

});

document
.getElementById("importBtn")
.addEventListener("click",()=>{

  document
  .getElementById("importFile")
  .click();

});

document
.getElementById("importFile")
.addEventListener("change",(e)=>{

  const file =
  e.target.files[0];

  if(!file) return;

  const reader =
  new FileReader();

  reader.onload=()=>{

    meigiData =
    JSON.parse(reader.result);

    saveData();

    renderMeigi();

  };

  reader.readAsText(file);

});

if("serviceWorker" in navigator){

  navigator.serviceWorker
  .register("./service-worker.js");

}
