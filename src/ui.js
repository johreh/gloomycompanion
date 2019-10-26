function activate_tab(tabs, pages, activetab)
{
    for (let key in tabs)
    {
        tabs[key].className = (key === activetab) ? "" : "inactive";
    }
    for (let key in pages)
    {
        pages[key].className = (key === activetab) ? "tabbody" : "inactive tabbody";
    }
}

export function show_settingspane(pane, cancelarea, show)
{
    pane.className = show ? "pane" : "pane inactive";
    cancelarea.style.display = show ? "initial" : "none";
}

export const widgets = {}

export function init_ui()
{
    const tabs =
    {
        scenarios:      document.getElementById("scenariotab"),
        decks:          document.getElementById("deckstab")
    };
    const pages =
    {
        scenarios:      document.getElementById("scenariospage"),
        decks:          document.getElementById("deckspage")
    };

    widgets.settingspane =      document.getElementById("settingspane");
    widgets.settingsbtn =       document.getElementById("settingsbtn");
    widgets.cancelarea =        document.getElementById("cancelarea");

    tabs.scenarios.onclick = function()
    {
        activate_tab(tabs, pages, "scenarios");
    }

    tabs.decks.onclick = function()
    {
        activate_tab(tabs, pages, "decks");
    }

    widgets.settingsbtn.onclick = function()
    {
        show_settingspane(widgets.settingspane, widgets.cancelarea, true);
    }

    widgets.cancelarea.onclick = function()
    {
        show_settingspane(widgets.settingspane, widgets.cancelarea, false);
    }

    activate_tab(tabs, pages, "scenarios");
}
