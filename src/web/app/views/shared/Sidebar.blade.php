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
        <section>
            Temporary data information about basket step or whatever ...
        </section>
    @endif
</aside>