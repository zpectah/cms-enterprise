<section>
    <br />
    search results
    <br />
    Searching for: {{$url_params['search']}}
    <br />
    results list ...
    <br />
    @foreach($search_results as $result)
        @if($result['model'] == 'pages')
            <article id="Page_{{$result['id']}}">
                {{$result['name']}}:{{$result['id']}}
                <br />
                <a href="/{{$result['name']}}">Link to page</a>
            </article>
            <br />
        @elseif($result['model'] == 'products')
            <article id="Product_{{$result['id']}}">
                {{$result['name']}}:{{$result['id']}}
                <br />
                <a href="/detail/products/{{$result['name']}}">Link to product</a>
            </article>
            <br />
        @elseif($result['model'] == 'posts')
            <article id="Post_{{$result['id']}}">
                {{$result['name']}}:{{$result['id']}}
                <br />
                <a href="/detail/posts/{{$result['name']}}">Link to post</a>
            </article>
            <br />
        @endif
    @endforeach
</section>
