
var appstate = 
    { decks: []
    }

var FLIP_SPEED = 0.2

function UICard(front_img, back_img)
{
    var card = {};

    card.back = back_img;
    card.front = front_img;

    card.flipup = function(target_position)
    {
        this.set_faceup(false);
        this.pop_up();

        this.back.style.transitionProperty = "left, top, transform";
        this.back.style.transitionDuration = [FLIP_SPEED * 2 + "s", FLIP_SPEED * 2 + "s", FLIP_SPEED + "s"].join();
        this.back.style.transitionTimingFunction = "ease";
        this.back.style.transitionDelay = 0;

        this.front.style.transitionProperty = "left, top, transform";
        this.front.style.transitionDuration = [FLIP_SPEED * 2 + "s", FLIP_SPEED * 2 + "s", FLIP_SPEED + "s"].join();
        this.front.style.transitionTimingFunction = "ease";
        this.front.style.transitionDelay = ["0s", "0s", FLIP_SPEED + "s"].join();

        this.set_position(target_position);
        this.back.style.transform = "rotateY(90deg)";
        this.front.style.transform = "rotateY(0deg)";
    };

    card.set_position = function(position)
    {
        this.back.style.left = position.x;
        this.back.style.top = position.y;
        this.front.style.left = position.x;
        this.front.style.top = position.y;
    };

    card.set_faceup = function(faceup)
    {
        this.back.style.transition = "";
        this.back.style.transform = faceup ? "rotateY(90deg)" : "";

        this.front.style.transition = "";
        this.front.style.transform = faceup ? "" : "rotateY(90deg)";
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

    card.set_faceup(false);
    card.push_down();

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
    placeholder.style.visibility = "hidden";
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

function reshuffle(deck)
{
    deck.draw_pile = [].concat(deck.draw_pile, deck.discard);
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

function draw_card(deck)
{
    if (!deck.draw_pile.length)
    {
        reshuffle(deck);
        straighten_deck(deck);
    }

    var discard_position = get_absolute_position(deck.discard_placeholder);

    for (var i = 0; i < deck.discard.length; i++)
    {
        deck.discard[i].ui.push_down();
    }

    var card = deck.draw_pile.pop();
    card.ui.flipup(discard_position);

    deck.discard.push(card);
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
    straighten_deck(mydeck);
    document.body.onclick = draw_card.bind(null, mydeck);
}

