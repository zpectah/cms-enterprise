<div id="vue-app" class="page-view view--default view--{{$page_context}}">
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
</div>
