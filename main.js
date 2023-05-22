var property = new Array();
var unit = new Array();
var factor = new Array();

property[0] = "Area";
unit[0] = new Array(
  "Square meter (m^2)",
  "Acre (acre)",
  "Square centimeter",
  "Square kilometer",
);
factor[0] = new Array(
  1,
  4046.856,
  0.0001,
  1000000,
);


property[1] = "Length";
unit[1] = new Array(
  "Meter (m)",
  "Centimeter (cm)",
  "Kilometer (km)",
  "Foot (ft)",
  "Inch (in)",
);
factor[1] = new Array(
  1,
  0.01,
  1000,
  0.3048,
  0.0254,
);

property[2] = "Mass";
unit[2] = new Array(
  "Kilogram (kgr)",
  "Gram (gr)",
  "Milligram (mgr)",
);
factor[2] = new Array(
  1,
  0.001,
  1e-6,
);

property[3] = "Temperature";
unit[3] = new Array(
  "Celsius ('C)",
  "Fahrenheit ('F)",
  "Kelvin (K)",
);
factor[3] = new Array(1, 0.555555555555, 1);
tempIncrement = new Array(0, -32, -273.15);

property[4] = "Time";
unit[4] = new Array(
  "Second",
  "Day",
  "Hour",
  "Minute",
  "Month",
  "Year",
 
);
factor[4] = new Array(
  1,
  8.64e4,
  3600,
  60,
  2628000,
  31536000,
);

function UpdateUnitMenu(propMenu, unitMenu) {
  var i;
  i = propMenu.selectedIndex;
  FillMenuWithArray(unitMenu, unit[i]);
}

function FillMenuWithArray(myMenu, myArray) {
  var i;
  myMenu.length = myArray.length;
  for (i = 0; i < myArray.length; i++) {
    myMenu.options[i].text = myArray[i];
  }
}

function CalculateUnit(sourceForm, targetForm) {
  var sourceValue = sourceForm.unit_input.value;

  sourceValue = parseFloat(sourceValue);
  if (!isNaN(sourceValue) || sourceValue == 0) {
    sourceForm.unit_input.value = sourceValue;
    ConvertFromTo(sourceForm, targetForm);
  }
}

function ConvertFromTo(sourceForm, targetForm) {
  var propIndex;
  var sourceIndex;
  var sourceFactor;
  var targetIndex;
  var targetFactor;
  var result;

  propIndex = document.property_form.the_menu.selectedIndex;

  sourceIndex = sourceForm.unit_menu.selectedIndex;
  sourceFactor = factor[propIndex][sourceIndex];

  targetIndex = targetForm.unit_menu.selectedIndex;
  targetFactor = factor[propIndex][targetIndex];

  result = sourceForm.unit_input.value;

  if (property[propIndex] == "Temperature") {
    result = parseFloat(result) + tempIncrement[sourceIndex];
  }
  result = result * sourceFactor;

  result = result / targetFactor;

  if (property[propIndex] == "Temperature") {
    result = parseFloat(result) - tempIncrement[targetIndex];
  }


  targetForm.unit_input.value = result;
}

window.onload = function (e) {
  FillMenuWithArray(document.property_form.the_menu, property);
  UpdateUnitMenu(document.property_form.the_menu, document.form_A.unit_menu);
  UpdateUnitMenu(document.property_form.the_menu, document.form_B.unit_menu);
};

document
  .getElementByClass("numbersonly")
  .addEventListener("keydown", function (e) {
    var key = e.keyCode ? e.keyCode : e.which;

    if (
      !(
        (
          [8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
          (key == 65 && (e.ctrlKey || e.metaKey)) || 
          (key == 67 && (e.ctrlKey || e.metaKey)) || 
          (key == 86 && (e.ctrlKey || e.metaKey)) || 
          (key >= 35 && key <= 40) || 
          (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) || 
          (key >= 96 && key <= 105)(
            key == 190
          )
        ) 
      )
    )
      e.preventDefault();
  });
