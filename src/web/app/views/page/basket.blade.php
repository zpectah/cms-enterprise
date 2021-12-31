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
                <div>
                    Total price: XXXX CZK (?)
                </div>
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
                    <form name="BasketSummaryForm" data-formid="BasketSummaryForm">

                        @include('component.ui.input-select', [
                            'row_class' => 'mb-3',
                            'input_id' => 'BasketSummaryForm_payment',
                            'input_name' => 'payment',
                            'input_label' => $t('form.label.payment'),
                            'input_placeholder' => $t('form.label.payment'),
                            'options' => [
                                // TODO -> prepare list from BE
                                [
                                    'label' => 'Label',
                                    'value' => 'Value'
                                ]
                            ],
                        ])
                        @include('component.ui.input-select', [
                            'row_class' => 'mb-3',
                            'input_id' => 'BasketSummaryForm_delivery',
                            'input_name' => 'delivery',
                            'input_label' => $t('form.label.delivery'),
                            'input_placeholder' => $t('form.label.delivery'),
                            'options' => [
                                // TODO -> prepare list from BE
                                [
                                    'label' => 'Label',
                                    'value' => 'Value'
                                ]
                            ],
                        ])

                        <br />

                        @include('component.ui.input-text', [
                            'row_class' => 'mb-3',
                            'input_id' => 'BasketSummaryForm_name',
                            'input_name' => 'customer_name',
                            'input_label' => $t('form.label.user_name'),
                            'input_type' => 'text',
                            'input_placeholder' => $t('form.label.user_name'),
                        ])
                        @include('component.ui.input-text', [
                            'row_class' => 'mb-3',
                            'input_id' => 'BasketSummaryForm_email',
                            'input_name' => 'email',
                            'input_label' => $t('form.label.user_email'),
                            'input_type' => 'email',
                            'input_placeholder' => $t('form.label.user_email'),
                        ])
                        @include('component.ui.input-text', [
                            'row_class' => 'mb-3',
                            'input_id' => 'BasketSummaryForm_phone',
                            'input_name' => 'phone',
                            'input_label' => $t('form.label.user_phone'),
                            'input_type' => 'tel',
                            'input_placeholder' => $t('form.label.user_phone'),
                        ])

                        @include('component.ui.input-text', [
                            'row_class' => 'mb-3',
                            'input_id' => 'BasketSummaryForm_country',
                            'input_name' => 'country',
                            'input_label' => $t('form.label.country'),
                            'input_type' => 'text',
                            'input_placeholder' => $t('form.label.country'),
                        ])
                        @include('component.ui.input-text', [
                            'row_class' => 'mb-3',
                            'input_id' => 'BasketSummaryForm_city',
                            'input_name' => 'city',
                            'input_label' => $t('form.label.city'),
                            'input_type' => 'text',
                            'input_placeholder' => $t('form.label.city'),
                        ])
                        @include('component.ui.input-text', [
                            'row_class' => 'mb-3',
                            'input_id' => 'BasketSummaryForm_address',
                            'input_name' => 'address',
                            'input_label' => $t('form.label.address'),
                            'input_type' => 'text',
                            'input_placeholder' => $t('form.label.address'),
                        ])
                        @include('component.ui.input-text', [
                            'row_class' => 'mb-3',
                            'input_id' => 'BasketSummaryForm_zip',
                            'input_name' => 'zip',
                            'input_label' => $t('form.label.zip'),
                            'input_type' => 'text',
                            'input_placeholder' => $t('form.label.zip'),
                        ])
                        @include('component.ui.input-textarea', [
                            'row_class' => 'mb-3',
                            'input_id' => 'BasketSummaryForm_description',
                            'input_name' => 'description',
                            'input_label' => $t('form.label.description'),
                            'input_placeholder' => $t('form.label.description'),
                            'input_help' => $t('form.help.description'),
                        ])

                        <br />
                        <div>
                            Total price: XXXX CZK (?)
                        </div>
                        <br />
                        <div>
                            <br />
                            <a href="/{{$page_key}}/list{{$lang['link_url_param']}}">
                                Prev step
                            </a>
                            <button type="button" data-component="PageBasketSummaryBtnNext">
                                Next step
                            </button>
                        </div>

                    </form>
                </div>
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
                <div>
                    Total price: XXXX CZK (?)
                </div>
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
