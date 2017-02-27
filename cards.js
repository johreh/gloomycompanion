// Taking the examples from http://imgur.com/a/S2sUn
// TODO: Monster missing which need something extra
//      Savvas Lavaflow: Negate element, line AOE
//      Savvas Icestorm: Negate element, big triangle AOE
//      Spitting Drake: Triangle AOE attack icon
//      Cultist: surrounding attack icon
//      Deep terror: Long line attack icon
//      Harrower Infester: Short line attack icon
//      Living Spirit: Negate element
//      Lurker: Negate element
//      Night Demon: Negate element
//      Ancient Artillery: Triangle AOE, circle AOE
//      Earth Demon: Negate element, 4 hit AOE
//      Flame Demon: Negate element, circle AOE
//      Frost Demon: Negate element, triangle AOE
//      Wind Demon: Negate element, 4 hit AOE, Circle AOE
//      Sun Demon: Negate element



DECK_DEFINITONS = 
    [   { name: "Living Bones"
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
        { name: "Guard"
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
        { name: "Archer"
        , cards:
            [ [false, "16", "* %move% +1", "* %attack% -1"]
            , [false, "31", "* %move% +0", "* %attack% +0"]
            , [false, "32", "* %move% +0", "* %attack% +1", "** %range% -1"]
            , [false, "44", "* %move% -1", "* %attack% +1"]
            , [false, "56", "* %attack% -1", "** %target% 2"]
            , [true,  "68", "* %attack% +1", "** %range% +1"]
            , [false, "14", "* %move% -1", "* %attack% -1", "* Create a 3 damage trap in an adjacent empty hex closest to an enemy"]
            , [true,  "29", "* %move% +0", "* %attack% -1", "** %range% +1", "** %immobilize%"]
            ]
        },
        { name: "Living Corpse"
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
        { name: "Boss"
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
        { name: "Shaman"
        , cards:
            [ [false, "08", "* %move% +0", "* %attack% -1", "** %disarm%"]
            , [false, "08", "* %move% -1", "* %attack% +0", "** %immobilize%"]
            , [true,  "23", "* %move% +0", "* %heal% 3"]
            , [true,  "23", "* %move% +0", "* %heal% 3"]
            , [false, "62", "* %move% +0", "* %attack% +0"]
            , [false, "74", "* %move% -1", "* %attack% +1"]
            , [false, "89", "* %move% -1", "* %heal% 1", "** Affect all adjacent allies", "* %bless%", "** Self"]
            , [false, "09", "* %move% +1", "* %attack% -1", "** %curse%", "** %target% 2"]
            ]
        },
        { name: "Scout"
        , cards:
            [ [false, "29", "* %move% -1", "* %attack% -1", "** %range% 3"]
            , [false, "40", "* %move% +1", "* %attack% -1"]
            , [false,  "53", "* %move% +0", "* %attack% +0"]
            , [false,  "54", "* %move% -2", "* %attack% +2", "** %range% 3", "** %poison%"]
            , [false, "69", "* %move% -1", "* %attack% +1"]
            , [true, "92", "* %attack% +2", "** %poison% "]
            , [true, "35", "* %move% +1", "** %jump%", "* %loot% 1"]
            , [false, "79",  "* %attack% -1", "** %range% 4", "** %target% 2"]
            ]
        },
        { name: "Stone Golem"
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
        { name: "Cave Bear"
        , cards:
            [ [false, "13", "* %move% +1", "* %attack% -1"]
            , [false, "14", "* %move% -1", "* %attack% -1", "** %immobilize%"]
            , [true,  "34", "* %attack% +1", "** %wound%"]
            , [false, "41", "* %move% +0", "* %attack% +0"]
            , [false, "60", "* %attack% *1", "* %attack% +1"]
            , [true,  "80", "* %attack% -1", "* %move% -2", "* %attack% -1", "** %wound%"]
            , [false, "03", "* %shield% 1", "* %retaliate% 2", "* %heal% 2", "** self"]
            , [false, "61", "* %move% +0", "* %attack% -1", "** %target% 2"]
            ]
        },
        { name: "Giant Viper"
        , cards:
            [ [true,  "32", "* %move% +0", "* %attack% +0", "*** Add +2 %attack% if the target is adjacent to any of the Giant Viper's allies"]
            , [true,  "32", "* %move% +0", "* %attack% +0", "*** Add +2 %attack% if the target is adjacent to any of the Giant Viper's allies"]
            , [false, "43", "* %move% +1", "** %jump%", "* %attack% +1", "** Target all adjacent enemies"]
            , [false, "11", "* %shield% 1", "* %attack% -1"]
            , [false, "58", "* %move% +1", "** %jump%", "* %attack% +1", "** All attacks targeting Giant Viper this round gain Disadvantage"]
            , [false, "58", "* %move% -1", "* %attack% +1"]
            , [false, "23", "* %move% -1", "* %attack% -1", "** %immobilize%", "* %attack% -1"]
            , [false, "43", "* %move% -1", "** %jump%", "* %attack% +0", "** %target% 2"]
            ]
        },
        { name: "Hound"
        , cards:
            [ [false, "06", "* %move% -1", "* %attack% +0", "** %immobilize%"]
            , [false, "07", "* %move% +0", "* %muddle%", "** Target all adjacent enemies"]
            , [true,  "19", "* %move% +1", "* %attack% +0", "*** Add +2 %attack% if the target is adjacent to any of the Hound's allies"]
            , [true,  "19", "* %move% +1", "* %attack% +0", "*** Add +2 %attack% if the target is adjacent to any of the Hound's allies"]
            , [false, "26", "* %move% +0", "* %attack% +0"]
            , [false, "26", "* %move% +0", "* %attack% +0"]
            , [false, "83", "* %move% -2", "* %attack% +1"]
            , [false, "72", "* %attack% -1", "** %pierce% 2", "* %move% -2", "* %attack% -1", "** %pierce% 2"]
            ]
        },
        { name: "Imp"
        , cards:
            [ [false, "05", "* %shield% 5", "* %heal% 1", "** Self"]
            , [false, "37", "* %move% +0", "* %attack% +0"]
            , [false, "37", "* %move% +0", "* %attack% +0"]
            , [false, "42", "* %move% +1", "* %heal% 2"]
            , [true,  "43", "* %move% +0", "* %attack% -1", "** %target% 2", "** %poison%"]
            , [false, "76", "* %move% -1", "* %attack% +1"]
            , [true,  "43", "* %move% +0", "* %attack% -1", "** %target% 2", "** %curse%"]
            , [false, "24", "* %strengthen% -1", "** Affect all allies within %range% 2", "* %muddle%", "** Target all enemies within %range% 2"]
            ]
        },
        { name: "Ooze"
        , cards:
            [ [false, "36", "* %move% +1", "* %attack% -1"]
            , [false, "57", "* %move% +0", "* %attack% 0"]
            , [false, "59", "* %attack% +0", "** %target% 2", "** %poison%"]
            , [false, "66", "* %move% -1", "* %attack% +1", "** %range% +1"]
            , [true,  "94", "* Ooze suffers 2 damage ", "** Summons normal Ooze with a hit point value equal to the summoning Ooze's current hit point value (limited by a normal Ooze's specified maximum hit point value)"]
            , [true,  "94", "* Ooze suffers 2 damage ", "** Summons normal Ooze with a hit point value equal to the summoning Ooze's current hit point value (limited by a normal Ooze's specified maximum hit point value)"]
            , [false, "85", "* %push% 1 and", "* %poison%", "** Target all adjacent enemies", "* %attack% +1", "** %range% -1"]
            , [false, "66", "* %move% -1", "* %loot% 1", "* %heal% 2", "** Self"]
            ]
        },
        { name: "Rending Drake"
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
        }
    ];
