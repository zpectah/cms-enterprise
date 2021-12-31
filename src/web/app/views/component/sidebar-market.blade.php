<section class="" data-component="BasketWidget">
    <h4>Basket items</h4>
    <div>{!!$basket_data['show_basket_widget']!!}</div>
    <div data-component="BasketWidgetList"><!-- Dynamic list --></div>
    <br />
    <div>
        Total price: XXXX CZK (?)
    </div>
    <br />
    <a
            href="/basket/list{{$lang['link_url_param']}}"
            class="btn btn-outline-secondary"
            data-component="BasketWidgetLink"
    >
        {{$t('btn.show-basket')}}
    </a>
</section>

