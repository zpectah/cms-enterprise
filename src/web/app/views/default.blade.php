<div class="view-default">
@if ($show_header) @include('Header') @endif
<main>
    display 'default' content {{$consumer}}
</main>
@if ($show_header) @include('Footer') @endif
</div>
