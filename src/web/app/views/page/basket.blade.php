<section class="section section-page section-page--basket section-page--basket--{{$basket_data['step']}}">
    <h1 class="title title-page">{{$t('title.page.basket')}}: {{$basket_data['step']}}</h1>
    @switch($basket_data['step'])
        @case('list')
            @include('component.basket-progress', [ 'val' => '25' ])
            <br />
            <page-basket-list
                    price-unit="CZK"
                    btn-next-link-target="/{{$page_key}}/summary{{$lang['link_url_param']}}"
            >Loading page-basket-list ...</page-basket-list>
        @break
        @case('summary')
            @include('component.basket-progress', [ 'val' => '50' ])
            <br />
            <page-basket-summary
                    price-unit="CZK"
                    btn-prev-link-target="/{{$page_key}}/list{{$lang['link_url_param']}}"
                    btn-next-link-target="/{{$page_key}}/confirmation{{$lang['link_url_param']}}"
            >Loading page-basket-summary ...</page-basket-summary>
        @break
        @case('confirmation')
            @include('component.basket-progress', [ 'val' => '75' ])
            <br />
            <page-basket-confirmation
                    price-unit="CZK"
                    btn-prev-link-target="/{{$page_key}}/summary{{$lang['link_url_param']}}"
                    btn-next-link-target="/{{$page_key}}/finish{{$lang['link_url_param']}}"
            >Loading page-basket-confirmation ...</page-basket-confirmation>
        @break
        @case('finish')
            @include('component.basket-progress', [ 'val' => '100' ])
                <br />
                rid:{{$url_params['rid']}}
                <br />
                status:{{$url_params['status']}}
                <br />
                <page-basket-finish
                >Loading page-basket-finish ...</page-basket-finish>
    <a href="/">
        Return to home
    </a>
        @break
    @endswitch
</section>
