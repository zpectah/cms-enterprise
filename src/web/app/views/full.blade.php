<div
        id="vue-app"
        data-lang="{{$lng}}"
        class="page-view view--full view--{{$page_context}}"
>
    <main id="Main" class="main main--full main--{{$page_context}}">
        <div class="container">
            <div class="row">
                <div class="col">
                    @include($page_name)
                </div>
            </div>
        </div>
    </main>
</div>
