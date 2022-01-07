<section
        data-product-id="{{$detail_data['id']}}"
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
        <div>
            {{$t('label.price')}} {{ $detail_data['item_price'] }} CZK
            |
            {{ $detail_data['in_stock'] ? $t('label.in_stock') : $t('label.not_in_stock') }}
        </div>
    @if($page_context == 'page-category-detail')
        @include('component.detail-nav')
    @endif
    <div>
            <basket-add-button
                    id="{{$detail_data['id']}}"
                    label="{{$t('btn.add-to-basket')}}"
                    class="btn-sm btn-outline-success"
            ></basket-add-button>
    </div>
</section>
