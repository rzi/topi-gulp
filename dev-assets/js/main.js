//
// hamburger menu - dodawanie odejmowanie klasy odpowiedzialnej za ikonke hamburgera
//
const navigationSwitcher = document.querySelector(".navigation__switcher--js");
navigationSwitcher.addEventListener("click", e => {
  const navigationList = document.querySelector(".navigation__list--js");
  navigationList.classList.toggle("navigation__list--visible");

  // alert("alert");
});

console.log("testujemy");

$(window.document).ready(function() {
  // zapytanie1
  var i = 0;
  var j;
  var k;
  var obiekt = 1;
  var wczoraj;
  var dzien;
  var godzina;
  var godzina2;
  var teraz = new Date();
  var godzina = getTime2();
  var godzina2 = getTime();

  $.ajax({
    async: true, // this will solve the problem
    type: "GET",
    dataType: "json",
    url: "zapytanie.php",
    data: {
      obiekt: obiekt,
      wczoraj: wczoraj,
      dzien: dzien,
      godzina: godzina,
      godzina2: godzina2
    },
    success: function(response1) {
      $.each(response1, function(key, data1) {
        data2 = chart.data.datasets[0].data[i] = data1;
        label3 = fnTimeConv(key);
        //          console.log(label3);
        //          console.log(data2);
        chart.data.labels[i] = label3;
        i = i + 1;
      });
      chart.update();
    },
    fail: function(blad) {
      alert("Wystąpił błąd");
      console.log(blad);
    }
  }); // koniec ajax

  // funkcje
  function getTime() {
    var godz = teraz.getHours();
    if (godz < 10) {
      godz = "0" + godz;
    }
    var min = teraz.getMinutes();
    if (min < 10) {
      min = "0" + min;
    }
    var wynik = godz + ":" + min + ":00";

    return wynik;
  }
  function getTime2() {
    var godz = teraz.getHours();
    godz = godz - 1;
    if (godz < 10) {
      godz = "0" + godz;
    }
    var min = teraz.getMinutes();
    if (min < 10) {
      min = "0" + min;
    }
    var wynik = godz + ":" + min + ":00";

    return wynik;
  }
}); /*Klamra zamykająca $(document).ready(function(){*/
// charts
var ctx = document.getElementById("myChart").getContext("2d");
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "line",
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Pomiar temperatury",
        borderColor: "rgb(55, 39, 250)",
        data: [0, 10, 5, 2, 20, 30, 45],
        fill: false
      }
    ]
  },

  // Configuration options go here
  options: {}
});

var ctx1 = document.getElementById("myChart1").getContext("2d");
var chart1 = new Chart(ctx1, {
  // The type of chart we want to create
  type: "line",
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Pomiar temperatury",
        borderColor: "rgb(55, 39, 250)",
        data: [0, 10, 5, 2, 20, 30, 45],
        fill: false
      }
    ]
  },

  // Configuration options go here
  options: {}
});
