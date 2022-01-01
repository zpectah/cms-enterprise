<article
        id="Product_{{$id}}"
        class="list-item list-item--product"
        data-component="ProductItem"
        data-component-id="{{$id}}"
>
    @if($thumbnail)
        <img src="{{'/uploads/image/thumbnail/' . $thumbnail}}" alt="{{$name}}" />
    @endif
    <h3>{{$title}}</h3>
    <p>{{$description}}</p>
    <a href="{{$detail_url}}{{$lang['link_url_param']}}">{{$t('btn.detail-product')}}</a>
    <basket-add-button
            id="{{$id}}"
            label="{{$t('btn.add-to-basket')}}"
            class="btn-sm btn-outline-success"
    ></basket-add-button>
</article>
