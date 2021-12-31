<div class="{{$row_class ? $row_class : ''}}">
    @if($input_label)
        <label
                for="{{$input_id}}"
                class="form-label"
        >
            {{$input_label}}
        </label>
    @endif
        <select
                class="form-select"
                id="{{$input_id}}"
                name="{{$input_name}}"
                {{$input_aria_label ? `aria-label="$input_aria_label"` : ''}}
                aria-describedby="{{$input_id}}_help"
                data-component="{{$input_id}}"
        >
            <option selected disabled>{{$input_placeholder}}</option>
            @foreach($options as $opt)
                <option value="{{$opt['value']}}">{{$opt['label']}}</option>
            @endforeach
        </select>
    @if($input_help)
        <div
                id="{{$input_id}}_help"
                class="form-text"
        >
            {{$input_help}}
        </div>
    @endif
</div>
