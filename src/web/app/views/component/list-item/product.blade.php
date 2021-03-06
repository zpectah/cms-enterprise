<article
        id="Product_{{$id}}"
        class="list-item list-item--product"
        data-product-id="{{$id}}"
>
    @if($thumbnail)
        <img src="{{$uploadsPfx . 'image/thumbnail/' . $thumbnail}}" alt="{{$name}}" />
    @endif
    <h3>{{$title}}</h3>
    <p>{{$description}}</p>
    <div>
        {{$t('label.price')}} {{ $price }} CZK
        |
        {{ $in_stock ? $t('label.in_stock') : $t('label.not_in_stock') }}
    </div>
    <a href="{{$detail_url}}{{$urlPar}}">{{$t('btn.detail')}}</a>
    <basket-add-button
            id="{{$id}}"
            label="{{$t('btn.add-to-basket')}}"
            class="btn-sm btn-outline-success"
    ></basket-add-button>
</article>