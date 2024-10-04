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
        # Check if there's already a layer under root
        for child in root_layer:
            if child.tag == '{http://www.w3.org/2000/svg}g' and child.get('inkscape:groupmode') == 'layer':
                return child
        
        # If no layer found, create a new one with a default name
        file_layer = inkex.Layer.new('unnamed')
        root_layer.append(file_layer)
        return file_layer

    def flatten_groups(self, element):
        def accumulate_transform(elem, transform=Transform()):
            parent = elem.getparent()
            if parent is not None and parent.tag == '{http://www.w3.org/2000/svg}g':
                transform = Transform(parent.get('transform', '')) @ transform
                return accumulate_transform(parent, transform)
            return transform

        # Collect all descendants
        descendants = list(element.iter())
        
        # Move all non-group descendants directly under the file_layer
        for desc in descendants:
            if desc.tag != '{http://www.w3.org/2000/svg}g' and desc != element:
                # Calculate accumulated transform
                accumulated_transform = accumulate_transform(desc)
                
                # Apply accumulated transform
                current_transform = Transform(desc.get('transform', ''))
                new_transform = accumulated_transform @ current_transform
                desc.set('transform', str(new_transform))
                
                # Move the element
                element.append(desc)
        
        # Remove all groups
        for desc in list(descendants):  # Create a new list to avoid modifying while iterating
            if desc.tag == '{http://www.w3.org/2000/svg}g' and desc != element:
                desc.getparent().remove(desc)

if __name__ == '__main__':
    OrganizeSVG().run()