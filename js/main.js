$(document).ready(function rend() {

  var updateSongs = false;

  var playlisttemplate = $("#playlisttemplate").html()

  $.get("/playlist/api/playlist", function (data, status) {
    //alert("Data: " + data + "\nStatus: " + status);
    $.each(data, function (index, playlist) {

      $.each(playlist, function (index, playlis) {

        //var temp=$("#playlists").html(Mustache.to_html(playlisttemplate,playlis));
        $('#playlists').append(Mustache.render(playlisttemplate, playlis));

        //$("body").html( Mustache.to_html( temp, obj) );
      });
    });

    $(".example1").arctext({ radius: 60 });
  });
  //imageval(updateSongs);

  function imageval(url) {
    alert("imageval");

    var imagelink = /^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png|bmp)$/i
    return imagelink.test(url);
  };

  $("#valimg").click(updateSongs, function () {
    var url = $("#imageurl").val();
    if (!imageval(url)) {
      $("#nextadd").hide();
      alert(' you must enter correct image url');
    } else {
      alert('Great.addurl,');
      $(".imageforthumbs").attr("src", url);
      $("#nextadd").show();
    }


  });
  $("#addsongsdiv").on("change", ".addsongurl", function () {
    mp3url = /^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:mp3)$/i;
    url = $(this).val()

    if (mp3url.test(url)) {
      $(this).css("background-color", "white");
      alert("success");

    }
    else {
      $(this).css("background-color", "red");
      alert("fail");

    }


  });

  $("#savesongs").click(function () {
    var VAL = $("#imageurl").val();
    var listname = $("#playlistname").val();
    var songArray = [];
    $(".songsdetails").each(function (index) {
      var name = $(this).find(".addsongname").val();
      var url = $(this).find(".addsongurl").val();

      mp3url = /^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:mp3)$/i;
      if (!mp3url.test(url)) {
        return
      }
      //songsUrl.push(url);
      songArray.push({
        'name': name,
        'url': url
      });




    });

    if (songArray.length > 0) {
      $.post("/playlist/api/playlist", {
        "name": listname,
        "image": VAL,
        "songs": songArray
      }, function (result) {
        data = {
          'id': result.data.id,
          'name': listname,
          'image': VAL
        };

        $('#playlists').append(Mustache.render(playlisttemplate, data));
      });
    }
    else {

      return alert("there must be at list one song");
    }
    $(".songsdetails").remove();
  });
  $("#addsongsdiv").on("click", ".removesong", function () {
    $(this).parent().remove();

  });
  $("#editsongsdiv").on("click", ".removesong", function () {
    $(this).parent().remove();

  });
  $("#playlists").on("click", ".erase", function () {
    dataid = $(this).parent().parent().parent().data("id");
    var thielem = $(this).parent().parent().parent();

    removeaffirm(thielem, dataid);


  });
  $("#playerdelete").click(function () {
    dataid = $(this).parent().parent().parent().data("id");
    var elem = $('.playlist')
    var thielem = $('.playlist[data-id=' + dataid + ']');
    removeaffirm(thielem, dataid);

  })


  removeaffirm = function (thielem, dataid) {
    var playerId = $("#holeplayer").data('id');

    var dataf = {
      'x': thielem,
      'y': dataid
    };

    //$("#removeanyway").click(thielem, function () {
    $("#removeanyway").bind("click", dataf, function (e) {
      if (playerId == dataid) {
        $('#song-playlist').empty();
        $("#my_audio").trigger('pause');
        $('#playlistnametop').empty();
        $('#songname').empty();
        $("#sound_src").attr("src", "");
        closeWindow();
      }


      dataf.x.remove();
      $.ajax({
        url: "/playlist/api/playlist/" + dataf.y,
        type: 'DELETE',
        success: function (result) {

        }
      });

    });
  }
  function closeWindow() {
    $("#my_audio").trigger('pause');

    $("#playlists").addClass("martop");

    $("#holeplayer").hide();
  };


  $("#playlists").on("click", ".editlist", function () {


    var dataid = $(this).parent().attr("data-id");
    editList(dataid);

  })
  function editList(dataid) {
    $("#editnext").hide();
    $.get("/playlist/api/playlist/" + dataid, function (data, status) {

      $.each(data, function (index, playlist) {

        $("#editplaylistname").val(playlist.name);
        $("#editimageurl").val(playlist.image);
        $(".imageforthumbs").attr("src", playlist.image);
        $("#editplaylistname").data("id", playlist.id)

      })
        ;


    });
  }
  



  $("#editvalimg").click(function () {
    var editcurrent = $("#current").data('current');
    var editid = $("#editplaylistname").data("id");

    var name = $("#editplaylistname").val();
    var image = $("#editimageurl").val();
    if (imageval(image)) {
      var playerId = $("#holeplayer").data('id');

      if (!editcurrent || editid == playerId) {
        $("#cd").css("background-image", 'url(' + image + ')');
        $("#playlistnametop").html(name);
      }

      alert('Great, you entered an image url');
      $(".imageforthumbs").attr("src", image);
      $("#editnext").show();
      var d = $(".playlist")
      var s = $("#editplaylistname").data("id")
      $.post("/playlist/api/playlist/" + s, {
        "name": name,
        "image": image,

      }, function (result) {


      })

      $(".playlist").each(function () {
        w = $(this).data("id");

        if (s == w) {
          $(this).find('span').addClass('curve');
          $(this).find('span').html(name).addClass('curve');
          $('#playlists').find(".curve").arctext({ radius: 60 });
          $(this).find(".circle").css('background-image', 'url(' + image + ')');
          $("#editnext").show();

          editSongs(w);
        }

      })


    } else {
      
      $(".imageforthumbs").attr("src", image);
      alert(' you must enter an image url');
    }



  });

  $(".example1").arctext({ radius: 60 });


  function editSongs(id) {
    $("#editsongsdiv").empty();

    $("#editsongsdiv").attr("i", id);
    var editsongid = $("#editsongsdiv").attr("i");

    $.get("/playlist/api/playlist/" + id + "/songs", function (songs) {

      $.each(songs, function (index, songarray) {

        $.each(songarray, function (index, song) {
          $.each(song, function (index, songdetails) {

            $("#editsongsdiv").append("<div class=songsdetails>" + "<button class='removesong'>x</button>" + "<label>" +
              " add song name:" + "</label><input class='addsongname' value=\"" + songdetails.name + "\"><label>" +
              " add song url:" + "</label><input class='addsongurl' value=" + songdetails.url + "></div><br>");
          });
        });
      });
    });
  }
  $("#saveeditedsongs").click(function () {

    var editcurrent = $("#current").data('current');
    var editid = $(this).parent().prev().attr("i");


    var songArray = [];
    var songsUrl = []
    var playerId = $("#holeplayer").data('id');

    if (!editcurrent || editid == playerId) {
      $('#song-playlist').empty()
    }
    $(".songsdetails").each(function (index) {
      var name = $(this).find(".addsongname").val();
      var url = $(this).find(".addsongurl").val();

      mp3url = /^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:mp3)$/i;
      if (!mp3url.test(url)) {
        return
      }
      songsUrl.push(url);
      songArray.push({
        'name': name,
        'url': url
      });

      if (!editcurrent || editid == playerId) {
        $("#song-playlist").append("<div><span class='pauseicon' data-songnum=" + index + " ><i class='fas fa-pause' style='color:black'></i></span><span class='play-icon' data-songnum=" + index + "><i class='fas fa-play' ></i></span><span class='songlink' data-songnum=" + index + " data-song=" + url + ">" + name + "</span></div>");
      }


    });

    if (!editcurrent || editid == playerId) {
      if (songArray.length < 1) {
        return alert("must be at list one song")
      }
      $('span[data-songnum]').parent().removeClass("playing-song");
      editcurrent = true;
      $("#current").data('current', editcurrent);
      $("#songstoplay").data('arr', songsUrl)
      playingsongarray = $("#songstoplay").data('arr');
      playingsrc = $("#sound_src").attr("src");
      songindex = playingsongarray.indexOf(playingsrc);

      $('span[data-songnum=' + songindex + ']').parent().addClass("playing-song");
      if (songindex == -1) {
        $("#my_audio").trigger('pause');

      }

    }

    $.post("/playlist/api/playlist/" + editid + "/songs", {

      "songs": songArray
    }, function (data) {
      playingnow = $(".playing-song").find(".songlink").html()
      $('#songname').html(playingnow)
    });

    $(".songsdetails").remove();
  });


  $("#addsonginput").click(function () {

    var addsong = "<div class=songsdetails>" + "<button class='removesong'>x</button>" + "<label>" +
      " add song name:" + "</label><input class='addsongname'><label>" +
      " add song url:" + "</label><input class='addsongurl'></div><br>"
    $("#addsongsdiv").append(addsong);
  });
  $("#editsonginput").click(function () {

    var addsong = "<div class=songsdetails>" + "<button class='removesong'>x</button>" + "<label>" +
      " add song name:" + "</label><input class='addsongname'><label>" +
      " add song url:" + "</label><input class='addsongurl'></div><br>"
    $("#editsongsdiv").append(addsong);
  });
  $("#editsongsdiv").on("change", ".addsongurl", function () {
    mp3url = /^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:mp3)$/i;
    url = $(this).val()

    if (mp3url.test(url)) {
      $(this).css("background-color", "white");
      alert("success");
     
    }
    else {
      $(this).css("background-color", "red");
      alert("fail");

    }


  });
  $(".playereditlist").click(function () {

    var dataid = $(this).parent().parent().parent().data("id");

    var editcurrent = false
    $("#current").data('current', editcurrent);;
    editList(dataid);


  })




});