function validateForm() {
        let x = document.forms["myForm"]["longUrl"].value;
        if (x == "") {
            document.getElementById("shortenInput").style.border = "2px solid var(--Red)";
            document.querySelector(".input-text").style.setProperty('--ptext', "hsl(0, 87%, 67%)");
            document.querySelector(".error-msg").innerText = "Pls add a link";
          return false;
        } else {
            var listObj = {
                longUrl : document.getElementById("shortenInput").value
              }
              addList(listObj);
        }
      }

function addList(x) {
        const shortContainer = document.createElement("div");
        shortContainer.classList.add("shortened-container");
        shortContainer.innerHTML = `
            <div class="short-link">
                <p class="long-url">${x.longUrl}</p>
            </div>
            <div class="short">
                <p class="short-url"><a href="${"/" + x.shortUrl}">${document.domain + "/" + x.shortUrl}</a></p>
                <button type="button" class="cpy">Copy</button>
            </div>`;
        document.querySelector(".link-box").appendChild(shortContainer);
}



    for (let c = 0; c < document.querySelectorAll(".cpy").length; c++) {
        document.querySelectorAll(".cpy")[c].addEventListener("click", function () {
          var txt = document.querySelectorAll(".short-url")[c].innerText;
          var cb = document.getElementById("cb");
          cb.value = txt;
          cb.style.display='block';
          cb.select();
          document.execCommand('copy');
          cb.style.display='none';
          this.innerText = "Copied";
          this.style.backgroundColor = "var(--Dark-Violet)";
        })
      }

      