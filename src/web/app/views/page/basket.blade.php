<section class="section section-page section-page--basket section-page--basket--{{$basket_data['step']}}">
    <h1 class="title title-page">{{$t('title.page.basket')}}: {{$basket_data['step']}}</h1>
    @switch($basket_data['step'])
        @case('list')
            <div class="progress">
                <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: 25%"
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                ></div>
            </div>
            <br />
            <page-basket-list
                    price-unit="CZK"
                    btn-next-link-target="/{{$page_key}}/summary{{$lang['link_url_param']}}"
            >Loading page-basket-list ...</page-basket-list>
        @break
        @case('summary')
            <div class="progress">
                <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: 50%"
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                ></div>
            </div>
            <br />
            <page-basket-summary
                    price-unit="CZK"
                    btn-prev-link-target="/{{$page_key}}/list{{$lang['link_url_param']}}"
                    btn-next-link-target="/{{$page_key}}/confirmation{{$lang['link_url_param']}}"
            >Loading page-basket-summary ...</page-basket-summary>
        @break
        @case('confirmation')
            <div class="progress">
                <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: 75%"
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"
                ></div>
            </div>
            <br />
            <page-basket-confirmation
                    price-unit="CZK"
                    btn-prev-link-target="/{{$page_key}}/summary{{$lang['link_url_param']}}"
                    btn-next-link-target="/{{$page_key}}/finish{{$lang['link_url_param']}}"
            >Loading page-basket-confirmation ...</page-basket-confirmation>
        @break
        @case('finish')
            <div class="progress">
                <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: 100%"
                        aria-valuenow="100"
                        aria-valuemin="0"
                        aria-valuemax="100"
                ></div>
            </div>
            <br />
            <section data-module="PageBasketFinish">
                section finish
            </section>
        @break
    @endswitch
</section>
