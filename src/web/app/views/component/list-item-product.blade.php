<article id="Product_{{$id}}" class="search-item search-item--product">
    @if($thumbnail)
        <img src="{{'/uploads/image/thumbnail/' . $thumbnail}}" alt="{{$name}}" />
    @endif
    <h3>{{$title}}</h3>
    <p>{{$description}}</p>
    <a href="{{$detail_url}}{{$lang['link_url_param']}}">{{$t('btn.detail-product')}}</a>
    <button
            class="btn btn-sm btn-outline-success"
            data-component="BasketAddTrigger"
            data-id="{{$id}}"
    >
        {{$t('btn.add-to-basket')}}
    </button>
</article>
