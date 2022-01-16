<section>
    <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-bs-ride="carousel"
    >
        <div class="carousel-indicators">
            @foreach($get_posts_list(3) as $key => $item)
            <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="{{$key}}"
                    class="{{$key === 0 ? 'active' : ''}}"
                    aria-current="{{$key === 0 ? 'true' : 'false'}}"
                    aria-label="Slide {{$key}}"
            ></button>
            @endforeach
        </div>
        <div class="carousel-inner">
            @foreach($get_posts_list(3) as $key => $item)
            <div
                    class="carousel-item {{$key === 0 ? 'active' : ''}}"
            >
                <img
                        src="{{$uploadsPfx . 'image/medium/' . $item['img_thumbnail']}}"
                        class="d-block w-100"
                        alt="..."
                />
            </div>
            @endforeach
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</section>