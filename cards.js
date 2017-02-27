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
            [ [true,  "40", "* %heal% 3", "** Self", "* %use_element%%earth%:", "** %immobilize% Target all enemies within %range% 3"]
            , [true,  "42", "* %move% +1", "* %attack% -1"]
            , [false, "62", "* %move% +0", "* %attack% +0", "* %earth%"]
            , [false, "71", "* %attack% +0", "** %range% 4", "** %use_element%%earth%: %target% 2"]
            , [false, "83", "* %move% -1", "* %attack% +1", "* %earth%"]
            , [false, "93", "* %move% -1", "* %attack% -1", "** Target all adjacent enemies", "* %use_element%%earth%: %push% 1"]
            , [false, "79", "* %move% +1", "* %attack% +0", "** %use_element%%air%: -2 %attack%"]
            , [false, "87", "* %move% +0", "* %attack% -1", "** Area Effect", "* %use_element%%any%: %earth%"]
            ]
        },
        { name: "Flame Demon"
        , cards:
            [ [false, "03", "* %move% +1", "* %attack% -1", "* %fire%"]
            , [false, "24", "* %move% +0", "* %attack% +0", "* %fire%"]
            , [true,  "46", "* %attack% +0", "** %use_element%%fire%: Area effect"]
            , [false, "49", "* %attack% +0", "** Area effect", "** %use_element%%fire%: +1 %attack%, %wound%"]
            , [false, "67", "* %move% -1", "* %attack% +1", "** %range% -1", "* %fire%"]
            , [false, "77", "* %attack% +0", "** Target all adjacent enemies", "* %use_element%%ice%: Flame Demon suffers 1 damage."]
            , [true,  "30", "* %use_element%%fire%: All adjacent enemies suffer 2 damage.", "* %move% +0", "* %attack% -2", "** %wound%", "** %target% 2"]
            , [false, "08", "* %move% -1", "* Create a 4 damage trap in an adjacent empty hex closest to an enemy", "* %use_element%%any%: %fire%"]
            ]
        },
        { name: "Frost Demon"
        , cards:
            [ [false, "18", "* %immobilize%", "** Target all enemies within %range% 2", "** %use_element%%ice%: %heal% 3, Self"]
            , [false, "38", "* %move% +1", "* %attack% -1"]
            , [false, "58", "* %move% +0", "* %attack% +0"]
            , [false, "58", "* %move% -1", "* %attack% +0" , "** %range% 2", "** %use_element%%ice%: +2 %attack%, +1 %range%"]
            , [true,  "78", "* %move% -1", "* %attack% +0", "** Area Effect", "* %ice%"]
            , [true,  "78", "* %move% -1", "* %attack% +0", "** Area Effect", "* %ice%"]
            , [false, "58", "* %move% -1", "* %attack% -1", "** %pierce% 3", "* %use_element%%any%: %ice%"]
            , [false, "18", "* %shield% 2", "* %move% +1", "* %use_element%%fire%: Frost Demon suffers 1 damage"]
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
            , [false, "30", "* %move% -1", "* %attack% +0", "** Area effect", "** %use_element%%dark%: Perform \"%heal% 2, Self\" for each target damaged"]
            , [false, "38", "* %move% +0", "* %attack% -1", "** %target% 2", "* %use_element%%dark%: +2 %attack%, %disarm%"]
            , [true,  "07", "* %attack% -1", "** %range% 3", "** %muddle%", "* %heal% 4", "** Self"]
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
        { name: "Living Spirit"
        , cards:
            [ [true,  "22", "* %move% -1", "* %attack% -1", "** %muddle%"]
            , [true,  "33", "* %move% +0", "* %attack% -1", "** Target all enemies within range"]
            , [false, "48", "* %move% +0", "* %attack% +0"]
            , [false, "48", "* %move% +0", "* %attack% +0"]
            , [false, "61", "* %attack% +0", "** %range% -1", "** %target% 2"]
            , [false, "75", "* %move% -1", "* %attack% +1", "** %range% -1", "* %heal% 1", "** Self"]
            , [false, "55", "* %move% +0", "* %curse%", "** Target all enemies within range", "* %ice%"]
            , [false, "67", "* %move% -1", "* %attack% +1", "** %use_element%%ice%: %stun%"]
            ]
        },
        { name: "Lurker"
        , cards:
            [ [true,  "11", "* %shield% 1", "** %use_element%%ice%: %shield% 2 instead","* %wound%", "** Target all adjacent enemies"]
            , [false, "28", "* %move% +1", "* %attack% -1"]
            , [false, "38", "* %move% +0", "* %attack% +0"]
            , [false, "38", "* %move% +0", "* %attack% +0", "** Target one enemy with all attacks"]
            , [false, "61", "* %move% -1", "* %attack% +1"]
            , [false, "64", "* %attack% +1", "** Target all adjacent enemies"]
            , [false, "41", "* %use_element%%ice%: %strengthen%", "** Self", "* %move% +0", "* %attack% -1", "** %wound%"]
            , [true,  "23", "* %shield% 1", "* %move% +0", "* %attack% -1", "* %ice%"]
            ]
        },
        { name: "Night Demon"
        , cards:
            [ [false, "04", "* %move% +1", "* %attack% -1", "* %dark%"]
            , [false, "07", "* %move% +1", "* %attack% -1", "* %use_element%%dark%: %invisible%", "** Self"]
            , [false, "22", "* %move% +0", "* %attack% +0", "* %dark%"]
            , [false, "26", "* %attack% -2", "** %range% 3", "** %target% 3", "** %use_element%%dark%: %muddle%"]
            , [true,  "46", "* %move% -1", "* %attack% +1", "** %use_element%%dark%: +2 %attack%"]
            , [true,  "41", "* %move% -1", "* %attack% +1", "* %dark%"]
            , [false, "35", "* %attack% -1", "* %attack% -1", "** %pierce% 2", "* %use_element%%light%: %curse%", "** Self"]
            , [false, "15", "* %move% +0", "* %attack% -1", "* All adjacent enemies and allies suffer 1 damage.", "* %use_element%%any%: %dark%"]
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
        },
        { name: "Savvas Icestorm"
        , cards:
            [ [false, "70", "* %push% 2", "** Target all adjacent enemies", "** %use_element%%air%: %push% 4 instead", "* %attack% +1", "** %range% +1"]
            , [false, "98", "* Summon normal Wind Demon", "* %air%"]
            , [false, "98", "* Summon normal Frost Demon", "* %ice%"]
            , [false, "19", "* %move% +0", "* %attack% -1", "** %range% -1", "* %shield% 1", "** Affect self and all allies within %range% 2", "* %ice%"]
            , [false, "14", "* %attack% +0", "** %use_element%%ice%: +2 %attack%, %immobilize%", "* %retaliate% 2", "* %air%"]
            , [false, "14", "* %shield% 4", "* %heal% 2", "** %use_element%%ice%: +3 %heal%", "* %use_element%%air%: %attack% +0"]
            , [true,  "47", "* %disarm%", "** Target all adjacent enemies", "* %move% +0", "* %attack% -1", "* %air%"]
            , [true,  "35", "* %move% -1", "* %attack% -1", "** Area Effect", "* %ice%"]
            ]
        },
        { name: "Savvas Lavaflow"
        , cards:
            [ [false, "97", "* Summon normal Flame Demon", "* %fire%"]
            , [false, "97", "* Summon normal Earth Demon", "* %earth%"]
            , [false, "22", "* %move% +1", "* %attack% -1", "** Target all adjacent enemies", "* %use_element%%fire%: %retaliate% 3"]
            , [true,  "68", "* %move% -1", "* %attack% +1", "** %range% 3", "** All allies and enemies adjacent to the target suffer 2 damage.", "* %earth%"]
            , [false, "41", "* %move% +0", "* %attack% -1", "** Area effect", "** %use_element%%earth%: +2 %attack%, %immobilize%"]
            , [false, "51", "* All enemies suffer 2 damage.", "* %use_element%%fire%: %wound% all enemies", "* %use_element%%earth%: %disarm% all enemies"]
            , [false, "31", "* %heal% 4", "** %range% 3", "** %use_element%%earth%: %target% 3"]
            , [true,  "68", "* %move% -1", "* %attack% -1", "** %range% 3", "** %target% 2", "* %fire%"]
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
        { name: "Spitting Drake"
        , cards:
            [ [false, "32", "* %move% +1", "* %attack% -1"]
            , [false, "52", "* %move% +0", "* %attack% +0"]
            , [true,  "57", "* %move% +0", "* %attack% -1", "** Area effect"]
            , [false, "27", "* %attack% +0", "** %target% 2", "** %poison%"]
            , [false, "87", "* %move% -1", "* %attack% +1"]
            , [false, "89", "* %attack% -2", "** %stun%"]
            , [false, "06", "* %shield% 2", "* %heal% 2", "** Self", "* %strengthen%", "** Self"]
            , [true,  "89", "* %move% -1", "* %attack% -2", "** Area effect", "** %poison%"]
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
        { name: "Sun Demon"
        , cards:
            [ [true,  "17", "* %heal% 3", "** %range% 3", "** %use_element%%light%: Target all allies within range"]
            , [false, "36", "* %move% +0", "* %attack% +0", "** Target all adjacent enemies", "* %light%"]
            , [false, "36", "* %move% +0", "* %attack% +0", "** Target all adjacent enemies", "* %light%"]
            , [false, "68", "* %move% +0", "* %attack% +1", "* %light%"]
            , [true,  "73", "* %move% +0", "* %attack% +1", "* %use_element%%light%: %heal% 3", "** Self"]
            , [false, "95", "* %move% -1", "* %attack% +0", "** %range% 4", "** %use_element%%light%: Target all enemies within range"]
            , [false, "88", "* %move% -1", "* %attack% -1", "** Target all adjacent enemies", "* %use_element%%dark%: %muddle%", "** Self"]
            , [false, "50", "* %move% +0", "* %attack% +0", "** %range% 3", "* %use_element%%any%: %light%"]
            ]
        },
        { name: "Wind Demon"
        , cards:
            [ [false, "09", "* %attack% -1", "* %heal% 1", "** Self", "* %use_element%%air%: %invisible%", "** Self"]
            , [true,  "21", "* %move% +0", "* %attack% +0", "** %pull% 1", "* %air%"]
            , [true,  "21", "* %move% +0", "* %attack% +0", "** %pull% 1", "* %air%"]
            , [false, "29", "* %move% +0", "* %attack% -1", "** %target% 2", "** %use_element%%air%: %push% 2"]
            , [false, "37", "* %move% +0", "* %attack% +0", "** Area effect", "** %use_element%%air%: +1 %attack, Area effect"]
            , [false, "43", "* %move% -1", "* %attack% +1", "** %use_element%%air%: %target% 2"]
            , [false, "43", "* %push% 1", "** Target all adjacent enemies", "* %attack% +0", "** %use_element%%earth%: -2 %range%"]
            , [false, "02", "* %shield% 1", "* %move% -1", "* %attack% -1", "* %use_element%%any%: %air%"]
            ]
        }         
    ];


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

    