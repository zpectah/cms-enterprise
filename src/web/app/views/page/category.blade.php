<section>
    category view content
    {{$title}}
    <br />
    {!!$content!!}
</section>
<section>
    list of items from category ... {{$list_model}}
    @if($should_be_detail)
        <div>
            This detail does not exist !!!
        </div>
    @endif
    <br />
    @foreach($list_items as $item)
        <article id="{{$list_model}}_{{$item['id']}}">
            {{$item['name']}} ...
            <a href="/{{$page_key}}/detail/{{$item['name']}}">Link</a>
        </article>
    @endforeach
</section>
