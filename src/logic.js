import { DECKS, DECK_DEFINITIONS } from './cards'
import { CARD_TYPES_MODIFIER, MODIFIER_CARDS, MODIFIER_DECK } from './modifiers'
import { MONSTER_STATS } from "./monster_stats"
import { SCENARIO_DEFINITIONS, SPECIAL_RULES } from "./scenarios"
import * as macros from './macros'
import * as ui from './ui'
import * as util from './util'

//TODO Adding an extra Guard deck will reshuffle the first one, End of round with multiple Archers, resize text, worth to show common and elite_only attributes?, shield and retaliate only when shown (apparently, attribtues are active at the beginning of the turn, and active after initiative)
const do_shuffles = true;
const visible_ability_decks = [];
let modifier_deck = null;
const deck_definitions = load_definition(DECK_DEFINITIONS);

const DECK_TYPES =
    {
        MODIFIER: "modifier",
        ABILITY: "ability",
        BOSS: "boss"
    };

const EVENT_NAMES = {
    MODIFIER_CARD_DRAWN:            "modifierCardDrawn",
    MODIFIER_DECK_SHUFFLE_REQUIRED: "modfierDeckShuffleRequired"
};

function UICard(front_element, back_element) {
    const card = {};

    card.back = back_element;
    card.front = front_element;

    card.flip_up = function (faceup) {
        util.toggle_class(this.back, "up", !faceup);
        util.toggle_class(this.back, "down", faceup);

        util.toggle_class(this.front, "up", faceup);
        util.toggle_class(this.front, "down", !faceup);
    };

    card.set_depth = function (z) {
        z = z.toString();
        this.back.style.zIndex = z;
        this.front.style.zIndex = z;
    }

    card.push_down = function () {
        const backZIndex = parseInt(this.back.style.zIndex, 10);
        const frontZIndex = parseInt(this.front.style.zIndex, 10);
        this.back.style.zIndex = (backZIndex - 1).toString();
        this.front.style.zIndex = (frontZIndex - 1).toString();
    }

    card.addClass = function (class_name) {
        this.front.classList.add(class_name);
        this.back.classList.add(class_name);
    }

    card.removeClass = function (class_name) {
        this.front.classList.remove(class_name);
        this.back.classList.remove(class_name);
    }

    card.attach = function (parent) {
        parent.appendChild(this.back);
        parent.appendChild(this.front);
    }

    card.flip_up(false);

    return card;
}

function create_ability_card_back(name, level) {
    const card = document.createElement("div");
    card.className = "card ability back down";

    const name_span = document.createElement("span");
    name_span.className = "name";
    name_span.innerText = name + "-" + level;
    card.appendChild(name_span);

    return card;
}

function create_ability_card_front(initiative, name, shuffle, lines, attack, move, range, level, health) {
    const card = document.createElement("div");
    card.className = "card ability front down";

    const name_span = document.createElement("span");
    name_span.className = "name";
    name_span.innerText = name + "-" + level;
    card.appendChild(name_span);


	const healthNormal_span = document.createElement("span");
    healthNormal_span.className = "healthNormal";
    healthNormal_span.innerText = "HP " + health[0];
    card.appendChild(healthNormal_span);

	if ( health[1] > 0 ) {
		const healthElite_span = document.createElement("span");
		healthElite_span.className = "healthElite";
		healthElite_span.innerText = "HP " + health[1];
		card.appendChild(healthElite_span);
	}


    const initiative_span = document.createElement("span");
    initiative_span.className = "initiative";
    initiative_span.innerText = initiative;
    card.appendChild(initiative_span);

    if (shuffle) {
        const shuffle_img = document.createElement("img");
        shuffle_img.src = "images/shuffle.svg";
        card.appendChild(shuffle_img);
    }

    let current_depth = 0;
    let current_parent = card;

    lines = util.remove_empty_strings(lines);
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        let new_depth = 0;
        while (line.indexOf("*") >= 0) {
            new_depth += 1;
            line = line.substr(1);
        }
        const diff = new_depth - current_depth;

        while (current_depth !== new_depth) {
            if (diff > 0) {
                // Need one level lower, create <ul>
                const list = document.createElement("ul");
                // Dynamically adapt the size to the line length. I found this the sweet spot to read all the cards
                if (lines.length > 5) {
                    list.style.fontSize = (100 - (lines.length * 2.5)) + "%";
                }
                current_parent.appendChild(list);
                current_parent = list;

                // Create <li>
                const list_item = document.createElement("li");
                current_parent.appendChild(list_item);
                current_parent = list_item;

                current_depth += 1;
            }
            else {
                // Need to go up in the list, pop <li>
                current_parent = current_parent.parentElement;

                // pop <ul>
                current_parent = current_parent.parentElement;

                current_depth -= 1;
            }
        }

        if ((current_depth > 0) && (diff <= 0)) {
            // Same level, pop the previous <li>
            current_parent = current_parent.parentElement;

            // create sibling <li>
            const list_item = document.createElement("li");
            current_parent.appendChild(list_item);
            current_parent = list_item;
        }

        const text = macros.expand_string(line.trim(), attack, move, range);
        current_parent.insertAdjacentHTML("beforeend", text);
    }

    return card;
}

