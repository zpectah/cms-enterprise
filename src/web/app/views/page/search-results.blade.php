<section>
    <h1>Results for: {{$url_params['search']}}</h1>
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
        @elseif($result['model'] == 'products')
            @include('component.list-item.product', [
                'id' => $result['id'],
                'title' => $result['lang'][$lng]['title'],
                'description' => $result['lang'][$lng]['description'],
                'detail_url' => '/' . $common_options['page_keys']['detail'] . '/products/' . $result['name'],
                'name' => $result['name'],
                'price' => $result['item_price'],
                'in_stock' => $result['in_stock'],
            ])
            <br />
        @elseif($result['model'] == 'posts')
            @include('component.list-item.post', [
                'id' => $result['id'],
                'title' => $result['lang'][$lng]['title'],
                'description' => $result['lang'][$lng]['description'],
                'detail_url' => '/' . $common_options['page_keys']['detail'] . '/posts/' . $result['name'],
                'name' => $result['name'],
            ])
            <br />
        @endif
    @endforeach
</section>
