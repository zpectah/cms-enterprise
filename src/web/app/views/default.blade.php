<div class="page-view view--default view--{{$page_context}}" data-module="BasketModule">
    @include('shared.Header')
    <main id="Main" class="main main--default main--{{$page_context}}">
        <div class="container">
            <div class="row">
                <div class="col">
                    @include($page_name)
                </div>
                <div class="col col-md-3">
                    @include('shared.Sidebar')
                </div>
            </div>
        </div>
    </main>
    @include('shared.Footer')
</div>
