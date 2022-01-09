@if($detail_not_found)
    <section>
        This detail does not exist !!!
    </section>
@else
    <section>
        <h1>{{$title}}</h1>
        <p>
            {{$description}}
        </p>
        <br />
        {!!$content!!}
    </section>
    <section>
        @foreach($list_items as $item)
            @if($list_model == 'products')
                @include('component.list-item.product', [
                    'id' => $item['id'],
                    'title' => $item['lang'][$lng]['title'],
                    'description' => $item['lang'][$lng]['description'],
                    'detail_url' => '/' . $page_key . $detail_url_suffix . '/' . $item['name'],
                    'name' => $item['name'],
                    'thumbnail' => $item['img_thumbnail'],
                    'price' => $item['item_price'],
                    'in_stock' => $item['in_stock'],
                    'manager' => $item['sub_manager'],
                ])
            @elseif($list_model == 'posts')
                @include('component.list-item.post', [
                    'id' => $item['id'],
                    'title' => $item['lang'][$lng]['title'],
                    'description' => $item['lang'][$lng]['description'],
                    'detail_url' => '/' . $page_key . $detail_url_suffix . '/' . $item['name'],
                    'name' => $item['name'],
                    'thumbnail' => $item['img_thumbnail'],
                    'author' => $item['sub_author'],
                ])
            @endif
        @endforeach
    </section>

    @include('component.widget.comments-list', [
        'model' => 'category',
        'id' => $category_id
    ])
@endif
