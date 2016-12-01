$(function() {
            var form = document.querySelector('#searchForm');
            var searchBtn = document.querySelector('#searchButton');
            form.addEventListener('keydown', function(e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    Google();
                }
            });

            searchBtn.addEventListener("click", function(e) {
                e.preventDefault();
                Google();
            });

});

            function Google() {
                var searchField = document.querySelector("#searchField").value;

                if (searchField.length > 0) {
                    searchField = encodeURIComponent(searchField);
                } else {
                    return
                }

                var request = new XMLHttpRequest();
                request.open('GET', 'https://www.googleapis.com/customsearch/v1?key=AIzaSyD_yotJt04CJfQ4Ibc7wG7uMLP5fEy_zfY&cx=016795527241021289695:jljvvlrwqde&q=' + searchField);
                request.onreadystatechange = function() {
                    if (request.readyState == 4) {
                        if (request.status == 200) {
                            var data = JSON.parse(request.responseText);
                            var html = $("#results").html();
                            var content = tmpl(html, {
                                data: data.items
                            });
                            $('#results').html('');
                            $('#results').prepend(content);
                        }
                    }
                };
                request.send();
            };
