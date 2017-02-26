
var do_shuffles = true;

function UICard(front_img, back_img)
{
    var card = {};

    card.back = back_img;
    card.back.className = "shufflable card back up";

    card.front = front_img;
    card.front.className = "shufflable card front down";

    card.target = back_img.cloneNode(true);
    card.target.className = "shufflable placeholder card";
    card.target.style.left = 0;
    card.target.style.top = 0;


    card.flip = function(faceup)
    {
        this.pop_up();

        this.back.className = "shufflable card back flip " + (faceup ? "down" : "up");
        this.front.className = "shufflable card front flip " + (faceup ? "up" : "down");
    };

    card.set_position = function(position)
    {
        var delta = get_absolute_delta(this.target, position);
        set_absolute_position(this.back, delta);
        set_absolute_position(this.front, delta);
    };

    card.push_down = function()
    {
        this.back.style.zIndex -= 1;
        this.front.style.zIndex -= 1;
    };

    card.pop_up = function()
    {
        this.back.style.zIndex = 0;
        this.front.style.zIndex = 0;
    };

    card.attach = function(parent)
    {
        parent.appendChild(this.back);
        parent.appendChild(this.front);
        parent.appendChild(this.target);
    }

    return card;
}

function load_image(url)
{
    var img = document.createElement("img");
    img.src = url;
    return img
}

function create_placeholder(url)
{
    var placeholder = document.createElement("div");
    placeholder.className = "card placeholder";
    return placeholder
}

function create_card_back(name)
{
    var card = document.createElement("div");
    card.className = "card flip back down";

    var name_span = document.createElement("span");
    name_span.className = "name";
    name_span.innerText = name;
    card.appendChild(name_span);

    return card;
}

function create_card_front(initiative, name, shuffle, lines)
{
    var card = document.createElement("div");
    card.className = "card flip front down";

    var name_span = document.createElement("span");
    name_span.className = "name";
    name_span.innerText = name;
    card.appendChild(name_span);

    var initiative_span = document.createElement("span");
    initiative_span.className = "initiative";
    initiative_span.innerText = initiative;
    card.appendChild(initiative_span);

    if (shuffle)
    {
        var shuffle_img = document.createElement("img");
        shuffle_img.src = "images/shuffle.svg";
        card.appendChild(shuffle_img);
    }

    var current_depth = 0;
    var current_parent = card;
    for (var i = 0; i < lines.length; i++)
    {
        var line = lines[i];

        var new_depth = 0;
        while (line.startsWith("*"))
        {
            new_depth += 1;
            line = line.substr(1);
        }
        var diff = new_depth - current_depth;

        while (current_depth != new_depth)
        {
            if (diff > 0)
            {
                // Need one level lower, create <ul>
                var list = document.createElement("ul");
                current_parent.appendChild(list);
                current_parent = list;

                // Create <li>
                var list_item = document.createElement("li");
                current_parent.appendChild(list_item);
                current_parent = list_item;
                
                current_depth += 1;
            }
            else
            {
                // Need to go up in the list, pop <li>
                current_parent = current_parent.parentElement;

                // pop <ul>
                current_parent = current_parent.parentElement;

                current_depth -= 1;
            }
        }

        if ((current_depth > 0) && (diff <= 0))
        {
            // Same level, pop the previous <li>
            current_parent = current_parent.parentElement;

            // create sibling <li>
            var list_item = document.createElement("li");
            current_parent.appendChild(list_item);
            current_parent = list_item;
        }

        var text = expand_string(line.trim());
        current_parent.insertAdjacentHTML("beforeend", text);
    }

    return card;
}

function get_absolute_position(element)
{
    var body_rect = document.body.getBoundingClientRect();
    var element_rect = element.getBoundingClientRect();

    return { 
        x: element_rect.left - body_rect.left,
        y: element_rect.top - body_rect.top
    }
}

function get_absolute_delta(element, position)
{
    var current = get_absolute_position(element);
    var delta = 
        { x:  position.x - current.x
        , y:  position.y - current.y
        };

    return delta;
}

function set_absolute_position(element, position)
{
    element.style.left = position.x;
    element.style.top = position.y;
}

function load_deck(deck_definition)
{
    var deck_state = {
        name:                   deck_definition.name,
        draw_placeholder:       create_placeholder(),
        discard_placeholder:    create_placeholder(),
        draw_pile:              [],
        discard:                []
    }

    for (var i = 0; i < deck_definition.cards.length; i++)
    {
        var definition = deck_definition.cards[i];
        var shuffle = definition[0];
        var initiative = definition[1];
        var lines = definition.slice(2);

        var card_front = create_card_front(initiative, deck_definition.name, shuffle, lines);
        var card_back = create_card_back(deck_definition.name);

        var card = {
            ui:             new UICard(card_front, card_back),
            shuffle_next:   shuffle
        };

        deck_state.draw_pile.push(card);
    }

    return deck_state;
}

function shuffle_cards(deck)
{
    deck.draw_pile = deck.draw_pile.concat(deck.discard);
    deck.discard = [];
    shuffle_list(deck.draw_pile);
}

