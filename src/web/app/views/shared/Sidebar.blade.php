<aside id="Sidebar">
    @if($sidebar_widget['search'])
        @include('component.sidebar-search')
    @endif
    @if($sidebar_widget['user'])
        @include('component.sidebar-members')
    @endif
    @if($sidebar_widget['basket'])
        @include('component.sidebar-market')
    @else
        @include('component.sidebar-market-basket')
    @endif
    @if($sidebar_widget['last-posts'])
        @include('component.sidebar-last-posts')
    @endif
</aside>