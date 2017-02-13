

function activate_tab(tabs, pages, activetab)
{
    for (key in tabs)
    {
        tabs[key].className = (key == activetab) ? "" : "inactive";
    }
    for (key in pages)
    {
        pages[key].className = (key == activetab) ? "tabbody" : "inactive tabbody";
    }
}

function show_settingspane(pane, show)
{
    pane.className = show ? "pane" : "pane inactive";
}

function init_ui()
{
    var tabs =
    {
        scenarios:      document.getElementById("scenariotab"),
        decks:          document.getElementById("deckstab")
    };
    var pages =
    {
        scenarios:      document.getElementById("scenariopage"),
        decks:          document.getElementById("deckspage")
    };

    settingspane =      document.getElementById("settingspane");
    settingsbtn =       document.getElementById("settingsbtn");
    backbtn =           document.getElementById("backbtn");

    scenariotab.onclick = function(e)
    {
        activate_tab(tabs, pages, "scenarios");
    }

    deckstab.onclick = function(e)
    {
        activate_tab(tabs, pages, "decks");
    }

    settingsbtn.onclick = function(e)
    {
        show_settingspane(settingspane, true);
    }

    backbtn.onclick = function(e)
    {
        show_settingspane(settingspane, false);
    }

    activate_tab(tabs, pages, "scenarios");
}

