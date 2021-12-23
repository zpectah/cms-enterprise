<div id="view-home">
    @if ($show_header) @include('shared.Header') @endif
    <main>
        display 'home' content {{$consumer}}
    </main>
    @if ($show_header) @include('shared.Footer') @endif
</div>