function load_ability_deck(deck_class, deck_name, level) {
    const deck_definition = deck_definitions[deck_class];
    deck_definition.name = deck_name;
    deck_definition.level = level;

    const loaded_deck = JSON.parse(util.get_from_storage(deck_name));


    const deck = {
        class: deck_definition.class,
        name: deck_definition.name,
        type: DECK_TYPES.ABILITY,
        draw_pile: [],
        discard: [],
        move: [0, 0],
        attack: [0, 0],
        range: [0, 0],
        level: deck_definition.level,
		health: [0,0]
    }

    for (let i = 0; i < deck_definition.cards.length; i++) {
        const definition = deck_definition.cards[i];
        const shuffle = definition[0];
        const initiative = definition[1];
        const lines = definition.slice(2);

        const empty_front = document.createElement("div");
        empty_front.className = "card ability front down";
        const card_front = empty_front;
        const card_back = create_ability_card_back(deck.name, deck.level);

        const card = {
            id: deck.name + '_' + i,
            ui: new UICard(card_front, card_back),
            shuffle_next: shuffle,
            initiative: initiative,
            starting_lines: lines,
        };

        card.paint_front_card = function (name, lines, attack, move, range, level, health) {
            this.ui.front = create_ability_card_front(this.initiative, name, this.shuffle_next, lines, attack, move, range, level, health);
        }
        if (loaded_deck && util.find_in_discard(loaded_deck.discard, card.id)) {
            deck.discard.push(card);
        } else {
            deck.draw_pile.push(card);
        }
    }
    deck.draw_top_discard = function() {
        if (this.discard.length > 0) {
            const card = this.discard[this.discard.length-1];
            let cards_lines = card.starting_lines;
            let extra_lines = [];
            if (this.is_boss()) {
                let new_lines = [];
                cards_lines.forEach(function (line) {
                    new_lines = new_lines.concat(macros.special_to_lines(line, deck.special1, deck.special2));
                });
                cards_lines = new_lines;
                if (this.immunities) {
                    extra_lines = extra_lines.concat(macros.immunities_to_lines(this.immunities));
                }
                if (this.notes) {
                    extra_lines = extra_lines.concat(macros.notes_to_lines(this.notes));
                }
            }
            else {
                if (this.attributes) {
                    extra_lines = extra_lines.concat(macros.attributes_to_lines(this.attributes));
                }

            }

            card.paint_front_card(this.get_real_name(), cards_lines.concat(extra_lines), this.attack, this.move, this.range, this.level, this.health);

            card.ui.set_depth(-3);
            card.ui.addClass("pull");
            card.ui.flip_up(true);
            card.ui.removeClass("draw");
            card.ui.addClass("discard");
        }
        force_repaint_deck(this);
    }

    deck.draw_top_card = function () {

        let cards_lines = this.draw_pile[0].starting_lines;
        let extra_lines = [];
        if (this.is_boss()) {
            let new_lines = [];
            cards_lines.forEach(function (line) {
                new_lines = new_lines.concat(macros.special_to_lines(line, deck.special1, deck.special2));
            });
            cards_lines = new_lines;
            if (this.immunities) {
                extra_lines = extra_lines.concat(macros.immunities_to_lines(this.immunities));
            }
            if (this.notes) {
                extra_lines = extra_lines.concat(macros.notes_to_lines(this.notes));
            }
        }
        else {
            if (this.attributes) {
                extra_lines = extra_lines.concat(macros.attributes_to_lines(this.attributes));
            }

        }

        this.draw_pile[0].paint_front_card(this.get_real_name(), cards_lines.concat(extra_lines), this.attack, this.move, this.range, this.level, this.health);
        force_repaint_deck(this);
    }

    deck.must_reshuffle = function () {
        if (!this.draw_pile.length) {
            return true;
        } else {
            if (do_shuffles && this.discard.length) {
                return this.discard[0].shuffle_next;
            }
        }
    }

    deck.set_stats_monster = function (stats) {
        this.attack = stats.attack;
        this.move = stats.move;
        this.range = stats.range;
        this.attributes = stats.attributes;
		this.health = stats.health;
    }

    deck.set_stats_boss = function (stats) {
        this.attack = stats.attack;
        this.move = stats.move;
        this.range = stats.range;
        this.special1 = stats.special1;
        this.special2 = stats.special2;
        this.immunities = stats.immunities;
        this.notes = stats.notes;
		this.health = stats.health;
    }

    deck.get_real_name = function () {
        return (this.name) ? this.name : this.class;
    }

    deck.is_boss = function () {
        return this.class === DECKS["Boss"].class;
    }

    deck.set_card_piles = function (draw_pile, discard_pile) {
        for (let i = 0; i < draw_pile.length; i++) {
            this.draw_pile[i].shuffle_next = draw_pile[i].shuffle_next;
            this.draw_pile[i].initiative = draw_pile[i].initiative;
            this.draw_pile[i].starting_lines = draw_pile[i].starting_lines;
        }
        for (let i = 0; i < discard_pile.length; i++) {
            this.discard[i].shuffle_next = discard_pile[i].shuffle_next;
            this.discard[i].initiative = discard_pile[i].initiative;
            this.discard[i].starting_lines = discard_pile[i].starting_lines;
        }
    }

    util.write_to_storage(deck.name, JSON.stringify(deck));
    return deck;

}

