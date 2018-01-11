DECKS =
    {   "Ancient Artillery":  {name: "Ancient Artillery", class: "Ancient Artillery"}
    ,   "Bandit Archer":      {name: "Bandit Archer", class: "Archer"}
    ,   "Bandit Guard":       {name: "Bandit Guard", class: "Guard"}
    ,   "Black Imp":          {name: "Black Imp", class: "Imp"}
    ,   "Boss":               {name: "Boss", class: "Boss"}
    ,   "Cave Bear":          {name: "Cave Bear", class: "Cave Bear"}
    ,   "City Archer":        {name: "City Archer", class: "Archer"}
    ,   "City Guard":         {name: "City Guard", class: "Guard"}
    ,   "Cultist":            {name: "Cultist", class: "Cultist"}
    ,   "Deep Terror":        {name: "Deep Terror", class: "Deep Terror"}
    ,   "Earth Demon":        {name: "Earth Demon", class: "Earth Demon"}
    ,   "Flame Demon":        {name: "Flame Demon", class: "Flame Demon"}
    ,   "Forest Imp":         {name: "Forest Imp", class: "Imp"}
    ,   "Frost Demon":        {name: "Frost Demon", class: "Frost Demon"}
    ,   "Giant Viper":        {name: "Giant Viper", class: "Giant Viper"}
    ,   "Harrower Infester":  {name: "Harrower Infester", class: "Harrower Infester"}
    ,   "Hound":              {name: "Hound", class: "Hound"}
    ,   "Inox Archer":        {name: "Inox Archer", class: "Archer"}
    ,   "Inox Guard":         {name: "Inox Guard", class: "Guard"}
    ,   "Inox Shaman":        {name: "Inox Shaman", class: "Shaman"}
    ,   "Living Bones":       {name: "Living Bones", class: "Living Bones"}
    ,   "Living Corpse":      {name: "Living Corpse", class: "Living Corpse"}
    ,   "Living Spirit":      {name: "Living Spirit", class: "Living Spirit"}
    ,   "Lurker":             {name: "Lurker", class: "Lurker"}
    ,   "Night Demon":        {name: "Night Demon", class: "Night Demon"}
    ,   "Ooze":               {name: "Ooze", class: "Ooze"}
    ,   "Rending Drake":      {name: "Rending Drake", class: "Rending Drake"}
    ,   "Savvas Icestorm":    {name: "Savvas Icestorm", class: "Savvas Icestorm"}
    ,   "Savvas Lavaflow":    {name: "Savvas Lavaflow", class: "Savvas Lavaflow"}
    ,   "Spitting Drake":     {name: "Spitting Drake", class: "Spitting Drake"}
    ,   "Stone Golem":        {name: "Stone Golem", class: "Stone Golem"}
    ,   "Sun Demon":          {name: "Sun Demon", class: "Sun Demon"}
    ,   "Vermling Scout":   {name: "Vermling Scout", class: "Scout"}
    ,   "Vermling Shaman":    {name: "Vermling Shaman", class: "Shaman"}
    ,   "Wind Demon":         {name: "Wind Demon", class: "Wind Demon"}
};

