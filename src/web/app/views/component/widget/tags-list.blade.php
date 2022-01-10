<section>
    <h3>{{$widgetTitle}}</h3>
    <div>
        <ul>
            @foreach($widgetList as $item)
                <li>
                    {{$item['name']}}
                </li>
            @endforeach
        </ul>
    </div>
</section>