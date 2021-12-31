<section>
    <h1>{{$t('title.page.basket')}}</h1>
    <br />
    basket steps here ... {{$basket_data['step']}}
    <br />
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
            <section data-module="PageBasketList" data-nextPath="/{{$page_key}}/summary{{$lang['link_url_param']}}">
                <div data-component="PageBasketListItems"><!-- Dynamic list --></div>
                <br />
                <button type="button" data-component="PageBasketListBtnNext">
                    Next step
                </button>
            </section>
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
            <section data-module="PageBasketSummary" data-nextPath="/{{$page_key}}/confirmation{{$lang['link_url_param']}}">
                <div>
                    <form>
                        form
                        <br />
                        Kontakt <br />
                        Dodací údaje <br />
                        Doprava <br />
                        Platba <br />
                    </form>
                </div>
                <br />
                <a href="/{{$page_key}}/list{{$lang['link_url_param']}}">
                    Prev step
                </a>
                <button type="button" data-component="PageBasketSummaryBtnNext">
                    Next step
                </button>
            </section>
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
            <section data-module="PageBasketConfirmation">
                section confirmation <br />
                shrnutí
                <!-- -->
                <br />
                <a href="/{{$page_key}}/summary{{$lang['link_url_param']}}">
                    Prev step
                </a>
                <button type="button" data-component="BasketConfirmButton" data-callbackurl="/{{$page_key}}/finish{{$lang['link_url_param']}}">
                    Finish order
                </button>
            </section>
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
