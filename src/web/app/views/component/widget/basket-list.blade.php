<section class="sidebar-widget sidebar-widget--market">
    <h4 class="widget-title">{{$t('widget.title.basket')}}</h4>
    <basket-widget
            price-unit="{{$common_options['units']['price']}}"
            btn-basket-target="/{{$common_options['page_keys']['basket']}}/{{$common_options['page_basket_keys']['list']}}{{$urlPar}}"
    ></basket-widget>
</section>