<aside id="Sidebar">
    @if($sidebar_widget['search'])
        @include('component.widget.search-form')
    @endif
    @if($sidebar_widget['member'])
        @include('component.widget.member')
    @endif
    @if($sidebar_widget['basket'])
        @include('component.widget.basket-list')
    @else
        @include('component.widget.basket-temporary')
    @endif
    @if($sidebar_widget['last-posts'])
        @include('component.widget.posts-last')
    @endif
    @if($sidebar_widget['subscription'])
        @include('component.widget.member-subscribe')
    @endif
    @if($sidebar_widget['menu'])
        <!-- DEMO -->
        @include('component.widget.menu', [
            'menuTitle' => $menu['custom']['sidebar-menu']['lang'][$lng]['label'],
            'menuItems' => $menu['custom']['sidebar-menu']['menu_items']
        ])
    @endif
</aside>