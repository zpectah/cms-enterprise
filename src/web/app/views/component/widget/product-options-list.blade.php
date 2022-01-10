<section>
    <h3>{{$widgetTitle}}</h3>
    <div>
        <ul>
            @foreach($widgetList as $item)
                <li>
                    {{$item['name']}} {{$item['value']}}
                </li>
            @endforeach
        </ul>
    </div>
</section>