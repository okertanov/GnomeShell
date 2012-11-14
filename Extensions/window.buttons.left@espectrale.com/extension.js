/*
    Copyright (C) 2012 Oleg Kertanov <okertanov@gmail.com>
    Created with `gnome-shell-extension-tool --create-extension`

    See also:
        * /usr/share/gnome-shell/js
*/

const Lang  =   imports.lang;
const St    =   imports.gi.St;
const Main  =   imports.ui.main;

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

