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
        @if($list_model == 'products')
            @include('component.list-item-product', [
                'id' => $item['id'],
                'title' => $item['lang'][$lng]['title'],
                'description' => $item['lang'][$lng]['description'],
                'detail_url' => '/' . $page_key . $detail_url_suffix . '/' . $item['name'],
                'name' => $item['name'],
                'thumbnail' => $item['img_thumbnail'],
            ])
        @elseif($list_model == 'posts')
            @include('component.list-item-post', [
                'id' => $item['id'],
                'title' => $item['lang'][$lng]['title'],
                'description' => $item['lang'][$lng]['description'],
                'detail_url' => '/' . $page_key . $detail_url_suffix . '/' . $item['name'],
                'name' => $item['name'],
                'thumbnail' => $item['img_thumbnail'],
            ])
        @endif
    @endforeach
</section>