function place_deck(deck, container) {
    for (let i = 0; i < deck.draw_pile.length; i++) {
        const card = deck.draw_pile[i];
        card.ui.attach(container);
    }
    for (let i = 0; i < deck.discard.length; i++) {
        const card = deck.discard[i];
        card.ui.attach(container);
    }
    deck.deck_space = container;
}

function force_repaint_deck(deck) {
    prevent_pull_animation(deck);
    const space = deck.deck_space;
    util.remove_child(space);
    place_deck(deck, space);
}

// This should be dynamic dependant on lines per card
function refresh_ui() {
    const actual_card_height = 296;
    const base_font_size = 26.6;

    const tableau = document.getElementById("tableau");
    const cards = tableau.getElementsByClassName("card");
    for (let i = 1; i < cards.length; i++) {
        if (cards[i].className.indexOf("ability") !== -1) {
            const scale = cards[i].getBoundingClientRect().height / actual_card_height;
            const scaled_font_size = base_font_size * scale;

            const font_pixel_size = Math.min(scaled_font_size, base_font_size);
            tableau.style.fontSize = font_pixel_size + "px";
            break;
        }
    }
}

function reshuffle(deck, include_discards) {
    shuffle_deck(deck, include_discards);

    // This way we keep sync several decks from the same class
    visible_ability_decks.forEach(function (visible_deck) {
        if ((visible_deck !== deck) && (visible_deck.class === deck.class)) {
            shuffle_deck(visible_deck, include_discards);
            visible_deck.set_card_piles(deck.draw_pile, deck.discard);
        }
    });
}

function shuffle_deck(deck, include_discards) {
    if (include_discards) {
        deck.draw_pile = deck.draw_pile.concat(deck.discard);
        deck.discard = [];
    }

    util.shuffle_list(deck.draw_pile);

    for (let i = 0; i < deck.draw_pile.length; i++) {
        const card = deck.draw_pile[i];

        card.ui.removeClass("lift");
        card.ui.removeClass("pull");

        card.ui.flip_up(false);

        card.ui.removeClass("discard");
        card.ui.addClass("draw");

        card.ui.set_depth(-i - 6);
    }
}

function flip_up_top_card(deck) {
    for (let i = 0; i < deck.discard.length; i++) {
        const card = deck.discard[i];
        card.ui.removeClass("lift");
        card.ui.removeClass("pull");
        card.ui.push_down();
    }

    if (deck.discard.length > 0) {
        deck.discard[0].ui.addClass("lift");
    }

    const card = deck.draw_pile.shift();
    send_to_discard(card, true);
    deck.discard.unshift(card);
}

function send_to_discard(card, pull_animation) {
    card.ui.set_depth(-3);

    if (pull_animation) {
        card.ui.addClass("pull");
    }

    card.ui.flip_up(true);

    card.ui.removeClass("draw");
    card.ui.addClass("discard");
}

function draw_ability_card(deck) {

    if (deck.must_reshuffle()) {
        reshuffle(deck, true);
    }
    else {
        visible_ability_decks.forEach(function (visible_deck) {
            if (visible_deck.class === deck.class) {
                visible_deck.draw_top_card();
                flip_up_top_card(visible_deck);
            }
        });
    }
    util.write_to_storage(deck.name, JSON.stringify(deck));
}

function prevent_pull_animation(deck) {
    if (deck.discard.length) {
        if (deck.discard[1]) {
            deck.discard[1].ui.removeClass("lift");
            deck.discard[0].ui.addClass("lift");
        }

        deck.discard[0].ui.removeClass("pull");
    }
}

function reshuffle_modifier_deck(deck) {
    deck.clean_discard_pile();
    reshuffle(deck, true);
    document.body.dispatchEvent(new CustomEvent(EVENT_NAMES.MODIFIER_DECK_SHUFFLE_REQUIRED, { detail: { shuffle: false } }));
}

