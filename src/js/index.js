window.addEventListener('load', function () {
    var btnAddMovie = document.querySelector(".movie-add"),
        btnConfirm = document.querySelector("#btn-confirm"),
        btnCancel = document.querySelector("#btn-cancel"),
        mask = document.querySelector("#mask"),
        movieList = document.querySelector("#movie-list"),
        btnsDelte = null;
    getData();
    btnAddMovie.addEventListener('click', function () {
        mask.style.display = 'block';
        console.log("添加电影");
    });
    btnConfirm.addEventListener('click', function () {
        mask.style.display = 'none';
        var movie = {};
        movie.posterLink = document.querySelector("#poster-link").value;
        movie.movieName = document.querySelector("#movie-name").value;
        movie.movieTime = document.querySelector("#movie-time").value;
        postData(movie);
        clearInput();
    });
    btnCancel.addEventListener('click', function () {
        mask.style.display = 'none';
    })

    function clearInput() {
        document.querySelector("#poster-link").value = null;
        document.querySelector("#movie-name").value = null;
        document.querySelector("#movie-time").value = null;
    }
    function getData() {
        axios.get('http://localhost:3000/movies')
            .then(res => {
                console.log("getData方法");
                show(res.data);
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            });
    }
    function postData(movie) {
        axios.post('http://localhost:3000/movies'
            , movie).then(res => {
                console.log("postData方法");
                show(res.data);
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            });
    }
    function deleteData(id, that) {
        axios.delete(`http://localhost:3000/movies/${id}`)
            .then(res => {
                movieList.removeChild(that.parentNode.parentNode);
            }).catch(err => {
            });
    }
    function show(movie) {
        console.log("show方法");
        var movies = [];
        movie instanceof Array ? movies = movie : movies.push(movie);
        movies.forEach(item => {
            var html = `<li class="movie-item-li" data-index=${item.id}>
            <div class="movie-wrapper">
                <span class="delete iconfont" id="delete">&#xe689;</span>
                <div>
                    <a href="#">
                        <img src= ${item.posterLink}
                            class="img-top" alt="">
                    </a>
                </div>
                <div>
                    <p class="info-name">
                        <a href="#" class="info-name-link">${item.movieName}</a>
                    </p>
                    <p class="info-time ">${item.movieTime}</p>
                </div>
            </div>
        </li>`;
            movieList.innerHTML += html;
            btnsDelte = document.querySelectorAll("#delete");
            for (var i = 0; i < btnsDelte.length; i++) {
                btnsDelte[i].addEventListener('click', function () {
                    var id = this.parentNode.parentNode.getAttribute("data-index");
                    deleteData(id, this);
                })
            }
        })
    }
})