<section>
    <h1>{{$t('title.page.basket')}}</h1>
    <br />
    basket steps here ... {{$basket_data['step']}}
    <br />
    @switch($basket_data['step'])
        @case('list')
            <section data-module="PageBasketList">
                section list

            </section>
        @break
        @case('summary')
            <section data-module="PageBasketSummary">
                section summary

            </section>
        @break
        @case('confirmation')
            <section data-module="PageBasketConfirmation">
                section confirmation

            </section>
        @break
        @case('finish')
            <section data-module="PageBasketFinish">
                section finish

            </section>
        @break
    @endswitch
</section>
