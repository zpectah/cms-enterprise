<section>
    <h4 class="widget-title">{{$t('title.widget.last_posts')}}</h4>
    <div>
        last posts...
        <br />
        @foreach($get_posts_list(5) as $item)
        <div>
            <a href="{{'/' . $common_options['page_keys']['detail'] . '/posts/' . $item['name']}}{{$lang['link_url_param']}}">
                {{$item['lang'][$lng]['title']}}
            </a>
        </div>
        @endforeach
    </div>
</section>