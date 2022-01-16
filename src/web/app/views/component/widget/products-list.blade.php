@if($member_options['market_active'])
<section>
    <h3>{{$widgetTitle}}</h3>
    <div>
        <div>
            @foreach($widgetList as $item)
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
            @endforeach
        </div>
    </div>
</section>
@endif