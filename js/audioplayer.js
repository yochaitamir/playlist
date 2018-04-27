$(document).ready(function () {


    var songnum = 0;
    $("#playlists").on("click", ".playstart", function () {

        var chosenplaylist = $(this).parent().next().attr("data-id")
        console.log(chosenplaylist);
        var songstoplay = []
        $('#my_audio').empty();
        $.get("http://localhost/playlist/api/playlist/" + chosenplaylist , function (songsdetails) {
            var songsource = "";   
        $.each(songsdetails, function (index, data) { 
            //console.log(JSON.parse(data["songs"]));
              cdImage(data["image"]); 
              if(data["songs"]){
                var songsarray=JSON.parse(data["songs"]);
                $.each(songsarray, function(index,songdetails){
                songsource+= "<source src="+songdetails.url+" type='audio/mpeg'>some</source>";

                    $("#my_audio").html("<source src="+songdetails.url+" type='audio/mpeg'></source>" );
               
                 songstoplay.push(songdetails.url);
                 console.log(songdetails['url']);

                 $("#song-playlist").append("<div><span class='pauseicon' data-songnum=" + index + " ><i class='fas fa-pause' style='color:black'></i></span><span class='play-icon' data-songnum=" + index + "><i class='fas fa-play' ></i></span><span class='songlink' data-songnum=" + index + " data-song=" + songdetails.url + ">" + songdetails.name + "</span></div>");
                
                })
        }
            // $.each(songstoplay, function (index, songdetails) {
            //     //songsource+= "<source src="+songdetails.url+" type='audio/mpeg'>some</source>";

            //     //    $("#my_audio").html("<source src="+songdetails.url+" type='audio/mpeg'></source>" );

            //     songstoplay.push(songdetails.url);
            //     console.log(songstoplay);

            //     $("#song-playlist").append("<div><span class='pauseicon' data-songnum=" + index + " ><i class='fas fa-pause' style='color:black'></i></span><span class='play-icon' data-songnum=" + index + "><i class='fas fa-play' ></i></span><span class='songlink' data-songnum=" + index + " data-song=" + songdetails.url + ">" + songdetails.name + "</span></div>");
            // });
        
            }); 
            
        //});
        function cdImage(image){
            
            $("#cd").css("background-image",'url(' + image + ')');
        };
        // $.get("http://localhost/playlist/api/playlist/" + chosenplaylist + "/songs", function (songs) {

        //     var songsource = "";

        //     $("#song-playlist").empty()
        //     $.each(songs, function (index, songarray) {

        //         $.each(songarray, function (index, song) {
        //             $.each(song, function (index, songdetails) {
        //                 //songsource+= "<source src="+songdetails.url+" type='audio/mpeg'>some</source>";

        //                 //    $("#my_audio").html("<source src="+songdetails.url+" type='audio/mpeg'></source>" );

        //                 songstoplay.push(songdetails.url);
        //                 console.log(songstoplay);

        //                 $("#song-playlist").append("<div><span class='pauseicon' data-songnum=" + index + " ><i class='fas fa-pause' style='color:black'></i></span><span class='play-icon' data-songnum=" + index + "><i class='fas fa-play' ></i></span><span class='songlink' data-songnum=" + index + " data-song=" + songdetails.url + ">" + songdetails.name + "</span></div>");
        //             });


        //         });

        //     });
            //$(".pauseicon").hide()
            $(".play-icon").hide()
            $('span[data-songnum=' + 0 + ']').parent().find(".play-icon").show();
            $('span[data-songnum=' + 0 + ']').parent().addClass("playing-song");
            $('#my_audio').append("<source id='sound_src' src=" + songstoplay[0] + " type='audio/mpeg'><source>");

            $("#my_audio").trigger('load');
            $("#my_audio").trigger('play');
            //pausePlay(songnum);

            //     function pausePlayEvent(){
            //     $('span[data-songnum=' + count + ']').mouseover(function () {
            //         $(this).parent().find(".play-icon").hide();
            //         $(this).parent().find(".pauseicon").show();
            //         //$(this).prev().show();
            //     })
            //     $('span[data-songnum=' + count + ']').mouseout(function () {
            //         $(this).parent().find(".play-icon").show();
            //         $(this).parent().find(".pauseicon").hide();
            //     });
            //     return;
            // }
            $(".songlink").click(function () {


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
                songnum = $(this).attr('data-songnum');

                $('span[data-songnum=' + songnum + ']').parent().addClass("playing-song");
                $("#my_audio").trigger('play');




            })
            $(".pauseicon").click(function () {
                if ($(this).parent().hasClass("playing-song")) {
                    $("#my_audio").trigger('pause');
                    $('span[data-songnum=' + songnum + ']').parent().removeClass("playing-song");
                    $('span[data-songnum=' + songnum + ']').parent().addClass("song-on-pause");

                } else if ($(this).parent().hasClass("song-on-pause")) {
                    $("#my_audio").trigger('load');
                    $("#my_audio").trigger('play');
                    $('span[data-songnum=' + songnum + ']').parent().removeClass("song-on-pause");
                    $('span[data-songnum=' + songnum + ']').parent().addClass("playing-song");
                }
            })
            $(".play-icon").click(function () {
                if ($(this).parent().hasClass("playing-song")) {
                    $("#my_audio").trigger('pause');
                    $('span[data-songnum=' + songnum + ']').parent().removeClass("playing-song");
                    $('span[data-songnum=' + songnum + ']').parent().addClass("song-on-pause");

                } else if ($(this).parent().hasClass("song-on-pause")) {
                    $("#my_audio").trigger('load');
                    $("#my_audio").trigger('play');
                    $('span[data-songnum=' + songnum + ']').parent().removeClass("song-on-pause");
                    $('span[data-songnum=' + songnum + ']').parent().addClass("playing-song");
                }
            })


            $('#my_audio').on('ended', function () {
                console.log(this);
                $(".play-icon").hide()
                $('span[data-songnum=' + songnum + ']').parent().removeClass("playing-song");
                songnum++;
                $('span[data-songnum=' + songnum + ']').parent().addClass("playing-song");
                element = $('.songlink[data-songnum=' + songnum + ']');
                $('span[data-songnum=' + songnum + ']').prev().show();
                console.log(element);
                $("#sound_src").attr("src", songstoplay[songnum]);
                $("#my_audio").trigger('load');
                $("#my_audio").trigger('play');
                return songnum;
            });

            // function pausePlay() {
            //     $(".playing-song").click(function () {
            //         $("#my_audio").trigger('pause');
            //         $('span[data-songnum=' + songnum + ']').parent().removeClass("playing-song");
            //         $('span[data-songnum=' + songnum + ']').parent().addClass("song-on-pause");


            //     })
            //     $(".song-on-pause").click(function () {
            //         $("#my_audio").trigger('load');
            //         $("#my_audio").trigger('play');
            //         $('span[data-songnum=' + songnum + ']').parent().removeClass("song-on-pause");
            //         $('span[data-songnum=' + songnum + ']').parent().addClass("playing-song");


            //     })
            // }
        });


    });


});