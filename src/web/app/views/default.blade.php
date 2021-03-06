<div
        id="vue-app"
        data-lang="{{$lng}}"
        class="page-view view--default view--{{$page_context}}"
>
    @include('shared.Header')
    <main id="Main" class="main main--default main--{{$page_context}}">
        <div class="container">
            <div class="row">
                <div class="col">
                    @include($page_name)
                </div>
                @if($view_with_sidebar)
                <div class="col col-md-3">
                    @include('shared.Sidebar')
                </div>
                @endif
            </div>
        </div>
    </main>
    @include('shared.Footer')
    @if($content_options['mode']['debug'])
        @include('component.page-mode-message', [ 'viewType' => 'debug' ])
    @endif
    @if($content_options['mode']['maintenance'])
        @include('component.page-mode-message', [ 'viewType' => 'maintenance' ])
    @endif
    <cookies-bar></cookies-bar>
</div>
