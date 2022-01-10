<section>
    <h3>{{$widgetTitle}}</h3>
    <div>
        <ul>
            @foreach($widgetList as $item)
                <li>
                    <a href="{{'/uploads/' . $item['type'] . '/' . $item['file_name']}}" target="_blank">
                        {{$item['file_name']}}
                    </a>
                </li>
            @endforeach
        </ul>
    </div>
</section>