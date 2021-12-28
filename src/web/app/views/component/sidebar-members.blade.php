<section>
    user data if logged in
    <br />
    <a
            href="/registration{{$lang['link_url_param']}}"
            class="btn btn-outline-secondary"
    >
        {{$t('btn.sign-in')}}
    </a>
    <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
    >
        {{$t('btn.log-in')}}
    </button>
    <a
            href="/lost-password{{$lang['link_url_param']}}"
            class="btn btn-outline-secondary"
    >
        {{$t('btn.lost-password')}}
    </a>
</section>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
            <form>
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ... login form ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </form>
        </div>
    </div>
</div>
