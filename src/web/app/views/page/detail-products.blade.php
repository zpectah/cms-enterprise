<section
        data-component="ProductItem"
        data-component-id="{{$detail_data['id']}}"
>
    @if($page_context == 'page-category-detail')
        @include('component.detail-back')
    @endif
    @if($detail_data['img_thumbnail'])
        <img src="{{'/uploads/image/medium/' . $detail_data['img_thumbnail']}}" alt="{{$detail_data['name']}}" style="max-width: 100%;height: auto;" />
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
    <div>
            <button
                    class="btn btn-outline-success"
                    data-component="BasketAddTrigger"
                    data-id="{{$detail_data['id']}}"
            >
                    {{$t('btn.add-to-basket')}}
            </button>
    </div>
</section>
