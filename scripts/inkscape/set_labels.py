#!/usr/bin/env python

import inkex

class SetLabels(inkex.EffectExtension):
    def add_arguments(self, pars):
        pars.add_argument("--label_prefix", type=str, default="newlabel", help="Prefix for new labels")
        pars.add_argument("--start_number", type=int, default=1, help="Starting number for label suffix")
        pars.add_argument("--use_numbering", type=inkex.Boolean, default=True, help="Use numbering in labels")

    def effect(self):
        label_prefix = self.options.label_prefix
        start_number = self.options.start_number
        use_numbering = self.options.use_numbering

        for i, elem in enumerate(self.svg.selection):
            if use_numbering:
                new_label = f"{label_prefix}{start_number + i}"
            else:
                new_label = label_prefix
            elem.set('inkscape:label', new_label)

if __name__ == '__main__':
    SetLabels().run()