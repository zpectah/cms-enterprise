<section>
    <h1>Results for: {{$url_params['search']}}</h1>
    @foreach($search_results as $result)
        @if($result['model'] == 'pages')
            @include('component.list-item-page', [
                'id' => $result['id'],
                'title' => $result['lang'][$lng]['title'],
                'description' => $result['lang'][$lng]['description'],
                'detail_url' => '/' . $result['name'],
                'name' => $item['name'],
            ])
            <br />
        @elseif($result['model'] == 'products')
            @include('component.list-item-product', [
                'id' => $result['id'],
                'title' => $result['lang'][$lng]['title'],
                'description' => $result['lang'][$lng]['description'],
                'detail_url' => '/detail/products/' . $result['name'],
                'name' => $item['name'],
            ])
            <br />
        @elseif($result['model'] == 'posts')
            @include('component.list-item-post', [
                'id' => $result['id'],
                'title' => $result['lang'][$lng]['title'],
                'description' => $result['lang'][$lng]['description'],
                'detail_url' => '/detail/posts/' . $result['name'],
                'name' => $item['name'],
            ])
            <br />
        @endif
    @endforeach
</section>
