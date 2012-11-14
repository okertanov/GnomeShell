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
        * [Requirements and tips for getting your GNOME Shell Extension approved](http://blog.mecheye.net/2012/02/requirements-and-tips-for-getting-your-gnome-shell-extension-approved/)
        * [GIO Reference Manual](http://developer.gnome.org/gio/stable/)
        * [St Reference Manual](http://developer.gnome.org/st/stable/)
        * [Clutter Reference Manual](http://developer.gnome.org/clutter/1.12/)
        * [Tweener Documentation](http://hosted.zeh.com.br/tweener/docs/en-us/)
*/

/*
    Modules
*/
const Lang      =   imports.lang;
const Main      =   imports.ui.main;
const St        =   imports.gi.St;
const Gio       =   imports.gi.Gio;
const Mainloop  =   imports.mainloop;

/*
    Constants
*/
const EXTENSION = 'window.buttons.left@espectrale.com';
const CFG_BUTTON_LAYOUT_PATH = 'org.gnome.shell.overrides';
const CFG_BUTTON_LAYOUT_KEY  = 'button-layout';
const CFG_BUTTON_LAYOUT_VAL_LTR_FULL = 'close,minimize,maximize:';
const CFG_BUTTON_LAYOUT_VAL_RTL_FULL = ':minimize,maximize,close';

/*
    WindowButtonsLeft class
*/
var WindowButtonsLeft = new Lang.Class({
    Name: 'WindowButtonsLeft',
    Label: null,
    _init: function()
    {
        log(EXTENSION + ': ' + 'Inside WindowButtonsLeft::_init()');
    },
    _showHint: function(txt)
    {
        if ( !this.Label )
        {
            this.Label = new St.Label({ style_class: 'show-hint-label',
                                        text: txt });
        }

        let (monitor = Main.layoutManager.primaryMonitor)
        {
            let ( x = Math.floor(monitor.width / 2 - this.Label.width / 2 ),
                  y = Math.floor(monitor.height / 2 - this.Label.height / 2) )
            {
                if ( this.Label )
                {
                    Main.uiGroup.add_actor(this.Label);
                    this.Label.opacity = 255;
                    this.Label.set_position(x, y);
                }
            }
        }
    },
    _hideHint: function()
    {
        Main.uiGroup.remove_actor(this.Label);
        this.Label.destroy();
        this.Label = null;
    },
    _getButtonLayoutString: function()
    {
        var buttonLayout = null,
            overridesBranch = new Gio.Settings({schema: CFG_BUTTON_LAYOUT_PATH});

        if ( overridesBranch )
        {
            buttonLayout = overridesBranch.get_string(CFG_BUTTON_LAYOUT_KEY);
        }
        else
        {
            throw new Error('Can\'t get button layout settings.');
        }

        return buttonLayout;
    },
    _setButtonLayoutString: function(str)
    {
        var overridesBranch = new Gio.Settings({schema: CFG_BUTTON_LAYOUT_PATH});

        if ( overridesBranch.is_writable(CFG_BUTTON_LAYOUT_KEY) )
        {
            if ( overridesBranch.set_string(CFG_BUTTON_LAYOUT_KEY, str) )
            {
                Gio.Settings.sync();
            }
            else
            {
                throw new Error('Can\'t set button layout settings.');
            }
        }
        else
        {
            throw new Error('Can\'t write button layout settings.');
        }
    },
    _handleException: function(e)
    {
        let ( details = (e.message || 'Unknown exception.') )
        {
            Main.notifyError('Error:', details);
        }
    },
    _handleInfo: function(i)
    {
        Main.notify('Info:', i);
    },
    enable: function()
    {
        log(EXTENSION + ': ' + 'Inside WindowButtonsLeft::enable()');
        try
        {
            let ( msg = EXTENSION + ' ' + 'extension enabled.' )
            {
                this._setButtonLayoutString(CFG_BUTTON_LAYOUT_VAL_LTR_FULL);
                this._handleInfo(msg);
            }
        }
        catch(e)
        {
            this._handleException(e);
        }
    },
    disable: function()
    {
        log(EXTENSION + ': ' + 'Inside WindowButtonsLeft::disable()');
        try
        {
            let ( msg = EXTENSION + ' ' + 'extension disabled.' )
            {
                this._setButtonLayoutString(CFG_BUTTON_LAYOUT_VAL_RTL_FULL);
                this._handleInfo(msg);
            }
        }
        catch(e)
        {
            this._handleException(e);
        }
    }
});

/*
    Extension initialization
*/
function init()
{
    log(EXTENSION + ': ' + 'Inside init()');
    return new WindowButtonsLeft();
}

