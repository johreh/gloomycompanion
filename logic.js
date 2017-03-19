var do_shuffles = true;
var visible_decks = [];

function UICard(front_element, back_element)
{
    var card = {};

    card.back = back_element;
    card.front = front_element;

    card.flip_up = function(faceup)
    {
        toggle_class(this.back, "up", !faceup);
        toggle_class(this.back, "down", faceup);

        toggle_class(this.front, "up", faceup);
        toggle_class(this.front, "down", !faceup);
    };

    card.set_depth = function(z)
    {
        this.back.style.zIndex = z;
        this.front.style.zIndex = z;
    }

    card.push_down = function()
    {
        this.back.style.zIndex -= 1;
        this.front.style.zIndex -= 1;
    }

    card.addClass = function(class_name)
    {
        this.front.classList.add(class_name);
        this.back.classList.add(class_name);
    }

    card.removeClass = function(class_name)
    {
        this.front.classList.remove(class_name);
        this.back.classList.remove(class_name);
    }

    card.attach = function(parent)
    {
        parent.appendChild(this.back);
        parent.appendChild(this.front);
    }

    card.flip_up(false);

    return card;
}

function create_card_back(name)
{
    var card = document.createElement("div");
    card.className = "card back down";

    var name_span = document.createElement("span");
    name_span.className = "name";
    name_span.innerText = name;
    card.appendChild(name_span);

    return card;
}

