<section>
    <h1>{{$t('page.title.lost-password')}}</h1>
    @if($member_options['lost_password_token'])
        @if($member_options['lost_password_request']['status'] == 1)
            <members-lost-password-confirm-form
                    language="{{$lng}}"
                    token="{{$member_options['lost_password_token']}}"
                    email="{{$member_options['lost_password_request']['value']}}"
            >
                Loading members-lost-password-confirm-form ...
            </members-lost-password-confirm-form>
        @else
            <div>This request has been already resolved</div>
        @endif
    @else
        <members-lost-password-form
                language="{{$lng}}"
        >
            Loading members-lost-password-form ...
        </members-lost-password-form>
    @endif
</section>
