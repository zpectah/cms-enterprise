<section>
    <form
            action="/{{$common_options['page_keys']['search']}}"
            method="get"
            class="d-flex"
    >
        <input
                type="search"
                name="search"
                class="form-control mb-2"
                placeholder="{{$t('input.label.search')}}"
                aria-label="{{$t('input.label.search')}}"
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