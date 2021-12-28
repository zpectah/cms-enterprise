<section>
    category view content
    {{$title}}
    <br />
    {!!$content!!}
</section>
<section>
    list of items from category ... {{$list_model}} ... {{$page_context}}
    @if($detail_not_found)
        <div>
            This detail does not exist !!!
        </div>
    @endif
    <br />
    @foreach($list_items as $item)
        <article id="{{$list_model}}_{{$item['id']}}">
            {{$item['name']}} ...
            <a href="/{{$page_key}}{{$detail_url_suffix}}/{{$item['name']}}{{$lang['link_url_param']}}">Link</a>
        </article>
    @endforeach
</section>
