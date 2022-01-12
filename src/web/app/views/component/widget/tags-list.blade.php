<section>
    <h3>{{$widgetTitle}}</h3>
    <div>
        <ul>
            @foreach($widgetList as $item)
                <li>
                    @if($label === 'title')
                        {{$item['lang'][$lng]['title']}}
                    @else
                        {{$item['name']}}
                    @endif
                </li>
            @endforeach
        </ul>
    </div>
</section>