var do_shuffles = true;
var visible_ability_decks = [];
var modifier_deck = null;

var DECK_TYPES =
{
    MODIFIER : "modifier",
    ABILITY:  "ability"
};

var EVENT_NAMES = {
    MODIFIER_CARD_DRAWN: "modifierCardDrawn"
};

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

function create_ability_card_back(name)
{
    var card = document.createElement("div");
    card.className = "card ability back down";

    var name_span = document.createElement("span");
    name_span.className = "name";
    name_span.innerText = name;
    card.appendChild(name_span);

    return card;
}

function create_ability_card_front(initiative, name, shuffle, lines)
{
    var card = document.createElement("div");
    card.className = "card ability front down";

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

function load_ability_deck(deck_definition)
{
    var deck = {
        name:                   deck_definition.name,
        type:                   DECK_TYPES.ABILITY,
        draw_pile:              [],
        discard:                []
    }

    for (var i = 0; i < deck_definition.cards.length; i++)
    {
        var definition = deck_definition.cards[i];
        var shuffle = definition[0];
        var initiative = definition[1];
        var lines = definition.slice(2);

        var card_front = create_ability_card_front(initiative, deck_definition.name, shuffle, lines);
        var card_back = create_ability_card_back(deck_definition.name);

        var card = {
            ui:             new UICard(card_front, card_back),
            shuffle_next:   shuffle
        };

        card.change_displaying_name = function (new_name)
            {
                Array.prototype.forEach.call(this.ui.front.getElementsByClassName("name"), function(element) {
                    element.innerText = new_name;
                });
                Array.prototype.forEach.call(this.ui.back.getElementsByClassName("name"), function(element) {
                    element.innerText = new_name;
                });
            }

        deck.draw_pile.push(card);
    }

    deck.must_reshuffle = function()
    {
      if (!this.draw_pile.length)
      {
          return true;
      } else {
          if (do_shuffles && this.discard.length)
          {
              return this.discard[0].shuffle_next;
          }
      }
    }

    deck.set_real_name = function(real_name)
    {
        // This will serve to know when we can load the monster data (Move/Attack)
        this.real_name = real_name;
        this.draw_pile.concat(this.discard).forEach(
            function(card) {
                card.change_displaying_name(real_name);
            });
    }

    deck.clean_real_name = function()
    {
      if (this.real_name)
      {
        this.real_name = "";
        this.draw_pile.concat(this.discard).forEach(
            function(card) {
                card.change_displaying_name(deck.name);
            });
      }
    }

    return deck;
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

function refresh_ui()
{
    var actual_card_height = 296;
    var base_font_size = 26.6;

    var tableau = document.getElementById("tableau");
    var cards = tableau.getElementsByClassName("card");
    for (var i = 1 ; i < cards.length; i++)
    {
        if (cards[i].className.indexOf("ability") != -1)
        {
            var scale               = cards[i].getBoundingClientRect().height / actual_card_height;
            var scaled_font_size    = base_font_size * scale ;

            var font_pixel_size     = Math.min(scaled_font_size, base_font_size);
            tableau.style.fontSize  = font_pixel_size + "px";
            break;
        }
        
    }
}

function reshuffle(deck, include_discards = true)
{
    if (include_discards)
    {
        deck.draw_pile = deck.draw_pile.concat(deck.discard);
        deck.discard = [];
    }

    shuffle_list(deck.draw_pile);

    for (var i = 0; i < deck.draw_pile.length; i++)
    {
        var card = deck.draw_pile[i];

        card.ui.removeClass("lift");
        card.ui.removeClass("pull");

        card.ui.flip_up(false);

        card.ui.removeClass("discard");
        card.ui.addClass("draw");

        card.ui.set_depth(-i - 6);
    }

}

function flip_up_top_card(deck)
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
    send_to_discard(card, pull_animation=true);
    deck.discard.unshift(card);
}

function send_to_discard(card, pull_animation = true)
{
    card.ui.set_depth(-3);

    if (pull_animation)
    {
        card.ui.addClass("pull");
    }

    card.ui.flip_up(true);

    card.ui.removeClass("draw");
    card.ui.addClass("discard");
}

function draw_ability_card(deck)
{
    if (deck.must_reshuffle())
    {
        reshuffle(deck);
    }
    else
    {
        flip_up_top_card(deck);
    }
}

function prevent_pull_animation(deck)
{
    if (deck.discard.length)
    {
        if (deck.discard[1])
        {
            deck.discard[1].ui.removeClass("lift");
            deck.discard[0].ui.addClass("lift");
        }

        deck.discard[0].ui.removeClass("pull");
    }
}

function reshuffle_modifier_deck(deck)
{
    deck.clean_discard_pile();
    reshuffle(deck);
}

function draw_modifier_card(deck)
{
    deck.clean_advantage_deck();

    if (deck.must_reshuffle())
    {
        reshuffle_modifier_deck(deck);
    }
    else
    {
        flip_up_top_card(deck);

        document.body.dispatchEvent(new CustomEvent(
            EVENT_NAMES.MODIFIER_CARD_DRAWN,
            {
                detail: {
                    card_type: deck.discard[0].card_type,
                    count: deck.count(deck.discard[0].card_type)
                }
            }));
    }
}

function double_draw(deck)
{
    var advantage_card;
    // Case there was 1 card in draw_pile when we clicked "draw 2".
    //    now we should draw, save that card, reshuffle, and
    //    draw the next
    if (deck.draw_pile.length == 1)
    {
        draw_modifier_card(deck);
        advantage_card = deck.discard[0];
        reshuffle_modifier_deck(deck);
        advantage_card = deck.draw_pile.shift(advantage_card);
        send_to_discard(advantage_card, pull_animation=false);
        deck.discard.unshift(advantage_card);
        draw_modifier_card(deck);
    }
    // Case there were 0 cards in draw_pile when we clicked "draw 2".
    //    we should reshuffle, draw 1 and send it to advantage_place,
    //    draw the next
    else if (deck.draw_pile.length == 0)
    {
        // This is in case the previous draw was double as well
        deck.clean_advantage_deck();
        reshuffle_modifier_deck(deck);
        draw_modifier_card(deck);
        advantage_card = deck.discard[0];
        draw_modifier_card(deck);
    }
    // Every other simple case
    else
    {
        draw_modifier_card(deck);
        advantage_card = deck.discard[0];
        draw_modifier_card(deck);
    }
    deck.discard[0].ui.addClass("right");
    advantage_card.ui.addClass("left");
    deck.advantage_to_clean = true;
}

function load_modifier_deck(number_bless, number_curses)
{
    var deck =
    {
        name: "Monster modifier deck",
        type: DECK_TYPES.MODIFIER,
        draw_pile: [],
        discard: [],
        advantage_to_clean: false,
    }

    deck.count = function(card_type)
    {
        return (this.draw_pile.filter(function(card) { return card.card_type === card_type; }).length);
    }.bind(deck);

    deck.remove_card = function(card_type)
    {
        for (var i = 0; i < deck.draw_pile.length; i++)
        {
            if (deck.draw_pile[i].card_type == card_type)
            {
                deck.draw_pile.splice(i, 1);
                reshuffle(deck, include_discards = false);

                repaint_modifier_deck(deck);
                break;
            }
        }

        return this.count(card_type);
    }.bind(deck);

    deck.add_card = function(card_type)
    {
        // TOOD: Brittle
        deck.draw_pile.push(define_modifier_card(MODIFIER_CARDS[card_type.toUpperCase()]));

        repaint_modifier_deck(deck);
        reshuffle(deck, include_discards = false);

        return this.count(card_type);
    }.bind(deck);

    deck.shuffle_end_of_round = function()
    {
        return this.discard.filter(function(card) { return card.shuffle_next_round; }).length > 0;
    }.bind(deck);

    deck.must_reshuffle = function()
    {
        return !this.draw_pile.length;
    }.bind(deck);

    deck.clean_discard_pile = function()
    {
        for (var i = 0; i < deck.discard.length; i++)
        {
            if (this.discard[i].card_type == CARD_TYPES_MODIFIER.BLESS
                || this.discard[i].card_type == CARD_TYPES_MODIFIER.CURSE)
            {
                //Delete this curse/bless that has been used
                this.discard.splice(i, 1);
                i--;
            }
        }

        // This is needed every time we update
        repaint_modifier_deck(this);
    }.bind(deck);

    deck.clean_advantage_deck = function( force_clean = false )
    {
        if ((deck.advantage_to_clean || force_clean) && deck.discard[1])
        {
            deck.advantage_to_clean = false;
            deck.discard[0].ui.removeClass("right");
            deck.discard[0].ui.removeClass("left");
            deck.discard[1].ui.removeClass("left");
            deck.discard[1].ui.removeClass("left");
        }
    }.bind(deck);

    MODIFIER_DECK.forEach( function(card_definition) {
        var card = define_modifier_card(card_definition);
        deck.draw_pile.push(card);
    });

    return deck;
}

function create_modifier_card_back()
{
    var card = document.createElement("div");
    card.className = "card modifier back";
    return card;
}

function create_modifier_card_front(card_url)
{
    var img = document.createElement("img");
    img.className = "cover";
    img.src = card_url;

    var card = document.createElement("div");
    card.className = "card modifier front";
    card.appendChild(img);

    return card;
}

function define_modifier_card(card_definition)
{
    var card_front = create_modifier_card_front(card_definition.image);
    var card_back = create_modifier_card_back();

    var card = {
        ui:                     new UICard(card_front, card_back),
        card_type:              card_definition.type,
        shuffle_next_round:     card_definition.shuffle
    };

    return card;
}

function end_round()
{
    if (modifier_deck.shuffle_end_of_round())
    {
        modifier_deck.clean_advantage_deck();
        reshuffle_modifier_deck(modifier_deck);
    }
}

function load_definition(card_database)
{
    var decks = {};
    for (var i = 0; i < card_database.length; i++)
    {
        var deck = load_ability_deck(card_database[i]);
        decks[deck.name] = deck;
    }
    return decks;
}

function repaint_modifier_deck(deck, prevent_pull)
{
    prevent_pull_animation(deck);
    var modifier_deck_space = document.getElementById("tableau").getElementsByClassName("modifier")[0];
    remove_child(modifier_deck_space);
    place_deck(deck, modifier_deck_space);
}

function apply_deck_selection(decks, preserve_existing_deck_state)
{
    var container = document.getElementById("tableau");

    var decks_to_remove = visible_ability_decks.filter(function(deck) {
        return !preserve_existing_deck_state || decks.indexOf(deck) === -1;
    });

    var decks_to_add = decks.filter(function(deck) {
        return !preserve_existing_deck_state || visible_ability_decks.indexOf(deck) === -1;
    });

    if (!modifier_deck)
    {
        init_modifier_deck();
        add_modifier_deck(container, modifier_deck);
    }
    else if (!preserve_existing_deck_state)
    {
        container.removeChild(document.getElementById("modifier-container"));
        init_modifier_deck();
        add_modifier_deck(container, modifier_deck);
    }

    decks_to_remove.forEach(function(deck) { deck.discard_deck(); });

    decks_to_add.forEach(function(deck) {
        var deck_space = document.createElement("div");
        deck_space.className = "card-container";

        container.appendChild(deck_space);

        place_deck(deck, deck_space);
        reshuffle(deck);
        deck_space.onclick = draw_ability_card.bind(null, deck);

        deck.discard_deck = function()
        {
            var index = visible_ability_decks.indexOf(this);

            if (index > -1) {
                visible_ability_decks.splice(index, 1);
            }

            container.removeChild(deck_space);
        };

        visible_ability_decks.push(deck);
    });

    // Rescale card text if necessary
    refresh_ui();
}

function init_modifier_deck()
{
    var deck = load_modifier_deck(0,0);
    modifier_deck = deck;
}

function add_modifier_deck(container, deck)
{
    function create_counter(card_type, increment_func, decrement_func)
    {
        function create_button(class_name, text, func, text_span)
        {
            var button = document.createElement("div");
            button.className = class_name + " button";
            button.innerText = text;

            button.onclick = function() {
                text_span.innerText = func(card_type);
            };

            return button;
        }

        var widget_container = document.createElement("div");
        widget_container.className = "counter-icon";

        var background = document.createElement("div");
        background.className = "background " + card_type;
        widget_container.appendChild(background);

        var text_span = document.createElement("span");
        text_span.className = "icon-text";
        text_span.innerText = "0";
        widget_container.appendChild(text_span);

        widget_container.appendChild(create_button("increment", "+", increment_func, text_span));
        widget_container.appendChild(create_button("decrement", "-", decrement_func, text_span));

        document.body.addEventListener(EVENT_NAMES.MODIFIER_CARD_DRAWN, function(e)
        {
            if (e.detail.card_type === card_type)
            {
                text_span.innerText = e.detail.count;
            }
        });

        return widget_container;
    }

    var modifier_container = document.createElement("div");
    modifier_container.className = "card-container";
    modifier_container.id = "modifier-container";

    var button_div = document.createElement("div");
    button_div.className = "modifier-deck-column-1";

    button_div.appendChild(create_counter("bless", deck.add_card, deck.remove_card));
    button_div.appendChild(create_counter("curse", deck.add_card, deck.remove_card));

    var end_round_div = document.createElement("div");
    end_round_div.className = "counter-icon shuffle";
    end_round_div.onclick = end_round;

    button_div.appendChild(end_round_div);

    var deck_column = document.createElement("div");
    deck_column.className = "modifier-deck-column-2";

    var deck_space = document.createElement("div");
    deck_space.className = "card-container modifier";

    var draw_two_button = document.createElement("div");
    draw_two_button.className = "button draw-two";
    draw_two_button.onclick = double_draw.bind(null, modifier_deck);

    deck_column.appendChild(deck_space);
    deck_column.appendChild(draw_two_button);

    modifier_container.appendChild(deck_column);
    modifier_container.appendChild(button_div);

    container.appendChild(modifier_container);

    place_deck(deck, deck_space);
    reshuffle(deck);
    deck_space.onclick = draw_modifier_card.bind(null, deck);

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
    scenariolist.spinner = null;
    scenariolist.decks = {};

    for (var i = 0; i < scenarios.length; i++)
    {
        var scenario = scenarios[i];
        scenariolist.decks[i] = scenario.decks;
    }

    var listitem = document.createElement("li");
    listitem.innerText = "Select scenario number";
    scenariolist.ul.appendChild(listitem);

    var scenario_spinner = create_input("number", "scenario_number", "1", "");
    scenario_spinner.input.min = 1;
    scenario_spinner.input.max = scenarios.length;
    scenariolist.ul.appendChild(scenario_spinner.input);
    scenariolist.spinner = scenario_spinner.input;

    scenariolist.get_selection = function()
    {
        // We're using the scenario index that is zero-based, but the scenario list is 1-based
        var current_value = scenariolist.spinner.value - 1;
        return (current_value > scenarios.length) ? scenarios.length + 1 : current_value;
    }

    scenariolist.get_scenario_decks = function()
    {
        return this.decks[this.get_selection()];
    }

    return scenariolist;
}

function init()
{
    decks = load_definition(DECK_DEFINITONS);

    var deckspage = document.getElementById("deckspage");
    var scenariospage = document.getElementById("scenariospage");
    var applydeckbtn = document.getElementById("applydecks");
    var applyscenariobtn = document.getElementById("applyscenario");

    var decklist = new DeckList(decks);
    var scenariolist = new ScenarioList(SCENARIO_DEFINITIONS);

    deckspage.insertAdjacentElement("afterbegin", decklist.ul);
    scenariospage.insertAdjacentElement("afterbegin", scenariolist.ul);
    
    applydeckbtn.onclick = function()
    {
        var selected_deck_names = decklist.get_selection();
        var selected_decks = selected_deck_names.map( function(name)
                                                {
                                                    var deck = decks[name];
                                                    deck.clean_real_name();
                                                    return deck;
                                                } );
        apply_deck_selection(selected_decks, true);
    };

    applyscenariobtn.onclick = function()
    {
        var selected_deck_names = scenariolist.get_scenario_decks();
        var selected_decks = selected_deck_names.map( function(deck_names)
                                                {
                                                    var deck = decks[deck_names.deck_name];
                                                    if (deck_names.deck_name != deck_names.name)
                                                    {
                                                        deck.set_real_name(deck_names.name);
                                                    }
                                                    return deck;
                                                } );
        decklist.set_selection(selected_decks.map( function(deck) { return deck.name; } ));
        apply_deck_selection(selected_decks, false);
    };

    window.onresize = refresh_ui.bind(null, visible_ability_decks);
}
