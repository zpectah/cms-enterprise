<section class="sidebar-widget sidebar-widget--market">
    <h4 class="widget-title">{{$t('title.widget-basket')}}</h4>
    <basket-widget
            price-unit="CZK"
            btn-basket-label="{{$t('btn.show-basket')}}"
            btn-basket-target="/basket/list{{$lang['link_url_param']}}"
            btn-remove-label="{{$t('btn.remove')}}"
    ></basket-widget>
</section>


