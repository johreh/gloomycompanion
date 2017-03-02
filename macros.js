
/* Macros used in card text, alphabetical order */
MACROS =    
    { "%air%":                                      "<img class='element' src='images/air.svg'>"
    , "%any%":                                      "<img class='element' src='images/any_element.svg'>"
    , "%aoe-4-with-black%":                         "<span class='nobr'> <img class='big-icon' src='images/aoe-4-with-black.svg'></span>"
    , "%aoe-circle%":                               "<span class='nobr'> <img class='big-icon' src='images/aoe-circle.svg'></span>"
    , "%aoe-circle-with-middle-black%":             "<span class='nobr'> <img class='big-icon' src='images/aoe-circle-with-middle-black.svg'></span>"
    , "%aoe-circle-with-side-black%":               "<span class='nobr'> <img class='big-icon' src='images/aoe-circle-with-side-black.svg'></span>"
    , "%aoe-line-3-with-black%":                    "<span class='nobr'> <img class='icon' src='images/aoe-line-3-with-black.svg'></span>"
    , "%aoe-line-4-with-black%":                    "<span class='nobr'> <img class='icon' src='images/aoe-line-4-with-black.svg'></span>"
    , "%aoe-line-6-with-black%":                    "<span class='nobr'> <img class='big-icon' src='images/aoe-line-6-with-black.svg'></span>"
    , "%aoe-triangle-2-side%":                      "<span class='nobr'> <img class='big-icon' src='images/aoe-triangle-2-side.svg'></span>"
    , "%aoe-triangle-2-side-with-black%":           "<span class='nobr'> <img class='big-icon' src='images/aoe-triangle-2-side-with-black.svg'></span>"
    , "%aoe-triangle-3-side-with-corner-black%":    "<span class='nobr'> <img class='big-icon' src='images/aoe-triangle-3-side-with-corner-black.svg'></span>"
    , "%attack%":                                   "<span class='nobr'>Attack <img class='icon' src='images/attack.svg'></span>"
    , "%bless%":                                    "<span class='nobr'>BLESS <img class='icon' src='images/bless.svg'></span>"
    , "%curse%":                                    "<span class='nobr'>CURSE <img class='icon' src='images/curse.svg'></span>"
    , "%dark%":                                     "<img class='element' src='images/dark.svg'>"
    , "%disarm%":                                   "<span class='nobr'>DISARM <img class='icon' src='images/disarm.svg'></span>"
    , "%earth%":                                    "<img class='element' src='images/earth.svg'>"
    , "%fire%":                                     "<img class='element' src='images/fire.svg'>"
    , "%heal%":                                     "<span class='nobr'>Heal <img class='icon' src='images/heal.svg'></span>"
    , "%ice%":                                      "<img class='element' src='images/ice.svg'>"
    , "%immobilize%":                               "<span class='nobr'>IMMOBILIZE <img class='icon' src='images/immobilize.svg'></span>"
    , "%invisible%":                                "<span class='nobr'>INVISIBLE <img class='icon' src='images/invisibility.svg'></span>"
    , "%jump%":                                     "<span class='nobr'>Jump <img class='icon' src='images/jump.svg'></span>"
    , "%light%":                                    "<img class='element' src='images/light.svg'>"
    , "%loot%":                                     "<span class='nobr'>Loot <img class='icon' src='images/loot.svg'></span>"
    , "%move%":                                     "<span class='nobr'>Move <img class='icon' src='images/move.svg'></span>"
    , "%muddle%":                                   "<span class='nobr'>MUDDLE <img class='icon' src='images/muddle.svg'></span>"
    , "%pierce%":                                   "<span class='nobr'>PIERCE <img class='icon' src='images/pierce.svg'></span>"
    , "%poison%":                                   "<span class='nobr'>POISON <img class='icon' src='images/poison.svg'></span>"
    , "%pull%":                                     "<span class='nobr'>PULL <img class='mirrored icon' src='images/push.svg'></span>"
    , "%push%":                                     "<span class='nobr'>PUSH <img class='icon' src='images/push.svg'></span>"
    , "%range%":                                    "<span class='nobr'>Range <img class='icon' src='images/range.svg'></span>"
    , "%retaliate%":                                "<span class='nobr'>Retaliate <img class='icon' src='images/retaliate.svg'></span>"
    , "%shield%":                                   "<span class='nobr'>Shield <img class='icon' src='images/shield.svg'></span>"
    , "%strengthen%":                               "<span class='nobr'>STRENGTHEN <img class='icon' src='images/strengthen.svg'></span>"
    , "%stun%":                                     "<span class='nobr'>STUN <img class='icon' src='images/stun.svg'></span>"
    , "%target%":                                   "<span class='nobr'>Target <img class='icon' src='images/target.svg'></span>"
    , "%use_element%":                              "<img class='element overlay' src='images/use_element.svg'>"
    , "%wound%":                                    "<span class='nobr'>WOUND <img class='icon' src='images/wound.svg'></span>"
    };

function expand_macro(macro)
{
    var key = macro.toLowerCase();
    if (key in MACROS)
    {
        return MACROS[key];
    }
    else
    {
        return macro;
    }
}

function expand_string(s)
{
    return s.replace(/%[^%]*%/gi, expand_macro);
}

/* Types of AOE
*   4-with-black
*   circle-with-side-black circle circle-with-middle-black
*   2-side-triangle 2-side-triangle-with-black
*   3-side-triangle-with-corner-black
*   4-line-with-black 6-line-with-black
*/