<section>
    <a href="/{{$page_key}}">Back to list</a>
    <br />
    product view content
    <br />
    detail data ... {{$list_detail['name']}} ... {{$list_detail['id']}}
    <br />
    @if($detail_prev['name'])
        <a href="/{{$page_key}}/detail/{{$detail_prev['name']}}" class="btn btn-secondary">Prev item</a>
    @endif
    @if($detail_next['name'])
        <a href="/{{$page_key}}/detail/{{$detail_next['name']}}" class="btn btn-secondary">Next item</a>
    @endif
</section>
