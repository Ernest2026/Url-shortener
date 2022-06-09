document.getElementById("urlform").addEventListener("submit", (e) => {
  e.preventDefault();
  let x = document.forms["myForm"]["longUrl"];
  if (x.value == "" || x.value.indexOf(".") == -1) {
    document.getElementById("shortenInput").style.border =
      "2px solid var(--Red)";
    document
      .querySelector(".input-text")
      .style.setProperty("--ptext", "hsl(0, 87%, 67%)");
    document.querySelector(".error-msg").innerText = "Pls add a link";
    x.value = "";
    return false;
  } else {
    const savedUrls = JSON.parse(localStorage.getItem("urls"));
    fetch(`${window.location.origin}/shortenUrl`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        longUrl: document.getElementById("shortenInput").value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        !savedUrls
          ? localStorage.setItem("urls", JSON.stringify([data]))
          : !savedUrls.find((obj) => obj.shortUrl === data.shortUrl) &&
            localStorage.setItem("urls", JSON.stringify([...savedUrls, data]));
        addLinks([data]);
      });
  }
});

function addLinks(links) {
  links.map((obj) => {
    const shortContainer = document.createElement("div");
    shortContainer.classList.add("shortened-container");
    shortContainer.innerHTML = `
                <div class="long-link">
                    <p class="long-url">${obj.longUrl}</p>
                </div>
                <div class="short-link">
                    <p class="short-url"><a href="/${obj.shortUrl}" target="_blank">${window.location.origin}/${obj.shortUrl}</a></p>
                </div>
                <div class="link-btn">
                  <button type="button" class="cpy">Copy</button>
                  </div>`;

    document.querySelector(".link-box").appendChild(shortContainer);
  });
}

addLinks(JSON.parse(localStorage.getItem("urls")));

for (let c = 0; c < document.querySelectorAll(".cpy").length; c++) {
  document.querySelectorAll(".cpy")[c].addEventListener("click", function () {
    var txt = document.querySelectorAll(".short-url")[c].innerText;
    var cb = document.getElementById("cb");
    cb.value = txt;
    cb.style.display = "block";
    cb.select();
    document.execCommand("copy");
    cb.style.display = "none";
    this.innerText = "Copied";
    this.style.backgroundColor = "var(--Dark-Violet)";
  });
}
