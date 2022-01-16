@if($member_options['market_active'])
<section class="sidebar-widget sidebar-widget--market-temporary">
        <h4 class="widget-title">{{$t('widget.title.basket_tmp')}}</h4>
    @if($basket_options['step'] == 'list')
        <p>{{$t('widget.content.basket_tmp.list')}}</p>
    @elseif($basket_options['step'] == 'summary')
        <p>{{$t('widget.content.basket_tmp.summary')}}</p>
    @elseif($basket_options['step'] == 'confirmation')
        <p>{{$t('widget.content.basket_tmp.confirmation')}}</p>
    @elseif($basket_options['step'] == 'finish')
        <p>{{$t('widget.content.basket_tmp.finish')}}</p>
    @endif
</section>
@endif