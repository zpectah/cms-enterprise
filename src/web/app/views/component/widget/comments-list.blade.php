@if($content_options['comments']['active'])
<section>
    <h3 class="title-widget">
        {{$t('widget.title.comments_list')}}
    </h3>
    <div>
        <comments-list
            language="{{$lng}}"
            profile-email="{{$member_options['member']['email']}}"
            assigned="{{$model}}"
            assigned-id="{{$id}}"
            anonymous-active="{{$content_options['comments']['anonymous_active']}}"
        >
            Loading comments-list ...
        </comments-list>
    </div>
</section>
@endif