<div id="view-{{$page_id}}" class="page-view view--default">
    @include('shared.Header')
    <main id="Main.{{$page_id}}" class="main main--default">
        @include($page_name)
        @include('shared.Sidebar')
    </main>
    @include('shared.Footer')
</div>
