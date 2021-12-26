<section>
    category view content
    {{$title}}
    <br />
    {!!$content!!}
</section>
<section>
    list of items from category ... {{$list_model}}
    <br />
    @foreach($list_items as $item)
        <article>
            {{$item['name']}}
        </article>
    @endforeach
</section>
