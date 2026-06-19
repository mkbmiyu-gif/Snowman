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
