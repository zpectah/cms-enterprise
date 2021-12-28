<section>
    @if($page_context == 'page-category-detail')
        @include('component.detail-back')
    @endif
        <h1>{{$detail_data['lang'][$lng]['title']}}</h1>
        <p>
            {{$detail_data['lang'][$lng]['description']}}
        </p>
        <div>
            {!!$detail_data['lang'][$lng]['content']!!}
        </div>
    @if($page_context == 'page-category-detail')
        @include('component.detail-nav')
    @endif
</section>
