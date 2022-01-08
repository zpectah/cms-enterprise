<section class="sidebar-widget sidebar-widget--market-temporary">
    @if($basket_data['step'] == 'list')
        <h4 class="widget-title">{{$t('title.widget.basket_tmp.list')}}</h4>
        <p>Temporary data information about basket step or whatever ... for basket list</p>
    @elseif($basket_data['step'] == 'summary')
        <h4 class="widget-title">{{$t('title.widget.basket_tmp.summary')}}</h4>
        <p>basket summary description</p>
    @elseif($basket_data['step'] == 'confirmation')
        <h4 class="widget-title">{{$t('title.widget.basket_tmp.confirmation')}}</h4>
        <p>basket confirmation description</p>
    @elseif($basket_data['step'] == 'finish')
        <h4 class="widget-title">{{$t('title.widget.basket_tmp.finish')}}</h4>
        <p>basket finish description</p>
    @endif
</section>
