(function($) {
  "use strict"; // Start of use strict

  var dbValues = {};

  $.googleSheetToJSON('1UUGsDwlw74CGjHcms1OTGTx20rPRuBruoUeEmAacq9Y', '')
    .done(function(rows){

      dbValues = {};
      rows.forEach(function(row){
        Object.getOwnPropertyNames(row).forEach(function(name){
          var val = [].concat(row[name]).join(' / ');
          if (!dbValues[name]) dbValues[name] = [];
          dbValues[name].push(val);
        });
      });
      
      updateDbValues();
      sentence(location.hash);

    })
    .fail(function(err){
      $('#sentence').html("Napaka pri nalaganju, poskusite osvežiti stran");
      gtag('event', 'Errors', {
        'event_category' : 'GoogleSheetError',
        'event_label' : err
      });
    });




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


  $("#share-twitter").click(function () {
    var value = encodeURIComponent(window.location.href);
    var description = $('#sentence').text();
    var shareURL='http://twitter.com/share?hashtags=ukrepomat&url='+value+'&text='+encodeURIComponent(description);
    window.open(shareURL, "_blank");
        
    gtag('event', 'ShareSentence', {
      'event_category' : 'ShareOnTwitter',
      'event_label' : '1'
    });    
  });


  $("#share-fb").click(function () {
    var value = "http://www.google.com"; // encodeURIComponent(window.location.href);
    var description = $('#sentence').text();
    var sharerURL="https://www.facebook.com/sharer/sharer.php?&hashtag=%23ukrepomat&title="+encodeURIComponent(document.title)+"&quote="+encodeURIComponent(description)+"&u=";
    var shareURL = sharerURL + value;
    window.open(shareURL, "_blank");
    gtag('event', 'ShareSentence', {
      'event_category' : 'ShareOnFB',
      'event_label' : '1'
    });    
  });

  $("#share-meme").click(function () {
    var url = "https://ealtbing.sirv.com/Images/Jelko_Kacin_2013_(cropped).jpg?profile=JK&text.0.font.weight=700&text.0.text=_TEXT_&text.0.outline.color=000000&text.0.outline.width=5&text.0.color=ffffff&text.0.size=95&text.0.background.color=ffffff&text.1.text=_TITLE_&text.1.position.gravity=north&text.1.size=80&text.1.color=ffffff&text.1.font.weight=700&text.1.outline.color=000000&text.1.outline.width=10&text.2.text=https%3A%2F%2Fukrepomat.si&text.2.position.gravity=south&text.2.size=40&text.2.color=ffffff&text.2.outline.width=2&brightness=30&colortone=texas";
    var value = $('#lbl-title').text().toUpperCase();
    var description = $('#sentence').text().toUpperCase();
    description = description.replace(/((?:.*?\s){3}.*?)\s/g, '$1\n');
    var shareURL = url.replace('_TEXT_', encodeURIComponent(description)).replace('_TITLE_', encodeURIComponent(value));
    window.open(shareURL, "_blank");
    gtag('event', 'ShareSentence', {
      'event_category' : 'ShareMeme',
      'event_label' : '1'
    });    
  });



  var verbs, nouns, adjectives, adverbs, preposition, exceptions, total_options;

  function updateDbValues() {
    nouns = dbValues.nakaksennacinzakolikocasakdaj;
    verbs = dbValues.kateroakcijo;
    adjectives = dbValues.kateripanogi;
    adverbs = dbValues.kjezakoga;
    preposition = dbValues.kaksnaizjemapotrdilo;
    exceptions = dbValues.izjemapotrdilo;

    total_options = nouns.length * verbs.length * adjectives.length * adverbs.length * preposition.length * exceptions.length;
    $("#total_options").html(total_options.toLocaleString());
}

  function randGen() {
    return Math.floor(Math.random() * 5);
  }

  function sentence(hash) {
    var set_from_hash = false;
    var rand1, rand2, rand3, rand4, rand5, rand6;

    if (hash) {
      var unhexed_hash = decodeURIComponent(hash).replace("#", '').split(':');
      if (unhexed_hash && unhexed_hash.length == 6) {
        rand1 = unhexed_hash[0];
        rand2 = unhexed_hash[1];
        rand3 = unhexed_hash[2];
        rand4 = unhexed_hash[3];
        rand5 = unhexed_hash[4];
        rand6 = unhexed_hash[5];
        
        set_from_hash = true;
      }

    }

    if (!set_from_hash) {
      rand1 = Math.floor(Math.random() * nouns.length);
      rand2 = Math.floor(Math.random() * verbs.length);
      rand3 = Math.floor(Math.random() * adjectives.length);
      rand4 = Math.floor(Math.random() * adverbs.length);
      rand5 = Math.floor(Math.random() * preposition.length);
      rand6 = Math.floor(Math.random() * exceptions.length);
    }
    var content = "Vlada naj " + nouns[rand1] + " " + verbs[rand2] + " " + adjectives[rand3] + " " + adverbs[rand4] + ", " + exceptions[rand6] + " " + preposition[rand5] +  ".";

    var new_hash = [rand1, rand2, rand3, rand4, rand5, rand6].join(':');
    var hexed_hash = encodeURIComponent(new_hash);

    location.hash = hexed_hash;
    // document.title = content;
    $('meta[name="description"]').attr("content", content);

    if (set_from_hash) {
      $('#sentence').html("&quot;" + content + "&quot;");
    } else {
      $('#sentence').fadeOut(750, function() { $('#sentence').html("&quot;" + content + "&quot;").fadeIn() });
    }

  };

    $("#regenerate-sentence").click(function(e) {
    e.preventDefault();
    sentence();
    gtag('event', 'Sentence', {
      'event_category' : 'ReloadSentence',
      'event_label' : '1'
    });          
  });



})(jQuery); // End of use strict