function draw_modifier_card(deck) {
    deck.clean_advantage_deck();

    if (deck.must_reshuffle()) {
        reshuffle_modifier_deck(deck);
    }
    else {
        flip_up_top_card(deck);

        document.body.dispatchEvent(new CustomEvent(
            EVENT_NAMES.MODIFIER_CARD_DRAWN,
            {
                detail: {
                    card_type: deck.discard[0].card_type,
                    count: deck.count(deck.discard[0].card_type)
                }
            }));

        if (deck.shuffle_end_of_round())
        {
            document.body.dispatchEvent(new CustomEvent(EVENT_NAMES.MODIFIER_DECK_SHUFFLE_REQUIRED, { detail: { shuffle: true } }));
        }
    }
    util.write_to_storage("modifier_deck", JSON.stringify(deck));
}

function double_draw(deck) {
    let advantage_card;
    // Case there was 1 card in draw_pile when we clicked "draw 2".
    //    now we should draw, save that card, reshuffle, and
    //    draw the next
    if (deck.draw_pile.length === 1) {
        draw_modifier_card(deck);
        advantage_card = deck.discard[0];
        reshuffle_modifier_deck(deck);
        advantage_card = deck.draw_pile.shift();
        send_to_discard(advantage_card, false);
        deck.discard.unshift(advantage_card);
        draw_modifier_card(deck);
    }
    // Case there were 0 cards in draw_pile when we clicked "draw 2".
    //    we should reshuffle, draw 1 and send it to advantage_place,
    //    draw the next
    else if (deck.draw_pile.length === 0) {
        // This is in case the previous draw was double as well
        deck.clean_advantage_deck();
        reshuffle_modifier_deck(deck);
        draw_modifier_card(deck);
        advantage_card = deck.discard[0];
        draw_modifier_card(deck);
    }
    // Every other simple case
    else {
        draw_modifier_card(deck);
        advantage_card = deck.discard[0];
        draw_modifier_card(deck);
    }
    deck.discard[0].ui.addClass("right");
    advantage_card.ui.addClass("left");
    deck.advantage_to_clean = true;
}

function load_modifier_deck() {
    const deck =
        {
            name: "Monster modifier deck",
            type: DECK_TYPES.MODIFIER,
            draw_pile: [],
            discard: [],
            advantage_to_clean: false
        }

    deck.draw_top_discard = function() {
        if (this.discard.length > 0) {
            const card = this.discard[this.discard.length-1];
            card.ui.set_depth(-3);
            card.ui.addClass("pull");
            card.ui.flip_up(true);
            card.ui.removeClass("draw");
            card.ui.addClass("discard");
        }
        force_repaint_deck(this);
    }

    deck.count = function (card_type) {
        return (this.draw_pile.filter(function (card) {
            return card.card_type === card_type;
        }).length);
    }.bind(deck);

    deck.remove_card = function (card_type) {
        for (let i = 0; i < deck.draw_pile.length; i++) {
            if (deck.draw_pile[i].card_type === card_type) {
                deck.draw_pile.splice(i, 1);
                reshuffle(deck, false);

                force_repaint_deck(deck);
                break;
            }
        }
        util.write_to_storage("modifier_deck", JSON.stringify(modifier_deck));

        return this.count(card_type);
    }.bind(deck);

    deck.add_card = function (card_type) {
        // Rulebook p. 23: "a maximum of only 10 curse [and 10 bless] cards can be placed into any one deck"
        if (this.count(card_type) < 10) {
            // TODO: Brittle
            deck.draw_pile.push(define_modifier_card(MODIFIER_CARDS[card_type.toUpperCase()]));

            force_repaint_deck(deck);
            reshuffle(deck, false);
        }
        util.write_to_storage("modifier_deck", JSON.stringify(modifier_deck));

        return this.count(card_type);
    }.bind(deck);

    deck.shuffle_end_of_round = function () {
        return this.discard.filter(function (card) {
                return card.shuffle_next_round;
            }).length > 0;
    }.bind(deck);

    deck.must_reshuffle = function () {
        return !this.draw_pile.length;
    }.bind(deck);

    deck.clean_discard_pile = function () {
        for (let i = 0; i < deck.discard.length; i++) {
            if (this.discard[i].card_type === CARD_TYPES_MODIFIER.BLESS
                || this.discard[i].card_type === CARD_TYPES_MODIFIER.CURSE) {
                //Delete this curse/bless that has been used
                this.discard.splice(i, 1);
                i--;
            }
        }

        // This is needed every time we update
        force_repaint_deck(this);
    }.bind(deck);

    deck.clean_advantage_deck = function () {
        if ((deck.advantage_to_clean) && deck.discard[1]) {
            deck.advantage_to_clean = false;
            deck.discard[0].ui.removeClass("right");
            deck.discard[0].ui.removeClass("left");
            deck.discard[1].ui.removeClass("left");
            deck.discard[1].ui.removeClass("left");
        }
    }.bind(deck);
    const loaded_deck = JSON.parse(util.get_from_storage("modifier_deck"));

    MODIFIER_DECK.forEach(function (card_definition) {
        const card = define_modifier_card(card_definition);
        if (loaded_deck && find_in_discard_and_remove(loaded_deck.discard,card.card_type)) {
            deck.discard.push(card);
        } else {
            deck.draw_pile.push(card);
        }
    });

    return deck;
}

