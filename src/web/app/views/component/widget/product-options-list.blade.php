<section>
    <h3>{{$widgetTitle}}</h3>
    <div>
        <ul>
            @foreach($widgetList as $item)
                @set($key='option.' . $item['name'])
                <li>
                    {{$t($key)}}: <b>{{$item['value']}}</b>
                </li>
            @endforeach
        </ul>
    </div>
</section>