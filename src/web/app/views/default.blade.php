<div id="view-{{$view_id}}" class="page-view view--default">
    @if ($show_header) @include('shared.Header') @endif
    <main id="Main.{{$content_view}}" class="main main--default">
        @include($content_view)
        @if ($show_sidebar) @include('shared.Sidebar') @endif
    </main>
    @if ($show_header) @include('shared.Footer') @endif
</div>
