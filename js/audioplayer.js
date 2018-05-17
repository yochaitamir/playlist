$(document).ready(function () {
    $("#holeplayer").hide();
    $("#playlists").addClass("martop");
    //var songnum = 0;
    $("#playlists").on("click", ".playstart", function () {
        $("#songnum").val(0)
        var chosenplaylist = $(this).parent().next().attr("data-id")
        console.log(chosenplaylist)
        playerOn(chosenplaylist);
        $("#holeplayer").data("id",chosenplaylist);

    })

        function playerOn(chosenplaylist){
            $("#holeplayer").show("bounce");
        $("#playlists").removeClass("martop");
        var songstoplay = []
        $('#my_audio').empty();
        $('#song-playlist').empty()
        songnum=0;
        $.get("http://localhost/playlist/api/playlist/" + chosenplaylist,  function (data) {
            cdImage(data.data.image);
            console.log(data.data.name);
            $("#playlistname").html(data.data.name);
            
    })
        function cdImage(image){
            $("#cd").css("background-image",'url(' + image + ')');
        };
        $.get("http://localhost/playlist/api/playlist/" + chosenplaylist + "/songs", function (songs) {
            songnum=0;
            
            var songstoplay = []  
            console.log(songnum)
            var songsource = "";
            // $('#my_audio').empty();
            // $("#song-playlist").empty()
            $.each(songs, function (index, songarray) {

                $.each(songarray, function (index, song) {
                    $.each(song, function (index, songdetails) {
                        //songsource+= "<source src="+songdetails.url+" type='audio/mpeg'>some</source>";

                        //    $("#my_audio").html("<source src="+songdetails.url+" type='audio/mpeg'></source>" );

                        songstoplay.push(songdetails.url);
                        
                        $("#song-playlist").append("<div><span class='pauseicon' data-songnum=" + index + " ><i class='fas fa-pause' style='color:black'></i></span><span class='play-icon' data-songnum=" + index + "><i class='fas fa-play' ></i></span><span class='songlink' data-songnum=" + index + " data-song=" + songdetails.url + ">" + songdetails.name + "</span></div>");
                    });
                    

                });
                    
                console.log(songstoplay);
                
                $("#songstoplay").data('arr',songstoplay)
                var arr=$("#songstoplay").data('arr');
                var songnum=$("#songnum").val;
                console.log(arr);

             });
            
            //$(".play-icon").hide()
            $('span[data-songnum=' + 0 + ']').parent().find(".play-icon").show();
            $('span[data-songnum=' + 0 + ']').parent().addClass("playing-song");
            $('#my_audio').append("<source id='sound_src' src=" + songstoplay[0] + " type='audio/mpeg'><source>");
            var songname=$('span[data-songnum=' + 0 + ']').parent().find(".songlink").html()
            
            $("#songname").html(songname)
            $("#my_audio").trigger('load');
            $("#my_audio").trigger('play');
            
            $(".songlink").click(function () {

                var songname=$(this).text()
                $("#songname").html(songname)
               
                var chosensongurl = $(this).data("song");
                $("#sound_src").attr("src", chosensongurl);
                $("#my_audio").trigger('load');
                $("#my_audio").trigger('play');
                $(".play-icon").hide()
                // $(".pauseicon").hide()
                $(this).prev().show();

                if ('span[data-songnum]' == 0) {
                    $("#my_audio").trigger('play');
                }
                $('span[data-songnum=' + songnum + ']').parent().removeClass("playing-song");
                $('span[data-songnum=' + songnum + ']').parent().removeClass("song-on-pause");
                songnum = $(this).attr('data-songnum');
                $("#songnum").val(songnum)

                $('span[data-songnum=' + songnum + ']').parent().addClass("playing-song");
                $("#my_audio").trigger('play');




            })
            
            
            $(".pauseicon").click(function () {
                if ($(this).parent().hasClass("playing-song")) {
                    $("#my_audio").trigger('pause');
                    $('span[data-songnum=' + songnum + ']').parent().removeClass("playing-song");
                    $('span[data-songnum=' + songnum + ']').parent().addClass("song-on-pause");

                } //else if ($(this).parent().hasClass("song-on-pause")) {
                //     //$("#my_audio").trigger('load');
                //     $("#my_audio").trigger('play');
                //     $('span[data-songnum=' + songnum + ']').parent().removeClass("song-on-pause");
                //     $('span[data-songnum=' + songnum + ']').parent().addClass("playing-song");
                // }
            })
            
            $(".play-icon").click(function () {
                if ($(this).parent().hasClass("song-on-pause")) {
                    $("#my_audio").trigger('play');
                    $('span[data-songnum=' + songnum + ']').parent().removeClass("song-on-pause");
                    $('span[data-songnum=' + songnum + ']').parent().addClass("playing-song");

                 } //else if ($(this).parent().hasClass("song-on-pause")) {
                //     //$("#my_audio").trigger('load');
                //     $("#my_audio").trigger('play');
                //     $('span[data-songnum=' + songnum + ']').parent().removeClass("song-on-pause");
                //     $('span[data-songnum=' + songnum + ']').parent().addClass("playing-song");
                // }
            })


            

           
        });
    }
    $('#my_audio').on('ended', function () {
        arr=$("#songstoplay").data('arr');
        console.log(songstoplay);
        if(songnum<arr.length-1){
        
        songnum=$("#songnum").val()
        $(".play-icon").hide()
        $('span[data-songnum=' + songnum + ']').parent().removeClass("playing-song");
        songnum++;
        var songname=$('span[data-songnum=' + songnum + ']').parent().find(".songlink").html()
    console.log(songname);
    $("#songname").html(songname)
        $('span[data-songnum=' + songnum + ']').parent().addClass("playing-song");
        element = $('.songlink[data-songnum=' + songnum + ']');
        $('span[data-songnum=' + songnum + ']').prev().show();
        console.log(songnum)
        $("#sound_src").attr("src", arr[songnum]);
        $("#my_audio").trigger('load');
        $("#my_audio").trigger('play');
        $("#songnum").val(songnum)
        }
        //return songnum;
    });
    $("#winclose").click(function(){


        closeWindow();
    }) 
    function closeWindow(){
        $("#my_audio").trigger('pause');
        
            $("#playlists").addClass("martop");
         
          $("#holeplayer").hide();
        };   
   
    
   




    
});
