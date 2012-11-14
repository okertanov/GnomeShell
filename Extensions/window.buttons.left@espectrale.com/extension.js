/*
    Copyright (C) 2012 Oleg Kertanov <okertanov@gmail.com>
    Created with
        `gnome-shell-extension-tool --create-extension`

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

var WindowButtons = function()
{
    return {
        text: null,
        showText: function(txt)
        {
            if (!this.text)
            {
                this.text = new St.Label({ style_class: 'helloworld-label', text: txt });
                Main.uiGroup.add_actor(this.text);
            }

            this.text.opacity = 255;

            let monitor = Main.layoutManager.primaryMonitor;

            this.text.set_position(Math.floor(monitor.width / 2 - this.text.width / 2),
                                   Math.floor(monitor.height / 5 - this.text.height / 2));
        },
        enable: function()
        {
            global.log('Extension:', 'enable()');
            this.showText('Hello, Gnome Shell.');
        },
        disable: function()
        {
            global.log('Extension:', 'disable()');
        }
    };
};

function init()
{
    global.log('Extension:', 'init()');

    return new WindowButtons();
}

