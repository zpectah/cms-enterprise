<section class="" data-component="BasketWidget">
    <h4>Basket items</h4>
    <div>{!!$basket_data['show_basket_widget']!!}</div>
    <div data-component="BasketWidgetList"><!-- Dynamic list --></div>
    <a
            href="/basket/list{{$lang['link_url_param']}}"
            class="btn btn-outline-secondary"
    >
        {{$t('btn.show-basket')}}
    </a>
</section>

