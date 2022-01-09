<section>
    <h3 class="title-widget">
        {{$t('title.widget.comments_list')}}
    </h3>
    <div>
        <comments-list
            language="{{$lng}}"
            profile-email="{{$member_options['member']['email']}}"
            assigned="{{$model}}"
            assigned-id="{{$id}}"
        >
            Loading comments-list ...
        </comments-list>
    </div>
</section>