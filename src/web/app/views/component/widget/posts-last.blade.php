<section>
    <h4 class="widget-title">{{$t('widget.title.last_posts')}}</h4>
    <div>
        @foreach($get_posts_list(5) as $item)
        <div>
            <a href="{{'/' . $common_options['page_keys']['detail'] . '/' . $common_options['page_detail_keys']['posts'] . '/' . $item['name']}}{{$urlPar}}">
                {{$item['lang'][$lng]['title']}}
            </a>
        </div>
        @endforeach
    </div>
</section>