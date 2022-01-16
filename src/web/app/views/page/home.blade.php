<!-- Static content -->
<section>
    <h1>{{$t('page.title.home')}}</h1>
    <div>
        @include('component.widget.posts-carousel')
    </div>
    <div>
        <p class="lead">{{$t('page.content.lead.home')}}</p>
        <p>{{$t('page.content.main.home')}}</p>
    </div>
    <div>
        @include('component.widget.products-last')
    </div>
</section>
