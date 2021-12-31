<div class="{{$row_class ? $row_class : ''}}">
    @if($input_label)
        <label
                for="{{$input_id}}"
                class="form-label"
        >
            {{$input_label}}
        </label>
    @endif
        <input
            type="{{$input_type ? $input_type : 'text'}}"
            class="form-control"
            id="{{$input_id}}"
            name="{{$input_name}}"
            aria-describedby="{{$input_id}}_help"
            placeholder="{{$input_placeholder}}"
            value="{{$input_value}}"
            data-component="{{$input_id}}"
            {{$input_aria_label ? `aria-label="$input_aria_label"` : ''}}
        >
    @if($input_help)
        <div
                id="{{$input_id}}_help"
                class="form-text"
        >
            {{$input_help}}
        </div>
    @endif
</div>
