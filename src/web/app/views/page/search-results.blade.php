<section>
    @if($url_params['search'])
        <h1>{{$t('page.title.search_results')}}: {{$url_params['search']}}</h1>
    @else
        <h1>{{$t('page.title.search')}}</h1>
    @endif


    @foreach($search_results as $result)
        @if($result['model'] == 'pages')
            @include('component.list-item.page', [
                'id' => $result['id'],
                'title' => $result['lang'][$lng]['title'],
                'description' => $result['lang'][$lng]['description'],
                'detail_url' => '/' . $result['name'],
                'name' => $result['name'],
            ])
            <br />
        @elseif($result['model'] == $common_options['page_detail_keys']['products'])
            @include('component.list-item.product', [
                'id' => $result['id'],
                'title' => $result['lang'][$lng]['title'],
                'description' => $result['lang'][$lng]['description'],
                'detail_url' => '/' . $common_options['page_keys']['detail'] . '/' . $common_options['page_detail_keys']['products'] . '/' . $result['name'],
                'name' => $result['name'],
                'price' => $result['item_price'],
                'in_stock' => $result['in_stock'],
            ])
            <br />
        @elseif($result['model'] == $common_options['page_detail_keys']['posts'])
            @include('component.list-item.post', [
                'id' => $result['id'],
                'title' => $result['lang'][$lng]['title'],
                'description' => $result['lang'][$lng]['description'],
                'detail_url' => '/' . $common_options['page_keys']['detail'] . '/' . $common_options['page_detail_keys']['posts'] . '/' . $result['name'],
                'name' => $result['name'],
            ])
            <br />
        @endif
    @endforeach
</section>
