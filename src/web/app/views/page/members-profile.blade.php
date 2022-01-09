<section>
    <h1>{{$t('title.page.profile')}}</h1>
    <div>
        @if($member_options['member_logged_in'])
            <members-profile-form
                    language="{{$lng}}"
                    tmp-token-control="{{$member_options['member_token']}}"
            >
                Loading members-profile-form ...
            </members-profile-form>
        @else
            <div>
                Sorry, but you must be logged in to view properly this page ...
            </div>
        @endif
    </div>
</section>