function find_in_discard_and_remove(discard, card_type) {
    for (let i=0; i < discard.length; i++) {
        if (discard[i].card_type === card_type) {
            return discard.splice(i,1);
        }
    }
    return null;
}

function create_modifier_card_back() {
    const card = document.createElement("div");
    card.className = "card modifier back";

    return card;
}

function create_modifier_card_front(card_url) {
    const img = document.createElement("img");
    img.className = "cover";
    img.src = card_url;

    const card = document.createElement("div");
    card.className = "card modifier front";
    card.appendChild(img);

    return card;
}

function define_modifier_card(card_definition) {
    const card_front = create_modifier_card_front(card_definition.image);
    const card_back = create_modifier_card_back();

    const card = {
        ui: new UICard(card_front, card_back),
        card_type: card_definition.type,
        shuffle_next_round: card_definition.shuffle
    };

    return card;
}

function end_round() {
    if (modifier_deck.shuffle_end_of_round()) {
        modifier_deck.clean_advantage_deck();
        reshuffle_modifier_deck(modifier_deck);
    }
    util.write_to_storage("modifier_deck", JSON.stringify(modifier_deck));
}

function load_definition(card_database) {
    const decks = {};
    for (let i = 0; i < card_database.length; i++) {
        const definition = card_database[i];
        decks[definition.class] = definition;
    }

    return decks;
}

function get_monster_stats(name, level) {
    const attack = [MONSTER_STATS["monsters"][name]["level"][level]["normal"]["attack"],
        MONSTER_STATS["monsters"][name]["level"][level]["elite"]["attack"]
    ];
    const move = [MONSTER_STATS["monsters"][name]["level"][level]["normal"]["move"],
        MONSTER_STATS["monsters"][name]["level"][level]["elite"]["move"]
    ];
    const range = [MONSTER_STATS["monsters"][name]["level"][level]["normal"]["range"],
        MONSTER_STATS["monsters"][name]["level"][level]["elite"]["range"]
    ];
    const attributes = [MONSTER_STATS["monsters"][name]["level"][level]["normal"]["attributes"],
        MONSTER_STATS["monsters"][name]["level"][level]["elite"]["attributes"]
    ];

    const health =        [   MONSTER_STATS["monsters"][name]["level"][level]["normal"]["health"],
                            MONSTER_STATS["monsters"][name]["level"][level]["elite"]["health"]
                        ];

    return {"attack": attack, "move": move, "range": range, "attributes": attributes, "health": health};
}

function get_boss_stats(name, level) {
    name = name.replace("Boss: ", "");
    const attack = [MONSTER_STATS["bosses"][name]["level"][level]["attack"]];
    const move = [MONSTER_STATS["bosses"][name]["level"][level]["move"]];
    const range = [MONSTER_STATS["bosses"][name]["level"][level]["range"]];
    const special1 = MONSTER_STATS["bosses"][name]["level"][level]["special1"];
    const special2 = MONSTER_STATS["bosses"][name]["level"][level]["special2"];
    const immunities = MONSTER_STATS["bosses"][name]["level"][level]["immunities"];
    const notes = MONSTER_STATS["bosses"][name]["level"][level]["notes"];
	const health = [MONSTER_STATS["bosses"][name]["level"][level]["health"]];

    return {
        "attack": attack,
        "move": move,
        "range": range,
        "special1": special1,
        "special2": special2,
        "immunities": immunities,
        "notes": notes,
		"health":health
    }
}

