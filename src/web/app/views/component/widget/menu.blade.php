<section>
    @if($menuTitle)
        <h4>{{$menuTitle}}</h4>
    @endif
    <div>
        <ul>
            @foreach($menuItems as $mi)
                <li>
                @if($mi['type'] == 'external')
                    <a
                            class="nav-link"
                            target="_blank"
                            href="{{$mi['path_url']}}"
                    >
                        {{$mi['lang'][$lang['current']]['label']}}
                    </a>
                @elseif($mi['type'] == 'local')
                    <a
                            class="nav-link {{$mi['is_selected'] ? 'active' : ''}}"
                            href="{{$mi['path_url']}}{{$urlPar}}"
                    >
                        {{$mi['lang'][$lang['current']]['label']}}
                    </a>
                @else
                    <a
                            class="nav-link {{$mi['is_selected'] ? 'active' : ''}}"
                            href="{{$mi['__path']}}{{$urlPar}}"
                    >
                        {{$mi['lang'][$lang['current']]['label']}}
                    </a>
                @endif
                </li>
            @endforeach
        </ul>
    </div>
</section>