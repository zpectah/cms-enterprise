<section class="sidebar-widget sidebar-widget--market-temporary">
        <h4 class="widget-title">{{$t('widget.title.basket_tmp')}}</h4>
    @if($basket_data['step'] == 'list')
        <p>{{$t('widget.content.basket_tmp.list')}}</p>
    @elseif($basket_data['step'] == 'summary')
        <p>{{$t('widget.content.basket_tmp.summary')}}</p>
    @elseif($basket_data['step'] == 'confirmation')
        <p>{{$t('widget.content.basket_tmp.confirmation')}}</p>
    @elseif($basket_data['step'] == 'finish')
        <p>{{$t('widget.content.basket_tmp.finish')}}</p>
    @endif
</section>