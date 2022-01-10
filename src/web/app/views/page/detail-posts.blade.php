<section>
    @if($page_context == 'page-category-detail')
        @include('component.detail-back')
    @endif
    @if($detail_data['img_thumbnail'])
        <img src="{{'/uploads/image/medium/' . $detail_data['img_main']}}" alt="{{$detail_data['name']}}" style="max-width: 100%;height: auto;" />
    @endif
        <h1>{{$detail_data['lang'][$lng]['title']}}</h1>
        <p>
            {{$detail_data['lang'][$lng]['description']}}
        </p>
        <div>
            {!!$detail_data['lang'][$lng]['content']!!}
        </div>

        @include('component.widget.image-list', [
            'widgetTitle' => 'Sub media',
            'widgetList' => $detail_data['sub_media'],
        ])

        @include('component.widget.uploads-list', [
            'widgetTitle' => 'Sub attachments',
            'widgetList' => $detail_data['sub_attachments'],
        ])

        @include('component.widget.tags-list', [
            'widgetTitle' => 'Tags',
            'widgetList' => $detail_data['sub_tags'],
        ])

        @include('component.widget.tags-list', [
            'widgetTitle' => 'Categories',
            'widgetList' => $detail_data['sub_categories'],
        ])

        @include('component.widget.links-list', [
            'widgetTitle' => 'Links',
            'widgetList' => $detail_data['sub_links'],
        ])

        <div>
                Author: {{$detail_data['sub_author']['email']}}
        </div>
    @if($page_context == 'page-category-detail')
        @include('component.detail-nav')
    @endif

        @include('component.widget.comments-list', [
            'model' => 'post',
            'id' => $detail_data['id'],
        ])
</section>
