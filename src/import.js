import paper from 'paper';
import { layers, zoomToFit } from './canvas.js';
import { toast } from './ui.js';

export function importSVGPattern() {
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = '.svg,image/svg+xml';
  input.onchange = function () {
    var file = input.files && input.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
      try {
        var svgString = e.target.result;
        paper.project.clear();
        layers.patLayer = paper.project.activeLayer;
        layers.brushLayer = new paper.Layer();
        layers.patLayer.activate();
        var imported = paper.project.importSVG(svgString, { expandShapes: true });
        // Make every path-like item fillable
        imported.getItems({ class: paper.Path }).forEach(function (item) {
          item.data.fillable = true;
        });
        imported.getItems({ class: paper.CompoundPath }).forEach(function (item) {
          item.data.fillable = true;
        });
        zoomToFit();
        toast('SVG pattern loaded!');
      } catch (err) {
        console.error('SVG import error:', err);
        toast('Failed to load SVG: ' + (err.message || 'unknown error'));
      }
    };
    reader.readAsText(file);
  };
  input.click();
}
