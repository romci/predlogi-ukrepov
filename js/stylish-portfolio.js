(function($) {
  "use strict"; // Start of use strict

  // Closes the sidebar menu
  $(".menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
    $(this).toggleClass("active");
  });

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('#sidebar-wrapper .js-scroll-trigger').click(function() {
    $("#sidebar-wrapper").removeClass("active");
    $(".menu-toggle").removeClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });



  var verbs, nouns, adjectives, adverbs, preposition;
  nouns = ["z omejitvami", "nepreklicno", "brez omejitev", "začasno", "do nadaljnega", "z upoštevanjem distance", "samo za eno osebo naenkrat", "za družine z največ 3 člani", "brezpogojno"];
  verbs = ["zapre", "omeji", "odpre", "ukine", "delno odpre", "pod nadzorom odpre", "sprosti"];
  adjectives = ["šole", "frizerske salone", "turno smučanje", "kuharske tečaje", "obisk javnih WC-jev", "individualne tečaje joge", "vse osnovne šole", "shiatsu masažne salone", "konzumiranje bureka v javnosti", "avtošole", "pomerjanje oblačil v javnosti", "ročne avtopralnice", "izvajanje javnega prevoza z rikšo", "nočne klube", "Zoom klice", "Skype video-klice", "prezračevanje verskih objektov", "zavarovalniške storitve", "motivacijske spikerje"];
  adverbs = ["v epidemiološko ugodnih regijah", "v vseh regijah, ki se začnejo na črko '"+String.fromCharCode(65+Math.floor(Math.random() * 26))+"'", "v naključni statistični regiji", "za strice iz ozadja", "v regiji z največjim pridelkom krompirja", "v največji regiji", "v občinah z lihim številom prebivalcev", "v regijah brez taxijev", "na meji s Hrvaško", "v zasebnih zobozdravstvenih ambulantah"];
  preposition = ["z izkazom negativnega testa", "z odličnim osnovnošolskim spričevalom", "v spremstvu obeh starih staršev", "z dvema kirurškima maskama", "brez volnenih rokavic", ", če ima oseba rjave lase", "za izvajanje neprofitne dejavnosti", "za tetoverje", "za osebe brez pametnega telefona", "če je zapadlo več kot 1m snega", "za izvajanje vzdrževalnih del", "za prihod na delo, brez odhoda", "za dostop do sanitarij", "za čiščenje in pospravljanje bazena", "z dezinfekcijo rok in nog", "za imetnike letnih smučarskih kart", "za rekreativne dejavnosti"];

  function randGen() {
    return Math.floor(Math.random() * 5);
  }

  function sentence() {
    var rand1 = Math.floor(Math.random() * nouns.length);
    var rand2 = Math.floor(Math.random() * verbs.length);
    var rand3 = Math.floor(Math.random() * adjectives.length);
    var rand4 = Math.floor(Math.random() * adverbs.length);
    var rand5 = Math.floor(Math.random() * preposition.length);
    var rand6 = Math.floor(Math.random() * 10);
    var content = "Vlada naj " + nouns[rand1] + " " + verbs[rand2] + " " + adjectives[rand3] + " " + adverbs[rand4] + ", a le " + preposition[rand5] +  ".";

    $('#sentence').html("&quot;" + content + "&quot;");
  };
  sentence();

  $("#regenerate-sentence").click(function(e) {
    e.preventDefault();
    sentence();
  });



})(jQuery); // End of use strict