function apply_deck_selection(decks, preserve_existing_deck_state) {
    const container = document.getElementById("tableau");
    document.getElementById("currentdeckslist").innerHTML = "";
    const decks_to_remove = visible_ability_decks.filter(function (visible_deck) {
        return !preserve_existing_deck_state || (decks.filter(function (deck) {
                return ((deck.name === visible_deck.name) && (deck.level === visible_deck.level))
            }).length === 0);
    });

    const decks_to_add = decks.filter(function (deck) {
        return !preserve_existing_deck_state || (visible_ability_decks.filter(function (visible_deck) {
                return ((deck.name === visible_deck.name) && (deck.level === visible_deck.level))
            }).length === 0);
    });

    if (!modifier_deck) {
        init_modifier_deck();
        add_modifier_deck(container, modifier_deck,preserve_existing_deck_state);
        if (preserve_existing_deck_state) {
            const loaded_modifier_deck = JSON.parse(util.get_from_storage("modifier_deck"));
            const curses = count_type("curse", loaded_modifier_deck);
            const blessings = count_type("bless", loaded_modifier_deck);
            for (let i =0; i < blessings; i++) {
                modifier_deck.add_card("bless");
            }
            for (let i =0; i < curses; i++) {
                modifier_deck.add_card("curse");
            }
            modifier_deck.draw_top_discard();

            document.body.dispatchEvent(new CustomEvent(EVENT_NAMES.MODIFIER_DECK_SHUFFLE_REQUIRED, { detail: { shuffle: modifier_deck.shuffle_end_of_round() } }));
        }
    }
    else if (!preserve_existing_deck_state) {
        container.removeChild(document.getElementById("modifier-container"));
        init_modifier_deck();
        add_modifier_deck(container, modifier_deck,preserve_existing_deck_state);
    }
    util.write_to_storage("modifier_deck", JSON.stringify(modifier_deck));

    decks_to_remove.forEach(function (deck) {
        deck.discard_deck();
    });

    decks_to_add.forEach(function (deck) {
        const deckid = deck.get_real_name().replace(/\s+/g, '');
        const deck_space = document.createElement("div");
        deck_space.id = deckid;
        deck_space.addEventListener('contextmenu', function(e) {
            this.className = "hiddendeck";
            e.preventDefault();
        }, false);
        deck_space.className = "card-container";
        deck_space.title = "Click to draw enemy ability";

        container.appendChild(deck_space);

        place_deck(deck, deck_space);
        reshuffle(deck, !preserve_existing_deck_state);
        if (preserve_existing_deck_state) {
            // TODO: NOOP?
        }
        deck_space.onclick = draw_ability_card.bind(null, deck);

        deck.discard_deck = function () {
            const index = visible_ability_decks.indexOf(this);

            if (index > -1) {
                visible_ability_decks.splice(index, 1);
            }

            container.removeChild(deck_space);
        };

        if (deck.is_boss()) {
            // We don't want stats if someone selects Boss on the deck tab
            if (deck.get_real_name() !== "Boss") {
                deck.set_stats_boss(get_boss_stats(deck.get_real_name(), deck.level));
            }
        } else {
            deck.set_stats_monster(get_monster_stats(deck.get_real_name(), deck.level));

        }
        reshuffle(deck);
        if (preserve_existing_deck_state) {
            deck.draw_top_discard();
        } else {
            force_repaint_deck(deck);
        }
        visible_ability_decks.push(deck);

        const currentdeckslist = document.getElementById("currentdeckslist");
        const list_item = document.createElement("li");
        list_item.className = "currentdeck";
        currentdeckslist.appendChild(list_item);
        const label = document.createElement("a");
        label.id = "switch-" + deckid;
        label.href = "#switch-" + deckid
        label.innerText = deck.get_real_name();
        label.title = "Click to show/hide deck";
        label.addEventListener("click", function(){
            const d = document.getElementById(this.id.replace("switch-",""));
            d.className = (d.className === "hiddendeck") ? "card-container" : "hiddendeck";
        }, false)
        list_item.appendChild(label);
    });

    // Rescale card text if necessary
    refresh_ui();
}

function init_modifier_deck() {
    modifier_deck = load_modifier_deck();
}

function count_type(type, deck) {
    let count = 0;
    if (deck) {
        for (let i = 0; i < deck.draw_pile.length; i++) {
            if (deck.draw_pile[i].card_type === type) {
                count++;
            }
        }
    }
    return count;
}

function add_modifier_deck(container, deck, preserve_discards) {
    function create_counter(card_type, increment_func, decrement_func, title) {
        function create_button(class_name, text, func, text_element) {
            const button = document.createElement("div");
            button.className = class_name + " button";
            button.innerText = text;

            button.onclick = function () {
                text_element.innerText = func(card_type);
            };

            return button;
        }

        const widget_container = document.createElement("div");
        widget_container.className = "counter-icon";
        widget_container.title = title;

        const background = document.createElement("div");
        background.className = "background " + card_type;
        widget_container.appendChild(background);

        const text_element = document.createElement("div");
        text_element.className = "icon-text";
        text_element.innerText = "0";

        widget_container.appendChild(create_button("decrement", "-", decrement_func, text_element));
        widget_container.appendChild(text_element);
        widget_container.appendChild(create_button("increment", "+", increment_func, text_element));

        document.body.addEventListener(EVENT_NAMES.MODIFIER_CARD_DRAWN, function (e) {
            if (e.detail.card_type === card_type) {
                text_element.innerText = e.detail.count;
            }
        });

        return widget_container;
    }

    function indicate_shuffle_required(e){
        if (e.detail.shuffle){
            window.setTimeout(function() { end_round_div.className = "counter-icon shuffle"; }, 400);
        }
        else{
            end_round_div.className = "counter-icon shuffle not-required";
        }
    }

    const modifier_container = document.createElement("div");
    modifier_container.className = "card-container";
    modifier_container.id = "modifier-container";

    const button_div = document.createElement("div");
    button_div.className = "modifier-deck-column-1";

    button_div.appendChild(create_counter("bless", deck.add_card, deck.remove_card, "Bless cards"));
    button_div.appendChild(create_counter("curse", deck.add_card, deck.remove_card, "Curse cards"));

    const end_round_div = document.createElement("div");
    end_round_div.className = "counter-icon shuffle not-required";
    end_round_div.onclick = end_round;
    end_round_div.title = "Click to end round and shuffle";

    document.body.addEventListener(EVENT_NAMES.MODIFIER_DECK_SHUFFLE_REQUIRED, indicate_shuffle_required);


    const deck_column = document.createElement("div");
    deck_column.className = "modifier-deck-column-2";

    const deck_space = document.createElement("div");
    deck_space.className = "card-container modifier";
    deck_space.title = "Click to draw one card";

    const draw_two_button = document.createElement("div");
    draw_two_button.className = "button draw-two";
    draw_two_button.onclick = double_draw.bind(null, modifier_deck);
    draw_two_button.title = "Click to draw two cards";

    deck_column.appendChild(deck_space);
    deck_column.appendChild(draw_two_button);
    deck_column.appendChild(end_round_div);

    modifier_container.appendChild(deck_column);
    modifier_container.appendChild(button_div);

    container.appendChild(modifier_container);

    place_deck(deck, deck_space);
    reshuffle(deck, !preserve_discards);
    deck_space.onclick = draw_modifier_card.bind(null, deck);
}

