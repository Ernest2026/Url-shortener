 function validateForm() {
        let x = document.forms["myForm"]["longUrl"];
        if (x.value == "" || x.value.indexOf('.') == -1) {
            document.getElementById("shortenInput").style.border = "2px solid var(--Red)";
            document.querySelector(".input-text").style.setProperty('--ptext', "hsl(0, 87%, 67%)");
            document.querySelector(".error-msg").innerText = "Pls add a link";
            x.value = '';
          return false;
        } else {
          var count = localStorage.length++;
          localStorage.setItem(count, document.getElementById("shortenInput").value);
        }
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