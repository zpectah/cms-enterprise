<aside id="Sidebar">
    @if($sidebar_widget['search'])
        @include('component.sidebar-search')
    @endif
    @if($sidebar_widget['user'])
        @include('component.sidebar-members')
    @endif
    @if($sidebar_widget['basket'])
        @include('component.sidebar-basket')
    @else
        @include('component.sidebar-basket-tmp')
    @endif
    @if($sidebar_widget['last-posts'])
        @include('component.sidebar-last-posts')
    @endif
    <members-subscription-form>
        Loading members-subscription-form ...
    </members-subscription-form>
</aside>