function place_deck(deck, container)
{
    container.appendChild(deck.draw_placeholder);
    container.appendChild(deck.discard_placeholder);
    
    for (var i = 0; i < deck.draw_pile.length; i++)
    {
        var card = deck.draw_pile[i];
        card.ui.attach(container);
    }
    for (var i = 0; i < deck.discard.length; i++)
    {
        var card = deck.discard[i];
        card.ui.attach(container);
    }
}

function straighten_deck(deck)
{
    var draw_position = get_absolute_position(deck.draw_placeholder);
    var discard_position = get_absolute_position(deck.discard_placeholder);

    for (var i = 0; i < deck.draw_pile.length; i++)
    {
        var card = deck.draw_pile[i];
        card.ui.set_position(draw_position);
    }

    for (var i = 0; i < deck.discard.length; i++)
    {
        var card = deck.discard[i];
        card.ui.set_position(discard_position);
    }
}

function refresh_ui(decks)
{
    for (var i = 0; i < decks.length; i++)
    {
        straighten_deck(decks[i]);
    }
}

function reshuffle(deck)
{
    shuffle_cards(deck);

    var draw_position = get_absolute_position(deck.draw_placeholder);
    for (var i = 0; i < deck.draw_pile.length; i++)
    {
        var card = deck.draw_pile[i];
        card.ui.flip(false);
        card.ui.set_position(draw_position);
        card.ui.push_down();
    }
}

function must_reshuffle(deck)
{
    if (!deck.draw_pile.length)
    {
        return true;
    }
    else if (do_shuffles && deck.discard.length)
    {
        return deck.discard[0].shuffle_next;
    }
}

function draw_card(deck)
{
    if (must_reshuffle(deck))
    {
        reshuffle(deck);
    }
    else
    {
        var discard_position = get_absolute_position(deck.discard_placeholder);

        for (var i = 0; i < deck.discard.length; i++)
        {
            deck.discard[i].ui.push_down();
        }

        var card = deck.draw_pile.shift(card);

        card.ui.flip(true);
        card.ui.set_position(discard_position);

        deck.discard.unshift(card);
    }
}

function load(card_database)
{
    var decks = {};
    for (var i = 0; i < card_database.length; i++)
    {
        var deck = load_deck(card_database[i]);
        decks[deck.name] = deck;
    }
    return decks;
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

function apply_deck_selection(decks)
{
    var container = document.getElementById("container");
    container.innerHTML = ""; // TODO use deck.discard_deck instead

    for (var i = 0; i < decks.length; i++)
    {
        var deck_space = document.createElement("div");
        deck_space.className = "card-container";
        container.appendChild(deck_space);

        var deck = decks[i];
        place_deck(deck, deck_space);
        reshuffle(deck);
        deck_space.onclick = draw_card.bind(null, deck);

        deck.discard_deck = function()
        {
            container.removeChild(deck_space);
        }
    }
}

function get_checkbox_selection(checkboxes)
{
    var selected_decks = [];

    for (var i = 0; i < checkboxes.length; i++)
    {
        var checkbox = checkboxes[i];
        if (checkbox.checked)
        {
            selected_decks.push(checkbox.value);
        }
    }

    return selected_decks;
}

function clear_list(list)
{
    list.splice(0, list.length);
    return list;
}

function create_deck_list(decks)
{
    var checkboxlist = []
    for (var deck_name in decks)
    {
        var checkbox = create_input("checkbox", "deck", deck_name, deck_name);
        checkboxlist.push(checkbox);
    }
    return checkboxlist;
}

function create_scenario_list(scenarios, decklist, retobj)
{
    var radiolist = []
    for (var i = 0; i < scenarios.length; i++)
    {
        var scenario = scenarios[i];
        var radio = create_input("radio", "scenario", scenario.name, scenario.name);

        function update_retobj(decknames, e)
        {
            clear_list(retobj);
            var selected_decks = decknames.map( function(name) { return decklist[name]; } );
            selected_decks.map( function(deck) { retobj.push(deck); } );
        }

        radio.onchange = update_retobj.bind(null, scenario.decks);
        radiolist.push(radio);
    }
    return radiolist;
}

function init()
{
    decks = load(DECK_DEFINITONS);

    var decklist = document.getElementById("decklist");
    var scenariolist = document.getElementById("scenariolist");
    var applydeckbtn = document.getElementById("applydecks");
    var applyscenariobtn = document.getElementById("applyscenario");

    var selected_decks = [];
    
    create_deck_list(decks).map( function(checkbox) { decklist.appendChild(checkbox); } );
    create_scenario_list(SCENARIO_DEFINITIONS, decks, selected_decks).map( function(radiobtn) { scenariolist.appendChild(radiobtn); } );

    applydeckbtn.onclick = function()
    {
        var checkboxes = document.getElementsByName("deck");
        var selected_deck_names = get_checkbox_selection(checkboxes);
        clear_list(selected_decks);
        selected_deck_names.map( function(name) { selected_decks.push(decks[name]); } );
        apply_deck_selection(selected_decks);
    };
    applyscenariobtn.onclick = function()
    {
        apply_deck_selection(selected_decks);
    };

    window.onresize = refresh_ui.bind(null, selected_decks);
}

