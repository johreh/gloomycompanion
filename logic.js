var do_shuffles = true;

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

        var card_front = create_skill_card_front(initiative, deck_definition.name, shuffle, lines);
        var card_back = create_skill_card_back(deck_definition.name);

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

function reshuffle(deck)
{
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

    shuffle_list(deck.draw_pile);

}

function shuffle_discards_in(deck)
{
  deck.draw_pile = deck.draw_pile.concat(deck.discard);
  deck.discard = [];
}

function must_reshuffle_abilities(deck)
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

function must_reshuffle_modifier(deck)
{
    if (!deck.draw_pile.length)
    {
        return true;
        deck.shuffle_end_of_the_turn = false;
        deck.end_of_round = false;
    } else if (deck.end_of_round)
      // Modifier decks should reshuffle when the end of round has been selected and they've seen 2x or Null cards.
        {
            deck.end_of_round = false;
            var should_shuffle = deck.shuffle_end_of_the_turn;
            deck.shuffle_end_of_the_turn = false;
            return should_shuffle;
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
        card.ui.set_depth(-3);
        card.ui.addClass("pull");
        card.ui.flip_up(true);

        card.ui.removeClass("draw");
        card.ui.addClass("discard");
        deck.discard.unshift(card);
}

function draw_skill_card(deck)
{
    if (must_reshuffle_abilities(deck))
    {
        shuffle_discards_in(deck);
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
    deck.discard[1].ui.removeClass("lift");
    deck.discard[0].ui.addClass("lift");
    deck.discard[0].ui.removeClass("pull");
  }
}

function repaint_modifier_deck(deck)
{
  // use discard... but it kills the deck!
  prevent_pull_animation(deck);
  clean_node(document.getElementById("topmenu").getElementsByClassName("card-container")[0]);
  place_deck(deck, document.getElementById("topmenu").getElementsByClassName("card-container")[0]);
}

function clean_discard_pile(deck)
{
  for (var i = 0; i < deck.discard.length; i++)
    {
      if (deck.discard[i].card_type == "bless"
          || deck.discard[i].card_type == "curse")
      {
        //Delete this curse/bless that has been used
        deck.discard.splice(i, 1);
        i--;
      }
    }
}

function draw_modifier_modifier(deck)
{
    if (must_reshuffle_modifier(deck))
    {
        clean_discard_pile(deck);
        shuffle_discards_in(deck);
        repaint_modifier_deck(deck);
        reshuffle(deck);
    }
    else
    {
        flip_up_top_card(deck);
        if (deck.discard[0].shuffle_next_round)
        {
            deck.shuffle_end_of_the_turn = true;
        }

        if (deck.discard[0].card_type == "bless")
        {
            deck.bless_count--;
            write_value_deck_status(deck.curse_count, deck.bless_count);
        }else if (deck.discard[0].card_type == "curse")
        {
            deck.curse_count--;
            write_value_deck_status(deck.curse_count, deck.bless_count);
        }
    }
}

function load_modifier_deck(number_bless, number_curses)
{

    var deck_state = {
        name: "Monster modifier deck",
        draw_pile: [],
        discard: [],
        bless_count: 0,
        curse_count: 0,
        shuffle_end_of_the_turn: false,
        end_of_round: false
    }

    //Start the Deck with the default values: Six +0, five +1, five -1 and a single +2, -2, 2x and Null card each.
    for (var i = 0 ; i < 6 ; i++) deck_state.draw_pile.push(define_modifier_card(false, "plus0"));
    for (var i = 0 ; i < 5 ; i++) deck_state.draw_pile.push(define_modifier_card(false, "plus1"));
    for (var i = 0 ; i < 5 ; i++) deck_state.draw_pile.push(define_modifier_card(false, "minus1"));
    deck_state.draw_pile.push(define_modifier_card(false, "plus2"));
    deck_state.draw_pile.push(define_modifier_card(false, "minus2"));
    deck_state.draw_pile.push(define_modifier_card(true, "null"));
    deck_state.draw_pile.push(define_modifier_card(true, "double"));

    return deck_state;
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
            if (deck.draw_pile[i].card_type == "bless")
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
    deck.draw_pile.push(define_modifier_card(false, "bless"));
    repaint_modifier_deck(deck);
    reshuffle(deck);
    write_value_deck_status(deck.curse_count, deck.bless_count);
    document.getElementById("rmvblessbtn").disabled = false;
}

function add_curse_to_deck(deck)
{
    deck.curse_count++;
    deck.draw_pile.push(define_modifier_card(false, "curse"));
    repaint_modifier_deck(deck);
    reshuffle(deck);
    write_value_deck_status(deck.curse_count, deck.bless_count);
    document.getElementById("rmvcursebtn").disabled = false;
}

function click_end_of_round(deck)
{
    deck.end_of_round = true;
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
    clean_node(container);
    clean_node(modifier_container);

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
    var deck_space = document.createElement("div");
    deck_space.className = "card-container";
    container.appendChild(deck_space);

    place_deck(deck, deck_space);
    reshuffle(deck);
    deck_space.onclick = draw_modifier_modifier.bind(null, deck);

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

function create_top_menu_elements(container, deck)
{
    var curse_button_div = document.createElement("div");
    var add_curse_button = create_button("button", "cursebtn", "Add curse");
    curse_button_div.appendChild(add_curse_button);
    add_curse_button.onclick = add_curse_to_deck.bind(null, deck);

    var remove_curse_button = create_button("button", "rmvcursebtn", "Remove curse");
    curse_button_div.appendChild(remove_curse_button);
    remove_curse_button.onclick = remove_curse_from_deck.bind(null, deck);
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
    add_bless_button.onclick = add_bless_to_deck.bind(null, deck);

    var remove_bless_button = create_button("button", "rmvblessbtn", "Remove bless");
    bless_button_div.appendChild(remove_bless_button);
    remove_bless_button.onclick = remove_bless_from_deck.bind(null, deck);
    remove_bless_button.disabled = true;

    container.appendChild(bless_button_div);

    var end_of_round_button = create_button("button", "endofroundbtn", "End of round");
    container.appendChild(end_of_round_button);
    end_of_round_button.onclick = click_end_of_round.bind(null, deck);

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