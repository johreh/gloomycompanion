// empty template
/*
        { name: ""
        , cards:
            [ [false, "00", "* %move% +0", "* %attack% +0"]
            , [false, "00", "* %move% +0", "* %attack% +0"]
            , [false, "00", "* %move% +0", "* %attack% +0"]
            , [false, "00", "* %move% +0", "* %attack% +0"]
            , [false, "00", "* %move% +0", "* %attack% +0"]
            , [false, "00", "* %move% +0", "* %attack% +0"]
            , [false, "00", "* %move% +0", "* %attack% +0"]
            , [false, "00", "* %move% +0", "* %attack% +0"]
            ]
        },
*/

DECK_DEFINITONS = 
    [   
        { name: "Ancient Artillery"
        , cards:
            [ [false, "46", "* %attack% -1", "** %range% +2"]
            , [true,  "71", "* %attack% +0", "** All adjacent enemies suffer 2 dammage"]
            , [true,  "71", "* %attack% +0", "** All adjacent enemies suffer 2 dammage"]
            , [false, "37", "* %push% 1", "** Target all adjacent enemies", "* %attack% -1", "** %range% -1", "** Area effect"]
            , [false, "37", "* %push% 1", "** Target all adjacent enemies", "* %attack% -1", "** %range% -1", "** Area effect"]
            , [false, "17", "* %push% 2", "** Target all adjacent enemies", "* %shield% 2", "* %attack% -2"]
            , [false, "95", "* %attack% +1"]
            , [false, "46", "* %attack% -1", "** %immobilize%", "** Area effect"]
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
        { name: "Cave Bear"
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
        { name: "Cultist"
        , cards:
            [ [false, "10", "* %move% -1", "* %attack% -1", "* On Death:", "** %attack% +2", "** Area Effect"]
            , [false, "10", "* %move% -1", "* %attack% -1", "* On Death:", "** %attack% +2", "** Area Effect"]
            , [false, "27", "* %move% +0", "* %attack% +0"]
            , [false, "27", "* %move% +0", "* %attack% +0"]
            , [false, "39", "* %move% -1", "* %attack% +0", "* %heal% 1", "** Self"]
            , [true,  "63", "* Summon normal Living Bones", "* Cultist suffers 2 damage."]
            , [true,  "63", "* Summon normal Living Bones", "* Cultist suffers 2 damage."]
            , [false, "31", "* %move% -1", "* %heal% 3", "** %range% 3"]
            ]
        },
        { name: "Deep Terror"
        , cards:
            [ [false, "65", "* %attack% +0", "** %range% 3", "** %target% 3", "** %curse%"]
            , [true,  "60", "* %attack% +0", "** %pierce% 3", "** Area Effect"]
            , [true,  "60", "* %attack% +0", "** %pierce% 3", "** Area Effect"]
            , [false, "84", "* %attack% -1", "** Target all adjacent enemies", "* %attack% +0", "** %range% 4", "** %wound%"]
            , [false, "75", "* %attack% +0", "** %poison%", "* %attack% -1", "** %range% 5", "** %immobilize%"]
            , [false, "75", "* %attack% -2", "** Target all adjacent enemies", "** %disarm%", "* %attack% +0", "** %range% 3", "** %target% 2"]
            , [false, "96", "* %attack% -2", "** %range% 6", "** Summon normal Deep Terror in a hex adjacent to the target"]
            , [false, "54", "* %wound% and %poison%", "** Target all adjacent enemies", "* %attack% +0", "** %range% 4"]
            ]
        },
        { name: "Earth Demon"
        , cards:
            [ [true,  "40", "* %heal% 3", "** Self", "* %use-earth%:", "** %immobilize% Target all enemies within %range% 3"]
            , [true,  "42", "* %move% +1", "* %attack% -1"]
            , [false, "62", "* %move% +0", "* %attack% +0", "* %earth%"]
            , [false, "71", "* %attack% +0", "** %range% 4", "** %use-earth%: %target% 2"]
            , [false, "83", "* %move% -1", "* %attack% +1", "* %earth%"]
            , [false, "93", "* %move% -1", "* %attack% -1", "** Target all adjacent enemies", "* %use-earth%: %push% 1"]
            , [false, "79", "* %move% +1", "* %attack% +0", "** %use-air%: -2 %attack%"]
            , [false, "87", "* %move% +0", "* %attack% -1", "** Area Effect", "* %use-any%: %earth%"]
            ]
        },
        { name: "Flame Demon"
        , cards:
            [ [false, "03", "* %move% +1", "* %attack% -1", "* %fire%"]
            , [false, "24", "* %move% +0", "* %attack% +0", "* %fire%"]
            , [true,  "46", "* %attack% +0", "** %use-fire%: Area effect"]
            , [false, "49", "* %attack% +0", "** Area effect", "** %use-fire%: +1 %attack%, %wound%"]
            , [false, "67", "* %move% -1", "* %attack% +1", "** %range% -1", "* %fire%"]
            , [false, "77", "* %attack% +0", "** Target all adjacent enemies", "* %use-ice%: Flame Demon suffers 1 damage."]
            , [true,  "30", "* %use-fire%: All adjacent enemies suffer 2 damage.", "* %move% +0", "* %attack% -2", "** %wound%", "** %target% 2"]
            , [false, "08", "* %move% -1", "* Create a 4 damage trap in an adjacent empty hex closest to an enemy", "* %use-any%: %fire%"]
            ]
        },
        { name: "Frost Demon"
        , cards:
            [ [false, "18", "* %immobilize%", "** Target all enemies within %range% 2", "** %use-ice%: %heal% 3, Self"]
            , [false, "38", "* %move% +1", "* %attack% -1"]
            , [false, "58", "* %move% +0", "* %attack% +0"]
            , [false, "58", "* %move% -1", "* %attack% +0" , "** %range% 2", "** %use-ice%: +2 %attack%, +1 %range%"]
            , [true,  "78", "* %move% -1", "* %attack% +0", "** Area Effect", "* %ice%"]
            , [true,  "78", "* %move% -1", "* %attack% +0", "** Area Effect", "* %ice%"]
            , [false, "58", "* %move% -1", "* %attack% -1", "** %pierce% 3", "* %use-any: %ice%"]
            , [false, "18", "* %shield% 2", "* %move% +1", "* %use-fire%: Frost Demon suffers 1 damage"]
            ]
        },
        { name: "Giant Viper"
        , cards:
            [ [true,  "32", "* %move% +0", "* %attack% +0", "** Add +2 %attack% if the target is adjacent to any of the Giant Viper's allies."]
            , [true,  "32", "* %move% +0", "* %attack% +0", "** Add +2 %attack% if the target is adjacent to any of the Giant Viper's allies."]
            , [false, "11", "* %shield% 1", "* %attack% -1"]
            , [false, "43", "* %move% +1", "** %jump%", "* %attack% -1", "** Target all adjacent enemies."]
            , [false, "58", "* %move% -1", "* %attack% +1"]
            , [false, "58", "* %move% +1", "** %jump%", "* %attack% -1", "** All attacks targeting Giant Viper this round gain Disadvantage."]
            , [false, "43", "* %move% -1", "** %jump%", "* %attack% +0", "** %target% 2"]
            , [false, "23", "* %move% -1", "* %attack% -1", "** %immobilize%", "* %attack% -1"]
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
        { name: "Harrower Infester"
        , cards:
            [ [false, "38", "* %move% -1", "* %attack% +1", "** %target% 2"]
            , [false, "07", "* %move% +0", "* %attack% -1", "** %poison%", "* %dark%"]
            , [false, "16", "* %move% -1", "* %attack% -1", "* %heal% 5", "** Self"]
            , [false, "16", "* %attack% +2", "** %immobilize%", "* %retaliate% 2"]
            , [true,  "02", "* %shield% 2", "* %retaliate% 2", "** %range% 3"]
            , [false, "30", "* %move% -1", "* %attack% +0", "** Area effect", "** %use-dark%: Perform \"%heal% 2, Self\" for each target damaged"]
            , [false, "38", "* %move% +0", "* %attack% -1", "** %target% 2", "* %use-dark%: +2 %attack%, %disarm%"]
            , [true,  "07", "* %attack% -1", "** %range% 3", "** %muddle%", "* %heal% 4", "** Self"]
            ]
        },
        { name: "Living Bones"
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
        }
    ];