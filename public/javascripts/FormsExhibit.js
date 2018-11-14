$(function () {
    var FormsExhibitBoard_state = {};
    $.fn.FormsExhibitBoard = function (words, options) {
        // Reference to the container element
        var $this = this;
        // Namespace word ids to avoid collisions between multiple clouds
        var cloud_namespace = $this.attr('id') || Math.floor((Math.random() * 1000000)).toString(36);

        // Default options value
        var default_options = {
            animation_duration: 800,
            maximum_words: 10
        };

        options = $.extend(default_options, options || {});

        if (!FormsExhibitBoard_state.ul) {
            FormsExhibitBoard_state.ul = $("<ul>");
            FormsExhibitBoard_state.ul.css("overflow", "hidden");
            $this.append(FormsExhibitBoard_state.ul);
        }

        FormsExhibitBoard_state.words = words;

        function addNewWord() {
            if (!FormsExhibitBoard_state.next_word_index) {
                FormsExhibitBoard_state.next_word_index = 0;
            }

            if (!FormsExhibitBoard_state.words || FormsExhibitBoard_state.next_word_index >= FormsExhibitBoard_state.words.length) {
                FormsExhibitBoard_state.timer = false;
                return;
            }

            var word = FormsExhibitBoard_state.words[FormsExhibitBoard_state.next_word_index++];
            var li = $("<li>");
            li.css("margin", "0px 50%");
            li.css("height", 0);
            li.text(word);
            var li_array = FormsExhibitBoard_state.ul.children();
            if (li_array && li_array.length) {
                li.insertBefore(li_array.eq(0));
            } else {
                FormsExhibitBoard_state.ul.append(li);
            }

            li.animate({ margin: "10px 10%", height: "30px" }, options.animation_duration, function () {
                var li_array = FormsExhibitBoard_state.ul.children();
                for (var i = options.maximum_words; i < li_array.length; ++i) {
                    li_array.eq(i).remove()
                }

                setTimeout(addNewWord, 0);
            });
        }

        if (!FormsExhibitBoard_state.timer) {
            FormsExhibitBoard_state.timer = true;
            setTimeout(addNewWord, 0);
        }
    }

    $("#content-root").hide();

    var dom = $("<div id ='FormsExhibit-Addin'>");
    dom.insertAfter($("#content-root"));
    // dom.attr("style", "width: 550px; height: 350px;");

    var headerbar = $("<div id='FormsExhibit-Headerbar' style='width: 100%; height: 30px'>");
    dom.append(headerbar);

    var wordWallButton = $("<img id='FormsExhibit-WordWallButton' style='float: right'>");
    wordWallButton.attr("src", "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDYwIDYwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA2MCA2MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxMjhweCIgaGVpZ2h0PSIxMjhweCI+CjxwYXRoIHN0eWxlPSJmaWxsOiM3RkFCREE7c3Ryb2tlOiM3MzgzQkY7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7IiBkPSJNNTAuMDAzLDI3ICBjLTAuMTE1LTguNjk5LTcuMTkzLTE2LTE1LjkxOS0xNmMtNS41NTksMC0xMC43NzksMy4wMDUtMTMuNjYxLDcuMzM2QzE5LjE1NywxNy40OTMsMTcuNjM2LDE3LDE2LDE3Yy00LjQxOCwwLTgsMy41ODItOCw4ICBjMCwwLjE1MywwLjAxNCwwLjMwMiwwLjAyMywwLjQ1NEM4LjAxMywyNS42MzYsOCwyNS44Miw4LDI2Yy0zLjk4OCwxLjkxMi03LDYuNDU3LTcsMTEuMTU1QzEsNDMuNjcsNi4zMyw0OSwxMi44NDUsNDloMjQuNTA3ICBjMC4xMzgsMCwwLjI3Mi0wLjAxNiwwLjQwOC0wLjAyMUMzNy44OTcsNDguOTg0LDM4LjAzMSw0OSwzOC4xNjksNDloOS44MDNDNTQuMDM3LDQ5LDU5LDQ0LjAzNyw1OSwzNy45NzIgIEM1OSwzMi42MDEsNTUuMTA2LDI3Ljk2MSw1MC4wMDMsMjd6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiM3RkFCREE7c3Ryb2tlOiM3MzgzQkY7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7IiBkPSJNNTAuMDAzLDI3ICBjMCwwLTIuNTM1LTAuMzc1LTUuMDAzLDAiLz4KPHBhdGggc3R5bGU9ImZpbGw6IzdGQUJEQTtzdHJva2U6IzczODNCRjtzdHJva2Utd2lkdGg6MjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiIGQ9Ik04LDI1YzAtNC40MTgsMy41ODItOCw4LTggIHM4LDMuNTgyLDgsOCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K");
    headerbar.append(wordWallButton);
    wordWallButton.hide();

    var wordCloudButton = $("<img id='FormsExhibit-WordCloudButton' style='float: right;'>");
    wordCloudButton.attr("src", "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDYwIDYwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA2MCA2MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxMjhweCIgaGVpZ2h0PSIxMjhweCI+CjxwYXRoIGQ9Ik01MC45NzYsMjYuMTk0QzUwLjQ0NywxNy4xOTQsNDMuMDI4LDEwLDM0LjA4NSwxMGMtNS40MywwLTEwLjY4OCwyLjY2My0xMy45NDYsNy4wMDhjLTAuMDc1LTAuMDM5LTAuMTU0LTAuMDY2LTAuMjMtMC4xMDIgIGMtMC4xOTgtMC4wOTYtMC4zOTktMC4xODctMC42MDQtMC4yNjljLTAuMTE0LTAuMDQ1LTAuMjI4LTAuMDg2LTAuMzQzLTAuMTI2Yy0wLjIwMy0wLjA3MS0wLjQwOS0wLjEzNC0wLjYxOS0wLjE5MSAgYy0wLjExNS0wLjAzMS0wLjIyOS0wLjA2My0wLjM0NS0wLjA4OWMtMC4yMjUtMC4wNTEtMC40NTUtMC4wOS0wLjY4Ny0wLjEyNWMtMC4xMDEtMC4wMTUtMC4yLTAuMDM1LTAuMzAyLTAuMDQ2ICBDMTYuNjc3LDE2LjAyMywxNi4zNDEsMTYsMTYsMTZjLTQuOTYzLDAtOSw0LjAzNy05LDljMCwwLjEyNywwLjAwOCwwLjI1MiwwLjAxNiwwLjM3N3YwLjAwNEMyLjg1NywyNy42NDksMCwzMi4zOTksMCwzNy4xNTQgIEMwLDQ0LjIzNyw1Ljc2Miw1MCwxMi44NDUsNTBoMjQuNTA4YzAuMTA0LDAsMC4yMDctMC4wMDYsMC4zMTEtMC4wMTRsMC4wNjItMC4wMDhsMC4xMzQsMC4wMDhDMzcuOTYyLDQ5Ljk5NCwzOC4wNjQsNTAsMzguMTY5LDUwICBoOS44MDNDNTQuNjA0LDUwLDYwLDQ0LjYwNCw2MCwzNy45NzJDNjAsMzIuNDgzLDU2LjE3MywyNy41Niw1MC45NzYsMjYuMTk0eiBNNDcuOTcyLDQ4aC05LjgwM2MtMC4wNTksMC0wLjExNi0wLjAwNS0wLjE3NC0wLjAwOSAgbC0wLjI3MS0wLjAxMWwtMC4xOTgsMC4wMTFDMzcuNDY5LDQ3Ljk5NSwzNy40MTEsNDgsMzcuMzUzLDQ4SDEyLjg0NUM2Ljg2NSw0OCwyLDQzLjEzNSwyLDM3LjE1NEMyLDMzLDQuNzA1LDI4LjY4OCw4LjQzMywyNi45MDEgIEw5LDI2LjYzVjI2YzAtMC4xMjcsMC4wMDgtMC4yNTYsMC4wMTUtMC4zODZsMC4wMDktMC4xNmwtMC4wMTItMC4yMUM5LjAwNiwyNS4xNjMsOSwyNS4wODIsOSwyNWMwLTMuODU5LDMuMTQxLTcsNy03ICBjMC4zMDksMCwwLjYxNCwwLjAyNywwLjkxNywwLjA2N2MwLjA3OCwwLjAxLDAuMTU2LDAuMDIzLDAuMjMzLDAuMDM2YzAuMjY3LDAuMDQ0LDAuNTMsMC4xMDIsMC43ODksMC4xNzcgIGMwLjAzNSwwLjAxLDAuMDcxLDAuMDE3LDAuMTA2LDAuMDI3YzAuMjg1LDAuMDg3LDAuNTYzLDAuMTk3LDAuODM1LDAuMzIxYzAuMDcxLDAuMDMyLDAuMTQsMC4wNjcsMC4yMSwwLjEwMSAgYzAuMjQsMC4xMTksMC40NzUsMC4yNDksMC43MDIsMC4zOTZDMjEuNzE5LDIwLjM3MywyMywyMi41MzgsMjMsMjVjMCwwLjU1MywwLjQ0NywxLDEsMXMxLTAuNDQ3LDEtMWMwLTIuNzU0LTEuMjQ2LTUuMjE5LTMuMi02Ljg3MSAgQzI0LjY2NywxNC4zNzksMjkuMzg4LDEyLDM0LjA4NSwxMmM3Ljc0NSwwLDE0LjE3Nyw2LjEzNSwxNC44NDgsMTMuODg4Yy0xLjAyMi0wLjA3Mi0yLjU1Mi0wLjEwOS00LjA4MywwLjEyNCAgYy0wLjU0NiwwLjA4My0wLjkyMSwwLjU5My0wLjgzOCwxLjEzOWMwLjA3NSwwLjQ5NSwwLjUwMSwwLjg1LDAuOTg3LDAuODVjMC4wNSwwLDAuMTAxLTAuMDA0LDAuMTUxLTAuMDEyICBjMi4yMjctMC4zMzcsNC41NDgtMC4wMjEsNC42ODQtMC4wMDJDNTQuNDksMjguODcyLDU4LDMzLjE2MSw1OCwzNy45NzJDNTgsNDMuNTAxLDUzLjUwMSw0OCw0Ny45NzIsNDh6IiBmaWxsPSIjMDAwMDAwIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=");
    headerbar.append(wordCloudButton);

    var wordWallDom = $("<div id='FormsExhibit-WordWall' style='width: 100%; height: 100%'>");
    dom.append(wordWallDom);
    wordWallDom.hide();
    var wordCloudDom = $("<div id='FormsExhibit-WordCloud' style='width: 100%; height: 100%'>");
    dom.append(wordCloudDom);
    wordCloudDom.hide();

    wordWallButton.click(function () {
        wordWallDom.show();
        wordCloudDom.hide();
        wordWallButton.hide();
        wordCloudButton.show();
    })

    wordCloudButton.click(function () {
        wordWallDom.hide();
        wordCloudDom.show();
        wordWallButton.show();
        wordCloudButton.hide();
        updateWordWallCloud();
    })

    var storage = window.localStorage;

    const host = 'https://addindemo.azurewebsites.net';
    // const host = 'http://localhost:3000';
    const socket = io.connect(host);
    var listenerId = storage.getItem('listenerId');
    if (listenerId) {
        var postUrl = host + '/forms/listener/' + listenerId + '/responses';
        $('#FormsExhibit-ExistingSocketUri').attr('href', postUrl).text(postUrl);
        $('#FormsExhibit-Start').show();
    } else {
        socket.emit('forms.newListener');
    }

    var useExisting = false;
    
    $('#FormsExhibit-UseExisting').click(function () {
        useExisting = true;
        $('#FormsExhibit-Start').hide();
        $('#FormsExhibit-Connecting').show();
        socket.emit('forms.newListener', listenerId);
    });

    $('#FormsExhibit-CreateNew').click(function () {
        $('#FormsExhibit-Start').hide();
        $('#FormsExhibit-Connecting').show();
        socket.emit('forms.newListener');
    });

    socket.on('forms.newListenerId', function (data) {
        listenerId = data.id;
        storage.setItem('listenerId', listenerId);

        $('#FormsExhibit-Connecting').hide();

        if (!useExisting) {
            $('#FormsExhibit-Waiting').show();
            var postUrl = host + '/forms/listener/' + listenerId + '/responses';
            $('#FormsExhibit-SocketUri').attr('href', postUrl).text(postUrl);
            $('#FormsExhibit-Done').click(function () {
                $('#FormsExhibit-Connection').hide();
                wordWallDom.show();
            });
        } else {
            $('#FormsExhibit-Connection').hide();
            wordWallDom.show();
        }
    });

    var words = [];
    var words_counter = {};
    var new_words = [];
    socket.on('forms.newResponse', function (data) {
        // limit the max length of the response
        var response = data.response;
        if (response.length >= 15) {
            response = response.substr(0, 12) + "...";
        }

        new_words.push(response);
    });

    function updateWordWallCloud() {
        for (var i = 0; i < new_words.length; ++i) {
            if (words_counter[new_words[i]]) {
                ++words_counter[new_words[i]];
            } else {
                words_counter[new_words[i]] = 1;
            }
        }

        var words_array = Object.keys(words_counter).map(function (word) {
            return { text: word, weight: words_counter[word] };
        });

        words_array.sort(function (a, b) {
            return b.count - a.count;
        });

        // limit the count to avoid performance degradation
        const max_words_count = 15;
        var words_array = words_array.splice(0, max_words_count); // choose top K
        for (var i = 0; i < Math.min(new_words.length, 3); ++i) {
            if (words_array.filter(function (item) { item.text == new_words[i] }).length == 0) {
                if (words_array.length < max_words_count) {
                    words_array.push(new_words[i]);
                } else {
                    words_array.pop();
                    words_array.unshift(new_words[i]);
                }
            }
        }

        new_words = [];

        wordWallDom.FormsExhibitBoard(words);

        wordCloudDom.jQCloud(words_array, {
            animation: true,
            fontSizeStep: 0.3,
            fontSizeStepCount: 5,
            height: 475
        });
    }

    setInterval(function () {
        updateWordWallCloud();
    }, 2000);
})
