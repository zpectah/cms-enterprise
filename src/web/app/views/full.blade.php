<div class="page-view view--full view--{{$page_context}}">
    <main id="Main" class="main main--full main--{{$page_context}}">
        <div class="container">
            <div class="row">
                <div class="col">
                    {{$page_name}}
                    @include($page_name)
                </div>
            </div>
        </div>
    </main>
</div>
