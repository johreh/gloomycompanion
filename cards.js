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
        }
    ];
