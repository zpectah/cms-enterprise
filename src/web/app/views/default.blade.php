<div id="view-{{$page_id}}" class="page-view view--default">
    @include('shared.Header')
    <main id="Main.{{$page_id}}" class="main main--default">
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
    <div class="container">
        <div class="row">
            <div class="col">
                @include('shared.Footer')
            </div>
        </div>
    </div>
</div>