function create_card_front(initiative, name, shuffle, lines)
{
    var card = document.createElement("div");
    card.className = "card front down";

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
        while (line.indexOf("*") >= 0)
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

function load_deck(deck_definition)
{
    var deck_state = {
        name:                   deck_definition.name,
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

function place_deck(deck, container)
{
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

function refresh_ui(decks)
{
    var actual_card_height = 296;
    var base_font_size = 26.6;

    var cards = document.getElementsByClassName("card");
    if (cards.length)
    {
        var scale               = cards[0].getBoundingClientRect().height / actual_card_height;
        var scaled_font_size    = base_font_size * scale;
        var tableau             = document.getElementById("tableau");

        var font_pixel_size     = Math.min(scaled_font_size, base_font_size);
        tableau.style.fontSize  = font_pixel_size + "px";
    }
}

function reshuffle(deck)
{
    deck.draw_pile = deck.draw_pile.concat(deck.discard);
    deck.discard = [];
    shuffle_list(deck.draw_pile);

    for (var i = 0; i < deck.draw_pile.length; i++)
    {
        var card = deck.draw_pile[i];

        card.ui.removeClass("lift");
        card.ui.removeClass("pull");

        card.ui.flip_up(false);

        card.ui.removeClass("discard");
        card.ui.addClass("draw");

        card.ui.set_depth(-i - 4);
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
        for (var i = 0; i < deck.discard.length; i++)
        {
            var card = deck.discard[i];
            card.ui.removeClass("lift");
            card.ui.removeClass("pull");
            card.ui.push_down();
        }
        if (deck.discard.length > 0)
        {
            deck.discard[0].ui.addClass("lift");
        }

        var card = deck.draw_pile.shift(card);
        card.ui.set_depth(-3);
        card.ui.addClass("pull");
        card.ui.flip_up(true);

        card.ui.removeClass("draw");
        card.ui.addClass("discard");
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
    var input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.value = value;

    var textnode = document.createTextNode(text);

    var label = document.createElement("label");
    label.appendChild(input);
    label.appendChild(textnode);

    return {'root': label, 'input': input};
}

function apply_deck_selection(decks, preserve_existing_deck_state)
{
    var container = document.getElementById("tableau");

    var decks_to_remove = visible_decks.filter(function(deck) {
        return !preserve_existing_deck_state || decks.indexOf(deck) === -1;
    });

    var decks_to_add = decks.filter(function(deck) {
        return !preserve_existing_deck_state || visible_decks.indexOf(deck) === -1;
    });

    decks_to_remove.forEach(function(deck) { deck.discard_deck(); });

    decks_to_add.forEach(function(deck) {
        var deck_space = document.createElement("div");
        deck_space.className = "card-container";

        container.appendChild(deck_space);

        place_deck(deck, deck_space);
        reshuffle(deck);
        deck_space.onclick = draw_card.bind(null, deck);

        deck.discard_deck = function()
        {
            var index = visible_decks.indexOf(this);

            if (index > -1) {
                visible_decks.splice(index, 1);
            }

            container.removeChild(deck_space);
        };

        visible_decks.push(deck);
    });

    // Rescale card text if necessary
    refresh_ui(decks);
}

function clear_list(list)
{
    list.splice(0, list.length);
    return list;
}

function DeckList(decks)
{
    var decklist = {};
    decklist.ul = document.createElement("ul");
    decklist.ul.className = "selectionlist";
    decklist.checkboxes = {};

    for (var deck_name in decks)
    {
        var listitem = document.createElement("li");
        var dom_dict = create_input("checkbox", "deck", deck_name, deck_name);

        listitem.appendChild(dom_dict.root);
        decklist.ul.appendChild(listitem);
        decklist.checkboxes[deck_name] = dom_dict.input;
    }

    decklist.get_selection = function()
    {
        return dict_values(this.checkboxes).filter(is_checked).map(input_value);
    }

    decklist.set_selection = function(selected_decks)
    {
        dict_values(this.checkboxes).forEach( function(checkbox) {
            checkbox.checked = false;
        });

        selected_decks.forEach(function(deck_name) {
            var checkbox = this.checkboxes[deck_name];
            if (checkbox)
            {
                checkbox.checked = true;
            }
        }.bind(this));
    }

    return decklist;
}

function ScenarioList(scenarios)
{
    var scenariolist = {};
    scenariolist.ul = document.createElement("ul");
    scenariolist.ul.className = "selectionlist";
    scenariolist.radios = [];
    scenariolist.decks = {};

    for (var i = 0; i < scenarios.length; i++)
    {
        var scenario = scenarios[i];
        var listitem = document.createElement("li");
        var dom_dict = create_input("radio", "scenario", scenario.name, scenario.name);

        listitem.appendChild(dom_dict.root);
        scenariolist.ul.appendChild(listitem);
        scenariolist.radios.push(dom_dict.input);
        scenariolist.decks[scenario.name] = scenario.decks;
    }

    scenariolist.get_selection = function()
    {
        return scenariolist.radios.filter(is_checked).map(input_value);
    }

    scenariolist.get_scenario_decks = function()
    {
        var selected_scenarios = this.get_selection();
        var selected_decks = concat_arrays(selected_scenarios.map( function(scenario_name) {
            return ((scenario_name in this.decks) ? this.decks[scenario_name] : []);
        }.bind(this)));
        return selected_decks;
    }

    return scenariolist;
}

function init()
{
    decks = load(DECK_DEFINITONS);

    var deckspage = document.getElementById("deckspage");
    var scenariospage = document.getElementById("scenariospage");
    var applydeckbtn = document.getElementById("applydecks");
    var applyscenariobtn = document.getElementById("applyscenario");

    var decklist = new DeckList(decks);
    var scenariolist = new ScenarioList(SCENARIO_DEFINITIONS);

    deckspage.insertAdjacentElement('afterbegin', decklist.ul);
    scenariospage.insertAdjacentElement('afterbegin', scenariolist.ul);

    applydeckbtn.onclick = function()
    {
        var selected_deck_names = decklist.get_selection();
        var selected_decks = selected_deck_names.map( function(name) { return decks[name]; } );
        apply_deck_selection(selected_decks, true);
    };
    applyscenariobtn.onclick = function()
    {
        var selected_deck_names = scenariolist.get_scenario_decks();
        var selected_decks = selected_deck_names.map( function(name) { return decks[name]; } );
        decklist.set_selection(selected_decks.map( function(deck) { return deck.name; } ));
        apply_deck_selection(selected_decks, false);
    };

    window.onresize = refresh_ui.bind(null, visible_decks);
}

