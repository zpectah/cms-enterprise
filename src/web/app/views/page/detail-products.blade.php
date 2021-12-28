<section>
    @include('component.detail-back')
    <br />
    product view content
    <br />
    detail data ... {{$list_detail['name']}} ... {{$list_detail['id']}} ... {{$page_context}}
    <br />
    @include('component.detail-nav')
</section>
