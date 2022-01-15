@if($detail_prev['name'])
    <a
            href="/{{$page_key}}{{$detail_url_suffix}}/{{$detail_prev['name']}}{{$urlPar}}"
            class="btn btn-secondary"
    >
        {{$t('btn.previous')}}
    </a>
@endif
@if($detail_next['name'])
    <a
            href="/{{$page_key}}{{$detail_url_suffix}}/{{$detail_next['name']}}{{$urlPar}}"
            class="btn btn-secondary"
    >
        {{$t('btn.next')}}
    </a>
@endif