function LevelSelector(text, inline) {
    const max_level = 7;
    const level = {};
    level.html = inline ? document.createElement("span") : document.createElement("ul");
    level.html.className = "selectionlist";

    const listitem = inline ? document.createElement("label") : document.createElement("li");
    listitem.innerText = text;
    level.html.appendChild(listitem);

    const level_spinner = util.create_input("number", "scenario_number", "1", "");
    level_spinner.input.min = "0";
    level_spinner.input.max = max_level.toString();
    level.html.appendChild(level_spinner.input);
    level.spinner = level_spinner.input;

    level.get_selection = function () {
        return (this.spinner.value > max_level) ? max_level : this.spinner.value;
    }

    level.set_value = function (value) {
        this.spinner.value = (value > max_level) ? max_level : value;
    }

    return level;
}

function DeckList() {
    const decklist = {};
    decklist.ul = document.createElement("ul");
    decklist.ul.className = "selectionlist";
    decklist.checkboxes = {};
    decklist.level_selectors = {};
    decklist.global_level_selector = null;


    const listitem = document.createElement("li");
    const global_level_selector = new LevelSelector("Select global level ", true);
    listitem.appendChild(global_level_selector.html);
    decklist.global_level_selector = global_level_selector;

    const dom_dict = util.create_input("button", "applylevel", "Apply All", "");
    dom_dict.input.onclick = function () {
        for (let key in decklist.level_selectors) {
            decklist.level_selectors[key].set_value(decklist.global_level_selector.get_selection());
        }
    };
    listitem.appendChild(dom_dict.root);

    decklist.ul.appendChild(listitem);

    for (let key in DECKS) {
        const real_name = DECKS[key].name;
        const listitem = document.createElement("li");
        const dom_dict = util.create_input("checkbox", "deck", real_name, real_name);
        listitem.appendChild(dom_dict.root);

        const level_selector = new LevelSelector(" with level ", true);
        listitem.appendChild(level_selector.html);

        decklist.ul.appendChild(listitem);
        decklist.checkboxes[real_name] = dom_dict.input;
        decklist.level_selectors[real_name] = level_selector;
    }

    decklist.get_selection = function () {
        return util.dict_values(this.checkboxes).filter(util.is_checked).map(util.input_value);
    }

    decklist.get_selected_decks = function () {
        const selected_checkbox = this.get_selection();
        const selected_decks = util.concat_arrays(selected_checkbox.map(function (name) {
            const deck = ((name in DECKS) ? DECKS[name] : []);
            deck.level = decklist.level_selectors[name].get_selection();
            return deck;
        }.bind(this)));
        return selected_decks;
    }

    decklist.set_selection = function (selected_deck_names) {
        util.dict_values(this.checkboxes).forEach(function (checkbox) {
            checkbox.checked = false;
        });

        selected_deck_names.forEach(function (deck_names) {
            const checkbox = this.checkboxes[deck_names.name];
            if (checkbox) {
                checkbox.checked = true;
                decklist.level_selectors[deck_names.name].set_value(deck_names.level);
            }
        }.bind(this));
    }

    return decklist;
}

