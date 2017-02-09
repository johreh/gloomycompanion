
function UICard(front_img, back_img)
{
    var card = {};

    card.back = back_img;
    card.back.className = "card up";

    card.front = front_img;
    card.front.className = "card down";

    card.flip = function(faceup)
    {
        this.pop_up();

        this.back.className = "card flip " + (faceup ? "down" : "up");
        this.front.className = "card flip " + (faceup ? "up" : "down");
    };

    card.set_position = function(position)
    {
        set_absolute_position(this.back, position);
        set_absolute_position(this.front, position);
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
    }

    return card;
}

function load_image(url)
{
    var img = document.createElement("img");
    img.src = url;
    return img
}

function load_card_image(url)
{
    var img = load_image(url)
    img.style.position = "absolute";
    return img;
}

function create_placeholder(url)
{
    var placeholder = load_image(url);
    placeholder.className = "card placeholder";
    return placeholder
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

function set_absolute_position(element, position)
{
    element.style.left = position.x;
    element.style.top = position.y;
}

function load_deck(deck_definition)
{
    var deck_state = {
        name:                   deck_definition.name,
        draw_placeholder:       create_placeholder(deck_definition.backside),
        discard_placeholder:    create_placeholder(deck_definition.backside),
        draw_pile:              [],
        discard:                []
    }

    for (var i = 0; i < deck_definition.cards.length; i++)
    {
        [url, copies, shuffle] = deck_definition.cards[i];
        for (var copy = 0; copy < copies; copy++)
        {
            var card_front = load_card_image(url);
            var card_back = load_card_image(deck_definition.backside);

            var card = {
                ui:             new UICard(card_front, card_back),
                shuffle_next:   shuffle
            };

            deck_state.draw_pile.push(card);
        }
    }

    return deck_state;
}

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

function straighten_deck(deck, container)
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

function draw_card(deck)
{
    if (!deck.draw_pile.length)
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

        var card = deck.draw_pile.pop();

        card.ui.flip(true);
        card.ui.set_position(discard_position);

        deck.discard.push(card);
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

function get_checkbox_selection(checkbox_name)
{
    var selected_decks = [];
    var checkboxes = document.getElementsByName(checkbox_name);

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

function apply_decks(decks, checkbox_selection_fn)
{
    var container = document.getElementById("container");
    var selected_decks = checkbox_selection_fn();
    for (var i = 0; i < selected_decks.length; i++)
    {
        var deck_space = document.createElement("div");
        container.appendChild(deck_space);

        var deck_name = selected_decks[i];
        var deck = decks[deck_name];
        place_deck(deck, deck_space);
        reshuffle(deck);
        deck_space.onclick = draw_card.bind(null, deck);
    }
}

function init_deck_list(decks)
{
    var uilist = document.getElementById("decklist");
    for (var deck_name in decks)
    {
        var checkbox = create_input("checkbox", "deck", deck_name, deck_name);
        uilist.appendChild(checkbox);
    }

    var selection_fn = get_checkbox_selection.bind(null, "deck");
    var applybtn = document.getElementById("applydecks");
    applybtn.onclick = apply_decks.bind(null, decks, selection_fn);
}

function get_selected_scenario_decks(radio_name, scenario_list)
{
    var uilist = document.getElementsByName(radio_name);
    for (var i = 0; i < uilist.length; i++)
    {
        if (uilist[i].checked)
        {
            for (var j = 0; j < scenario_list.length; j++)
            {
                if (scenario_list[j].name == uilist[i].value)
                {
                    return scenario_list[j].decks;
                }
            }
            return [];
        }
    }
    return [];
}

function init_scenario_list(decks, scenarios)
{
    var uilist = document.getElementById("scenariolist");
    for (var i = 0; i < scenarios.length; i++)
    {
        var radio = create_input("radio", "scenario", scenarios[i].name, scenarios[i].name);
        uilist.appendChild(radio);
    }

    var selection_fn = get_selected_scenario_decks.bind(null, "scenario", scenarios);
    var applybtn = document.getElementById("applyscenario");
    applybtn.onclick = apply_decks.bind(null, decks, selection_fn);
}

function init()
{
    var decks = load(DECK_DEFINITONS);
    init_deck_list(decks);
    init_scenario_list(decks, SCENARIO_DEFINITIONS);
}

