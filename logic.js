
var do_shuffles = true;

function UICard(front_element, back_element, initiative)
{
    var card = {};

    card.back = back_element;
    card.front = front_element;
	card.initiative = initiative;

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
            ui:             new UICard(card_front, card_back, initiative),
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

        tableau.style.fontSize = Math.min(scaled_font_size, base_font_size);
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

//function to draw all cards at once for the round (reshuffles are now automatic and not an additional click, otherwise it doesn't work...)
function draw_cards(decks)
{
	var container = document.getElementById("tableau");
var items = [];
   for(var i = 0; i < decks.length; i++){
	   var init = draw_card(decks[i]);
	   deckContainer = document.getElementById(decks[i].name);
	   container.removeChild(deckContainer);
	   items.push({el: deckContainer, initiative: init});
   }
   
   //sorting decks to show them in order of initiative.
   items.sort(function(a, b){
	  return a.initiative - b.initiative; 
   });
   //re-adding them in order
   for(var i = 0; i < items.length; i++){
	   container.appendChild(items[i].el);
   }
   
}


function draw_card(deck)
{
    if (must_reshuffle(deck))
    {
        reshuffle(deck);
    }
    
    
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
		
		return parseInt(card.ui.initiative);
    
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
    var container = document.getElementById("tableau");
    container.innerHTML = ""; // TODO use deck.discard_deck instead

	//no "Draw all" deck if there's only one deck!
    if(decks.length > 1){

		//deal with all decks together
		var deck_space = document.createElement("div");
		deck_space.className = "card-container";
		container.appendChild(deck_space);
		var card_back = create_card_back("draw all and sort initiative");
		card_back.className="card back up";
		deck_space.appendChild(card_back);
		deck_space.onclick = draw_cards.bind(null, decks);
	}
	
    for (var i = 0; i < decks.length; i++)
    {
		var deck = decks[i];
		
        var deck_space = document.createElement("div");
        deck_space.className = "card-container";
		deck_space.id = deck.name;
		container.appendChild(deck_space);

        place_deck(deck, deck_space);
        reshuffle(deck);
        deck_space.onclick = draw_card.bind(null, deck);

        deck.discard_deck = function()
        {
            container.removeChild(deck_space);
        }
    }
	
	

    // Rescale card text if necessary
    refresh_ui(decks);
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

