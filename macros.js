
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
                return ("%" + stat + "% " + value_normal + " / <span class='elite-color'>" + value_elite + "</span>");
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
                return ("%" + stat + "% " + value_normal + " / <span class='elite-color'>" + value_elite + "</span>");
            } else 
            {
                 return ("%" + stat + "% " + value_normal );
            }
      }
    }

    return s;
}

function attributes_to_lines(attributes)
{
    if (!attributes[0] && !attributes[1])
    {
        return [""];
    } else
    {
        // To make it more readable, group 3 elements in the same row abd naje them small
        var attributes_lines = ["* Attributes"];

        // Write common attributes in white
        var normal_attributes_lines = [""];
        var line = 0;
        for (var i=0; i<attributes[0].length; i++)
        {
            normal_attributes_lines[line] = normal_attributes_lines[line] ? normal_attributes_lines[line] + attributes[0][i] + ", " : attributes[0][i] + ", ";
            if ((i+1) % 3 == 0 )
            {
                line++;
            }
        }
        attributes_lines = attributes_lines.concat(normal_attributes_lines.map(function(line) { return line ? "** <span class='small'>" + line.replace(/(,\s$)/g, "") + "</span>" : "" }));

        // Write elite only attributes in Gold
        var elite_attributes_lines = [""];
        // TODO
        // In case we want to show Common and Elite only attributes
        // var elite_attributes = attributes[1].map(function(elite_attribute){
        //     return ((attributes[0].indexOf(elite_attribute) == -1) ? elite_attribute: "")
        // });
        line = 0;
        for (var i=0; i<attributes[1].length; i++)
        {
            elite_attributes_lines[line] = elite_attributes_lines[line] ? elite_attributes_lines[line] + attributes[1][i] + ", " : attributes[1][i] + ", ";
            if ((i+1) % 3 == 0 )
            {
                line++;
            }
        }
        attributes_lines = attributes_lines.concat(elite_attributes_lines.map(function(line) { console.log(line.replace(/(,\s$)/g, "")); return line ? "** <span class='small elite-color'>" + line.replace(/(,\s$)/g, "") + "</span>" : "";}));
        console.log(attributes_lines);

        return attributes_lines;
    }
}

function immunities_to_lines(immunities)
{
    if (!immunities)
    {
        return [""];
    } else
    {
        // To make it more readable, group 3 elements in the same row abd naje them small
        var immunities_lines = [""];
        var line = 0;
        for (var i=0; i<immunities.length; i++)
        {
            immunities_lines[line] = immunities_lines[line] ? immunities_lines[line] + immunities[i] + ", " : immunities[i] + ", ";
            if ((i+1) % 3 == 0 )
            {
                line++;
            }
        }
        var result = ["* Immunities"].concat(immunities_lines.map(function(line) { return "** <span class='small'>" + line.replace(/(,\s$)/g, "") + "</span>"}));
        return result;
    }
}

function expand_special(s, special_value)
{
    var value = "";
    return special_value.map(function(line){
        return ("* " + line);
    });
}

function special_to_lines(s, special1, special2)
{
    if (special1 && s.includes("Special 1"))
    {
        s = expand_special(s, special1);
    }
    if (special2 && s.includes("Special 2"))
    {
        s = expand_special(s, special2);
    }
    return s;
}

function expand_string(s, attack, move, range)
{
    s = expand_stat(s, "attack", attack);
    s = expand_stat(s, "move", move);
    s = expand_stat(s, "range", range);
    return s.replace(/%[^%]*%/gi, expand_macro);
}

