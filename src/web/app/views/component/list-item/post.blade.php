<article id="Post_{{$id}}" class="list-item list-item--post">
    @if($thumbnail)
        <img src="{{'/uploads/image/thumbnail/' . $thumbnail}}" alt="{{$name}}" />
    @endif
    <h3>{{$title}}</h3>
    <p>{{$description}}</p>
    <div>
        {{$author['email']}}
    </div>
    <a href="{{$detail_url}}{{$lang['link_url_param']}}">{{$t('btn.detail-post')}}</a>
</article>