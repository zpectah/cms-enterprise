<section>
    <h4 class="widget-title">{{$t('title.widget.user')}}</h4>
    @if($member_options['member_logged_in'])
        <div>
            ID: {{$member_options['member']['id']}}
            <br />
            E-mail: {{$member_options['member']['email']}}
            <br />
            <a href="/profile">
                My profile
            </a>
            |
            <member-logout-button
                    label="{{$t('btn.log_out')}}"
                    target-path="{{$page_url}}"
            >
                Loading member-logout-button...
            </member-logout-button>
        </div>
    @else
        <div>
            <members-login-form
                    language="{{$lng}}"
                    target-path="{{$page_url}}"
            >
                Loading members-login-form ...
            </members-login-form>
        </div>
        <div>
            <a
                    href="/registration{{$lang['link_url_param']}}"
                    class="btn btn-outline-secondary"
            >
                {{$t('btn.sign_in')}}
            </a>
            <a
                    href="/lost-password{{$lang['link_url_param']}}"
                    class="btn btn-outline-secondary"
            >
                {{$t('btn.lost_password')}}
            </a>
        </div>
    @endif
</section>