@if($modules_options['members_register_active'])
    <section>
        <h4 class="widget-title">{{$t('widget.title.subscribe')}}</h4>
        <members-subscription-form
                language="{{$lng}}"
        >
            Loading members-subscription-form ...
        </members-subscription-form>
    </section>
@endif