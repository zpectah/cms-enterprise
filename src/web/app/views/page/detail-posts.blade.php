<section>
    @if($page_context == 'page-category-detail')
        @include('component.detail-back')
    @endif
    @if($detail_data['img_thumbnail'])
        <img src="{{'/uploads/image/medium/' . $detail_data['img_thumbnail']}}" alt="{{$detail_data['name']}}" style="max-width: 100%;height: auto;" />
    @endif
        <h1>{{$detail_data['lang'][$lng]['title']}}</h1>
        <p>
            {{$detail_data['lang'][$lng]['description']}}
        </p>
        <div>
            {!!$detail_data['lang'][$lng]['content']!!}
        </div>
            <div>sub_media
                   @foreach($detail_data['sub_media'] as $item)
                           <div>
                                   {{$item['name']}}
                           </div>
                    @endforeach
            </div>
            <div>sub_attachments
                    @foreach($detail_data['sub_attachments'] as $item)
                            <div>
                                    {{$item['name']}}
                            </div>
                    @endforeach
            </div>
            <div>tags
                    @foreach($detail_data['sub_tags'] as $item)
                            <div>
                                    {{$item['name']}}
                            </div>
                    @endforeach
            </div>
            <div>categories
                    @foreach($detail_data['sub_categories'] as $item)
                            <div>
                                    {{$item['name']}}
                            </div>
                    @endforeach
            </div>
            <div>links
                    @foreach($detail_data['sub_links'] as $item)
                            <div>
                                    {{$item}}
                            </div>
                    @endforeach
            </div>
            <div>
                    Author: {{$detail_data['sub_author']['email']}}
            </div>
    @if($page_context == 'page-category-detail')
        @include('component.detail-nav')
    @endif
</section>
