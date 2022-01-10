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
            <div>sub_media
                   @foreach($detail_data['sub_media'] as $item)
                           <div>
                               <img src="{{'/uploads/image/thumbnail/' . $item['file_name']}}" alt="{{$item['name']}}" style="max-width: 100%;height: auto;" />
                           </div>
                    @endforeach
            </div>
            <div>sub_attachments
                <ul>
                    @foreach($detail_data['sub_attachments'] as $item)
                        <li>
                            {{$item['file_name']}}
                        </li>
                    @endforeach
                </ul>
            </div>
            <div>tags
                <ul>
                    @foreach($detail_data['sub_tags'] as $item)
                        <li>
                            {{$item['name']}}
                        </li>
                    @endforeach
                </ul>
            </div>
            <div>categories
                <ul>
                    @foreach($detail_data['sub_categories'] as $item)
                        <li>
                            {{$item['name']}}
                        </li>
                    @endforeach
                </ul>
            </div>
            <div>links
                <ul>
                    @foreach($detail_data['sub_links'] as $item)
                        <li>
                            {{$item}}
                        </li>
                    @endforeach
                </ul>
            </div>
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
