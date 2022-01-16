<section>
    <h4 class="widget-title">{{$t('widget.title.user')}}</h4>
    @if($member_options['member_logged_in'])
        <div>
            ID: {{$member_options['member']['id']}}
            <br />
            E-mail: {{$member_options['member']['email']}}
            <br />
            @if($modules_options['members_profile_active'])
                <a href="/{{$common_options['page_keys']['profile']}}{{$urlPar}}">
                    My profile
                </a>
            @endif
            |
            <member-logout-button
                    label="{{$t('btn.log_out')}}"
                    target-path="{{$page_url}}{{$urlPar}}"
            >
                Loading member-logout-button...
            </member-logout-button>
        </div>
    @else
        <div>
            @if($modules_options['members_login_active'])
                <members-login-form
                        language="{{$lng}}"
                        target-path="{{$page_url}}{{$urlPar}}"
                >
                    Loading members-login-form ...
                </members-login-form>
            @endif
        </div>
        <div>
            @if($modules_options['members_register_active'])
                <a
                        href="/{{$common_options['page_keys']['registration']}}{{$urlPar}}"
                        class="btn btn-outline-secondary"
                >
                    {{$t('btn.sign_in')}}
                </a>
            @endif
            @if($modules_options['members_lostPassword_active'])
                <a
                        href="/{{$common_options['page_keys']['lost-password']}}{{$urlPar}}"
                        class="btn btn-outline-secondary"
                >
                    {{$t('btn.lost_password')}}
                </a>
            @endif
        </div>
    @endif
</section>