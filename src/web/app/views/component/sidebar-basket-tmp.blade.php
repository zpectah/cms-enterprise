<section class="sidebar-widget sidebar-widget--market-temporary">
    @if($basket_data['step'] == 'list')
        Temporary data information about basket step or whatever ... for basket list
    @elseif($basket_data['step'] == 'summary')
        basket summary description
    @elseif($basket_data['step'] == 'confirmation')
        basket confirmation description
    @elseif($basket_data['step'] == 'finish')
        basket finish description
    @endif
</section>
