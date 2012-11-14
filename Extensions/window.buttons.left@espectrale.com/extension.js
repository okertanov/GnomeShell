/*
    Copyright (C) 2012 Oleg Kertanov <okertanov@gmail.com>

    Created with
        `gnome-shell-extension-tool --create-extension`

    License: see GPLv2.txt file

    See also:
        * dconf-editor
        * /usr/share/gnome-shell/js

    Links:
        * [live.gnome.org Extensions](https://live.gnome.org/GnomeShell/Extensions)
        * [live.gnome.org Getting Started development](https://live.gnome.org/GnomeShell/Development)
        * [Updating GNOME Shell Extensions To Work With GNOME 3.2](http://blog.fpmurphy.com/2011/11/updating-gnome-shell-extensions-to-work-with-gnome-3-2.html)
        * [GIO Reference Manual](http://developer.gnome.org/gio/stable/)
        * [St Reference Manual](http://developer.gnome.org/st/stable/)
        * [Clutter Reference Manual](http://developer.gnome.org/clutter/1.12/)
        * [Tweener Documentation](http://hosted.zeh.com.br/tweener/docs/en-us/)
*/

/*
    Modules
*/
const Lang  =   imports.lang;
const Main  =   imports.ui.main;
const St    =   imports.gi.St;
const Gio   =   imports.gi.Gio;

/*
    Constants
*/
const CFG_BUTTON_LAYOUT_PATH = 'org.gnome.shell.overrides';
const CFG_BUTTON_LAYOUT_KEY  = 'button-layout';
const CFG_BUTTON_LAYOUT_VAL_LTR_FULL = 'close,minimize,maximize:';
const CFG_BUTTON_LAYOUT_VAL_RTL_FULL = ':minimize,maximize,close';

/*
    WindowButtonsLeft class
*/
var WindowButtonsLeft = function()
{
    return {
        text: null,
        showHint: function(txt)
        {
            if ( !this.text )
            {
                this.text = new St.Label({ style_class: 'show-hint-label', text: txt });
                this.text.opacity = 255;
                Main.uiGroup.add_actor(this.text);
            }

            let ( monitor = Main.layoutManager.primaryMonitor,
                  x = Math.floor(monitor.width - this.text.width * 2),
                  y = Math.floor(monitor.height / 5 - this.text.height / 2) )
            {
                this.text.set_position(x, y);
            }
        },
        hideHint: function()
        {
        },
        getButtonLayoutString: function()
        {
            var overridesBranch = new Gio.Settings({schema: CFG_BUTTON_LAYOUT_PATH}),
                buttonLayout = overridesBranch.get_string(CFG_BUTTON_LAYOUT_KEY);

            return buttonLayout;
        },
        setButtonLayoutString: function(str)
        {
            var overridesBranch = new Gio.Settings({schema: CFG_BUTTON_LAYOUT_PATH});

            if ( overridesBranch.is_writable(CFG_BUTTON_LAYOUT_KEY) )
            {
                if ( overridesBranch.set_string(str) )
                {
                    Gio.Settings.sync();
                }
            }
        },
        enable: function()
        {
            global.log('Extension:', 'enable()');
            this.setButtonLayoutString(CFG_BUTTON_LAYOUT_VAL_LTR_FULL);
            this.showHint('Extension enabled.');
        },
        disable: function()
        {
            global.log('Extension:', 'disable()');
            this.setButtonLayoutString(CFG_BUTTON_LAYOUT_VAL_RTL_FULL);
            this.hideHint();
        }
    };
};

/*
    Extension initialization
*/
function init()
{
    global.log('Extension:', 'init()');

    return new WindowButtonsLeft();
}

