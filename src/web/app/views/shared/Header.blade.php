<header id="Header">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a
                    class="navbar-brand"
                    href="/{{$language['link_url_param']}}"
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
                                    {{$mi['lang'][$language['current']]['label']}}
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
                                                    {{$ch['lang'][$language['current']]['label']}}
                                                </a>
                                            @elseif($ch['type'] == 'local')
                                                <a
                                                        class="nav-link {{$ch['is_selected'] ? 'active' : ''}}"
                                                        href="{{$ch['path_url']}}{{$language['link_url_param']}}"
                                                >
                                                    {{$ch['lang'][$language['current']]['label']}}
                                                </a>
                                            @else
                                                <a
                                                        class="nav-link {{$ch['is_selected'] ? 'active' : ''}}"
                                                        href="{{$ch['__path']}}{{$language['link_url_param']}}"
                                                >
                                                    {{$ch['lang'][$language['current']]['label']}}
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
                                        {{$mi['lang'][$language['current']]['label']}}
                                    </a>
                                @elseif($mi['type'] == 'local')
                                    <a
                                            class="nav-link {{$mi['is_selected'] ? 'active' : ''}}"
                                            href="{{$mi['path_url']}}{{$language['link_url_param']}}"
                                    >
                                        {{$mi['lang'][$language['current']]['label']}}
                                    </a>
                                @else
                                    <a
                                            class="nav-link {{$mi['is_selected'] ? 'active' : ''}}"
                                            href="{{$mi['__path']}}{{$language['link_url_param']}}"
                                    >
                                        {{$mi['lang'][$language['current']]['label']}}
                                    </a>
                                @endif
                            @endif
                        </li>
                    @endforeach
                </ul>
                <!--
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                -->
            </div>
        </div>
    </nav>
</header>
