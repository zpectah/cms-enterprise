<header id="Header">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a
                    class="navbar-brand"
                    href="/{{$lang['link_url_param']}}"
            >
                {{$project_name}}
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    @foreach($menu['primary']['main-menu']['menu_items'] as $mi)
                        <li class="nav-item {{$mi['children'] ? 'dropdown' : ''}}">
                            @if($mi['children'])
                                <a
                                        class="nav-link dropdown-toggle"
                                        href="#"
                                        id="navbarDropdown_{{$mi['id']}}"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                >
                                    {{$mi['lang'][$lang['current']]['label']}}
                                </a>
                                <ul
                                        class="dropdown-menu"
                                        aria-labelledby="navbarDropdown_{{$mi['id']}}"
                                >
                                    @foreach($mi['children'] as $ch)
                                        <li>
                                            @if($ch['type'] == 'external')
                                                <a
                                                        class="nav-link"
                                                        target="_blank"
                                                        href="{{$ch['path_url']}}"
                                                >
                                                    {{$ch['lang'][$lang['current']]['label']}}
                                                </a>
                                            @elseif($ch['type'] == 'local')
                                                <a
                                                        class="nav-link {{$ch['is_selected'] ? 'active' : ''}}"
                                                        href="{{$ch['path_url']}}{{$lang['link_url_param']}}"
                                                >
                                                    {{$ch['lang'][$lang['current']]['label']}}
                                                </a>
                                            @else
                                                <a
                                                        class="nav-link {{$ch['is_selected'] ? 'active' : ''}}"
                                                        href="{{$ch['__path']}}{{$lang['link_url_param']}}"
                                                >
                                                    {{$ch['lang'][$lang['current']]['label']}}
                                                </a>
                                            @endif
                                        </li>
                                    @endforeach
                                </ul>
                            @else
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
                                            href="{{$mi['path_url']}}{{$lang['link_url_param']}}"
                                    >
                                        {{$mi['lang'][$lang['current']]['label']}}
                                    </a>
                                @else
                                    <a
                                            class="nav-link {{$mi['is_selected'] ? 'active' : ''}}"
                                            href="{{$mi['__path']}}{{$lang['link_url_param']}}"
                                    >
                                        {{$mi['lang'][$lang['current']]['label']}}
                                    </a>
                                @endif
                            @endif
                        </li>
                    @endforeach
                </ul>
            </div>
            <div class="btn-group btn-group-sm" role="group" aria-label="Basic outlined example">
                @foreach($lang['menu'] as $item)
                    <a
                            href="{{$item['path']}}"
                            class="btn btn-outline-secondary {{$item['active'] ? 'active' : ''}}"
                    >
                        {{$item['key']}}
                    </a>
                @endforeach
            </div>
        </div>
    </nav>
</header>
