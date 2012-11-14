
all: window.buttons.left@espectrale.com.zip tomatoro@espectrale.com.zip

window.buttons.left@espectrale.com.zip: window.buttons.left@espectrale.com
	zip -j $@ $</*

tomatoro@espectrale.com.zip: tomatoro@espectrale.com
	zip -j $@ $</*

clean:
	-@rm -f *.zip

.PHONY: all clean

.SILENT: clean

