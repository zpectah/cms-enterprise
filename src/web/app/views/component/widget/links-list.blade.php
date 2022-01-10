<section>
    <h3>{{$widgetTitle}}</h3>
    <div>
        <ul>
            @foreach($widgetList as $item)
                <li>
                    <a href="{{$item}}" target="_blank">
                        {{$item}}
                    </a>
                </li>
            @endforeach
        </ul>
    </div>
</section>