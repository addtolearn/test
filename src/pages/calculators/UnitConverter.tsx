import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type UnitCategory = {
  name: string;
  units: { [key: string]: { name: string; toBase: (val: number) => number; fromBase: (val: number) => number } };
};

const unitCategories: { [key: string]: UnitCategory } = {
  length: {
    name: "Length",
    units: {
      mm: { name: "Millimeter (mm)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      cm: { name: "Centimeter (cm)", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      m: { name: "Meter (m)", toBase: (v) => v, fromBase: (v) => v },
      km: { name: "Kilometer (km)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      inch: { name: "Inch (in)", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
      ft: { name: "Foot (ft)", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      yd: { name: "Yard (yd)", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      mi: { name: "Mile (mi)", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
      nm: { name: "Nautical Mile", toBase: (v) => v * 1852, fromBase: (v) => v / 1852 },
    },
  },
  weight: {
    name: "Weight / Mass",
    units: {
      mg: { name: "Milligram (mg)", toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
      g: { name: "Gram (g)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      kg: { name: "Kilogram (kg)", toBase: (v) => v, fromBase: (v) => v },
      ton: { name: "Metric Ton (t)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      oz: { name: "Ounce (oz)", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
      lb: { name: "Pound (lb)", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
      st: { name: "Stone (st)", toBase: (v) => v * 6.35029, fromBase: (v) => v / 6.35029 },
      quintal: { name: "Quintal", toBase: (v) => v * 100, fromBase: (v) => v / 100 },
    },
  },
  volume: {
    name: "Volume",
    units: {
      ml: { name: "Milliliter (ml)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      l: { name: "Liter (L)", toBase: (v) => v, fromBase: (v) => v },
      m3: { name: "Cubic Meter (m³)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      gal_us: { name: "Gallon (US)", toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
      gal_uk: { name: "Gallon (UK)", toBase: (v) => v * 4.54609, fromBase: (v) => v / 4.54609 },
      pt_us: { name: "Pint (US)", toBase: (v) => v * 0.473176, fromBase: (v) => v / 0.473176 },
      cup: { name: "Cup (US)", toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
      tbsp: { name: "Tablespoon", toBase: (v) => v * 0.0147868, fromBase: (v) => v / 0.0147868 },
      tsp: { name: "Teaspoon", toBase: (v) => v * 0.00492892, fromBase: (v) => v / 0.00492892 },
      fl_oz: { name: "Fluid Ounce (US)", toBase: (v) => v * 0.0295735, fromBase: (v) => v / 0.0295735 },
    },
  },
  temperature: {
    name: "Temperature",
    units: {
      c: { name: "Celsius (°C)", toBase: (v) => v, fromBase: (v) => v },
      f: { name: "Fahrenheit (°F)", toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
      k: { name: "Kelvin (K)", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    },
  },
  area: {
    name: "Area",
    units: {
      mm2: { name: "Square Millimeter", toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
      cm2: { name: "Square Centimeter", toBase: (v) => v / 10000, fromBase: (v) => v * 10000 },
      m2: { name: "Square Meter (m²)", toBase: (v) => v, fromBase: (v) => v },
      km2: { name: "Square Kilometer", toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
      sqft: { name: "Square Foot", toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
      sqyd: { name: "Square Yard", toBase: (v) => v * 0.836127, fromBase: (v) => v / 0.836127 },
      sqin: { name: "Square Inch", toBase: (v) => v * 0.00064516, fromBase: (v) => v / 0.00064516 },
      acre: { name: "Acre", toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
      hectare: { name: "Hectare (ha)", toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
      bigha: { name: "Bigha", toBase: (v) => v * 2508.38, fromBase: (v) => v / 2508.38 },
    },
  },
  time: {
    name: "Time",
    units: {
      ms: { name: "Millisecond", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      s: { name: "Second (s)", toBase: (v) => v, fromBase: (v) => v },
      min: { name: "Minute (min)", toBase: (v) => v * 60, fromBase: (v) => v / 60 },
      hr: { name: "Hour (hr)", toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      day: { name: "Day", toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
      week: { name: "Week", toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
      month: { name: "Month (30 days)", toBase: (v) => v * 2592000, fromBase: (v) => v / 2592000 },
      year: { name: "Year (365 days)", toBase: (v) => v * 31536000, fromBase: (v) => v / 31536000 },
    },
  },
  speed: {
    name: "Speed",
    units: {
      mps: { name: "Meter/Second (m/s)", toBase: (v) => v, fromBase: (v) => v },
      kmph: { name: "Kilometer/Hour (km/h)", toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      mph: { name: "Mile/Hour (mph)", toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      knot: { name: "Knot", toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
      fps: { name: "Foot/Second (ft/s)", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    },
  },
  digital: {
    name: "Digital Storage",
    units: {
      bit: { name: "Bit", toBase: (v) => v / 8, fromBase: (v) => v * 8 },
      byte: { name: "Byte (B)", toBase: (v) => v, fromBase: (v) => v },
      kb: { name: "Kilobyte (KB)", toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
      mb: { name: "Megabyte (MB)", toBase: (v) => v * 1048576, fromBase: (v) => v / 1048576 },
      gb: { name: "Gigabyte (GB)", toBase: (v) => v * 1073741824, fromBase: (v) => v / 1073741824 },
      tb: { name: "Terabyte (TB)", toBase: (v) => v * 1099511627776, fromBase: (v) => v / 1099511627776 },
      pb: { name: "Petabyte (PB)", toBase: (v) => v * 1125899906842624, fromBase: (v) => v / 1125899906842624 },
    },
  },
  energy: {
    name: "Energy",
    units: {
      j: { name: "Joule (J)", toBase: (v) => v, fromBase: (v) => v },
      kj: { name: "Kilojoule (kJ)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      cal: { name: "Calorie (cal)", toBase: (v) => v * 4.184, fromBase: (v) => v / 4.184 },
      kcal: { name: "Kilocalorie (kcal)", toBase: (v) => v * 4184, fromBase: (v) => v / 4184 },
      wh: { name: "Watt-hour (Wh)", toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      kwh: { name: "Kilowatt-hour (kWh)", toBase: (v) => v * 3600000, fromBase: (v) => v / 3600000 },
      btu: { name: "BTU", toBase: (v) => v * 1055.06, fromBase: (v) => v / 1055.06 },
      ev: { name: "Electronvolt (eV)", toBase: (v) => v * 1.60218e-19, fromBase: (v) => v / 1.60218e-19 },
    },
  },
  pressure: {
    name: "Pressure",
    units: {
      pa: { name: "Pascal (Pa)", toBase: (v) => v, fromBase: (v) => v },
      kpa: { name: "Kilopascal (kPa)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      bar: { name: "Bar", toBase: (v) => v * 100000, fromBase: (v) => v / 100000 },
      psi: { name: "PSI", toBase: (v) => v * 6894.76, fromBase: (v) => v / 6894.76 },
      atm: { name: "Atmosphere (atm)", toBase: (v) => v * 101325, fromBase: (v) => v / 101325 },
      mmhg: { name: "mmHg (Torr)", toBase: (v) => v * 133.322, fromBase: (v) => v / 133.322 },
    },
  },
  fuel: {
    name: "Fuel Economy",
    units: {
      kmpl: { name: "km per Liter (km/L)", toBase: (v) => v, fromBase: (v) => v },
      mpg_us: { name: "Miles per Gallon (US)", toBase: (v) => v * 0.425144, fromBase: (v) => v / 0.425144 },
      mpg_uk: { name: "Miles per Gallon (UK)", toBase: (v) => v * 0.354006, fromBase: (v) => v / 0.354006 },
      lp100km: { name: "Liters per 100km", toBase: (v) => 100 / v, fromBase: (v) => 100 / v },
    },
  },
  angle: {
    name: "Angle",
    units: {
      deg: { name: "Degree (°)", toBase: (v) => v, fromBase: (v) => v },
      rad: { name: "Radian (rad)", toBase: (v) => v * (180 / Math.PI), fromBase: (v) => v * (Math.PI / 180) },
      grad: { name: "Gradian (gon)", toBase: (v) => v * 0.9, fromBase: (v) => v / 0.9 },
      arcmin: { name: "Arc Minute (')", toBase: (v) => v / 60, fromBase: (v) => v * 60 },
      arcsec: { name: "Arc Second (\")", toBase: (v) => v / 3600, fromBase: (v) => v * 3600 },
    },
  },
};

const UnitConverter = () => {
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("cm");
  const [fromValue, setFromValue] = useState<string>("1");
  const [toValue, setToValue] = useState<string>("100");

  const convert = (value: string, from: string, to: string, cat: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "";
    
    const category = unitCategories[cat];
    if (!category) return "";
    
    const fromUnitData = category.units[from];
    const toUnitData = category.units[to];
    if (!fromUnitData || !toUnitData) return "";
    
    const baseValue = fromUnitData.toBase(numValue);
    const result = toUnitData.fromBase(baseValue);
    
    // Format result with appropriate precision
    if (Math.abs(result) < 0.0001 || Math.abs(result) >= 1e10) {
      return result.toExponential(6);
    }
    return parseFloat(result.toPrecision(10)).toString();
  };

  const handleFromValueChange = (value: string) => {
    setFromValue(value);
    setToValue(convert(value, fromUnit, toUnit, category));
  };

  const handleToValueChange = (value: string) => {
    setToValue(value);
    setFromValue(convert(value, toUnit, fromUnit, category));
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    const units = Object.keys(unitCategories[newCategory].units);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
    setFromValue("1");
    setToValue(convert("1", units[0], units[1] || units[0], newCategory));
  };

  const handleFromUnitChange = (unit: string) => {
    setFromUnit(unit);
    setToValue(convert(fromValue, unit, toUnit, category));
  };

  const handleToUnitChange = (unit: string) => {
    setToUnit(unit);
    setToValue(convert(fromValue, fromUnit, unit, category));
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
    setToValue(fromValue);
  };

  const currentCategory = unitCategories[category];

  return (
    <AppLayout>
      <PageHeader
        title="Unit Converter"
        showBack
      />

      <div className="p-4 pb-24 space-y-4">
        {/* Category Selection */}
        <Card>
          <CardContent className="p-4">
            <Label className="text-sm font-medium mb-2 block">Category</Label>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(unitCategories).map(([key, cat]) => (
                  <SelectItem key={key} value={key}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Conversion Card */}
        <Card>
          <CardContent className="p-4 space-y-4">
            {/* From Unit */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">From</Label>
              <Select value={fromUnit} onValueChange={handleFromUnitChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(currentCategory.units).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                value={fromValue}
                onChange={(e) => handleFromValueChange(e.target.value)}
                placeholder="Enter value"
                className="text-lg font-semibold"
              />
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={swapUnits}
                className="rounded-full h-10 w-10"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </Button>
            </div>

            {/* To Unit */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">To</Label>
              <Select value={toUnit} onValueChange={handleToUnitChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(currentCategory.units).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                value={toValue}
                onChange={(e) => handleToValueChange(e.target.value)}
                placeholder="Result"
                className="text-lg font-semibold"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Info */}
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground text-center">
              1 {currentCategory.units[fromUnit]?.name} = {convert("1", fromUnit, toUnit, category)} {currentCategory.units[toUnit]?.name}
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default UnitConverter;
