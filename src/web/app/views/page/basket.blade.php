<section class="section section-page section-page--basket section-page--basket--{{$basket_options['step']}}">
    <h1 class="title title-page">{{$t('page.title.basket')}}: {{$basket_options['step']}}</h1>
    @switch($basket_options['step'])
        @case('list')
            @include('component.basket-progress', [ 'val' => 25 ])
            <br />
            <page-basket-list
                    price-unit="{{$common_options['units']['price']}}"
                    btn-next-link-target="/{{$page_key}}/{{$common_options['page_basket_keys']['summary']}}{{$urlPar}}"
            >Loading page-basket-list ...</page-basket-list>
        @break
        @case('summary')
            @include('component.basket-progress', [ 'val' => 50 ])
            <br />
            <page-basket-summary
                    price-unit="{{$common_options['units']['price']}}"
                    weight-unit="{{$common_options['units']['weight']}}"
                    btn-prev-link-target="/{{$page_key}}/{{$common_options['page_basket_keys']['list']}}{{$urlPar}}"
                    btn-next-link-target="/{{$page_key}}/{{$common_options['page_basket_keys']['confirmation']}}{{$urlPar}}"
                    member-email="{{$member_options['member']['email']}}"
                    member-name="{{($member_options['member']['first_name'] && $member_options['member']['last_name']) ? $member_options['member']['first_name'] . ' ' . $member_options['member']['last_name'] : ''}}"
                    member-address="{{$member_options['member']['address']}}"
                    member-city="{{$member_options['member']['city']}}"
                    member-country="{{$member_options['member']['country']}}"
                    member-zip="{{$member_options['member']['zip']}}"
            >Loading page-basket-summary ...</page-basket-summary>
        @break
        @case('confirmation')
            @include('component.basket-progress', [ 'val' => 75 ])
            <br />
            <page-basket-confirmation
                    price-unit="{{$common_options['units']['price']}}"
                    weight-unit="{{$common_options['units']['weight']}}"
                    btn-prev-link-target="/{{$page_key}}/{{$common_options['page_basket_keys']['summary']}}{{$urlPar}}"
                    btn-next-link-target="/{{$page_key}}/{{$common_options['page_basket_keys']['finish']}}{{$urlPar}}"
            >Loading page-basket-confirmation ...</page-basket-confirmation>
        @break
        @case('finish')
            @include('component.basket-progress', [ 'val' => 100 ])
            <page-basket-finish
                    oid="{{$url_params['oid']}}"
                    status="{{$url_params['order_status']}}"
            >Loading page-basket-finish ...</page-basket-finish>
            <a href="/{{$urlPar}}">
                {{$t('btn.back_to_home')}}
            </a>
        @break
    @endswitch
</section>
