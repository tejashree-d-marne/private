// layoutMapping.js
// Reads input from input.json and writes owners/layout_data.json per schema

const fs = require("fs");
const path = require("path");

function ensureFile(fp, dataObj) {
  const dir = path.dirname(fp);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fp, JSON.stringify(dataObj, null, 2), "utf-8");
}

(function main() {
  const inputPath = path.join(process.cwd(), "input.json");
  let data = null;
  try {
    data = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
  } catch (e) {
    console.error(
      "Failed to read input.json. Ensure structureMapping.js created it.",
    );
    process.exit(1);
  }

  const parcel =
    (data &&
      data.d &&
      Array.isArray(data.d.parcelInfok__BackingField) &&
      data.d.parcelInfok__BackingField[0]) ||
    {};
  const folio = parcel.folioNumber || "unknown";

  // Unknown layout details; create minimal placeholder entries that conform to schema with nulls/defaults
  const defaultLayout = {
    space_type: null,
    space_index: 1,
    flooring_material_type: null,
    size_square_feet: null,
    floor_level: null,
    has_windows: null,
    window_design_type: null,
    window_material_type: null,
    window_treatment_type: null,
    is_finished: false,
    furnished: null,
    paint_condition: null,
    flooring_wear: null,
    clutter_level: null,
    visible_damage: null,
    countertop_material: null,
    cabinet_style: null,
    fixture_finish_quality: null,
    design_style: null,
    natural_light_quality: null,
    decor_elements: null,
    pool_type: null,
    pool_equipment: null,
    spa_type: null,
    safety_features: null,
    view_type: null,
    lighting_features: null,
    condition_issues: null,
    is_exterior: false,
    pool_condition: null,
    pool_surface_type: null,
    pool_water_quality: null,
  };

  const output = {};
  output[`property_${folio}`] = { layouts: [defaultLayout] };

  const outPath = path.join(process.cwd(), "owners", "layout_data.json");
  ensureFile(outPath, output);
  console.log(`Wrote layout data for property_${folio} to ${outPath}`);
})();
