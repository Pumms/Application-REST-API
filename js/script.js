
function searchMovie() {
    //setiap klik search button, id movie list hilangkan dahulu setelah itu munculkan kembali
    $('#movie-list').html('');

    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json', //text, json, jsonp, xml
        data: {
            'apikey': 'eea6bbfe',
            's': $('#search-input').val()
        },
        success: function (result) {
            if (result.Response == 'True') {
                let movies = result.Search;

                $.each(movies, function (i, data) { //function(index, data)
                    $('#movie-list').append(`
                        <div class="col-md-4">
                            <div class="card mb-3">
                                <img src="${data.Poster}" class="card-img-top" alt="${data.Title}">
                                <div class="card-body">
                                <h5 class="card-title">${data.Title}</h5>
                                <h6 class="card-subtitle mb-3 text-muted">${data.Year}</h6>
                                <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#detailModal" data-id="${data.imdbID}">See Detail</a>
                                </div>
                            </div>
                        </div>
                    `);
                });

                $('#search-input').val('');

            } else {
                $('#movie-list').html(`
                <div class="col">
                    <h1 class="text-center">Sorry, ${result.Error}</h1>
                </div>
                `)
            }
        }
    });
}

$('#search-button').on('click', function () {
    searchMovie();
});

$('#search-input').on('keyup', function (e) {
    if (e.which === 13) {
        searchMovie();
    }
});

$('#movie-list').on('click', '.see-detail', function () {
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'eea6bbfe',
            'i': $(this).data('id')
        },

        success: function (movie) {
            if (movie.Response === "True") {

                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="${movie.Poster}" class="img-fluid">
                            </div>

                            <div class="col-md-8">
                                <h3>${movie.Title}</h3>
                                <ul class="list-group list-group-flush">
                                <li class="list-group-item">Release : ${movie.Release} </li>
                                <li class="list-group-item">Genre : ${movie.Genre} </li>
                                <li class="list-group-item">Director : ${movie.Director} </li>
                                <li class="list-group-item">Actors : ${movie.Actors} </li>
                                <li class="list-group-item">Plot : ${movie.Plot} </li>
                              </ul>
                            </div>
                        </div>
                    </div>
                `);

            }
        }

    })
});

