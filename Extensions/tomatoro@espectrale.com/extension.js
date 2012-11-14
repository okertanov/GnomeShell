/*
    Copyright (C) 2012 Oleg Kertanov <okertanov@gmail.com>

    License: see GPLv2.txt file

    Links:
        * http://www.pomodorotechnique.com/get-started/
        * http://en.wikipedia.org/wiki/Pomodoro_Technique
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
const EXTENSION = 'tomatoro@espectrale.com';

/*
    Tomatoro class
*/
var Tomatoro = new Lang.Class({
    Name: 'Tomatoro',
    _init: function()
    {
        log(EXTENSION + ': ' + 'Inside Tomatoro::_init()');
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
        log(EXTENSION + ': ' + 'Inside Tomatoro::enable()');
        try
        {
            let ( msg = EXTENSION + ' ' + 'extension enabled.' )
            {
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
        log(EXTENSION + ': ' + 'Inside Tomatoro::disable()');
        try
        {
            let ( msg = EXTENSION + ' ' + 'extension disabled.' )
            {
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
    return new Tomatoro();
}

