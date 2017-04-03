
/* Macros used in card text, alphabetical order */
MACROS =
    { "%air%":                                      "<img class='element' src='images/air.svg'>"
    , "%any%":                                      "<img class='element' src='images/any_element.svg'>"
    , "%aoe-4-with-black%":                         "<img class='aoe h2' src='images/aoe-4-with-black.svg'>"
    , "%aoe-circle%":                               "<div class='collapse'><img class='aoe h3' src='images/aoe-circle.svg'></div>"
    , "%aoe-circle-with-middle-black%":             "<div class='collapse'><img class='aoe h3' src='images/aoe-circle-with-middle-black.svg'></div>"
    , "%aoe-circle-with-side-black%":               "<img class='aoe h3' src='images/aoe-circle-with-side-black.svg'>"
    , "%aoe-line-3-with-black%":                    "<div class='collapse'><img class='aoe h1 rotated' src='images/aoe-line-3-with-black.svg'></div>"
    , "%aoe-line-4-with-black%":                    "<div class='collapse'><img class='aoe h1 rotated' src='images/aoe-line-4-with-black.svg'></div>"
    , "%aoe-line-6-with-black%":                    "<img class='aoe h6 right-aligned' src='images/aoe-line-6-with-black.svg'></div>"
    , "%aoe-triangle-2-side%":                      "<div class='collapse'><img class='aoe h2' src='images/aoe-triangle-2-side.svg'></div>"
    , "%aoe-triangle-2-side-with-black%":           "<div class='collapse'><img class='aoe h2' src='images/aoe-triangle-2-side-with-black.svg'></div>"
    , "%aoe-triangle-3-side-with-corner-black%":    "<div class='collapse'><img class='aoe h3' src='images/aoe-triangle-3-side-with-corner-black.svg'></div>"
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

function expand_stat(s, stat, value)
{
    var re = new RegExp("%" + stat + "% (\\+|-)(\\d)+", "i");
    var found = s.match(re);
    var has_elite_value = (value.length == 2);
    if (found) {
      if (found[1] == "+")
      {
            var value_normal = value[0] + parseInt(found[2]);
            if (has_elite_value)
            {
                var value_elite = value[1] + parseInt(found[2]);
                return ("%" + stat + "% " + value_normal + " / " + value_elite);
            } else 
            {
                 return ("%" + stat + "% " + value_normal );
            }
      } else if (found[1] == "-")
      {
            var value_normal = value[0] - parseInt(found[2]);
            if (has_elite_value)
            {
                var value_elite = value[1] - parseInt(found[2]);
                return ("%" + stat + "% " + value_normal + " / " + value_elite);
            } else 
            {
                 return ("%" + stat + "% " + value_normal );
            }
      }
    }

    return s;
}

function attributes_to_lines(attribtues)
{
    var value = "";
    attribtues.forEach(function(line){
        value = value + "* " + line + "\n";
    });

    return value.replace(/\n$/, "");
}

function immunities_to_lines(immunities)
{
    var value = "* Immunities";
    immunities.forEach(function(line){
        value = value + "** " + line + "\n";
    });

    return value.replace(/\n$/, "");
}

function expand_special(s, special_value)
{
    var value = "";
    special_value.forEach(function(line){
        value = value + "* " + line + "\n";
    });

    return value.replace(/\n$/, "");
}

function replace_specials(s, special1, special2)
{
    if (special1 && s.includes("Special 1"))
    {
        s = expand_special(s, special1);
    }
    if (special2 && s.includes("Special 1"))
    {
        s = expand_special(s, special2);
    }
    return s;
}

function expand_string(s, attack, move, special1, special2)
{
    s = expand_stat(s, "attack", attack);
    s = expand_stat(s, "move", move);
    return s.replace(/%[^%]*%/gi, expand_macro);
}

function expand_boss_stirng(s, special1, special2)
{

}
