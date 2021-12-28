<section>
    <form
            action="/search"
            method="get"
            class="d-flex"
    >
        <input
                type="search"
                name="search"
                class="form-control me-2"
                placeholder="{{$t('label.search')}}"
                aria-label="{{$t('label.search')}}"
                value="{{$url_params['search'] ? $url_params['search'] : ''}}"
        >
        <button
                type="submit"
                class="btn btn-outline-success"
        >
            {{$t('btn.search')}}
        </button>
    </form>
</section>