DECK_DEFINITONS =
[
        { class: "Ancient Artillery"
        , cards:
            [ [false, "46", "* %attack% -1", "** %range% +2"]
            , [true,  "71", "* %attack% +0", "** %range% +0", "** All adjacent enemies suffer 2 damage"]
            , [true,  "71", "* %attack% +0", "** %range% +0", "** All adjacent enemies suffer 2 damage"]
            , [false, "37", "* %push% 1", "** Target all adjacent enemies", "* %attack% -1 %aoe-triangle-2-side%", "** %range% -1"]
            , [false, "37", "* %push% 1", "** Target all adjacent enemies", "* %attack% -1 %aoe-circle%", "** %range% -1"]
            , [false, "17", "* %push% 2", "** Target all adjacent enemies", "* %shield% 2", "* %attack% -2", "** %range% +0"]
            , [false, "95", "* %attack% +1","** %range% +0",]
            , [false, "46", "* %attack% -1 %aoe-triangle-2-side%", "** %range% +0","** %immobilize%"]
            ]
        },
        { class: "Archer"
        , cards:
            [ [false, "16", "* %move% +1", "* %attack% -1", "** %range% +0"]
            , [false, "31", "* %move% +0", "* %attack% +0", "** %range% +0"]
            , [false, "32", "* %move% +0", "* %attack% +1", "** %range% -1"]
            , [false, "44", "* %move% -1", "* %attack% +1", "** %range% +0"]
            , [false, "56", "* %attack% -1", "** %range% +0", "** %target% 2"]
            , [true,  "68", "* %attack% +1", "** %range% +1"]
            , [false, "14", "* %move% -1", "* %attack% -1", , "** %range% +0", "* <span class='small'> Create a 3 damage trap in an adjacent empty hex closest to an enemy </span>"]
            , [true,  "29", "* %move% +0", "* %attack% -1", "** %range% +1", "** %immobilize%"]
            ]
        },
        { class: "Boss"
        , cards:
            [ [false, "11", "* Special 2"]
            , [false, "14", "* Special 2"]
            , [true,  "17", "* Special 2"]
            , [true,  "85", "* Special 1"]
            , [false, "79", "* Special 1"]
            , [false, "73", "* Special 1"]
            , [false, "36", "* %move% +0", "* %attack% +0"]
            , [false, "52", "* %move% -1", "* %attack% -1", "** %range% 3", "** %target% 2"]
            ]
        },
        { class: "Cave Bear"
        , cards:
            [ [false, "13", "* %move% +1", "* %attack% -1"]
            , [false, "14", "* %move% -1", "* %attack% -1", "** %immobilize%"]
            , [true,  "34", "* %attack% +1", "** %wound%"]
            , [false, "41", "* %move% +0", "* %attack% +0"]
            , [false, "60", "* %move% -1", "* %attack% +1"]
            , [true,  "80", "* %attack% -1", "* %move% -2", "* %attack% -1", "** %wound%"]
            , [false, "61", "* %move% +0", "* %attack% -1", "** %target% 2"]
            , [false, "03", "* %shield% 1", "* %retaliate% 2", "* %heal% 2", "** Self"]
            ]
        },
        { class: "Cultist"
        , cards:
            [ [false, "10", "* %move% -1", "* %attack% -1", "* On Death:", "** %attack% +2 %aoe-circle-with-middle-black%"]
            , [false, "10", "* %move% -1", "* %attack% -1", "* On Death:", "** %attack% +2 %aoe-circle-with-middle-black%"]
            , [false, "27", "* %move% +0", "* %attack% +0"]
            , [false, "27", "* %move% +0", "* %attack% +0"]
            , [false, "39", "* %move% -1", "* %attack% +0", "* %heal% 1", "** Self"]
            , [true,  "63", "* Summon normal Living Bones", "* Cultist suffers 2 damage."]
            , [true,  "63", "* Summon normal Living Bones", "* Cultist suffers 2 damage."]
            , [false, "31", "* %move% -1", "* %heal% 3", "** %range% 3"]
            ]
        },
        { class: "Deep Terror"
        , cards:
            [ [false, "65", "* %attack% +0", "** %range% 3", "** %target% 3", "** %curse%"]
            , [true,  "60", "* %attack% +0 %aoe-line-6-with-black%", "** %pierce% 3"]
            , [true,  "60", "* %attack% +0 %aoe-line-6-with-black%", "** %pierce% 3"]
            , [false, "84", "* %attack% -1", "** Target all adjacent enemies", "* %attack% +0", "** %range% 4", "** %wound%"]
            , [false, "75", "* %attack% +0", "** %poison%", "* %attack% -1", "** %range% 5", "** %immobilize%"]
            , [false, "75", "* %attack% -2", "** Target all adjacent enemies", "** %disarm%", "* %attack% +0", "** %range% 3", "** %target% 2"]
            , [false, "96", "* %attack% -2", "** %range% 6", "** Summon normal Deep Terror in a hex adjacent to the target"]
            , [false, "54", "* %wound% and %poison%", "** Target all adjacent enemies", "* %attack% +0", "** %range% 4"]
            ]
        },
        { class: "Earth Demon"
        , cards:
            [ [true,  "40", "* %heal% 3", "** Self", "* %earth%%use_element%: <span class='small'>%immobilize% Target all enemies within %range% 3</span>"]
            , [true,  "42", "* %move% +1", "* %attack% -1"]
            , [false, "62", "* %move% +0", "* %attack% +0", "* %earth%"]
            , [false, "71", "* %attack% +0", "** %range% 4", "** %earth%%use_element%: %target% 2"]
            , [false, "83", "* %move% -1", "* %attack% +1", "* %earth%"]
            , [false, "93", "* %move% -1", "* %attack% -1", "** Target all adjacent enemies", "* %earth%%use_element%: %push% 1"]
            , [false, "79", "* %move% +1", "* %attack% +0", "** %air%%use_element%: -2 %attack%"]
            , [false, "87", "* %move% +0", "* %attack% -1 <div class='collapse'>%aoe-4-with-black%</div>", "* %any%%use_element%: %earth%"]
            ]
        },
        { class: "Flame Demon"
        , cards:
            [ [false, "03", "* %move% +1", "* %attack% -1", "** %range% +0","* %fire%"]
            , [false, "24", "* %move% +0", "* %attack% +0", "** %range% +0","* %fire%"]
            , [true,  "46", "* %attack% +0", "** %range% +0", "** %fire%%use_element%:  %aoe-circle%"]
            , [false, "49", "* %attack% +0 %aoe-line-3-with-black%", "** <table align='center'><tr><td>%fire%%use_element%:</td> <td> +1 %attack% <br\> %wound% </td> </tr> </table>"]
            , [false, "67", "* %move% -1", "* %attack% +1", "** %range% -1", "* %fire%"]
            , [false, "77", "* %attack% +0", "** Target all adjacent enemies", "** %ice%%use_element%:Flame Demon suffers 1 damage."]
            , [true,  "30", "* <table align='center'><tr> <td>  %fire%%use_element%: </td> <td> <span class='small'>All adjacent enemies<br/>suffer 2 damage.</span> </td> </tr> </table>", "* %move% +0", "* %attack% -2", "** %wound%","** %target% 2"]
            , [false, "08", "* %move% -1", "* <span class='small'> Create a 4 damage trap in an adjacent empty hex closest to an enemy </span>", "* %any%%use_element%: %fire%"]
            ]
        },
        { class: "Frost Demon"
        , cards:
            [ [false, "18", "* %immobilize%", "** Target all enemies within %range% 2", "* %ice%%use_element%: <span class='small'>%heal% 3<br/>Self</span>"]
            , [false, "38", "* %move% +1", "* %attack% -1"]
            , [false, "58", "* %move% +0", "* %attack% +0"]
            , [false, "58", "* %move% -1", "* %attack% +0" , "** %range% 2", "** %ice%%use_element%: +2 %attack%, +1 %range%"]
            , [true,  "78", "* %move% -1", "* %attack% +0 %aoe-triangle-2-side-with-black%", "* %ice%"]
            , [true,  "78", "* %move% -1", "* %attack% +0 %aoe-triangle-2-side-with-black%", "* %ice%"]
            , [false, "58", "* %move% -1", "* %attack% -1", "** %pierce% 3", "* %any%%use_element%: %ice%"]
            , [false, "18", "* %shield% 2", "* %move% +1", "* %fire%%use_element%: <span class='small'>Frost Demon suffers 1 damage</span>"]
            ]
        },
        { class: "Giant Viper"
        , cards:
            [ [true,  "32", "* %move% +0", "* %attack% +0", "** Add +2 Attack if the target is adjacent to any of the Giant Viper's allies."]
            , [true,  "32", "* %move% +0", "* %attack% +0", "** Add +2 Attack if the target is adjacent to any of the Giant Viper's allies."]
            , [false, "11", "* %shield% 1", "* %attack% -1"]
            , [false, "43", "* %move% +1", "** %jump%", "* %attack% -1", "** Target all adjacent enemies."]
            , [false, "58", "* %move% -1", "* %attack% +1"]
            , [false, "58", "* %move% +1", "** %jump%", "* %attack% -1", "** All attacks targeting Giant Viper this round gain Disadvantage."]
            , [false, "43", "* %move% -1", "** %jump%", "* %attack% +0", "** %target% 2"]
            , [false, "23", "* %move% -1", "* %attack% -1", "** %immobilize%", "* %attack% -1"]
            ]
        },
        { class: "Guard"
        , cards:
            [ [true,  "15", "* %shield% 1", "* %retaliate% 2"]
            , [false, "30", "* %move% +1", "* %attack% -1"]
            , [false, "35", "* %move% -1", "* %attack% +0", "** %range% 2"]
            , [false, "50", "* %move% +0", "* %attack% +0"]
            , [false, "50", "* %move% +0", "* %attack% +0"]
            , [false, "70", "* %move% -1", "* %attack% +1"]
            , [false, "55", "* %move% -1", "* %attack% +0", "* %strengthen%", "** Self"]
            , [true , "15", "* %shield% 1", "* %attack% +0", "** %poison%"]
            ]
        },
        { class: "Harrower Infester"
        , cards:
            [ [false, "38", "* %move% -1", "* %attack% +1", "** %target% 2"]
            , [false, "07", "* %move% +0", "* %attack% -1", "** %poison%", "* %dark%"]
            , [false, "16", "* %move% -1", "* %attack% -1", "* %heal% 5", "** Self"]
            , [false, "16", "* %attack% +2", "** %immobilize%", "* %retaliate% 2"]
            , [true,  "02", "* %shield% 2", "* %retaliate% 2", "** %range% 3"]
            , [false, "30", "* %move% -1", "* %attack% +0 %aoe-line-4-with-black%", "** %dark%%use_element%: Perform \"%heal% 2, Self\" </br>for each target damaged"]
            , [false, "38", "* %move% +0", "* %attack% -1", "** %target% 2", "** %dark%%use_element%: +2 %attack%, %disarm%"]
            , [true,  "07", "* %attack% -1", "** %range% 3", "** %muddle%", "* %heal% 4", "** Self"]
            ]
        },
        { class: "Hound"
        , cards:
            [ [false, "06", "* %move% -1", "* %attack% +0", "** %immobilize%"]
            , [false, "07", "* %move% +0", "* %muddle%", "** Target all adjacent enemies"]
            , [true,  "19", "* %move% +1", "* %attack% +0", "** Add +2 Attack if the target is adjacent to any of the Hound's allies"]
            , [true,  "19", "* %move% +1", "* %attack% +0", "** Add +2 Attack if the target is adjacent to any of the Hound's allies"]
            , [false, "26", "* %move% +0", "* %attack% +0"]
            , [false, "26", "* %move% +0", "* %attack% +0"]
            , [false, "83", "* %move% -2", "* %attack% +1"]
            , [false, "72", "* %attack% -1", "** %pierce% 2", "* %move% -2", "* %attack% -1", "** %pierce% 2"]
            ]
		},
        { class: "Imp"
        , cards:
            [ [false, "05", "* %shield% 5", "* %heal% 1", "** Self"]
            , [false, "37", "* %move% +0", "* %attack% +0","** %range% +0"]
            , [false, "37", "* %move% +0", "* %attack% +0","** %range% +0"]
            , [false, "42", "* %move% +1", "* %heal% 2", "** %range% 3"]
            , [true,  "43", "* %move% +0", "* %attack% -1", "** %range% +0, %target% 2, %poison%"]
            , [false, "76", "* %move% -1", "* %attack% +1", "** %range% +0",]
            , [true,  "43", "* %move% +0", "* %attack% -1", "** %range% +0, %target% 2, %curse%"]
            , [false, "24", "* %strengthen%", "** Affect all allies within %range% 2", "* %muddle%", "** Target all enemies within %range% 2"]
            ]
        },
        { class: "Living Bones"
        , cards:
            [ [false, "64", "* %move% -1", "* %attack% +1"]
            , [true,  "20", "* %move% -2", "* %attack% +0", "* %heal% 2", "** Self"]
            , [false, "25", "* %move% +1", "* %attack% -1"]
            , [false, "45", "* %move% +0", "* %attack% +0"]
            , [false, "45", "* %move% +0", "* %attack% +0"]
            , [false, "81", "* %attack% +2"]
            , [false, "74", "* %move% +0", "* %attack% +0", "** Target one enemy with all attacks"]
            , [true,  "12", "* %shield% 1", "* %heal% 2", "** Self"]
            ]
        },
        { class: "Living Corpse"
        , cards:
            [ [false, "21", "* %move% +1", "* %muddle% and %immobilize%", "** Target one adjacent enemy"]
            , [false, "47", "* %move% +1", "* %attack% -1"]
            , [true,  "66", "* %move% +0", "* %attack% +0"]
            , [true,  "66", "* %move% +0", "* %attack% +0"]
            , [false, "82", "* %move% -1", "* %attack% +1"]
            , [false, "91", "* %move% +1", "* Living Corpse suffers 1 damage."]
            , [false, "71", "* %move% +0", "* %attack% +1", "* %poison%", "** Target all adjacent enemies"]
            , [false, "32", "* %attack% +2", "** %push% 1", "* Living Corpse suffers 1 damage."]
            ]
        },
        { class: "Living Spirit"
        , cards:
            [ [true,  "22", "* %move% -1", "* %attack% -1", "** %range% +0", "** %muddle%"]
            , [true,  "33", "* %move% +0", "* %attack% -1", "** %range% +0", "** Target all enemies within range"]
            , [false, "48", "* %move% +0", "* %attack% +0", "** %range% +0"]
            , [false, "48", "* %move% +0", "* %attack% +0", "** %range% +0",]
            , [false, "61", "* %attack% +0", "** %range% -1", "** %target% 2"]
            , [false, "75", "* %move% -1", "* %attack% +1", "** %range% -1", "* %heal% 1", "** Self"]
            , [false, "55", "* %move% +0", "* %curse%", "** %range% +0", "** Target all enemies within range", "* %ice%"]
            , [false, "67", "* %move% -1", "* %attack% +1", "** %range% +0", "** %ice%%use_element%: %stun%"]
            ]
        },
        { class: "Lurker"
        , cards:
            [ [true,  "11", "* %shield% 1", "** %ice%%use_element%: %shield% 2 instead","* %wound%", "** Target all adjacent enemies"]
            , [false, "28", "* %move% +1", "* %attack% -1"]
            , [false, "38", "* %move% +0", "* %attack% +0"]
            , [false, "38", "* %move% +0", "* %attack% +0", "** Target one enemy with all attacks"]
            , [false, "61", "* %move% -1", "* %attack% +1"]
            , [false, "64", "* %attack% +1", "** Target all adjacent enemies"]
            , [false, "41", "* %ice%%use_element%: %strengthen%", "** Self", "* %move% +0", "* %attack% -1", "** %wound%"]
            , [true,  "23", "* %shield% 1", "* %move% +0", "* %attack% -1", "* %ice%"]
            ]
        },
        { class: "Night Demon"
        , cards:
            [ [false, "04", "* %move% +1", "* %attack% -1", "* %dark%"]
            , [false, "07", "* %move% +1", "* %attack% -1", "* %dark%%use_element%: %invisible%", "** Self"]
            , [false, "22", "* %move% +0", "* %attack% +0", "* %dark%"]
            , [false, "26", "* %attack% -2", "** %range% 3", "** %target% 3", "** %dark%%use_element%: %muddle%"]
            , [true,  "46", "* %move% -1", "* %attack% +1", "** %dark%%use_element%: +2 %attack%"]
            , [true,  "41", "* %move% -1", "* %attack% +1", "* %dark%"]
            , [false, "35", "* %attack% -1", "* %attack% -1", "** %pierce% 2", "* %light%%use_element%: %curse%", "** Self"]
            , [false, "15", "* %move% +0", "* %attack% -1", "* <span class='small'>All adjacent enemies and allies suffer 1 damage.</span>", "* <span class='small'>%any%%use_element%: %dark%</span>"]
            ]
        },
        { class: "Ooze"
        , cards:
          [ [false, "36", "* %move% +1", "* %attack% -1", "** %range% +0"]
            , [false, "57", "* %move% +0", "* %attack% +0", "** %range% +0"]
            , [false, "59", "* %attack% +0", "** %range% +0", "** %target% 2", "** %poison%"]
            , [false, "66", "* %move% -1", "* %attack% +1", "** %range% +1"]
            , [true,  "94", "* Ooze suffers 2 damage ", "** <span class='small'>Summons normal Ooze with a hit point value equal to the summoning Ooze's current hit point value (limited by a normal Ooze's specified maximum hit point value)</span>"]
            , [true,  "94", "* Ooze suffers 2 damage ", "** <span class='small'>Summons normal Ooze with a hit point value equal to the summoning Ooze's current hit point value (limited by a normal Ooze's specified maximum hit point value)</span>"]
            , [false, "85", "* %push% 1 and", "* %poison%", "** Target all adjacent enemies", "* %attack% +1", "** %range% -1"]
            , [false, "66", "* %move% -1", "* %loot% 1", "* %heal% 2", "** Self"]
            ]
        },
        { class: "Rending Drake"
        , cards:
            [ [false, "12", "* %move% +1", "* %attack% -1"]
            , [true,  "13", "* %attack% -1", "* %move% -1", "* %attack% -1"]
            , [false, "25", "* %move% +0", "* %attack% +0"]
            , [false, "39", "* %move% -1", "* %attack% +1"]
            , [false, "54", "* %move% -2", "* %attack% -1", "** %range% 3", "** %target% 2", "** %poison%"]
            , [false, "59", "* %move% -2", "* %attack% +1", "** %target% 2"]
            , [false, "06", "* %shield% 2", "* %heal% 2", "** Self", "* %strengthen%", "** Self"]
            , [true,  "72", "* %attack% -1", "* %attack% -1", "* %attack% -2"]
            ]
        },
        { class: "Savvas Icestorm"
        , cards:
            [ [false, "70", "* %push% 2", "** Target all adjacent enemies", "** %air%%use_element%: %push% 4 instead", "* %attack% +1", "** %range% +1"]
            , [false, "98", "* Summon normal Wind Demon", "* %air%"]
            , [false, "98", "* Summon normal Frost Demon", "* %ice%"]
            , [false, "19", "* %move% +0", "* %attack% -1", "** %range% -1", "* %shield% 1", "** Affect self and all allies within %range% 2", "* %ice%"]
            , [false, "14", "* %attack% +0", "** %range% +0", "** %ice%%use_element%: +2 %attack%, %immobilize%", "* %retaliate% 2", "* %air%"]
            , [false, "14", "* %shield% 4", "* %heal% 2", "** %range% 3", "** %ice%%use_element%: +3 %heal%", "* %air%%use_element%: %attack% +0"]
            , [true,  "47", "* %disarm%", "** Target all adjacent enemies", "* %move% +0", "* %attack% -1", "** %range% +0", "* %air%"]
            , [true,  "35", "* %move% -1", "* %attack% -1 %aoe-triangle-3-side-with-corner-black% ", "* %ice%"]
            ]
        },
        { class: "Savvas Lavaflow"
        , cards:
            [ [false, "97", "* Summon normal Flame Demon", "* %fire%"]
            , [false, "97", "* Summon normal Earth Demon", "* %earth%"]
            , [false, "22", "* %move% +1", "* %attack% -1", "** Target all adjacent enemies", "* %fire%%use_element%: %retaliate% 3"]
            , [true,  "68", "* %move% -1", "* %attack% +1", "** %range% 3", "** All allies and enemies adjacent to the target suffer 2 damage.", "* %earth%"]
            , [false, "41", "* %move% +0", "* %attack% -1 %aoe-line-4-with-black% ", "** %earth%%use_element%: +2 %attack%, %immobilize%"]
            , [false, "51", "* All enemies suffer 2 damage.", "* %fire%%use_element%: %wound% all enemies", "* %earth%%use_element%: %disarm% all enemies"]
            , [false, "31", "* %heal% 4", "** %range% 3", "** %earth%%use_element%: %target% 3"]
            , [true,  "68", "* %move% -1", "* %attack% -1", "** %range% 3", "** %target% 2", "* %fire%"]
            ]
        },
        { class: "Scout"
        , cards:
            [ [false, "29", "* %move% -1", "* %attack% -1", "** %range% 3"]
            , [false, "40", "* %move% +1", "* %attack% -1"]
            , [false,  "53", "* %move% +0", "* %attack% +0"]
            , [false,  "54", "* %move% -2", "* %attack% +0", "** %range% 3", "** %poison%"]
            , [false, "69", "* %move% -1", "* %attack% +1"]
            , [true, "92", "* %attack% +2", "** %poison% "]
            , [true, "35", "* %move% +1", "** %jump%", "* %loot% 1"]
            , [false, "79",  "* %attack% -1", "** %range% 4", "** %target% 2"]
            ]
        },
        { class: "Shaman"
        , cards:
            [ [false, "08", "* %move% +0", "* %attack% -1", "** %range% +0", "** %disarm%"]
            , [false, "08", "* %move% -1", "* %attack% +0", "** %range% +0", "** %immobilize%"]
            , [true,  "23", "* %move% +0", "* %heal% 3", "** %range% 3"]
            , [true,  "23", "* %move% +0", "* %heal% 3", "** %range% 3"]
            , [false, "62", "* %move% +0", "* %attack% +0", "** %range% +0"]
            , [false, "74", "* %move% -1", "* %attack% +1","** %range% +0"]
            , [false, "89", "* %move% -1", "* %heal% 1", "** Affect all adjacent allies", "* %bless%", "** Self"]
            , [false, "09", "* %move% +1", "* %attack% -1", "** %range% +0, %curse%, %target% 2"]
            ]
        },
        { class: "Spitting Drake"
        , cards:
          [ [false, "32", "* %move% +1", "* %attack% -1", "** %range% +0"]
            , [false, "52", "* %move% +0", "* %attack% +0", "** %range% +0"]
            , [true,  "57", "* %move% +0", "* %attack% -1 %aoe-triangle-2-side%", "** %range% +0"]
            , [false, "27", "* %attack% +0", "** %range% +0,  %target% 2, %poison%"]
            , [false, "87", "* %move% -1", "* %attack% +1", "** %range% +0"]
            , [false, "89", "* %attack% -2", "** %range% +0", "** %stun%"]
            , [false, "06", "* %shield% 2", "* %heal% 2", "** Self", "* %strengthen%", "** Self"]
            , [true,  "89", "* %move% -1", "* %attack% -2 %aoe-circle%", "** %range% +0", "** %poison%"]
            ]
        },
        { class: "Stone Golem"
        , cards:
            [ [false, "11", "* %retaliate% 3", "** %range% 3"]
            , [false, "28", "* %move% +1", "* %attack% +0", "* Stone Golem suffers 1 damage."]
            , [true,  "51", "* %move% +1", "* %attack% -1"]
            , [false, "65", "* %move% +0", "* %attack% +0"]
            , [false, "72", "* %attack% +1", "** %range% 3", "* Stone Golem suffers 2 damage"]
            , [true,  "90", "* %move% -1", "* %attack% +1"]
            , [false, "28", "* %move% +1", "* %attack% -2", "** %range% 3", "* %pull% 2", "** %immobilize%"]
            , [false, "83", "* %move% +0", "* %attack% -1", "** Target all adjacent enemies"]
            ]
        },
        { class: "Sun Demon"
        , cards:
            [ [true,  "17", "* %heal% 3", "** %range% 3", "** %light%%use_element%: Target all allies within range"]
            , [false, "36", "* %move% +0", "* %attack% +0", "** Target all adjacent enemies", "* %light%"]
            , [false, "36", "* %move% +0", "* %attack% +0", "** Target all adjacent enemies", "* %light%"]
            , [false, "68", "* %move% +0", "* %attack% +1", "* %light%"]
            , [true,  "73", "* %move% +0", "* %attack% +1", "* %light%%use_element%: %heal% 3", "** Self"]
            , [false, "95", "* %move% -1", "* %attack% +0", "** %range% 4", "** %light%%use_element%: Target all enemies within range"]
            , [false, "88", "* %move% -1", "* %attack% -1", "** Target all adjacent enemies", "* %dark%%use_element%: %muddle%", "** Self"]
            , [false, "50", "* %move% +0", "* %attack% +0", "** %range% 3", "* %any%%use_element%: %light%"]
            ]
        },
        { class: "Wind Demon"
        , cards:
          [ [false, "09", "* %attack% -1", "** %range% +0", "* %heal% 1", "** Self", "* %air%%use_element%: %invisible%<br/><span class='small'>Self</span>"]
            , [true,  "21", "* %move% +0", "* %attack% +0", "** %range% +0, %pull% 1", "* %air%"]
            , [true,  "21", "* %move% +0", "* %attack% +0", "** %range% +0, %pull% 1", "* %air%"]
            , [false, "29", "* %move% +0", "* %attack% -1", "** %range% +0, %target% 2", "** %air%%use_element%: %push% 2"]
            , [false, "37", "* %move% +0", "* %attack% +0 <div style='display: inline-block; width: 0; margin-top: -1.5em; vertical-align: bottom'>%aoe-4-with-black%</div>", "** %air%%use_element%: +1 Attack <div style='display: inline-block; margin-right: -3em'>%aoe-circle-with-side-black%</div>"]
            , [false, "43", "* %move% -1", "* %attack% +1", "** %range% +0", "** %air%%use_element%: %target% 2"]
            , [false, "43", "* %push% 1", "** Target all adjacent enemies", "* %attack% +0", "** %range% +0", "** %earth%%use_element%: -2 %range%"]
            , [false, "02", "* %shield% 1", "* %move% -1", "* %attack% -1", "** %range% +0", "* %any%%use_element%: %air%"]
            ]
        }
];
