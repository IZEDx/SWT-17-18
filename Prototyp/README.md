## Get Started

Zur Installation und zum Ausführen wird [Node](https://nodejs.org) und
der dazugehörige [Node Package Manager](https://www.npmjs.com/), welcher
mit Node mitgeliefert wird. Beide Tools sollten über die Pfadvariable
des Systems ausführbar sein.

#### Setup:

> git clone https://github.com/IZEDx/SWT-17-18.git

> cd Prototyp/

> npm install

NPM installiert nun alle Dependencies für die Entwicklung, inklusive dem
Typescript Compiler.

_Beachte: Alle npm Commands müssen im "Prototyp" Ordner getätigt
werden._

Jetzt ist das Projekt fertig aufgesetzt und der erste
Kompilierungsvorgang kann durchgeführt werden:

> npm run build

Dies führt nun den Typescript Compiler aus, welcher das Projekt anhand
der tsconfig.json zu Javascript übersetzt. Die fertigen Dateien sind
dann im "dist" Ordner.

Man kann nun entweder die Anwendung normal starten mit:

> npm start

oder im Debug-Modus mit:

> npm run debug

_(für Windows: debug-win)_

#### IDE:

Als IDE empfiehlt sich
[JetBrains WebStorm](https://www.jetbrains.com/webstorm/), welche
gängige Features implementiert, die die Arbeit mit npm und typescript
erleichtern. Allerdings geht auch jeder Text Editor (vorzugsweise mit
TypeScript Syntax-Highlighting) zusammen mit einem Terminal.
