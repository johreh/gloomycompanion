var CardTypesModifier =
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
    { BLESS:  { 'type': CardTypesModifier.BLESS,  'shuffle': false, 'image': 'images/attack_mod_bless.jpg' }
    , CURSE:  { 'type': CardTypesModifier.CURSE,  'shuffle': false, 'image': 'images/attack_mod_curse.jpg' }
    , PLUS0:  { 'type': CardTypesModifier.PLUS0,  'shuffle': false, 'image': 'images/attack_mod_+0.jpg' }
    , PLUS1:  { 'type': CardTypesModifier.PLUS1,  'shuffle': false, 'image': 'images/attack_mod_+1.jpg' }
    , PLUS2:  { 'type': CardTypesModifier.PLUS2,  'shuffle': false, 'image': 'images/attack_mod_+2.jpg' }
    , MINUS1: { 'type': CardTypesModifier.MINUS1, 'shuffle': false, 'image': 'images/attack_mod_-1.jpg' }
    , MINUS2: { 'type': CardTypesModifier.MINUS2, 'shuffle': false, 'image': 'images/attack_mod_-2.jpg' }
    , NULL:   { 'type': CardTypesModifier.NULL,   'shuffle': false, 'image': 'images/attack_mod_null.jpg' }
    , DOUBLE: { 'type': CardTypesModifier.DOUBLE, 'shuffle': false, 'image': 'images/attack_mod_2x.jpg' }
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

