var do_shuffles = true;

var DeckTypes = 
{
    MODIFIER : "modifier",
    SKILL:  "skill"
};

var CardTypes =
{
    BLESS: "bless",
    CURSE: "curse"
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

function create_skill_card_back(name)
{
    var card = document.createElement("div");
    card.className = "card skill back down";

    var name_span = document.createElement("span");
    name_span.className = "name";
    name_span.innerText = name;
    card.appendChild(name_span);

    return card;
}

function create_skill_card_front(initiative, name, shuffle, lines)
{
    var card = document.createElement("div");
    card.className = "card skill front down";

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

function load_skill_deck(deck_definition)
{
    var deck = {
        name:                   deck_definition.name,
        type:                   DeckTypes.SKILL,
        draw_pile:              [],
        discard:                []
    }

    for (var i = 0; i < deck_definition.cards.length; i++)
    {
        var definition = deck_definition.cards[i];
        var shuffle = definition[0];
        var initiative = definition[1];
        var lines = definition.slice(2);

        var card_front = create_skill_card_front(initiative, deck_definition.name, shuffle, lines);
        var card_back = create_skill_card_back(deck_definition.name);

        var card = {
            ui:             new UICard(card_front, card_back),
            shuffle_next:   shuffle
        };

        deck.draw_pile.push(card);
    }

    deck.must_reshuffle = function()
    {
      if (!deck.draw_pile.length)
      {
          return true;
      } else {
          if (do_shuffles && deck.discard.length)
          {
              return deck.discard[0].shuffle_next;
          }
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

    var cards = document.getElementsByClassName("card");
    if (cards.length)
    {
        var scale               = cards[0].getBoundingClientRect().height / actual_card_height;
        var scaled_font_size    = base_font_size * scale;
        var tableau             = document.getElementById("tableau");
        var topmenu             = document.getElementById("topmenu");

        var font_pixel_size     = Math.min(scaled_font_size, base_font_size);
        tableau.style.fontSize  = font_pixel_size + "px";
        topmenu.style.fontSize  = font_pixel_size + "px";
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

    shuffle_list(deck.draw_pile);

}

function flip_up_top_card(deck)
{
    for (var i = 0; i < deck.discard.length; i++)
    {
        var card = deck.discard[i];
        card.ui.removeClass("lift");
        card.ui.removeClass("pull");555
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

function draw_skill_card(deck)
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

function repaint_modifier_deck(deck, prevent_pull)
{
    // use discard... but it kills the deck!
    prevent_pull_animation(deck);
    remove_child(document.getElementById("topmenu").getElementsByClassName("base")[0]);
    place_deck(deck, document.getElementById("topmenu").getElementsByClassName("base")[0]);
    remove_child(document.getElementById("topmenu").getElementsByClassName("extra")[0]);
    if (deck.advantage_deck.discard.length)
    {
        place_deck(deck.advantage_deck, document.getElementById("topmenu").getElementsByClassName("extra")[0]);
    }
}

function reshuffle_modifier_deck(deck)
{
    deck.clean_discard_pile();
    deck.shuffle_end_of_round = false;
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
        if (deck.discard[0].shuffle_next_round)
        {
            deck.shuffle_end_of_round = true;
        }
        if (deck.discard[0].card_type == CardTypes.BLESS)
        {
            deck.bless_count--;
            write_value_deck_status(deck.curse_count, deck.bless_count);
        } else if (deck.discard[0].card_type == CardTypes.CURSE)
        {
            deck.curse_count--;
            write_value_deck_status(deck.curse_count, deck.bless_count);
        }
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
        draw_modifier_card(deck);
    }
    // Case there were 0 cards in draw_pile when we clicked "draw 2".
    //    we should reshuffle, draw 1 and send it to advantage_place,
    //    draw the next
    else if (deck.draw_pile.length == 0)
    {
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
    send_to_discard(advantage_card, pull_animation=false);
    paint_card_on_advantage_deck_space(advantage_card, deck.advantage_deck);
}

function paint_card_on_advantage_deck_space(card, advantage_deck)
{
    advantage_deck.discard.push(card);
    place_deck(advantage_deck, document.getElementById("topmenu").getElementsByClassName("extra")[0]);
}

function load_modifier_deck(number_bless, number_curses)
{
    var deck = {
        name: "Monster modifier deck",
        type: DeckTypes.MODIFIER,
        draw_pile: [],
        discard: [],
        advantage_deck: null,
        bless_count: 0,
        curse_count: 0,
        shuffle_end_of_round: false    }

    deck.must_reshuffle = function()
    {
        return !deck.draw_pile.length;
    }

    deck.clean_discard_pile = function()
    {
        for (var i = 0; i < deck.discard.length; i++)
        {
            if (deck.discard[i].card_type == CardTypes.BLESS
                || deck.discard[i].card_type == CardTypes.CURSE)
            {
            //Delete this curse/bless that has been used
            deck.discard.splice(i, 1);
            i--;
            }
        }

        // This is needed every time we update 
        repaint_modifier_deck(deck);

    }

    deck.clean_advantage_deck = function()
    {
        if (deck.advantage_deck.discard.length)
        {
            deck.advantage_deck.discard.splice(0, 1);
            remove_child(document.getElementById("topmenu").getElementsByClassName("extra")[0]);
            place_deck(deck.advantage_deck, document.getElementById("topmenu").getElementsByClassName("extra")[0]);
        }
        
    }

    //Start the Deck with the default values: Six +0, five +1, five -1 and a single +2, -2, 2x and Null card each.
    for (var i = 0 ; i < 6 ; i++) deck.draw_pile.push(define_modifier_card(false, "plus0"));
    for (var i = 0 ; i < 5 ; i++) deck.draw_pile.push(define_modifier_card(false, "plus1"));
    for (var i = 0 ; i < 5 ; i++) deck.draw_pile.push(define_modifier_card(false, "minus1"));
    deck.draw_pile.push(define_modifier_card(false, "plus2"));
    deck.draw_pile.push(define_modifier_card(false, "minus2"));
    deck.draw_pile.push(define_modifier_card(true, "null"));
    deck.draw_pile.push(define_modifier_card(true, "double"));

    return deck;
}

function create_modifier_card(card_type)
{
    var card = document.createElement("div");
    card.className = "card modifier " + card_type + " down";
    return card;
}

function define_modifier_card(shuffle, card_type)
{
    var card_front = create_modifier_card(card_type);
    var card_back = create_modifier_card("back");

    var card = {
        ui:                     new UICard(card_front, card_back),
        card_type:              card_type,
        shuffle_next_round:     shuffle
    };

    return card
}

function remove_curse_from_deck(deck)
{
    if (deck.curse_count)
    {
        for (var i = 0; i < deck.draw_pile.length; i++)
        {
            if (deck.draw_pile[i].card_type == "curse")
            {
                deck.draw_pile.splice(i, 1);
                deck.curse_count--;
                repaint_modifier_deck(deck);
                write_value_deck_status(deck.curse_count, deck.bless_count);
                break;
            }
        }
    }
}

function remove_bless_from_deck(deck)
{
    if (deck.bless_count)
    {
        for (var i = 0; i < deck.draw_pile.length; i++)
        {
            if (deck.draw_pile[i].card_type == CardTypes.BLESS)
            {
                deck.draw_pile.splice(i, 1);
                deck.bless_count--;
                repaint_modifier_deck(deck);
                write_value_deck_status(deck.curse_count, deck.bless_count);
                break;
            }
        }
    }

}

function add_bless_to_deck(deck)
{
    deck.bless_count++;
    deck.draw_pile.push(define_modifier_card(false, CardTypes.BLESS));
    repaint_modifier_deck(deck);
    reshuffle(deck, include_discards = false);
    write_value_deck_status(deck.curse_count, deck.bless_count);
    document.getElementById("rmvblessbtn").disabled = false;
}

function add_curse_to_deck(deck)
{
    deck.curse_count++;
    deck.draw_pile.push(define_modifier_card(false, CardTypes.CURSE));
    repaint_modifier_deck(deck);
    reshuffle(deck, include_discards = false);
    write_value_deck_status(deck.curse_count, deck.bless_count);
    document.getElementById("rmvcursebtn").disabled = false;
}

function click_end_of_round(deck)
{
    if (deck.shuffle_end_of_round)
    {
        deck.clean_advantage_deck();
        reshuffle_modifier_deck(deck);
    }
}

function load_definition(card_database)
{
    var decks = {};
    for (var i = 0; i < card_database.length; i++)
    {
        var deck = load_skill_deck(card_database[i]);
        decks[deck.name] = deck;
    }
    return decks;
}

function write_value_deck_status(curses, blesses)
{
    var displaylabel = document.getElementById("displaylabel").childNodes[0];
    displaylabel.nodeValue="Curses in draw deck: " + curses +
                            "Blesses in draw deck: " + blesses;
    if (!curses)
    {
        document.getElementById("rmvcursebtn").disabled = true;
    }
    if (!blesses)
    {
        document.getElementById("rmvblessbtn").disabled = true;
    }
}

function apply_deck_selection(decks)
{
    var container = document.getElementById("tableau");
    var modifier_container = document.getElementById("topmenu");
    remove_child(container);
    remove_child(modifier_container);

    for (var i = 0; i < decks.length; i++)
    {
        var deck_space = document.createElement("div");
        deck_space.className = "card-container";
        container.appendChild(deck_space);

        var deck = decks[i];
        place_deck(deck, deck_space);
        reshuffle(deck);
        deck_space.onclick = draw_skill_card.bind(null, deck);

        deck.discard_deck = function()
        {
            container.removeChild(deck_space);
        }
    }

    add_modifier_deck(modifier_container);

    // Rescale card text if necessary
    refresh_ui();
}

function add_modifier_deck(container)
{
    var deck = load_modifier_deck(0,0);
    var attack_modifier_decks = document.createElement("div");
    attack_modifier_decks.id = "modifier-decks";
    var deck_space = document.createElement("div");
    deck_space.className = "card-container base";
    attack_modifier_decks.appendChild(deck_space);

    place_deck(deck, deck_space);
    reshuffle(deck);
    deck_space.onclick = draw_modifier_card.bind(null, deck);

    var advantage_deck =
    {
        name: "Monster modifier deck advantage",
        draw_pile: [],
        discard: []
    }

    var deck_space_advantage = document.createElement("div");
    deck_space_advantage.className = "card-container extra";
    deck_space_advantage.id = "advantageDeck";
    attack_modifier_decks.appendChild(deck_space_advantage);

    place_deck(advantage_deck, deck_space_advantage);
    deck_space_advantage.onclick = draw_modifier_card.bind(null, deck);
    deck.advantage_deck = advantage_deck;

    container.appendChild(attack_modifier_decks);

    create_top_menu_elements(container, deck);

    deck.discard_deck = function()
    {
        container.removeChild(deck_space);
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

function create_top_menu_elements(container, modifier_deck)
{
    var draw_two_div = document.createElement("div");
    var draw_two_button = create_button("button", "draw2button", "Draw 2 cards (advantage/disadvatage)");
    draw_two_div.appendChild(draw_two_button);
    draw_two_button.onclick = double_draw.bind(null, modifier_deck);
    container.appendChild(draw_two_div);

    var curse_button_div = document.createElement("div");
    var add_curse_button = create_button("button", "cursebtn", "Add curse");
    curse_button_div.appendChild(add_curse_button);
    add_curse_button.onclick = add_curse_to_deck.bind(null, modifier_deck);

    var remove_curse_button = create_button("button", "rmvcursebtn", "Remove curse");
    curse_button_div.appendChild(remove_curse_button);
    remove_curse_button.onclick = remove_curse_from_deck.bind(null, modifier_deck);
    remove_curse_button.disabled = true;

    container.appendChild(curse_button_div);

    var display_cards_added = document.createElement("label");
    display_cards_added.id = "displaylabel";
    display_cards_added.style = "inline";
    var display_text = document.createTextNode("");
    display_cards_added.appendChild(display_text);
    container.appendChild(display_cards_added);

    var bless_button_div = document.createElement("div");
    var add_bless_button = create_button("button", "blessbtn", "Add bless");
    bless_button_div.appendChild(add_bless_button);
    add_bless_button.onclick = add_bless_to_deck.bind(null, modifier_deck);

    var remove_bless_button = create_button("button", "rmvblessbtn", "Remove bless");
    bless_button_div.appendChild(remove_bless_button);
    remove_bless_button.onclick = remove_bless_from_deck.bind(null, modifier_deck);
    remove_bless_button.disabled = true;

    container.appendChild(bless_button_div);

    var end_of_round_button = create_button("button", "endofroundbtn", "End of round");
    container.appendChild(end_of_round_button);
    end_of_round_button.onclick = click_end_of_round.bind(null, modifier_deck);

    write_value_deck_status(0,0);
}

function create_deck_list(decks)
{
    var checkboxlist = []
    for (var deck_name in decks)
    {
        var label = document.createElement("label");
        var checkbox = create_input("checkbox", "deck", deck_name, deck_name);
        label.appendChild(checkbox);
        checkboxlist.push(label);
    }
    return checkboxlist;
}

function create_scenario_list(scenarios, decklist, retobj)
{
    var radiolist = []
    for (var i = 0; i < scenarios.length; i++)
    {
        var scenario = scenarios[i];
        var label = document.createElement("label");
        var radio = create_input("radio", "scenario", scenario.name, scenario.name);

        function update_retobj(decknames, e)
        {
            clear_list(retobj);
            var selected_decks = decknames.map( function(name) { return decklist[name]; } );
            selected_decks.map( function(deck) { retobj.push(deck); } );
        }

        radio.onchange = update_retobj.bind(null, scenario.decks);
        label.appendChild(radio);
        radiolist.push(label);
    }
    return radiolist;
}

function init()
{
    decks = load_definition(DECK_DEFINITONS);

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
