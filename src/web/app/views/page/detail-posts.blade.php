<section>
    <a href="/{{$page_key}}{{$lang['link_url_param']}}">Back to list</a>
    <br />
    post view content
    <br />
    detail data ... {{$list_detail['name']}} ... {{$list_detail['id']}} ... {{$page_context}}
    <br />
    @if($detail_prev['name'])
        <a href="/{{$page_key}}{{$detail_url_suffix}}/{{$detail_prev['name']}}{{$lang['link_url_param']}}" class="btn btn-secondary">Prev item</a>
    @endif
    @if($detail_next['name'])
        <a href="/{{$page_key}}{{$detail_url_suffix}}/{{$detail_next['name']}}{{$lang['link_url_param']}}" class="btn btn-secondary">Next item</a>
    @endif
</section>
