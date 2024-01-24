// Oyun verilerini saklamak için localStorage'tan alınan veriyi ya da boş bir dizi kullan
var oyunVerileri = JSON.parse(localStorage.getItem("oyunVerileri")) || [];

// Oyuncunun ismi
var oyuncuIsmi = "";

// Oyuncu ve bilgisayarın skorları
var oyuncuSkor = 0;
var bilgisayarSkor = 0;

// Oyun seçeneklerinin butonları
var tasBtn = document.querySelector("#tas");
var kagitBtn = document.querySelector("#kagit");
var makasBtn = document.querySelector("#makas");
var sifirlaBtn = document.querySelector("#sifirla");

// Kullanıcı ve bilgisayarın seçtiği img elementleri
var kullaniciSectigiImg = document.querySelector("#kullaniciSectigiImg");
var bilgisayarSectigiImg = document.querySelector("#bilgisayarSectigiImg");

// Sonuç, kullanıcı ve bilgisayar skorlarını gösteren HTML elementleri
var sonuc = document.getElementById("sonucText");
var kullaniciSkorText = document.getElementById("kullanici-skor");
var bilgisayarSkorText = document.getElementById("bilgisayar-skor");

// Sıfırla butonuna tıklama olayı
sifirlaBtn.addEventListener("click", function () {
  sifirla();
});

// Taş butonuna tıklama olayı
tasBtn.addEventListener("click", function () {
  oyna("tas");
});

// Kağıt butonuna tıklama olayı
kagitBtn.addEventListener("click", function () {
  oyna("kagit");
});

// Makas butonuna tıklama olayı
makasBtn.addEventListener("click", function () {
  oyna("makas");
});

// Oyunu oyna fonksiyonu
const oyna = (oyuncuSecimi) => {
  // Oyuncunun ismini al
  oyuncuIsmi = document.querySelector("#isim").value;

  // Oyuncu ismi boş ya da null ise uyarı ver ve fonksiyondan çık
  if (oyuncuIsmi == "" || oyuncuIsmi == null) {
    alert("Lütfen isminizi girin!");
    return;
  }

  // Oyuncu ismi uzunluğu 3 ile 9 karakter arasında değilse uyarı ver ve fonksiyondan çık
  if (oyuncuIsmi.length < 3 || oyuncuIsmi.length > 9) {
    alert("Lütfen isminizi 3 ile 9 karakter arasında girin!");
    return;
  }

  // Bilgisayarın seçebileceği seçenekleri tanımla
  var secenekler = ["tas", "kagit", "makas"];
  
  // Bilgisayarın rastgele bir seçenek seçmesi
  var bilgisayarSecimi = secenekler[Math.floor(Math.random() * secenekler.length)];

  // Sonuç metnini sıfırla
  sonuc.innerText = "Sonuç:";

  // Kullanıcının ve bilgisayarın seçtiği resimleri güncelle
  kullaniciSectigiImg.src = oyuncuSecimi + ".jpg";
  bilgisayarSectigiImg.src = bilgisayarSecimi + ".jpg";

  // Resim alt etiketlerini güncelle
  kullaniciSectigiImg.alt = oyuncuSecimi;
  bilgisayarSectigiImg.alt = bilgisayarSecimi;

  // Kullanıcı ismini ekranda göster
  kullaniciSectigiImg.nextElementSibling.children[0].innerText = oyuncuIsmi;

  // Kazananı belirle ve skorları güncelle
  if (bilgisayarSecimi == oyuncuSecimi) {
    sonuc.innerText += " Berabere!";
  } else if (
    (bilgisayarSecimi == "tas" && oyuncuSecimi == "makas") ||
    (bilgisayarSecimi == "kagit" && oyuncuSecimi == "tas") ||
    (bilgisayarSecimi == "makas" && oyuncuSecimi == "kagit")
  ) {
    sonuc.innerText += " Bilgisayar Kazandı!";
    bilgisayarSkor++;
  } else {
    sonuc.innerText += " " + oyuncuIsmi + " Kazandı!";
    oyuncuSkor++;
  }

  // Skorları ekranda güncelle
  kullaniciSkorText.innerText = oyuncuIsmi + ": " + oyuncuSkor;
  bilgisayarSkorText.innerText = "Bilgisayar: " + bilgisayarSkor;

  // Oyun bitiş kontrolü
  if (oyuncuSkor == 3) {
    alert("Oyun Bitti! Genel Skorda " + oyuncuIsmi + " Kazandı!");
    veriGonder();
    sifirla();
  } else if (bilgisayarSkor == 3) {
    alert("Oyun Bitti! Genel Skorda Bilgisayar Kazandı!");
    veriGonder();
    sifirla();
  }
};

// Veriyi kaydet ve tabloya ekle fonksiyonu
const veriGonder = () => {
  // Yeni veriyi oyunVerileri dizisine ekle
  oyunVerileri.push({
    isim: oyuncuIsmi,
    skor: `${oyuncuSkor} - ${bilgisayarSkor}`,
    kazanan: oyuncuSkor > bilgisayarSkor ? oyuncuIsmi : "Bilgisayar",
    tarih: new Date().toLocaleString(),
  });

  // localStorage'de güncellenmiş veriyi sakla
  localStorage.setItem("oyunVerileri", JSON.stringify(oyunVerileri));

  // Tabloya veriyi ekle
  var istatistikTablosu = document.querySelector(".stats-table");
  var veriHTML = `<tr>
    <td>${oyuncuIsmi}</td>
    <td>${oyuncuSkor} - ${bilgisayarSkor}</td>
    <td>${oyuncuSkor > bilgisayarSkor ? oyuncuIsmi : "Bilgisayar"}</td>
    <td>${new Date().toLocaleString()}</td>
  </tr>`;
  istatistikTablosu.insertAdjacentHTML("beforeend", veriHTML);
};

// Oyunu sıfırla fonksiyonu
const sifirla = () => {
  oyuncuSkor = 0;
  bilgisayarSkor = 0;

  document.querySelector("#isim").value = null;
  sonuc.innerText = "Sonuç: ???";

  kullaniciSectigiImg.src = "default.jpg";
  bilgisayarSectigiImg.src = "default.jpg";

  kullaniciSectigiImg.nextElementSibling.children[0].innerText = "Oyuncu";

  kullaniciSkorText.innerText = "Oyuncu : " + oyuncuSkor;
  bilgisayarSkorText.innerText = "Bilgisayar: " + bilgisayarSkor;
};
