
export function shuffle_list(l)
{
    for (let i = 0; i < l.length-1; i++)
    {
        // Based on https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Implementation_errors
        const switch_index = i + Math.floor(Math.random() * (l.length - i));
        const tmp = l[switch_index];
        l[switch_index] = l[i];
        l[i] = tmp;
    }
}

export function toggle_class(element, class_name, enable_class)
{
    if (enable_class)
    {
        element.classList.add(class_name);
    }
    else
    {
        element.classList.remove(class_name);
    }
}

export function remove_child(myNode)
{
    while (myNode.firstChild)
    {
        myNode.removeChild(myNode.firstChild);
    }
}

export function create_input(type, name, value, text)
{
    const input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.value = value;

    const textnode = document.createTextNode(text);

    const label = document.createElement("label");
    label.appendChild(input);
    label.appendChild(textnode);

    return {'root': label, 'input': input};
}

export function create_button(type, id, value)
{
    const button = document.createElement("input");
    button.type = type;
    button.id = id;
    button.value = value;

    return button;
}

export function dict_values(dict)
{
    const values = [];
    for (let key in dict) {
        values.push(dict[key]);
    }

    return values;
}

export function concat_arrays(arrays)
{
    return Array.prototype.concat.apply([], arrays);
}

export function is_checked(input)
{
    return (('checked' in input) ? input.checked : false);
}

export function input_value(input)
{
    return (('value' in input) ? input.value : '');
}

export function remove_empty_strings(array)
{
    return array.filter(Boolean);
}

export function write_to_storage(name, value) {
    try {
        localStorage.setItem(name, value);
    } catch (e) {
        console.error('Local storage is required');
    }
    // console.info("Local storage write:", name, value);
}

export function get_from_storage(name) {
    try {
        return localStorage.getItem(name);
    } catch (e) {
        console.error('Local storage is required');
    }
}

export function find_in_discard(discard, id) {
    for (let i=0; i < discard.length; i++) {
        if (discard[i].id === id) {
            return discard[i];
        }
    }
    return null;
}
