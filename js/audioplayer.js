$(document).ready(function () {
    $("#holeplayer").hide();
    $("#playlists").addClass("martop");
    
    $("#playlists").on("click", ".playstart", function () {
        $("#songnum").val(0)
        var chosenplaylist = $(this).parent().next().attr("data-id")

        playerOn(chosenplaylist);
        $("#holeplayer").data("id", chosenplaylist);

    })

    function playerOn(chosenplaylist) {
        $("#cd").addClass("rotating");
        $("#holeplayer").show("bounce");
        $("#playlists").removeClass("martop");
        var songstoplay = []
        $('#my_audio').empty();
        $('#song-playlist').empty()
        songnum = 0;
        $.get("/playlist/api/playlist/" + chosenplaylist, function (data) {
            cdImage(data.data.image);

            $("#playlistnametop").text(data.data.name);

        })
        function cdImage(image) {
            $("#cd").css("background-image", 'url(' + image + ')');
        };
        $.get("/playlist/api/playlist/" + chosenplaylist + "/songs", function (songs) {
            songnum = 0;

            var songstoplay = []

            var songsource = "";

            $.each(songs, function (index, songarray) {

                $.each(songarray, function (index, song) {
                    $.each(song, function (index, songdetails) {
                        

                        songstoplay.push(songdetails.url);
                        var name = songdetails.name
                        var url = songdetails.url
                        $("#song-playlist").append("<div><span class='pauseicon' data-songnum=" + index + " ><i class='fas fa-pause' style='color:black'></i></span><span class='play-icon' data-songnum=" + index + "><i class='fas fa-play' ></i></span><span class='songlink' data-songnum=" + index + " data-song=" + url + ">" + name + "</span></div>");
                    });


                });



                $("#songstoplay").data('arr', songstoplay)
                var arr = $("#songstoplay").data('arr');
                var songnum = $("#songnum").val;


            });

            
            $('span[data-songnum=' + 0 + ']').parent().find(".play-icon").show();
            $('span[data-songnum=' + 0 + ']').parent().addClass("playing-song");
            $('#my_audio').append("<source id='sound_src' src=" + songstoplay[0] + " type='audio/mpeg'><source>");
            var songname = $('span[data-songnum=' + 0 + ']').parent().find(".songlink").html()

            $("#songname").html(songname)
            $("#my_audio").trigger('load');
            $("#my_audio").trigger('play');
        });

    }


    $("#song-playlist").on("click", ".songlink", function () {
        var arr = $("#songstoplay").data('arr');
        if ($("#cd").hasClass("rotating")) {

        } else {
            $("#cd").addClass("rotating");
        }


        songnum = $("#songnum").val()
        var songname = $(this).text()
        $("#songname").html(songname)

        var chosensongurl = $(this).data("song");
        $("#sound_src").attr("src", chosensongurl);
        $("#my_audio").trigger('load');
        $("#my_audio").trigger('play');
        $(".play-icon").hide()
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
    x = document.getElementById("my_audio")
    x.addEventListener("pause", function () {
        pauseSong();
    });
    x.addEventListener("play", function () {
        playSong();
    });
    $("#cd").click(function () {
        if ($(".pauseicon").parent().hasClass("playing-song")) {
            pauseSong();
        } else {
            playSong();
        }
    })

    $("#song-playlist").on("click", ".pauseicon", function () {
        pauseSong();
    })
    function pauseSong() {
        if ($(".pauseicon").parent().hasClass("playing-song")) {
            $("#my_audio").trigger('pause');
            $('span[data-songnum=' + songnum + ']').parent().removeClass("playing-song");
            $('span[data-songnum=' + songnum + ']').parent().addClass("song-on-pause");
            $("#cd").removeClass("rotating");
            $("#pauseplayer").remove();
            $("#cd").append('<i id="pauseplayer" class="fas fa-play" style="color:black"></i>')
        }
    }

    $("#song-playlist").on("click", ".play-icon", function () {
        playSong();
    })
    function playSong() {
        if ($(".play-icon").parent().hasClass("song-on-pause")) {
            $("#my_audio").trigger('play');
            $('span[data-songnum=' + songnum + ']').parent().removeClass("song-on-pause");
            $('span[data-songnum=' + songnum + ']').parent().addClass("playing-song");
            $("#cd").addClass("rotating");
            $("#pauseplayer").remove();
            $("#cd").append('<i id="pauseplayer" class="fas fa-pause" style="color:black"></i>')
        }
    }




    $('#my_audio').on('ended', function () {
        arr = $("#songstoplay").data('arr');

        if (songnum < arr.length - 1) {
            $("#cd").addClass("rotating");
            $("#pauseplayer").remove();
            $("#cd").append('<i id="pauseplayer" class="fas fa-pause" style="color:black"></i>')
            songnum = $("#songnum").val();
            $(".play-icon").hide();
            $('span[data-songnum=' + songnum + ']').parent().removeClass("playing-song");
            $('span[data-songnum=' + songnum + ']').parent().removeClass("song-on-pause");
            songnum++;
            var songname = $('span[data-songnum=' + songnum + ']').parent().find(".songlink").html()

            $("#songname").html(songname)
            $('span[data-songnum=' + songnum + ']').parent().addClass("playing-song");
            element = $('.songlink[data-songnum=' + songnum + ']');
            $('span[data-songnum=' + songnum + ']').prev().show();

            $("#sound_src").attr("src", arr[songnum]);
            $("#my_audio").trigger('load');
            $("#my_audio").trigger('play');
            $("#songnum").val(songnum)
        }
    });
    $("#winclose").click(function () {


        closeWindow();
    })
    function closeWindow() {
        $("#my_audio").trigger('pause');

        $("#playlists").addClass("martop");

        $("#holeplayer").hide();
    };

    $(".input-group-btn").click(function () {
        var searchstr = $(".form-control").val();
        $("#searchlist").empty();
        if (searchstr.length > 1) {


            $.get("/playlist/api/playlist", function (data, status) {

                $.each(data, function (index, playlist) {

                    $.each(playlist, function (index, playlis) {

                        if (playlis.name.indexOf(searchstr) != -1) {

                            $("#searchlist").append("<span class='pickedsong' data-id=" + playlis.id + ">" + playlis.name + "</span><br>")
                        }
                    });
                });
            });
        }
    })

    $("#searchlist").on("click", ".pickedsong", function () {
        chosenplaylist = $(this).data("id");
        playerOn(chosenplaylist);
        $("#searchlist").empty()

    })
});
