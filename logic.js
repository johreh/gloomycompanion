
var appstate = 
    { decks: []
    }

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

function must_reshuffle(deck)
{
    if (!deck.draw_pile.length)
    {
        return true;
    }
    else if (deck.discard.length)
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

        card = deck.draw_pile.pop();
        card.ui.flip(true);
        card.ui.set_position(discard_position);

        deck.discard.unshift(card);
    }
}

function load(card_database)
{
    var decks = [];
    for (var i = 0; i < card_database.length; i++)
    {
        var deck = load_deck(card_database[i]);
        decks.push(deck);
    }
    return decks;
}

function init()
{
    appstate.decks = load(DECKS);
    var mydeck = appstate.decks[0];
    place_deck(mydeck, document.body);
    reshuffle(mydeck);
    document.body.onclick = draw_card.bind(null, mydeck);
}

