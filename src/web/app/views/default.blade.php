<div id="view-default">
    @if ($show_header) @include('shared.Header') @endif
    <main>
        display 'default' content {{$consumer}}
        <br />
        <div id="DemoComponent"></div>
    </main>
    @if ($show_header) @include('shared.Footer') @endif
</div>
