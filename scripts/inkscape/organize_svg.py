#!/usr/bin/env python

import inkex
from inkex import Transform

class OrganizeSVG(inkex.EffectExtension):
    def add_arguments(self, pars):
        pars.add_argument("--file_name", type=str, default="", help="Name for the file layer")
        pars.add_argument("--flatten_groups", type=inkex.Boolean, default=True, help="Flatten group folders")

    def effect(self):
        # Ensure root layer exists
        root_layer = self.ensure_root_layer()

        # Get existing file layer or create a new one
        file_layer = self.get_or_create_file_layer(root_layer)

        # Update file layer name if provided by user
        if self.options.file_name:
            file_layer.set('inkscape:label', self.options.file_name)

        # Move all elements that are not the file_layer into the file_layer
        for elem in list(root_layer):
            if elem != file_layer:
                file_layer.append(elem)

        if self.options.flatten_groups:
            self.flatten_groups(file_layer)

    def ensure_root_layer(self):
        root_layer = self.svg.getElement('//svg:g[@inkscape:groupmode="layer"]')
        if root_layer is None:
            root_layer = inkex.Layer.new('root')
            self.svg.append(root_layer)
        else:
            root_layer.set('inkscape:label', 'root')
        return root_layer

    def get_or_create_file_layer(self, root_layer):
        # Check if there's already a group or layer under root with the desired name
        for child in root_layer:
            if child.tag == '{http://www.w3.org/2000/svg}g':
                if child.get('inkscape:label') == self.options.file_name:
                    if child.get('inkscape:groupmode') == 'layer':
                        # If it's a layer, convert it to a group
                        child.set('inkscape:groupmode', 'group')
                    return child
        
        # If no group found, create a new one with the specified name
        file_group = inkex.Group.new(self.options.file_name)
        root_layer.append(file_group)
        return file_group

    def flatten_groups(self, element):
        # Collect all descendants
        descendants = list(element.iter())
        
        # Move all non-group descendants directly under the file_layer
        for desc in descendants:
            if desc.tag != '{http://www.w3.org/2000/svg}g' and desc != element:
                # Move the element without modifying its transform
                element.append(desc)
        
        # Remove all groups
        for desc in list(descendants):  # Create a new list to avoid modifying while iterating
            if desc.tag == '{http://www.w3.org/2000/svg}g' and desc != element:
                desc.getparent().remove(desc)

if __name__ == '__main__':
    OrganizeSVG().run()