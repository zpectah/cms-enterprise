<section
        data-product-id="{{$detail_data['id']}}"
>
    @if($page_context == 'page-category-detail')
        @include('component.detail-back')
    @endif
    @if($detail_data['img_thumbnail'])
        <img src="{{$uploadsPfx . 'image/medium/' . $detail_data['img_thumbnail']}}" alt="{{$detail_data['name']}}" style="max-width: 100%;height: auto;" />
    @endif
        <h1>{{$detail_data['lang'][$lng]['title']}}</h1>
        <p>
            {{$detail_data['lang'][$lng]['description']}}
        </p>
        <div>
            {!!$detail_data['lang'][$lng]['content']!!}
        </div>

            @include('component.widget.products-list', [
                'widgetTitle' => $t('widget.title.products_related'),
                'widgetList' => $detail_data['sub_related'],
            ])

            @include('component.widget.uploads-list', [
                'widgetTitle' => $t('widget.title.attachments'),
                'widgetList' => $detail_data['sub_attachments'],
            ])

            @include('component.widget.image-list', [
                'widgetTitle' => $t('widget.title.gallery'),
                'widgetList' => $detail_data['sub_gallery'],
            ])

            @include('component.widget.tags-list', [
                'widgetTitle' => $t('widget.title.tags'),
                'widgetList' => $detail_data['sub_tags'],
            ])

            @include('component.widget.tags-list', [
                'widgetTitle' => $t('widget.title.categories'),
                'widgetList' => $detail_data['sub_categories'],
                'label' => 'title',
            ])

            @include('component.widget.product-options-list', [
                'widgetTitle' => $t('widget.title.product_options'),
                'widgetList' => $detail_data['sub_options'],
            ])

        <div>
            Manager: {{$detail_data['sub_manager']['email']}}
        </div>
        <div>
            {{$t('label.price')}} {{ $detail_data['item_price'] }} {{$common_options['units']['price']}}
            |
            {{ $detail_data['in_stock'] ? $t('label.in_stock') : $t('label.not_in_stock') }}
        </div>
    @if($page_context == 'page-category-detail')
        @include('component.detail-nav')
    @endif
    <div>
            <basket-add-button
                    id="{{$detail_data['id']}}"
                    label="{{$t('btn.add_to_basket')}}"
                    class="btn-sm btn-outline-success"
            ></basket-add-button>
    </div>

            @include('component.widget.comments-list', [
                'model' => 'product',
                'id' => $detail_data['id'],
            ])
</section>
