
function shuffle_list(l)
{
    for (var i = 0; i < l.length; i++)
    {
        var switch_index = Math.floor(Math.random() * l.length);
        var tmp = l[switch_index];
        l[switch_index] = l[i];
        l[i] = tmp;
    }
}

function toggle_class(element, class_name, enable_class)
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

function clean_node(myNode)
{
  while (myNode.firstChild)
  {
    myNode.removeChild(myNode.firstChild);
  }
}

function create_input(type, name, value, text)
{
    var checkbox = document.createElement("input");
    checkbox.type = type;
    checkbox.name = name;
    checkbox.value = value;

    var textnode = document.createTextNode(text);

    var listitem = document.createElement("li");
    listitem.appendChild(checkbox);
    listitem.appendChild(textnode);

    return listitem;
}

function create_button(type, id, value)
{
  var button = document.createElement("input");
  button.type = type;
  button.id = id;
  button.value = value;

  return button;
}