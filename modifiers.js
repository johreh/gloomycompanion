var CARD_TYPES_MODIFIER =
{
    BLESS:  "bless",
    CURSE:  "curse",
    PLUS0:  "plus0",
    PLUS1:  "plus1",
    PLUS2:  "plus2",
    MINUS1: "minus1",
    MINUS2: "minus2",
    NULL:   "null",
    DOUBLE: "double"
};

var MODIFIER_CARDS =
    { BLESS:  { 'type': CARD_TYPES_MODIFIER.BLESS,  'shuffle': false, 'coolness': 10, 'image': 'images/attack_mod_bless.jpg' }
    , CURSE:  { 'type': CARD_TYPES_MODIFIER.CURSE,  'shuffle': false, 'coolness': 0, 'image': 'images/attack_mod_curse.jpg' }
    , PLUS0:  { 'type': CARD_TYPES_MODIFIER.PLUS0,  'shuffle': false, 'coolness': 5, 'image': 'images/attack_mod_+0.jpg' }
    , PLUS1:  { 'type': CARD_TYPES_MODIFIER.PLUS1,  'shuffle': false, 'coolness': 6, 'image': 'images/attack_mod_+1.jpg' }
    , PLUS2:  { 'type': CARD_TYPES_MODIFIER.PLUS2,  'shuffle': false, 'coolness': 7, 'image': 'images/attack_mod_+2.jpg' }
    , MINUS1: { 'type': CARD_TYPES_MODIFIER.MINUS1, 'shuffle': false, 'coolness': 4, 'image': 'images/attack_mod_-1.jpg' }
    , MINUS2: { 'type': CARD_TYPES_MODIFIER.MINUS2, 'shuffle': false, 'coolness': 3, 'image': 'images/attack_mod_-2.jpg' }
    , NULL:   { 'type': CARD_TYPES_MODIFIER.NULL,   'shuffle': true,  'coolness': 0, 'image': 'images/attack_mod_null.jpg' }
    , DOUBLE: { 'type': CARD_TYPES_MODIFIER.DOUBLE, 'shuffle': true,  'coolness': 10, 'image': 'images/attack_mod_2x.jpg' }
    };

var MODIFIER_DECK =
    [ MODIFIER_CARDS.PLUS0,
    , MODIFIER_CARDS.PLUS0,
    , MODIFIER_CARDS.PLUS0,
    , MODIFIER_CARDS.PLUS0,
    , MODIFIER_CARDS.PLUS0,
    , MODIFIER_CARDS.PLUS0,
    , MODIFIER_CARDS.PLUS1,
    , MODIFIER_CARDS.PLUS1,
    , MODIFIER_CARDS.PLUS1,
    , MODIFIER_CARDS.PLUS1,
    , MODIFIER_CARDS.PLUS1,
    , MODIFIER_CARDS.MINUS1,
    , MODIFIER_CARDS.MINUS1,
    , MODIFIER_CARDS.MINUS1,
    , MODIFIER_CARDS.MINUS1,
    , MODIFIER_CARDS.MINUS1,
    , MODIFIER_CARDS.PLUS2,
    , MODIFIER_CARDS.MINUS2,
    , MODIFIER_CARDS.NULL,
    , MODIFIER_CARDS.DOUBLE,
    ];