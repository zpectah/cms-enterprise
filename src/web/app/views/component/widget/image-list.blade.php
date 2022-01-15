<section>
    <h3>{{$widgetTitle}}</h3>
    <div>
        <ul>
            @foreach($widgetList as $item)
                <li>
                    <img src="{{$uploadsPfx . 'image/thumbnail/' . $item['file_name']}}" alt="{{$item['name']}}" style="max-width: 100%;height: auto;" />
                </li>
            @endforeach
        </ul>
    </div>
</section>