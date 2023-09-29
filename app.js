// diğer js dosyalarından gelenler
import Github from "./github.js";
import UI from "./ui.js";

// github ve UI classının bir örneğini oluşturma
const github = new Github();
const ui = new UI();

// ! html de gelenler
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
const themeBtn = document.getElementById("theme-btn");
const body = document.querySelector("body");

// ! olay izleyicileri
searchButton.addEventListener("click", getInput);
searchInput.addEventListener("keypress", (e) => {
   if (e.code === "Enter") {
      getInput();
   }
});

themeBtn.addEventListener("click", changeTheme);

// ! metodlar
function getInput() {
   if (searchInput.value !== "") {
      // kullanıcı bilgileri ve repolar için api isteği at
      github.getUser(searchInput.value).then((data) => {
         // eğer kullanıcı bulunamadıysa hata
         if (data.profile.message === "Not Found") {
            ui.showAlert("Aradığınız Kullanıcı Bulunamadı!", "alert-danger");
         } else {
            ui.showAlert("Kullanıcı Başarıyla Bulundu","alert-success")
            // api cevabına göre şekillenen kullanıcı detay alanını ekrana basma
            ui.showProfile(data.profile);
            console.log(data);

            // repolar ekrana bas
            ui.showRepos(data.repos);
         }
      });
      return;
   }

   // arama terimi boş ise
   // bir uyarı ver
   ui.showAlert("Kullanıcı bilgileri boş bırakılamaz","alert-info")
}

function changeTheme() {
   // arka planı değiştirme
   body.classList.toggle("bg-dark");
   body.classList.toggle("text-bg-dark");

   // button yazısını değiştirme
   if (body.classList.contains("bg-dark")) {
      themeBtn.innerText = "Açık Mod";
   } else {
      themeBtn.innerText = "Koyu Mod";
   }
}
