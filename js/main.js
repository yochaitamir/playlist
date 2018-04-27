$(document).ready(function rend() {
  var updateSongs = false;
  console.log("ready!");
  var playlisttemplate = $("#playlisttemplate").html()
  console.log(playlisttemplate);
  $.get("http://localhost/playlist/api/playlist", function (data, status) {
    //alert("Data: " + data + "\nStatus: " + status);
    $.each(data, function (index, playlist) {
      //console.log(playlist);
      $.each(playlist, function (index, playlis) {
        //var temp=$("#playlists").html(Mustache.to_html(playlisttemplate,playlis));
        $('#playlists').append(Mustache.render(playlisttemplate, playlis));
        
        //$("body").html( Mustache.to_html( temp, obj) );
      });
    });

    $(".example1").arctext({radius:60});
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


  $("#savesongs").click(function () {
    var VAL = $("#imageurl").val();
    var listname = $("#playlistname").val();
    var songArray = [];


    $(".songsdetails").each(function (index) {
      var name = $(this).find(".addsongname").val();
      var url = $(this).find(".addsongurl").val();
      songArray.push({
        'name': name,
        'url': url
      });
      //console.log(updateSongs);

    });
    $.post("http://localhost/playlist/api/playlist", {
      "name": listname,
      "image": VAL,
      "songs": songArray
    }, function (result) {
      data = {
        "id": result,
        'name': listname,
        'image': VAL
      };
      $('#playlists').append(Mustache.render(playlisttemplate, data));
    });
    $(".songsdetails").remove();
  });
  $("#addsongsdiv").on("click", ".removesong", function () {
    $(this).parent().remove();

  });
  $("#playlists").on("click", ".erase", function () {
    var thielem = $(this).parent().parent().parent();
    var dataid = $(this).parent().parent().attr("data-id");
    removeaffirm(thielem, dataid);

    console.log(dataid)
  });
  removeaffirm = function (thielem, dataid) {
    var dataf = {
      'x': thielem,
      'y': dataid
    };
    console.log(dataf)
    //$("#removeanyway").click(thielem, function () {
    $("#removeanyway").bind("click", dataf, function (e) {


      //console.log(thielem)  
      dataf.x.remove();
      $.ajax({
        url: "http://localhost/playlist/api/playlist/" + dataf.y,
        type: 'DELETE',
        success: function (result) {
          console.log("win");
        }
      });

    });
  }
  
  $("#playlists").on("click", ".editlist", function () {
    
    var dataid = $(this).parent().attr("data-id");
    $.get("http://localhost/playlist/api/playlist/"+dataid, function (data, status) {
    
    $.each(data, function (index, playlist) {
    console.log(playlist.name);
    $("#editplaylistname").val(playlist.name);
    $("#editimageurl").val(playlist.image);
    $(".imageforthumbs").attr("src",playlist.image);
    $( "#editplaylistname" ).data( "id", playlist.id )  
    console.log($( "#editplaylistname" ).data( "id" ))
    })
    ;
    
    
  });
})
    $("#editvalimg").click(function(){
      var name=$("#editplaylistname").val();
      var image=$("#editimageurl").val();
      if (imageval(image)) {
        //$("#editplaylistname").val();
        
        alert('Great, you entered an image url');
        $(".imageforthumbs").attr("src", image);
        $("#editnext").show();
        var d=$(".playlist")
        var s=$( "#editplaylistname" ).data( "id" )
        $.post("http://localhost/playlist/api/playlist/" + s, {
            "name": name,
            "image": image,
      
          }, function (result) {
      console.log("saved");
      
          })
        
         $(".playlist").each(function(){
          w=$(this).data("id");
          
         if(s==w){
          console.log("in"); 
          $(this).find('span').text(name);
          $(this).find(".circle").css('background-image', 'url(' + image + ')');
          $("#editnext").show();
          return editSongs(w);
        }
        })
        
      } else {
        //$("#editnext").hide();
        $(".imageforthumbs").attr("src", image);
        alert(' you must enter an image url');
      }});
      

      

      function editSongs(id){
        console.log(id);
        $("#editsongsdiv").attr("i", id); 
        var editsongid= $("#editsongsdiv").attr("i");
        $.get( "http://localhost/playlist/api/playlist/"+id+"/songs", function( songs ) {
          console.log(editsongid);  
        $.each(songs, function( index, songarray ) {
          
          $.each(songarray, function( index, song ) { 
            $.each(song, function( index, songdetails ) {
              
            $("#editsongsdiv").append("<div class=songsdetails>"+"<button class='removesong'>x</button>"+"<label>"+
   " add song name:"+"</label><input class='addsongname' value="+songdetails.name+"><label>"+
   " add song url:"+"</label><input class='addsongurl' value="+songdetails.url+"></div><br>");
          });         
          });
          });
        });
      }
      $("#saveeditedsongs").click(function () {
        console.log('editid');
        var editid=$(this).parent().prev().attr("i");
        console.log(editid);
        
        var songArray = [];
    
    
        $(".songsdetails").each(function () {
          var name = $(this).find(".addsongname").val();
          var url = $(this).find(".addsongurl").val();
          songArray.push({
            'name': name,
            'url': url
          });
          //console.log(updateSongs);
    
        });
        $.post("http://localhost/playlist/api/playlist/"+editid+"/songs", {
          
          "songs": songArray
        }, function (data) {
          
         console.log(data);
        });
      
        $(".songsdetails").remove();
      });
    
      $( "#addsonginput" ).click( function() {
    
        var addsong="<div class=songsdetails>"+"<button class='removesong'>x</button>"+"<label>"+
       " add song name:"+"</label><input class='addsongname'><label>"+
       " add song url:"+"</label><input class='addsongurl'></div><br>"
       $("#addsongsdiv").append(addsong);
      });
      $( "#editsonginput" ).click( function() {
        
        var addsong="<div class=songsdetails>"+"<button class='removesong'>x</button>"+"<label>"+
       " add song name:"+"</label><input class='addsongname'><label>"+
       " add song url:"+"</label><input class='addsongurl'></div><br>"
       $("#editsongsdiv").append(addsong);
      });
      


 });