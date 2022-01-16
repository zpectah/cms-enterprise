@if($modules_options['market_active'])
<section>
    <h4 class="widget-title">{{$t('widget.title.last_products')}}</h4>
    <div>
        @foreach($get_products_list(2) as $item)
            @include('component.list-item.product', [
                'id' => $item['id'],
                'title' => $item['lang'][$lng]['title'],
                'description' => $item['lang'][$lng]['description'],
                'detail_url' => '/' . $common_options['page_keys']['detail'] . '/' . $common_options['page_detail_keys']['products'] . '/' . $item['name'],
                'name' => $item['name'],
                'price' => $item['item_price'],
                'in_stock' => $item['in_stock'],
            ])
        @endforeach
    </div>
</section>
@endif