<section>
    <h1>{{$title}}</h1>
    <p>
        {{$description}}
    </p>
    <br />
    {!!$content!!}
</section>
@if($elements)
    @foreach($elements as $elem)
        @if($elem === 'contact_form')
            <section>
                <contact-form
                        language="{{$lng}}"
                        profile-email="{{$member_options['member']['email']}}"
                >
                    Loading contact-form ...
                </contact-form>
            </section>
        @endif
        @if($elem === 'subscribe_form')
            <section>
                <members-subscription-form
                        language="{{$lng}}"
                >
                    Loading members-subscription-form ...
                </members-subscription-form>
            </section>
        @endif
    @endforeach
@endif