function ScenarioList(scenarios) {
    const scenariolist = {};
    scenariolist.ul = document.createElement("ul");
    scenariolist.ul.className = "selectionlist";
    scenariolist.spinner = null;
    scenariolist.decks = {};
    scenariolist.special_rules = {};
    scenariolist.level_selector = null;

    scenariolist.level_selector = new LevelSelector("Select level", false);

    scenariolist.ul.appendChild(scenariolist.level_selector.html);

    for (let i = 0; i < scenarios.length; i++) {
        const scenario = scenarios[i];
        scenariolist.decks[i] = scenario.decks;
        scenariolist.special_rules[i] = scenario.special_rules ? scenario.special_rules : "";
    }

    const listitem = document.createElement("li");
    listitem.innerText = "Select scenario number";
    scenariolist.ul.appendChild(listitem);

    const scenario_spinner = util.create_input("number", "scenario_number", "1", "");
    scenario_spinner.input.min = "1";
    scenario_spinner.input.max = scenarios.length;
    scenariolist.ul.appendChild(scenario_spinner.input);
    scenariolist.spinner = scenario_spinner.input;

    scenariolist.get_selection = function () {
        // We're using the scenario index that is zero-based, but the scenario list is 1-based
        const current_value = scenariolist.spinner.value - 1;
        return Math.min(current_value, scenarios.length + 1);
    }

    scenariolist.get_level = function (deck_name, special_rules) {

        const base_level = scenariolist.level_selector.get_selection();

        if ((special_rules.indexOf(SPECIAL_RULES.living_corpse_two_levels_extra) >= 0) && (deck_name === SPECIAL_RULES.living_corpse_two_levels_extra.affected_deck)) {
            return Math.min(7, (parseInt(base_level) + SPECIAL_RULES.living_corpse_two_levels_extra.extra_levels));
        } else {
            return base_level;
        }
    }

    scenariolist.get_scenario_decks = function () {
        return (this.decks[this.get_selection()].map(function (deck) {
            if (DECKS[deck.name]) {
                deck.class = DECKS[deck.name].class;
            } else if (deck.name.indexOf("Boss") !== -1) {
                deck.class = DECKS["Boss"].class;
            }
            deck.level = scenariolist.get_level(deck.name, scenariolist.get_special_rules());
            return deck;
        }));
    }

    scenariolist.get_special_rules = function () {
        return this.special_rules[this.get_selection()];
    }

    return scenariolist;
}

export function init() {
    const deckspage = document.getElementById("deckspage");
    const scenariospage = document.getElementById("scenariospage");
    const applydeckbtn = document.getElementById("applydecks");
    const applyscenariobtn = document.getElementById("applyscenario");
    const applyloadbtn = document.getElementById("applyload");
    const showmodifierdeck = document.getElementById("showmodifierdeck");

    const decklist = new DeckList();
    const scenariolist = new ScenarioList(SCENARIO_DEFINITIONS);

    deckspage.insertAdjacentElement("afterbegin", decklist.ul);
    scenariospage.insertAdjacentElement("afterbegin", scenariolist.ul);

    applydeckbtn.onclick = function () {
        localStorage.clear();
        const selected_deck_names = decklist.get_selected_decks();
        util.write_to_storage("selected_deck_names", JSON.stringify(selected_deck_names));
        const selected_decks = selected_deck_names.map(function (deck_names) {
            return load_ability_deck(deck_names.class, deck_names.name, deck_names.level);
        });
        apply_deck_selection(selected_decks, true);
        const showmodifierdeck_deckspage = document.getElementById("showmodifierdeck-deckspage");
        const modifier_deck_section = document.getElementById("modifier-container");
        if(!showmodifierdeck_deckspage.checked){
            modifier_deck_section.style.display = "none";
        }
        else{
            modifier_deck_section.style.display = "block";
        }
    };

    applyscenariobtn.onclick = function () {
        try { localStorage.clear(); } catch (e) { console.error('Local storage is required'); return; }
        const selected_deck_names = scenariolist.get_scenario_decks();
        util.write_to_storage("selected_deck_names", JSON.stringify(selected_deck_names));
        decklist.set_selection(selected_deck_names);
        const selected_decks = selected_deck_names.map(function (deck_names) {
            return load_ability_deck(deck_names.class, deck_names.name, deck_names.level);
        });
        apply_deck_selection(selected_decks, false);
        const modifier_deck_section = document.getElementById("modifier-container");
        if(!showmodifierdeck.checked){
            modifier_deck_section.style.display = "none";
        }
        else{
            modifier_deck_section.style.display = "block";
        }

        // assume user is ready to go, so hide the Settings menu
        ui.show_settingspane(ui.widgets.settingspane, ui.widgets.cancelarea, false);
    };

    applyloadbtn.onclick = function () {
        const selected_deck_names = JSON.parse(util.get_from_storage("selected_deck_names"));
        decklist.set_selection(selected_deck_names);
        const selected_decks = selected_deck_names.map(function (deck_names) {
            return load_ability_deck(deck_names.class, deck_names.name, deck_names.level);
        });
        apply_deck_selection(selected_decks, true);
        const modifier_deck_section = document.getElementById("modifier-container");
        if(!showmodifierdeck.checked){
            modifier_deck_section.style.display = "none";
        }
        else{
            modifier_deck_section.style.display = "block";
        }
    }

    window.onresize = refresh_ui.bind(null, visible_ability_decks);
}
